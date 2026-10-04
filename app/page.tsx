import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProofBar } from "@/components/sections/proof";
import { WorkSection } from "@/components/sections/work";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav intro />
      <main id="main">
        <Hero />
        <ProofBar />
        <WorkSection />
        {/* Proof of the work sits directly under it. */}
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
