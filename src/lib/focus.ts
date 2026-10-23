"use client";

import { useSyncExternalStore } from "react";
import type { FocusView } from "@/data/types";

const listeners = new Set<() => void>();

export function parseFocus(value: string | null | undefined): FocusView {
  return value === "security" || value === "swe" ? value : "all";
}

function readFocus(): FocusView {
  return parseFocus(document.documentElement.dataset.focus);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function apply(view: FocusView) {
  document.documentElement.dataset.focus = view;
  listeners.forEach((listener) => listener());
}

/** Re-read ?focus= from the URL (needed after client-side navigation back to the home page). */
export function syncFocusFromUrl() {
  const view = parseFocus(new URLSearchParams(window.location.search).get("focus"));
  if (view !== readFocus()) apply(view);
}

export function useFocus(): FocusView {
  return useSyncExternalStore(subscribe, readFocus, () => "all");
}
