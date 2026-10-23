import type { ReactNode } from "react";

/** Dashed TODO badge. Rendered only in `npm run dev`; production builds omit it entirely. */
export function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="inline-flex items-center gap-1 rounded border border-dashed border-warn px-2 py-0.5 font-mono text-xs text-warn">
      TODO: {children}
    </span>
  );
}
