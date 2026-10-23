/** Public origin of the deployed site, without a trailing slash and without the base path. */
// TODO: Set NEXT_PUBLIC_SITE_URL in your host's environment (e.g. https://your-name.vercel.app).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/+$/, "");

/** Sub-path the site is served from ("" for root, "/repo" for GitHub Pages project sites). */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

/** Absolute public URL for a site path, e.g. absoluteUrl("/writeups/") */
export const absoluteUrl = (path = "/") => `${siteUrl}${basePath}${path}`;

/** Prefix plain <a href> / asset paths with the base path. next/link does this automatically. */
export const withBasePath = (path: string) => `${basePath}${path}`;

export const isDev = process.env.NODE_ENV !== "production";
