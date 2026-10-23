import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getWriteups } from "@/lib/writeups";

export default async function WriteupsLayout({ children }: { children: ReactNode }) {
  const hasWriteups = (await getWriteups()).length > 0;
  return (
    <>
      <Header hasWriteups={hasWriteups} />
      <main id="main" tabIndex={-1} className="mx-auto min-h-[70dvh] max-w-3xl px-4 py-14 outline-none sm:px-6 sm:py-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
