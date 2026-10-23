import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/Bullets";
import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";
import { getAllWriteups, getWriteup, getWriteups } from "@/lib/writeups";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const published = await getWriteups();
  // `output: export` requires at least one param. With only drafts, their pages render the 404 page.
  const writeups = published.length ? published : await getAllWriteups();
  return writeups.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const writeup = await getWriteup(slug);
  if (!writeup) return { title: "Page not found", robots: { index: false, follow: false } };
  const { title, summary, date, draft } = writeup.meta;
  return {
    title,
    description: summary,
    alternates: { canonical: "./" },
    openGraph: {
      type: "article",
      title,
      description: summary,
      publishedTime: date,
      authors: [profile.name],
      url: "./",
      images: [absoluteUrl("/og.png")],
    },
    robots: draft ? { index: false, follow: false } : undefined,
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function WriteupPage({ params }: Params) {
  const { slug } = await params;
  const writeup = await getWriteup(slug);
  if (!writeup) notFound();
  const { meta, Content } = writeup;

  return (
    <article>
      <Link href="/writeups/" className="font-mono text-sm text-muted hover:text-accent">
        ← All writeups
      </Link>
      <header className="mt-6 border-b border-line pb-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{meta.title}</h1>
        <p className="mt-3 font-mono text-sm text-muted">
          <time dateTime={meta.date}>{dateFormat.format(new Date(meta.date))}</time> · {profile.name}
          {meta.draft ? <span className="ml-2 text-warn">draft (dev only)</span> : null}
        </p>
        {meta.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
            {meta.tags.map((t) => (
              <li key={t}>
                <Tag>#{t}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <div className="mdx mt-8">
        <Content />
      </div>
    </article>
  );
}
