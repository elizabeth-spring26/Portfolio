"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

const experiences = [
  {
    role: "Co-founder & CEO",
    company: "STEALTH",
    dates: "Jan 2026 – Present · Part-time",
    glowColor: "rgba(139, 92, 246, 0.3)",
    accent: "text-violet-400",
    badge: "Current",
    bullets: [
      "Building AI-powered email automations on n8n and Claude Code for a coaching business — post-discovery call follow-ups and client outreach, fully hands-off.",
      "Built a financial dashboard that aggregates 6+ bank accounts via Plaid, auto-calculates cash on hand, and pushes a daily Slack report.",
      "Delivering custom AI workflow solutions for 2 paying clients, $2,000+ in early revenue.",
    ],
  },
  {
    role: "External Partnerships Lead",
    company: "The Generator, Babson College AI Lab",
    dates: "Jan 2025 – Present",
    glowColor: "rgba(139, 92, 246, 0.35)",
    accent: "text-violet-400",
    badge: "Current",
    bullets: [
      "Secured sponsorships and partnerships with Anthropic, OpenAI, Cursor, Loveable, Tripo AI, Orchestra, and Harvard.",
      "Co-organized the AI Buildathon — bringing the broader AI ecosystem onto campus.",
    ],
  },
  {
    role: "Student Lead, AI & Small Business Bootcamp",
    company: "G1000 Program",
    dates: "Apr 2025 – Present",
    glowColor: "rgba(167, 139, 250, 0.3)",
    accent: "text-violet-300",
    badge: "Current",
    bullets: [
      "Consulting 80+ small businesses on using AI in daily operations — demos, API integrations, and hands-on tool adoption.",
      "Bridging the gap between state-of-the-art AI tools and owners who just need things to work.",
    ],
  },
  {
    role: "Product Management Intern",
    company: "AI Technology Partners",
    dates: "May 2024 – Jun 2025",
    glowColor: "rgba(109, 40, 217, 0.3)",
    accent: "text-purple-400",
    badge: null,
    bullets: [
      "Built AI agents that automated newsletter curation for C-suite executives and qualified inbound sales leads.",
      "Helped bring $100,000 in technical AI solutions to market in a B2B environment.",
    ],
  },
  {
    role: "Marketing Manager",
    company: "ProDream AI",
    dates: "Dec 2023 – Jan 2025",
    glowColor: "rgba(124, 58, 237, 0.25)",
    accent: "text-violet-400",
    badge: null,
    bullets: [
      "Produced TikTok content that hit 5M+ views and ran Instagram and LinkedIn strategy for an AI-powered college counselor backed by Harvard Innovation Labs and Microsoft for Startups.",
      "Reached 3,000+ students from under-resourced schools.",
    ],
  },
  {
    role: "COO",
    company: "DrinkDock (Babson FME Venture)",
    dates: "Nov 2024 – Jun 2025",
    glowColor: "rgba(91, 33, 182, 0.3)",
    accent: "text-purple-300",
    badge: null,
    bullets: [
      "Ran operations end-to-end for a real student startup — supply chain, international manufacturer negotiations, inventory, and breakeven.",
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

        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowCard glowColor={exp.glowColor} className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                      <h3 className="text-base sm:text-lg font-display font-bold text-foreground">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-violet-500/12 text-violet-300 border border-violet-500/25 font-medium">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-semibold ${exp.accent}`}>{exp.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 sm:text-right pt-0.5">
                    {exp.dates}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-foreground/65 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-violet-500/50 shrink-0 flex-none" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
