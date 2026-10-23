/** Which audience an item belongs to. "both" items show in every view. */
export type Focus = "security" | "swe" | "both";

/** The three views of the focus toggle (`?focus=security`, `?focus=swe`, or no param). */
export type FocusView = "all" | "security" | "swe";

/**
 * A bullet point. Use a plain string when the wording is the same in every view.
 * Use the object form when a view needs different wording:
 *   - `text`      shown in the "All" view, and in any view without its own wording
 *   - `security`  wording for the Security view (`null` hides the bullet there)
 *   - `swe`       wording for the Software Engineering view (`null` hides the bullet there)
 */
export type Bullet =
  | string
  | {
      text: string;
      security?: string | null;
      swe?: string | null;
    };

export interface Role {
  company: string;
  title: string;
  location: string;
  /** e.g. "May 2026" */
  start: string;
  /** e.g. "August 2026" or "Present" */
  end: string;
  focus: Focus;
  tags: string[];
  bullets: Bullet[];
}

export interface Project {
  title: string;
  /** Where/why it was built, e.g. "Google x Kaggle". */
  context?: string;
  description: string;
  bullets: Bullet[];
  stack: string[];
  /** Topic tags; these power the project tag filter. */
  tags: string[];
  focus: Focus;
  /** Sort position per view (lower first). Falls back to `all`, then file order. */
  order?: Partial<Record<FocusView, number>>;
  date?: string;
  links: {
    github?: string;
    demo?: string;
    writeup?: string;
  };
}

/** A skill. Plain strings inherit the group's focus. */
export type Skill = string | { name: string; focus: Focus };

export interface SkillGroup {
  category: string;
  focus: Focus;
  items: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  status: "Active" | "Completed" | "In Progress";
  focus: Focus;
  detail?: string;
  date?: string;
  /** Verification link (Credly, etc.). */
  url?: string;
}

export interface Achievement {
  title: string;
  detail?: string;
  date?: string;
  url?: string;
  focus: Focus;
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  graduation: string;
  gpa?: string;
  honors: string[];
  coursework: string[];
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  /** Short hero intro (1–2 sentences). */
  intro: string;
  /** Rotating phrases for the hero typing effect, per view. */
  typing: Record<FocusView, string[]>;
  /** About section paragraphs. */
  about: string[];
  /** Optional path under /public, e.g. "/photo.jpg". */
  photo?: string;
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}
