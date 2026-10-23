"use client";

import { useEffect, useState } from "react";
import type { FocusView } from "@/data/types";
import { useFocus } from "@/lib/focus";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Terminal-style typing line. Static (first phrase) when the user prefers reduced motion. */
export function TypingText({ phrases }: { phrases: Record<FocusView, string[]> }) {
  const focus = useFocus();
  const reduceMotion = usePrefersReducedMotion();
  const list = phrases[focus];

  const [activeFocus, setActiveFocus] = useState(focus);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(list[0].length);
  const [deleting, setDeleting] = useState(false);

  if (activeFocus !== focus) {
    setActiveFocus(focus);
    setIndex(0);
    setLength(0);
    setDeleting(false);
  }

  const phrase = list[index % list.length];

  useEffect(() => {
    if (reduceMotion) return;
    const full = length === phrase.length;
    const empty = length === 0;
    const delay = !deleting && full ? 1800 : deleting && empty ? 350 : deleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!deleting && full) setDeleting(true);
      else if (deleting && empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % list.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [reduceMotion, phrase, length, deleting, list.length]);

  const shown = reduceMotion ? list[0] : phrase.slice(0, length);

  return (
    <p className="mt-4 flex h-7 items-center overflow-hidden whitespace-nowrap font-mono text-base text-accent sm:text-lg">
      <span aria-hidden className="mr-2 text-muted">
        &gt;
      </span>
      <span aria-hidden>{shown}</span>
      <span aria-hidden className="caret" />
      <span className="sr-only">Focus areas: {list.join(", ")}</span>
    </p>
  );
}
