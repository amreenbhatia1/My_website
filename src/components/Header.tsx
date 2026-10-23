"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { syncFocusFromUrl } from "@/lib/focus";
import { CloseIcon, MenuIcon } from "./Icons";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

const loadMobileMenu = () => import("./MobileMenu");
const MobileMenu = dynamic(loadMobileMenu, { ssr: false });

const SECTIONS = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

interface HeaderProps {
  /** On the home page, links are plain #hash anchors so ?focus= stays in the URL. */
  onHome?: boolean;
  hasWriteups: boolean;
}

export function Header({ onHome = false, hasWriteups }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [menuRequested, setMenuRequested] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (onHome) syncFocusFromUrl();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    ...SECTIONS.map((section) => ({
      ...section,
      href: onHome ? `#${section.id}` : `/#${section.id}`,
    })),
    ...(hasWriteups ? [{ id: "writeups", label: "Writeups", href: "/writeups/" }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          <span aria-hidden>
            amreen<span className="text-accent">@</span>bhatia
          </span>
          <span className="sr-only">Amreen Kaur Bhatia, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.id} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-muted hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onPointerEnter={loadMobileMenu}
            onFocus={loadMobileMenu}
            onClick={() => {
              setMenuRequested(true);
              setOpen((value) => !value);
            }}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {menuRequested ? <MobileMenu id={menuId} open={open} links={links} onNavigate={() => setOpen(false)} /> : null}
    </header>
  );
}
