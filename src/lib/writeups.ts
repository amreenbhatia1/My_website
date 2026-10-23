import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { isDev } from "./site";

export interface WriteupMeta {
  title: string;
  /** ISO date, e.g. "2026-10-20" */
  date: string;
  summary: string;
  tags?: string[];
  /** Drafts appear in `npm run dev` only. */
  draft?: boolean;
}

export interface Writeup extends WriteupMeta {
  slug: string;
}

const DIR = path.join(process.cwd(), "src", "content", "writeups");

async function load(slug: string) {
  const mod = (await import(`@/content/writeups/${slug}.mdx`)) as {
    default: ComponentType;
    metadata: WriteupMeta;
  };
  return mod;
}

/** Every writeup file, drafts included, newest first. */
export async function getAllWriteups(): Promise<Writeup[]> {
  if (!fs.existsSync(DIR)) return [];
  const slugs = fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  const all = await Promise.all(slugs.map(async (slug) => ({ slug, ...(await load(slug)).metadata })));
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

/** Published writeups (plus drafts in dev), newest first. */
export async function getWriteups(): Promise<Writeup[]> {
  return (await getAllWriteups()).filter((w) => isDev || !w.draft);
}

/** Returns null for unknown slugs, and for drafts in production builds. */
export async function getWriteup(slug: string) {
  const meta = (await getWriteups()).find((w) => w.slug === slug);
  if (!meta) return null;
  const { default: Content } = await load(slug);
  return { meta, Content };
}
