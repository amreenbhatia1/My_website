import Link from "next/link";

const linkClass = "block rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:text-fg";

/** Plain <a> for same-page #hash links (keeps ?focus= in the URL); next/link otherwise. */
export function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return href.startsWith("#") ? (
    <a href={href} className={linkClass} onClick={onClick}>
      {label}
    </a>
  ) : (
    <Link href={href} className={linkClass} onClick={onClick}>
      {label}
    </Link>
  );
}
