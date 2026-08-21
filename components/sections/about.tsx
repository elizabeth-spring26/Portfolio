"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { useReveal } from "@/hooks/use-reveal";
import { useCountUp } from "@/hooks/use-count-up";

const stats = [
  { numericValue: 5,    prefix: "",  suffix: "M+", label: "TikTok Views" },
  { numericValue: 100,  prefix: "$", suffix: "K",  label: "Solutions Built" },
  { numericValue: 3000, prefix: "",  suffix: "+",  label: "Students Reached" },
  { numericValue: 80,   prefix: "",  suffix: "+",  label: "Businesses Consulted" },
];

function formatStat(value: number, prefix: string, suffix: string) {
  const rounded = Math.round(value);
  const formatted = rounded >= 1000 ? rounded.toLocaleString() : String(rounded);
  return `${prefix}${formatted}${suffix}`;
}

const skills = [
  "Claude Code",
  "n8n",
  "AI Agents",
  "Python",
  "Prompt Engineering",
  "Microsoft 365 Copilot",
];

function Stat({
  numericValue,
  prefix,
  suffix,
  label,
  start,
  delay,
}: {
  numericValue: number;
  prefix: string;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const value = useCountUp(numericValue, start);

  return (
    <div
      className={`reveal ${start ? "reveal-in" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <p
        className="font-mono tnum text-foreground leading-none mb-2"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        {formatStat(value, prefix, suffix)}
      </p>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function AboutSection() {
  // One observer drives the whole row so the counters start together.
  const { ref: statsRef, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="01" label="About" title="Building the future, one agent at a time" />

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
            <Image
              src="/headshot.png"
              alt="Elizabeth Tran"
              width={700}
              height={755}
              className="w-full h-auto rounded-lg"
              priority
            />

            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed max-w-[62ch]">
                As a Technology Entrepreneurship student at Babson College, I don&apos;t just study
                how technology can improve businesses, I build and deploy solutions. From AI-powered
                sales agents that automatically follow up after discovery calls to financial
                dashboards that aggregate balances across multiple accounts and deliver daily
                cash-flow updates, I focus on turning ideas into systems people actually use.
              </p>

              <p className="text-muted-foreground leading-relaxed max-w-[62ch]">
                That work is now a business. I build custom AI workflows for two paying clients, with
                <span className="font-mono tnum text-foreground"> $3,000+ </span>
                in early revenue. Before that I ran operations end to end as COO of DrinkDock (Babson
                FME Venture), handling supply chain, international manufacturer negotiations, and
                inventory, and took it to breakeven.
              </p>

              <p className="text-muted-foreground leading-relaxed max-w-[62ch]">
                Beyond building products, I have spent the past three years helping grow AI startups
                across partnerships, marketing and product management. As External Partnerships Lead
                at The Generator, Babson&apos;s AI Lab, I secured sponsorships from Anthropic, OpenAI,
                Cursor, and other leading AI companies, helping bring industry leaders to campus
                through our flagship AI Buildathon. I also serve as a Student Lead for the G1000 AI
                Bootcamp, where I&apos;ve helped multiple small businesses adopt AI and automation in
                their operations.
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3">
                {skills.map((skill) => (
                  <span key={skill} className="font-mono text-[0.6875rem] text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8"
          style={{ marginTop: "var(--space-block)" }}
        >
          {stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} start={shown} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
