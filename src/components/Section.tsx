import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

export function Section({ id, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id={headingId} className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro ? <div className="mt-3 max-w-2xl text-muted">{intro}</div> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
