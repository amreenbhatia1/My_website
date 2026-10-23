import type { ReactNode } from "react";
import type { Bullet } from "@/data/types";
import { bulletParts } from "@/lib/visibility";

/** Bullet list whose items/wording swap per focus view via CSS (no flash, works without JS). */
export function Bullets({ bullets, className = "" }: { bullets: Bullet[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {bullets.map((bullet, i) => {
        const parts = bulletParts(bullet);
        return (
          <li key={i} data-hide-in={parts.hideIn} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg/90">
            <span aria-hidden className="mt-[0.15em] select-none font-mono text-accent">
              ›
            </span>
            <span>
              <span data-hide-in={parts.textHideIn}>{parts.text}</span>
              {parts.variants.map((variant) => (
                <span key={variant.view} data-only={variant.view}>
                  {variant.text}
                </span>
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  const tones = {
    default: "border-line text-muted",
    accent: "border-accent/40 text-accent",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs ${tones[tone]}`}>
      {children}
    </span>
  );
}
