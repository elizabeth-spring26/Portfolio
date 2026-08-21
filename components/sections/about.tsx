"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

function AnimatedStatValue({
  numericValue,
  prefix,
  suffix,
}: {
  numericValue: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [animating, setAnimating] = useState(false);
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => formatStat(v, prefix, suffix));

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    setAnimating(true);
    const controls = animate(motionVal, numericValue, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => setAnimating(false),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, motionVal, numericValue]);

  // The final value is what renders on the server and before the tween starts,
  // so the markup never ships a zero if JS is slow, blocked, or reduced-motion.
  if (!animating) {
    return <span ref={ref}>{formatStat(numericValue, prefix, suffix)}</span>;
  }

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="01" label="About" title="Building the future, one agent at a time" />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
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
              {["Claude Code", "n8n", "AI Agents", "Python", "Prompt Engineering", "Microsoft 365 Copilot"].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          {stats.map(({ numericValue, prefix, suffix, label }) => (
            <div key={label}>
              <p
                className="font-mono tnum text-foreground leading-none mb-2"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                <AnimatedStatValue numericValue={numericValue} prefix={prefix} suffix={suffix} />
              </p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
