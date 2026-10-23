import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const description =
  "Amreen Kaur Bhatia is a Security+ certified Security Engineer and AI Software Engineer working on detection engineering, SOAR automation, AI agents, and LLM guardrails.";

const ogImage = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: `${profile.name}, ${profile.headline}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${profile.name} · ${profile.headline}`,
    template: `%s · ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  keywords: [
    "Amreen Kaur Bhatia",
    "Security Engineer",
    "Detection Engineering",
    "SOC Analyst",
    "Splunk SOAR",
    "AI Software Engineer",
    "AI Agents",
    "LLM Guardrails",
    "NJIT",
  ],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} · ${profile.headline}`,
    description,
    url: "./",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.headline}`,
    description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0f14",
  colorScheme: "dark light",
};

/*
 * Runs before first paint: applies the saved theme and the ?focus= view so neither flashes.
 * Its SHA-256 hash is added to the Content-Security-Policy by scripts/postbuild.mjs.
 */
const bootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme");if(t==="light"){d.classList.remove("dark");d.classList.add("light")}var f=new URLSearchParams(location.search).get("focus");d.dataset.focus=f==="security"||f==="swe"?f:"all"}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${mono.variable}`}
      data-focus="all"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-fg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
