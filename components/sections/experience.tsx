"use client";

import { motion } from "framer-motion";

type Experience = {
  role: string;
  company: string;
  dates: string;
  current: boolean;
  summary: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    role: "Co-founder & CEO",
    company: "STEALTH",
    dates: "2026 → Present",
    current: true,
    summary: "AI automation studio building agents for coaching and finance workflows.",
    bullets: [
      "Six bank accounts, one number: a Plaid-backed agent aggregates balances nightly and posts a cash position to Slack each morning.",
      "Follow-up email for a coaching client runs unattended on n8n and Claude Code. Two paying clients, $2,000 in early revenue.",
    ],
  },
  {
    role: "External Partnerships Lead",
    company: "The Generator, Babson College AI Lab",
    dates: "2025 → Present",
    current: true,
    summary: "Babson's AI lab. Industry partnerships and campus programming.",
    bullets: [
      "Sponsorships and partnerships with Anthropic, OpenAI, Cursor, Lovable, Tripo AI, Orchestra, and Harvard.",
      "Co-organized the AI Buildathon, which brought that ecosystem onto campus for a full day of building.",
    ],
  },
  {
    role: "Student Lead, AI & Small Business Bootcamp",
    company: "G1000 Program",
    dates: "2025 → Present",
    current: true,
    summary: "Hands-on AI adoption for owners who just need things to work.",
    bullets: [
      "80+ small businesses advised on putting AI into daily operations: live demos, API setup, tool adoption.",
      "Most of the job is translation. State-of-the-art tooling on one side, an owner with a scheduling problem on the other.",
    ],
  },
  {
    role: "Product Management Intern",
    company: "AI Technology Partners",
    dates: "2024 – 2025",
    current: false,
    summary: "B2B AI solutions for enterprise teams.",
    bullets: [
      "Agents that curated newsletters for C-suite readers and qualified inbound sales leads.",
      "$100,000 in technical AI solutions brought to market.",
    ],
  },
  {
    role: "Marketing Manager",
    company: "ProDream AI",
    dates: "2023 – 2025",
    current: false,
    summary: "AI college counselor, backed by Harvard Innovation Labs and Microsoft for Startups.",
    bullets: [
      "TikTok content crossed 5M views, with Instagram and LinkedIn strategy running alongside it.",
      "3,000+ students from under-resourced schools found the product through that work.",
    ],
  },
  {
    role: "COO",
    company: "DrinkDock (Babson FME Venture)",
    dates: "2024 – 2025",
    current: false,
    summary: "Student-founded beverage venture out of Babson FME.",
    bullets: [
      "Operations end to end: supply chain, international manufacturer negotiations, inventory. Reached breakeven.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Experience
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-foreground mb-14 text-center"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          Where I&apos;ve shipped.
        </motion.h2>

        <div className="border-b border-border">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-8 gap-y-2 border-t border-border py-8"
            >
              <div className="flex items-center gap-2 sm:pt-1">
                {exp.current && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {exp.dates}
                </span>
              </div>

              <div>
                <h3 className="font-display font-semibold text-foreground text-lg leading-snug">
                  {exp.role}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{exp.company}</p>
                <p className="text-[0.9375rem] text-foreground/75 mt-3 leading-relaxed max-w-[65ch]">
                  {exp.summary}
                </p>

                <ul className="mt-3 space-y-1.5 max-w-[65ch]">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span
                        className="mt-[0.5em] w-1 h-px bg-muted-foreground/50 shrink-0 flex-none"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
