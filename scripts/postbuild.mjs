/**
 * Post-build hardening for the static export in ./out
 *
 * Next.js inlines small <script> tags (hydration data, the theme/focus boot script) whose content
 * changes with every content edit. Static hosting can't use per-request nonces, so instead this
 * script hashes each page's inline scripts and injects a per-page
 * <meta http-equiv="Content-Security-Policy"> with no 'unsafe-inline' for scripts.
 *
 * Directives that a <meta> CSP can't carry (frame-ancestors) plus the other security headers are
 * sent as HTTP headers by vercel.json / public/_headers (Netlify).
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");

if (!fs.existsSync(OUT)) {
  console.error("[postbuild] ./out not found. Is `output: 'export'` set in next.config.mjs?");
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const sha256 = (text) => `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const STYLE_RE = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
const STYLE_ATTR_RE = /<[a-zA-Z][^>]*?\sstyle\s*=/;
const EVENT_ATTR_RE = /<[a-zA-Z][^>]*?\son[a-z]+\s*=/;

function isExecutableScript(attrs) {
  if (/\bsrc\s*=/i.test(attrs)) return false;
  const type = attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i)?.[1];
  return !type || /^(text\/javascript|application\/javascript|module)$/i.test(type);
}

function buildPolicy({ scriptHashes, styleHashes, needsStyleAttr }) {
  const directives = [
    "default-src 'self'",
    `script-src 'self' ${[...scriptHashes].join(" ")}`.trim(),
    `style-src 'self' ${[...styleHashes].join(" ")}`.trim(),
    // Only emitted if a page's markup has style="" attributes (e.g. a server-rendered framer-motion
    // element). Attributes can't run script or load external resources here, so the risk is low.
    needsStyleAttr ? "style-src-attr 'unsafe-inline'" : null,
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "media-src 'self'",
    "frame-src 'none'",
    "worker-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  return directives.filter(Boolean).join("; ");
}

const htmlFiles = walk(OUT).filter((file) => file.endsWith(".html"));
let warnings = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('http-equiv="Content-Security-Policy"')) continue;

  const scriptHashes = new Set();
  const styleHashes = new Set();

  for (const [, attrs, body] of html.matchAll(SCRIPT_RE)) {
    if (isExecutableScript(attrs)) scriptHashes.add(sha256(body));
  }
  for (const [, , body] of html.matchAll(STYLE_RE)) {
    styleHashes.add(sha256(body));
  }

  const markup = html.replace(SCRIPT_RE, "<script></script>");
  const needsStyleAttr = STYLE_ATTR_RE.test(markup);
  if (EVENT_ATTR_RE.test(markup)) {
    warnings++;
    console.warn(`[postbuild] ${path.relative(OUT, file)} has inline event handler attributes; the CSP will block them.`);
  }

  const policy = buildPolicy({ scriptHashes, styleHashes, needsStyleAttr });
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;

  // Keep <meta charset> first (it must be within the first 1024 bytes), then the CSP before any script.
  const charset = html.match(/<meta charSet="utf-8"\s*\/?>/i);
  if (charset) {
    html = html.replace(charset[0], `${charset[0]}${meta}`);
  } else {
    html = html.replace(/<head[^>]*>/i, (head) => `${head}${meta}`);
  }

  fs.writeFileSync(file, html);
}

console.log(`[postbuild] Injected hash-based CSP into ${htmlFiles.length} HTML file(s).`);

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  warnings++;
  console.warn(
    "[postbuild] NEXT_PUBLIC_SITE_URL is not set, so canonical/OG/sitemap URLs use https://example.com. Set it before deploying.",
  );
}

if (warnings) console.warn(`[postbuild] Finished with ${warnings} warning(s).`);
