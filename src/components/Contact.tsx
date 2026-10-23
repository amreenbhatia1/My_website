import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";
import { Section } from "./Section";
import { Todo } from "./Todo";

const cardClass =
  "flex items-center gap-4 rounded-xl border border-line bg-elev p-5 transition-colors hover:border-accent";

export function Contact() {
  const { email, links } = profile;

  return (
    <Section
      id="contact"
      title="Contact"
      intro="Email is the fastest way to reach me."
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        <li>
          <a href={`mailto:${email}`} className={cardClass}>
            <MailIcon className="size-6 shrink-0 text-accent" />
            <span className="min-w-0">
              <span className="block font-semibold">Email</span>
              <span className="block truncate text-sm text-muted">{email}</span>
            </span>
          </a>
        </li>
        {links.linkedin ? (
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <LinkedInIcon className="size-6 shrink-0 text-accent" />
              <span className="min-w-0">
                <span className="block font-semibold">LinkedIn</span>
                <span className="block truncate text-sm text-muted">
                  {links.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ) : null}
        {links.github ? (
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <GitHubIcon className="size-6 shrink-0 text-accent" />
              <span className="min-w-0">
                <span className="block font-semibold">GitHub</span>
                <span className="block truncate text-sm text-muted">
                  {links.github.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ) : (
          <li className="flex items-center">
            <Todo>GitHub URL</Todo>
          </li>
        )}
      </ul>
    </Section>
  );
}
