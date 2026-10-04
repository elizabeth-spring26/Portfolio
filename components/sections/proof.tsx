"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  sources: { label: string; href: string }[];
};

/**
 * Real, sourced numbers only. Every stat renders at the same size and weight;
 * sources sit below the label as quiet metadata.
 */
const stats: Stat[] = [
  {
    value: 2,
    suffix: "M+",
    label: "TikTok views on content I made",
    sources: [{ label: "TikTok", href: "https://www.tiktok.com/@studywith.liz" }],
  },
  {
    value: 100,
    prefix: "$",
    suffix: "K",
    label: "Solutions supported at AI Technology Partners",
    sources: [{ label: "aitp.ai", href: "https://www.aitp.ai/" }],
  },
  {
    value: 3000,
    suffix: "+",
    label: "Students reached",
    sources: [
      { label: "ProDream", href: "https://www.prodream.cn/en" },
      { label: "TikTok", href: "https://www.tiktok.com/@prodream.ai" },
    ],
  },
  {
    value: 80,
    suffix: "+",
    label: "Small businesses consulted",
    sources: [
      {
        label: "The Generator",
        href: "https://www.babson.edu/thegenerator/community/ai-innovators-bootcamp/",
      },
    ],
  },
];

function format(n: number, prefix = "", suffix = "") {
  const r = Math.round(n);
  return `${prefix}${r >= 1000 ? r.toLocaleString("en-US") : r}${suffix}`;
}

function Count({ stat, start }: { stat: Stat; start: boolean }) {
  const reduce = useReducedMotion();
  // Server HTML carries the real number; the tween only runs client-side.
  const [n, setN] = useState(stat.value);
  const ran = useRef(false);

  // Zero it while still off screen, so the count-up never visibly resets.
  useEffect(() => {
    if (!start && !reduce) setN(0);
    // Mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!start || ran.current || reduce) return;
    ran.current = true;
    const controls = animate(0, stat.value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setN,
    });
    return () => controls.stop();
  }, [start, reduce, stat.value]);

  return <>{format(n, stat.prefix, stat.suffix)}</>;
}

export function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section aria-label="Proof" className="border-y border-stroke bg-ink py-10">
      <div ref={ref} className="shell grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="tnum font-display text-5xl italic leading-none md:text-6xl">
              <Count stat={s} start={inView} />
            </p>
            <p className="label mt-3 text-muted">{s.label}</p>
            <ul className="mt-2 flex flex-wrap gap-x-3">
              {s.sources.map((src) => (
                <li key={src.href}>
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-cream/40 transition-colors duration-300 hover:text-accent"
                  >
                    {src.label}
                    <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
