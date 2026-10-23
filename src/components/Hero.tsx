import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./Icons";
import { Todo } from "./Todo";
import { TypingText } from "./TypingText";

const outlineButton =
  "inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent";

export function Hero() {
  const { name, headline, intro, location, email, links, photo } = profile;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-5xl flex-col-reverse gap-10 px-4 pb-20 pt-14 sm:px-6 sm:pt-24 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h1 id="hero-heading" className="text-4xl font-bold tracking-tight sm:text-6xl">
            {name}
          </h1>
          <p className="mt-3 text-xl font-medium text-fg/90 sm:text-2xl">{headline}</p>
          <TypingText phrases={profile.typing} />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <PinIcon className="size-4" /> {location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              <MailIcon className="size-4" /> Email me
            </a>
            {links.linkedin ? (
              <a href={links.linkedin} className={outlineButton} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="size-4" /> LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
            {links.github ? (
              <a href={links.github} className={outlineButton} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="size-4" /> GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Todo>GitHub URL</Todo>
            )}
          </div>
        </div>

        {photo ? (
          // Plain <img>: static export has no image optimizer.
          <img
            src={withBasePath(photo)}
            alt={`Portrait of ${name}`}
            width={224}
            height={224}
            className="size-40 shrink-0 rounded-2xl border border-line object-cover sm:size-56"
            fetchPriority="high"
          />
        ) : (
          <div className="shrink-0">
            <Todo>Photo (optional)</Todo>
          </div>
        )}
      </div>
    </section>
  );
}
