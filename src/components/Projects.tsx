"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Project } from "@/data/types";
import { useFocus } from "@/lib/focus";
import { hideInForFocus, isVisible } from "@/lib/visibility";
import { Bullets, Tag } from "./Bullets";
import { ExternalIcon, GitHubIcon } from "./Icons";
import { Todo } from "./Todo";

const ALL = "All";

function ProjectLinks({ links }: { links: Project["links"] }) {
  const items = [
    links.github && { href: links.github, label: "Source", icon: <GitHubIcon className="size-4" /> },
    links.demo && { href: links.demo, label: "Live demo", icon: <ExternalIcon className="size-4" /> },
    links.writeup && { href: links.writeup, label: "Writeup", icon: <ExternalIcon className="size-4" /> },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

  if (!items.length) return <Todo>project links</Todo>;

  return (
    <ul className="flex flex-wrap gap-4">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {item.icon} {item.label}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const focus = useFocus();
  const [tag, setTag] = useState(ALL);
  const [filtered, setFiltered] = useState(false);

  const ordered = useMemo(
    () =>
      projects
        .map((project, i) => ({ project, rank: project.order?.[focus] ?? project.order?.all ?? i }))
        .sort((a, b) => a.rank - b.rank)
        .map(({ project }) => project),
    [projects, focus],
  );

  const tags = useMemo(() => {
    const set = new Set<string>();
    ordered.filter((p) => isVisible(p.focus, focus)).forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...set];
  }, [ordered, focus]);

  const activeTag = tags.includes(tag) ? tag : ALL;
  const shown = ordered.filter((p) => activeTag === ALL || p.tags.includes(activeTag));
  const visibleCount = shown.filter((p) => isVisible(p.focus, focus)).length;

  return (
    <>
      <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={activeTag === t}
            onClick={() => {
              setTag(t);
              setFiltered(true);
            }}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              activeTag === t
                ? "border-accent bg-accent text-accent-fg"
                : "border-line text-muted hover:border-accent hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {`Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}${activeTag === ALL ? "" : ` tagged ${activeTag}`}.`}
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {shown.map((project) => (
          <li
            key={project.title}
            data-hide-in={hideInForFocus(project.focus)}
            className={`flex flex-col rounded-xl border border-line bg-elev p-6 transition-colors hover:border-accent/60 ${
              filtered ? "card-in" : ""
            }`}
          >
            <article className="flex h-full flex-col">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                {project.date ? (
                  <span className="font-mono text-xs text-muted">{project.date}</span>
                ) : (
                  <Todo>date</Todo>
                )}
              </div>
              {project.context ? <p className="mt-1 font-mono text-xs text-accent-2">{project.context}</p> : null}
              <p className="mt-3 text-muted">{project.description}</p>
              <Bullets bullets={project.bullets} className="mt-4" />
              <div className="mt-auto pt-5">
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.stack.map((item) => (
                    <li key={item}>
                      <Tag tone="accent">{item}</Tag>
                    </li>
                  ))}
                </ul>
                <ul className="mt-2 flex flex-wrap gap-2" aria-label="Tags">
                  {project.tags.map((t) => (
                    <li key={t}>
                      <Tag>#{t}</Tag>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <ProjectLinks links={project.links} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
