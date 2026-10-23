import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "@/components/Bullets";
import { getWriteups } from "@/lib/writeups";

export const metadata: Metadata = {
  title: "Writeups",
  description: "CTF writeups and technical posts on detection engineering, security automation, and AI security.",
  alternates: { canonical: "./" },
};

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export default async function WriteupsPage() {
  const writeups = await getWriteups();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Writeups</h1>
      <p className="mt-3 text-muted">CTF writeups and technical notes.</p>

      {writeups.length ? (
        <ul className="mt-10 space-y-4">
          {writeups.map((w) => (
            <li key={w.slug}>
              <article className="rounded-xl border border-line bg-elev p-5 transition-colors hover:border-accent">
                <p className="font-mono text-xs text-muted">
                  <time dateTime={w.date}>{dateFormat.format(new Date(w.date))}</time>
                  {w.draft ? <span className="ml-2 text-warn">draft (dev only)</span> : null}
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  <Link href={`/writeups/${w.slug}/`} className="hover:text-accent">
                    {w.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">{w.summary}</p>
                {w.tags?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                    {w.tags.map((t) => (
                      <li key={t}>
                        <Tag>#{t}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-muted">Nothing published yet. Check back soon.</p>
      )}
    </>
  );
}
