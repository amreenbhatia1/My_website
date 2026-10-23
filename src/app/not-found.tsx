import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6">
      <h1 className="text-3xl font-bold tracking-tight">404: page not found</h1>
      <p className="mt-3 text-muted">The page you were looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
