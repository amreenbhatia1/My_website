import { education } from "@/data/profile";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {education.map((entry) => (
          <article key={entry.school} className="rounded-xl border border-line bg-elev p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-lg font-semibold leading-snug">
                {entry.school}
                <span className="block text-base font-normal text-fg/90">{entry.degree}</span>
              </h3>
              <p className="shrink-0 font-mono text-sm text-muted">{entry.graduation}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {entry.location}
              {entry.gpa ? ` · GPA ${entry.gpa}` : ""}
            </p>

            {entry.honors.length ? (
              <>
                <h4 className="mt-5 font-mono text-sm font-semibold text-accent">Honors</h4>
                <ul className="mt-2 space-y-1.5">
                  {entry.honors.map((honor) => (
                    <li key={honor} className="flex gap-3 text-[0.95rem] text-fg/90">
                      <span aria-hidden className="font-mono text-accent">
                        ›
                      </span>
                      {honor}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h4 className="mt-5 font-mono text-sm font-semibold text-accent">Relevant coursework</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {entry.coursework.map((course) => (
                <li key={course} className="rounded-md border border-line px-2.5 py-1 text-sm text-fg/90">
                  {course}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
