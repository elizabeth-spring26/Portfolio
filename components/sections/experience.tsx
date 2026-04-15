"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "External Partnerships Lead",
    company: "The Generator, Babson College AI Lab",
    dates: "Jan 2025 – Present",
    location: "Wellesley, MA",
    glowColor: "rgba(139, 92, 246, 0.35)",
    accent: "text-violet-400",
    badge: "Current",
    bullets: [
      "Secured sponsorships and partnerships with Anthropic, OpenAI, Tripo AI, Orchestra, Cursor, Loveable, and Harvard for AI events.",
      "Co-organized and hosted a Buildathon in collaboration with multiple student teams, bringing the AI ecosystem to campus.",
      "Conducting academic research conversations with Toyota Research Institute and drafting research proposals with Babson College.",
      "Creating opportunities for students to learn AI for business, automation, website building, and rapid prototyping.",
    ],
    tags: ["Partnerships", "AI Events", "Research", "Community Building"],
  },
  {
    role: "Student Lead, AI Innovators & Small Business Bootcamp",
    company: "G1000 Program",
    dates: "Apr 2025 – Present",
    location: "Babson College",
    glowColor: "rgba(167, 139, 250, 0.3)",
    accent: "text-violet-300",
    badge: "Current",
    bullets: [
      "Consulting 60+ small businesses on leveraging AI in daily operations, marketing, and technical applications.",
      "Demonstrated hands-on AI applications using API keys and MCPs for real business use cases.",
      "Bridging the gap between cutting-edge AI tools and small business owners who need practical solutions.",
    ],
    tags: ["AI Consulting", "API Integrations", "MCPs", "Small Business"],
  },
  {
    role: "Product Management Intern",
    company: "AI Technology Partners",
    dates: "May 2024 – Jun 2025",
    location: "Remote",
    glowColor: "rgba(109, 40, 217, 0.3)",
    accent: "text-purple-400",
    badge: null,
    bullets: [
      "Built AI agents automating newsletter content curation for C-suite executives and qualifying sales leads outreach.",
      "Built and marketed technical AI solutions worth $100,000 in a B2B environment.",
      "Developed training materials helping clients adopt generative AI across verticals.",
      "Certified in AI automation, Microsoft 365 Copilot, prompt engineering, and custom Copilot solutions.",
    ],
    tags: ["AI Agents", "B2B Sales", "Prompt Engineering", "Microsoft Copilot"],
  },
  {
    role: "Marketing Manager",
    company: "ProDream AI",
    dates: "Dec 2023 – Jan 2025",
    location: "Remote",
    glowColor: "rgba(124, 58, 237, 0.25)",
    accent: "text-violet-400",
    badge: null,
    bullets: [
      "Engaged 3,000+ students from low-income schools with an AI-powered college counselor (Harvard Innovation Labs × Microsoft for Startups).",
      "Produced TikTok content generating 5M+ views; led Instagram and LinkedIn marketing strategy.",
      "Executed influencer outreach strategy evaluating audience alignment with ProDream's mission and brand.",
    ],
    tags: ["Content Strategy", "TikTok", "Growth Marketing", "EdTech AI"],
  },
  {
    role: "COO",
    company: "DrinkDock (Babson FME Venture)",
    dates: "Nov 2024 – Jun 2025",
    location: "Babson College",
    glowColor: "rgba(91, 33, 182, 0.3)",
    accent: "text-purple-300",
    badge: null,
    bullets: [
      "Launched and operated a real startup through Babson's Foundations of Management and Entrepreneurship program.",
      "Optimized supply chain operations and negotiated with international manufacturers.",
      "Managed inventory and aligned product with customer expectations to achieve breakeven.",
    ],
    tags: ["Entrepreneurship", "Operations", "Supply Chain", "Startup"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative">
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
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
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:text-right shrink-0">
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <Calendar className="w-3 h-3 opacity-60" />
                      {exp.dates}
                    </span>
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <MapPin className="w-3 h-3 opacity-60" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-5">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-violet-500/50 shrink-0 flex-none" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-white/4 border border-white/8 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
