import { achievements, certifications } from "@/data/profile";
import type { Achievement, Certification } from "@/data/types";
import { ExternalIcon } from "./Icons";
import { Section } from "./Section";
import { Todo } from "./Todo";

const STATUS_STYLES: Record<Certification["status"], string> = {
  Active: "border-accent/50 text-accent",
  Completed: "border-line text-muted",
  "In Progress": "border-warn/60 text-warn",
};

const ACHIEVEMENT_GROUPS: { key: keyof typeof achievements; title: string; todo: string }[] = [
  { key: "ctfs", title: "CTF competitions", todo: "CTF results" },
  { key: "bugBounties", title: "Bug bounties", todo: "bug bounty findings (if any)" },
  { key: "cves", title: "CVEs", todo: "CVEs (if any)" },
  { key: "publications", title: "Publications & talks", todo: "publications/talks (if any)" },
];

function AchievementItem({ item }: { item: Achievement }) {
  return (
    <li className="rounded-lg border border-line bg-elev p-4">
      <p className="font-medium">
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            {item.title} <ExternalIcon className="inline size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          item.title
        )}
      </p>
      {item.detail ? <p className="mt-1 text-sm text-muted">{item.detail}</p> : null}
      {item.date ? <p className="mt-1 font-mono text-xs text-muted">{item.date}</p> : null}
    </li>
  );
}

export function Credentials() {
  const hasAchievements = ACHIEVEMENT_GROUPS.some(({ key }) => achievements[key].length > 0);

  return (
    <Section id="certifications" title={hasAchievements ? "Certifications & Achievements" : "Certifications"}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.name} className="flex flex-col rounded-xl border border-line bg-elev p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-snug">{cert.name}</h3>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-xs ${STATUS_STYLES[cert.status]}`}
              >
                {cert.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
            {cert.detail ? <p className="mt-2 text-sm text-fg/80">{cert.detail}</p> : null}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 text-xs">
              {cert.date ? <span className="font-mono text-muted">{cert.date}</span> : null}
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                >
                  Verify <ExternalIcon className="size-3.5" />
                  <span className="sr-only">{cert.name} credential (opens in a new tab)</span>
                </a>
              ) : null}
              {!cert.date || !cert.url ? (
                <Todo>{[!cert.date && "date", !cert.url && "verify link"].filter(Boolean).join(" + ")}</Todo>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {ACHIEVEMENT_GROUPS.map(({ key, title, todo }) => {
        const items = achievements[key];
        if (!items.length) {
          return (
            <div key={key} className="mt-6">
              <Todo>{todo}</Todo>
            </div>
          );
        }
        return (
          <div key={key} className="mt-12">
            <h3 className="font-mono text-sm font-semibold text-accent">{title}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <AchievementItem key={item.title} item={item} />
              ))}
            </ul>
          </div>
        );
      })}
    </Section>
  );
}
