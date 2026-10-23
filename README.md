# Amreen Kaur Bhatia: Portfolio

Personal portfolio for a **Security Engineer & AI Software Engineer**. Static Next.js site (App Router,
TypeScript, Tailwind CSS). There's no visible toggle, but you can send recruiters a link that filters the
whole page to one side:

- `https://your-site/?focus=security`
- `https://your-site/?focus=swe`
- `https://your-site/` (everything)

```bash
npm install
npm run dev        # http://localhost:3000 (TODO placeholders are visible in dev)
npm run build      # static export to ./out, plus CSP injection
npm run preview    # serve ./out locally, the way the live site will behave
npm run typecheck
```

Requires Node.js 20.9+ (22 recommended).

---

## Project layout

```
src/
  data/profile.ts         <- ALL site content (edit this)
  data/types.ts           <- content schema
  content/writeups/*.mdx  <- writeups / blog posts
  components/             <- UI sections (no content hard-coded)
  app/                    <- routes, metadata, sitemap, robots, OG image, security.txt
public/
  _headers                <- Netlify security headers
scripts/postbuild.mjs     <- injects the hash-based Content-Security-Policy
vercel.json               <- Vercel security headers
.github/workflows/        <- GitHub Pages deployment
```

---

## Editing content (`src/data/profile.ts`)

Everything on the page comes from `src/data/profile.ts`. You never need to touch components to update content.

| Export | What it controls |
| --- | --- |
| `profile` | Name, headline, intro, typing phrases, About paragraphs, email, links, photo |
| `experience` | Timeline roles |
| `projects` | Project cards |
| `skills` | Skill groups |
| `certifications` | Certification cards |
| `achievements` | CTFs, bug bounties, CVEs, publications (each list is hidden while empty) |
| `education` | Education card |

### Focus tags

Every item has `focus: "security" | "swe" | "both"`:

- `"both"`: shown in every view
- `"security"`: hidden in the Software Engineering view
- `"swe"`: hidden in the Security view

The **All** view always shows everything.

### Per-view wording for bullets

The two resumes describe the same work differently, so a bullet can carry a wording per view:

```ts
bullets: [
  "Same wording everywhere",                    // plain string
  {
    text: "Wording for the All view",            // also used by any view without its own wording
    security: "Wording for the Security view",   // optional
    swe: "Wording for the SWE view",             // optional
  },
  { text: "Security-only detail", swe: null },   // null = hide this bullet in that view
]
```

### Skills

Plain strings inherit the group's `focus`. To override a single skill, use `{ name: "MITRE ATT&CK", focus: "both" }`.
A group disappears from a view when none of its skills are visible there.

### Project order and links

`order: { all: 1, security: 1, swe: 2 }` sorts cards per view (lower comes first). Links are optional;
add any of `links: { github, demo, writeup }` and the buttons appear.

### TODO placeholders

Missing values are marked `// TODO:` in `profile.ts`. While you run `npm run dev`, they also appear on the
page as dashed **TODO** badges. Production builds never render the badges, and empty optional fields
(links, dates, photo) are simply left out.

> **Privacy:** never add a phone number to `profile.ts`. Everything in it is published.

---

## Adding a writeup

1. Create `src/content/writeups/my-post-slug.mdx`. The file name becomes the URL: `/writeups/my-post-slug/`.
2. Start it with a metadata export:

   ```mdx
   export const metadata = {
     title: "picoCTF 2026: Some Challenge",
     date: "2026-11-01",
     summary: "One or two sentences shown on the list page and in link previews.",
     tags: ["ctf", "web"],
     draft: false,
   };

   ## Recon

   Regular Markdown from here on: headings, lists, links, `inline code`, and fenced code blocks.
   ```

3. Run `npm run dev` and open `/writeups/`.

Notes:

- `draft: true` posts show only in `npm run dev`. The **Writeups** nav link appears once at least one post is published.
- `src/content/writeups/writeup-template.mdx` is an example and is a draft. Delete it, or replace its content and set `draft: false`.
- Markdown tables need `remark-gfm`, which isn't installed (to keep dependencies minimal). Use lists instead.
- Published posts are added to `sitemap.xml` automatically.

---

## Security

This site advertises a security engineer, so it's hardened accordingly:

- **Strict Content-Security-Policy with no `'unsafe-inline'`.** A static site can't use per-request nonces, so
  `scripts/postbuild.mjs` hashes every inline script Next.js emits (plus the theme/focus boot script)
  and injects a per-page `<meta http-equiv="Content-Security-Policy">` with `script-src 'self' 'sha256-…'`
  and `style-src 'self'`. The hashes are regenerated on every build, so editing content can't break the policy.
- **HTTP security headers** (`vercel.json` for Vercel, `public/_headers` for Netlify): `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`,
  `Strict-Transport-Security`, and a header CSP carrying `frame-ancestors 'none'` (which a `<meta>` CSP can't set).
- **`/.well-known/security.txt`** (RFC 9116). It is regenerated on each build with an `Expires` date 180 days out, so redeploy at least twice a year.
- **No secrets, no backend, no cookies, no analytics, no third-party requests.** Fonts are self-hosted via `next/font`.
- **Privacy:** only email and LinkedIn are shown. No phone number anywhere in the code or the generated site.
- **Minimal dependencies:** `next`, `react`, `react-dom`, `framer-motion`, and `@next/mdx` with its loader. ESLint was left out because
  `eslint-config-next` currently pulls in a dependency with an unpatched advisory; `npm audit` is clean.
  framer-motion is loaded only when the mobile menu is first opened, so it isn't in the initial bundle.

Check a deployment:

```bash
curl -sI https://your-site/ | grep -iE "content-security|x-frame|x-content|referrer|permissions|strict-transport"
curl -s https://your-site/ | grep -o '<meta http-equiv="Content-Security-Policy"[^>]*>' | head -c 200
```

You can also scan it at <https://securityheaders.com> and <https://developer.mozilla.org/en-US/observatory>.

---
