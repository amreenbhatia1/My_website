"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { NavLink } from "./NavLink";

interface MobileMenuProps {
  id: string;
  open: boolean;
  links: { id: string; href: string; label: string }[];
  onNavigate: () => void;
}

/** Loaded on demand by Header, so framer-motion stays out of the initial bundle. */
export default function MobileMenu({ id, open, links, onNavigate }: MobileMenuProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open ? (
          <m.nav
            id={id}
            aria-label="Mobile"
            className="overflow-hidden border-t border-line lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-1 px-4 py-3 sm:px-6">
              {links.map((link) => (
                <li key={link.id}>
                  <NavLink href={link.href} label={link.label} onClick={onNavigate} />
                </li>
              ))}
            </ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
