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
netlify.toml              <- Netlify build settings
vercel.json               <- Vercel security headers (only if you switch to Vercel)
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

## Deployment

The build output is plain static files in `./out`. Two environment variables configure absolute URLs
(see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin, e.g. `https://your-site.netlify.app` (canonical URLs, Open Graph, sitemap, robots) |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path, only if the site is served under one (e.g. `/portfolio`). Not needed on Netlify |

### Netlify (current host)

1. Go to <https://app.netlify.com/start>, sign in with GitHub, and pick the `My_website` repository.
2. Leave the build settings as detected. `netlify.toml` already sets the build command (`npm run build`),
   publish directory (`out`), and Node version.
3. Click **Deploy**. Netlify gives the site a URL like `https://random-name-123.netlify.app`. You can rename it under
   **Site configuration → Site details → Change site name**.
4. Under **Site configuration → Environment variables**, add `NEXT_PUBLIC_SITE_URL` = your site URL
   (e.g. `https://your-site.netlify.app`), then **Deploys → Trigger deploy → Deploy site** so the sitemap and
   Open Graph links use it.
5. Security headers come from `public/_headers`. Verify with the `curl` commands above.
6. Every push to `main` redeploys automatically.
7. Optional: add a custom domain under **Domain management**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

### Vercel (alternative)

1. Push this project to a GitHub repository.
2. Go to <https://vercel.com/new> and import the repository.
3. **Framework Preset:** Next.js (auto-detected).
4. **Build Command:** make sure it is `npm run build`. If it shows `next build`, override it, or the CSP
   injection step won't run.
5. **Environment Variables:** add `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://your-project.vercel.app`).
   You can deploy first, copy the assigned URL, add the variable, and redeploy.
6. Click **Deploy**. `vercel.json` applies the security headers automatically.
7. Verify with the `curl` commands above. Every page's source should contain `<meta http-equiv="Content-Security-Policy"`.
8. Optional: add a custom domain under **Project → Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

---

## Accessibility and performance notes

- Semantic landmarks, a skip link, visible focus rings, `aria-pressed` filter buttons with live-region announcements,
  and WCAG AA color contrast in both themes.
- `prefers-reduced-motion` disables the typing effect, smooth scrolling, and transitions.
- Focus filtering is pure CSS keyed on `<html data-focus>`, set by a tiny inline script before first paint.
  A shared `?focus=security` link therefore never flashes the wrong content, and the page works without JavaScript.
- Dark theme by default; the light/dark choice is saved in `localStorage`.
- Measured with Lighthouse (mobile) on the local production build: Accessibility 100, Best Practices 100, SEO 100,
  with no console errors (the CSP doesn't block anything). Re-run Lighthouse against your deployed URL after adding real content.

---

## TODO checklist

Search the code for `TODO:` to find every placeholder. Here's the full list:

1. **`NEXT_PUBLIC_SITE_URL`.** Set it in Netlify's environment variables (see Deployment).
2. **About text.** Review `profile.about` and rewrite it in your own voice (it's built only from resume facts).
3. **Photo (optional).** Add `public/photo.jpg` and set `profile.photo: "/photo.jpg"`.
4. **Personal website (optional).** `profile.links.website`.
5. **Project dates.** Every project except ReviewLens AI.
6. **Project links.** GitHub, demo, or writeup links for ReviewLens AI, the Client Intelligence Dashboard, the AI Agents Capstone, SOAR Playbook Optimization, and Anomaly Detection & Data Security, where shareable (the Lexical Analyzer and NYC Tax Block projects already link to GitHub).
7. **Project context.** Whether the Lexical Analyzer was a course project (and which course).
8. **Project tech stacks.** Confirm or extend them for the Client Intelligence Dashboard and the AI Agents Capstone, and replace the placeholder techniques on Anomaly Detection & Data Security with the actual tools (language, ML libraries).
9. **Certification dates and verification URLs** (e.g. Credly) for all seven certifications.
10. **CTF results, bug bounties, CVEs, publications/talks**, if any (`achievements`).
11. **Course name.** The resumes say "Intensive Programming in Linux" (SWE) and "Programming in Ubuntu Linux" (security). Confirm which is correct.
12. **Writeup template.** Delete `src/content/writeups/writeup-template.mdx`, or turn it into a real post.
