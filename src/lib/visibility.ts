import type { Bullet, Focus, FocusView, Skill } from "@/data/types";

/**
 * Focus filtering is done in CSS (see globals.css) keyed on <html data-focus="...">,
 * which an inline script sets from ?focus= before first paint. That way a shared
 * `?focus=security` link never flashes the wrong content, and the page still works without JS.
 *
 *   data-hide-in="security swe"  -> hidden in those views
 *   data-only="swe"              -> shown only in that view
 */

export function hideInForFocus(focus: Focus): string | undefined {
  if (focus === "security") return "swe";
  if (focus === "swe") return "security";
  return undefined;
}

export function isVisible(focus: Focus, view: FocusView): boolean {
  return view === "all" || focus === "both" || focus === view;
}

export function skillName(skill: Skill): string {
  return typeof skill === "string" ? skill : skill.name;
}

export function skillFocus(skill: Skill, groupFocus: Focus): Focus {
  return typeof skill === "string" ? groupFocus : skill.focus;
}

/** A group is hidden in a view when none of its skills are visible there. */
export function groupHideIn(items: Skill[], groupFocus: Focus): string | undefined {
  const views = (["security", "swe"] as const).filter(
    (view) => !items.some((skill) => isVisible(skillFocus(skill, groupFocus), view)),
  );
  return views.length ? views.join(" ") : undefined;
}

export interface BulletParts {
  /** Views where the whole bullet is hidden. */
  hideIn?: string;
  /** Default text, plus the views where it's swapped out for a variant. */
  text: string;
  textHideIn?: string;
  variants: { view: "security" | "swe"; text: string }[];
}

export function bulletParts(bullet: Bullet): BulletParts {
  if (typeof bullet === "string") return { text: bullet, variants: [] };

  const hidden: string[] = [];
  const variants: BulletParts["variants"] = [];
  for (const view of ["security", "swe"] as const) {
    const value = bullet[view];
    if (value === null) hidden.push(view);
    else if (typeof value === "string") variants.push({ view, text: value });
  }
  return {
    hideIn: hidden.length ? hidden.join(" ") : undefined,
    text: bullet.text,
    textHideIn: variants.length ? variants.map((v) => v.view).join(" ") : undefined,
    variants,
  };
}
