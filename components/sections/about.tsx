"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

/**
 * About answers what connects the work — it does not re-list accomplishments.
 * The portrait now lives in the hero, the four metrics in the strip below, and
 * the tool list in Skills, so none of them appear here.
 */
export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="01" label="About" title="Building the future, one agent at a time" />

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-14 items-start">
            <p className="text-muted-foreground leading-relaxed">
              As a Technology Entrepreneurship student at Babson College, I don&apos;t just study
              how technology can improve businesses, I build and deploy solutions. That work is now
              a business: custom AI workflows for two paying clients, with $3,000+ in early revenue.
              Before that I ran operations end to end as COO of DrinkDock (Babson FME Venture),
              handling supply chain, international manufacturer negotiations, and inventory, and
              took it to breakeven.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I have spent the past three years helping grow AI startups across partnerships,
              marketing, and product management. As External Partnerships Lead at The Generator,
              Babson&apos;s AI Lab, I bring industry leaders to campus. As a Student Lead for the AI
              &amp; Small Business Bootcamp (G1000 Program), I put AI in the hands of owners who
              just need things to work. And at ProDream AI, an AI college counselor backed by
              Harvard Innovation Labs and Microsoft for Startups, I reached students who had never
              had access to one. The through-line is the same: turning ideas into systems people
              actually use.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
