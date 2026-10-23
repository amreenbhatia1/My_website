import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** RFC 9116 security.txt. "Expires" is set 180 days from each build, so redeploying renews it. */
export function GET() {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();
  const lines = [
    `Contact: mailto:${profile.email}`,
    `Expires: ${expires}`,
    "Preferred-Languages: en",
    process.env.NEXT_PUBLIC_SITE_URL ? `Canonical: ${absoluteUrl("/.well-known/security.txt")}` : null,
  ].filter(Boolean);

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
