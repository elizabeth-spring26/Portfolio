import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { AboutSection } from "@/components/sections/about";
import { MetricsSection } from "@/components/sections/metrics";
import { ProjectsSection } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { SkillsSection } from "@/components/sections/skills";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <BackgroundPaths title="Elizabeth Tran" />
        {/* The numbers are core to the pitch, so they land before the prose. */}
        <MetricsSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
