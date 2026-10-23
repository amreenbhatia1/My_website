import { experience } from "@/data/profile";
import { toIsoMonth } from "@/lib/dates";
import { hideInForFocus } from "@/lib/visibility";
import { Bullets, Tag } from "./Bullets";
import { Section } from "./Section";

function DateText({ value }: { value: string }) {
  const iso = toIsoMonth(value);
  return iso ? <time dateTime={iso}>{value}</time> : <span>{value}</span>;
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative space-y-12 border-l border-line pl-6 sm:pl-8">
        {experience.map((role) => (
          <li key={`${role.company}-${role.title}`} data-hide-in={hideInForFocus(role.focus)} className="relative">
            <span
              aria-hidden
              className="absolute -left-[calc(1.5rem+5px)] top-2 size-2.5 rounded-full bg-accent ring-4 ring-bg sm:-left-[calc(2rem+5px)]"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-lg font-semibold leading-snug">
                {role.title}
                <span className="block text-base font-normal text-muted">
                  {role.company} · {role.location}
                </span>
              </h3>
              <p className="shrink-0 font-mono text-sm text-muted">
                <DateText value={role.start} /> – <DateText value={role.end} />
              </p>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
              {role.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
            <Bullets bullets={role.bullets} className="mt-4" />
          </li>
        ))}
      </ol>
    </Section>
  );
}
