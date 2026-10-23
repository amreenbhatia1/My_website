import { skills } from "@/data/profile";
import { groupHideIn, hideInForFocus, skillFocus, skillName } from "@/lib/visibility";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group) => (
          <article
            key={group.category}
            data-hide-in={groupHideIn(group.items, group.focus)}
            className="rounded-xl border border-line bg-elev p-5"
          >
            <h3 className="font-mono text-sm font-semibold text-accent">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skillName(skill)}
                  data-hide-in={hideInForFocus(skillFocus(skill, group.focus))}
                  className="rounded-md border border-line px-2.5 py-1 text-sm text-fg/90"
                >
                  {skillName(skill)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
