"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

const skillCategories = [
  {
    id: "ai-agents",
    label: "AI Agent Building",
    subtitle: "Primary expertise",
    glowColor: "rgba(139, 92, 246, 0.35)",
    accent: "text-violet-400",
    skills: [
      "AI Agents",
      "Prompt Engineering",
      "Hugging Face",
      "API Integrations",
      "MCPs",
      "Agentic Workflows",
    ],
    featured: true,
  },
  {
    id: "automation",
    label: "Automation & Dev Tools",
    subtitle: "Daily drivers",
    glowColor: "rgba(109, 40, 217, 0.3)",
    accent: "text-purple-400",
    skills: ["Claude Code", "n8n", "Microsoft 365 Copilot", "Python"],
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship & Leadership",
    subtitle: "Babson-built",
    glowColor: "rgba(124, 58, 237, 0.28)",
    accent: "text-violet-300",
    skills: ["Product Management", "B2B Sales", "Supply Chain", "Team Leadership"],
  },
  {
    id: "marketing",
    label: "Marketing & Growth",
    subtitle: "5M+ views",
    glowColor: "rgba(91, 33, 182, 0.28)",
    accent: "text-purple-300",
    skills: ["Social Media Marketing", "Influencer Outreach", "Content Strategy", "TikTok / Instagram / LinkedIn"],
  },
  {
    id: "analytics",
    label: "Analytics",
    subtitle: "Data-driven",
    glowColor: "rgba(139, 92, 246, 0.25)",
    accent: "text-violet-400",
    skills: ["Excel", "Minitab", "Business Analytics"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Skills
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
          Tools of the trade.
        </motion.h2>

        <div className="space-y-5">
          {/* Featured category — full width */}
          {skillCategories
            .filter((c) => c.featured)
            .map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard glowColor={cat.glowColor} className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-base font-display font-bold ${cat.accent}`}>
                      {cat.label}
                    </h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/25 font-medium">
                      Headline
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">{cat.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-2 text-sm font-medium rounded-md border border-violet-500/20 text-foreground/80 hover:border-violet-400/40 hover:text-foreground transition-colors duration-200 cursor-default"
                        style={{ background: "hsl(260 14% 10%)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}

          {/* 2-column grid for remaining */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories
              .filter((c) => !c.featured)
              .map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlowCard glowColor={cat.glowColor} className="p-6 h-full">
                    <h3 className={`text-sm font-display font-bold ${cat.accent} mb-1`}>
                      {cat.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-5">{cat.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-foreground/70 hover:text-foreground hover:border-violet-500/30 transition-colors duration-200 cursor-default"
                          style={{ background: "hsl(260 14% 10%)" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
