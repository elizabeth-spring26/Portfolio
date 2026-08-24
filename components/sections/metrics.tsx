"use client";

import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useCountUp } from "@/hooks/use-count-up";

type StatLink = { label: string; href: string };

/**
 * Credibility strip, not a numbered section — no SectionHeader, no serif
 * heading. It sits directly under the hero because the numbers are a core part
 * of the pitch and should land before the prose.
 *
 * All four entries render through the same component with identical type,
 * colour, and stagger. Source links are quiet mono metadata *below* the label,
 * so they never change the weight of the number itself.
 */
const stats: {
  numericValue: number;
  prefix: string;
  suffix: string;
  label: string;
  links?: StatLink[];
}[] = [
  {
    numericValue: 2,
    prefix: "",
    suffix: "M+",
    label: "TikTok Views",
    links: [{ label: "TikTok", href: "https://www.tiktok.com/@studywith.liz" }],
  },
  {
    numericValue: 100,
    prefix: "$",
    suffix: "K",
    label: "Solutions Supported",
    links: [{ label: "AI Technology Partners", href: "https://www.aitp.ai/" }],
  },
  {
    numericValue: 3000,
    prefix: "",
    suffix: "+",
    label: "Students Reached",
    links: [
      { label: "ProDream", href: "https://www.prodream.cn/en" },
      { label: "TikTok", href: "https://www.tiktok.com/@prodream.ai" },
    ],
  },
  {
    numericValue: 80,
    prefix: "",
    suffix: "+",
    label: "Businesses Consulted",
    links: [
      {
        label: "The Generator",
        href: "https://www.babson.edu/thegenerator/community/ai-innovators-bootcamp/",
      },
    ],
  },
];

function formatStat(value: number, prefix: string, suffix: string) {
  const rounded = Math.round(value);
  const formatted = rounded >= 1000 ? rounded.toLocaleString() : String(rounded);
  return `${prefix}${formatted}${suffix}`;
}

function Stat({
  numericValue,
  prefix,
  suffix,
  label,
  links,
  start,
  delay,
}: {
  numericValue: number;
  prefix: string;
  suffix: string;
  label: string;
  links?: StatLink[];
  start: boolean;
  delay: number;
}) {
  const value = useCountUp(numericValue, start);

  return (
    <div
      className={`reveal ${start ? "reveal-in" : ""} sm:px-6 sm:first:pl-0 sm:last:pr-0`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <p
        className="font-mono tnum text-heading leading-none mb-2"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        {formatStat(value, prefix, suffix)}
      </p>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      {links && (
        <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {links.map(({ label: linkLabel, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[0.625rem] text-muted-foreground/70 rounded-sm transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {linkLabel}
                <ArrowUpRight className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MetricsSection() {
  // One observer drives the whole row so the counters start together.
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="impact" className="px-6 sm:px-8 lg:px-12">
      <div className="max-w-content mx-auto border-y border-border py-8 md:py-10">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-border"
        >
          {stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} start={shown} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
