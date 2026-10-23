import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getWriteups } from "@/lib/writeups";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writeups = await getWriteups();
  const published = writeups.filter((w) => !w.draft);

  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...(published.length ? [{ url: absoluteUrl("/writeups/"), changeFrequency: "monthly" as const, priority: 0.7 }] : []),
    ...published.map((w) => ({
      url: absoluteUrl(`/writeups/${w.slug}/`),
      lastModified: w.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
