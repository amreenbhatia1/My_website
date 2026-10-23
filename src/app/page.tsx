import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/Projects";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import { education, profile, projects } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";
import { getWriteups } from "@/lib/writeups";

function personJsonLd() {
  const sameAs = [profile.links.linkedin, profile.links.github, profile.links.website].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    url: absoluteUrl("/"),
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Newark", addressRegion: "NJ", addressCountry: "US" },
    alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    sameAs,
  };
}

export default async function HomePage() {
  const hasWriteups = (await getWriteups()).length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Header onHome hasWriteups={hasWriteups} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Section id="projects" title="Projects">
          <ProjectGrid projects={projects} />
        </Section>
        <Skills />
        <Credentials />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
