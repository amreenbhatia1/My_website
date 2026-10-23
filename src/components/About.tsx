import { profile } from "@/data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-fg/90">
        {profile.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
