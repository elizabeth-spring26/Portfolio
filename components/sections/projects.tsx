"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Bot, Zap, Megaphone, GraduationCap, FlaskConical, Users } from "lucide-react";

const projects = [
  {
    title: "Buildathon Organizer",
    icon: Users,
    description:
      "Personally secured partnerships with Anthropic, OpenAI, Tripo AI, Orchestra, and Cursor to sponsor a buildathon hosted at Babson's AI Lab (The Generator). Brought together students, sponsors, and builders for a full-day AI hackathon.",
    tags: ["Anthropic", "OpenAI", "Community", "Event Organizing"],
    glowColor: "rgba(139, 92, 246, 0.35)",
    iconColor: "text-violet-400",
    status: "Completed",
    featured: true,
  },
  {
    title: "AI Sales Agents",
    icon: Bot,
    description:
      "Built AI agents that automate post-discovery-call follow-ups and stakeholder tracking for B2B sales pipelines. Agents qualify leads, draft personalized follow-up emails, and maintain context across client conversations.",
    tags: ["AI Agents", "n8n", "B2B", "Sales Automation"],
    glowColor: "rgba(109, 40, 217, 0.32)",
    iconColor: "text-purple-400",
    status: "Production",
    featured: true,
  },
  {
    title: "Newsletter AI Automation",
    icon: Zap,
    description:
      "Created AI agents automating newsletter content curation for C-suite executives. The system monitors relevant sources, extracts key insights, and drafts executive-ready summaries, saving hours of manual research weekly.",
    tags: ["AI Agents", "Claude Code", "Content Automation", "Productivity"],
    glowColor: "rgba(124, 58, 237, 0.28)",
    iconColor: "text-violet-300",
    status: "Production",
    featured: false,
  },
  {
    title: "ProDream AI Growth",
    icon: Megaphone,
    description:
      "Drove 5M+ TikTok views and engaged 3,000+ students from low-income schools for an AI-powered college counselor (Harvard Innovation Labs × Microsoft for Startups). Designed and executed influencer outreach strategy.",
    tags: ["TikTok", "Growth Marketing", "EdTech", "Influencer Strategy"],
    glowColor: "rgba(91, 33, 182, 0.28)",
    iconColor: "text-purple-300",
    status: "Completed",
    featured: false,
  },
  {
    title: "Small Business AI Consulting",
    icon: GraduationCap,
    description:
      "Consulting 80+ small businesses on integrating AI into daily operations through the G1000 AI Bootcamp. Demonstrated live AI applications using API keys and MCPs, from automating customer responses to building marketing workflows.",
    tags: ["AI Consulting", "API Keys", "MCPs", "Small Business"],
    glowColor: "rgba(139, 92, 246, 0.28)",
    iconColor: "text-violet-400",
    status: "Active",
    featured: false,
  },
  {
    title: "Toyota Research Collaboration",
    icon: FlaskConical,
    description:
      "Conducting ongoing academic research conversations with Toyota Research Institute. Drafting research proposals in collaboration with Babson College faculty to explore the intersection of AI and business operations.",
    tags: ["Research", "AI Policy", "Academic", "Industry Partnership"],
    glowColor: "rgba(109, 40, 217, 0.25)",
    iconColor: "text-purple-400",
    status: "In Progress",
    featured: false,
  },
];

const statusColors: Record<string, string> = {
  Production: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8",
  Active: "text-violet-300 border-violet-500/30 bg-violet-500/8",
  "In Progress": "text-amber-400 border-amber-500/30 bg-amber-500/8",
  Completed: "text-muted-foreground border-border bg-white/4",
};

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding relative">
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
            Projects
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <h2
            className="font-display font-bold text-foreground mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Things I&apos;ve built.
          </h2>
          <p className="text-muted-foreground mx-auto" style={{ maxWidth: "55ch" }}>
            From AI agents running in production to buildathons with the industry&apos;s biggest names. Here&apos;s where the work lives.
          </p>
        </motion.div>

        {/* Featured — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <GlowCard glowColor={project.glowColor} className="p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <Icon className={`w-6 h-6 ${project.iconColor}`} />
                    <span className={`px-2.5 py-1 text-xs rounded-full border font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/65 leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/4 border border-white/8 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Rest — 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <GlowCard glowColor={project.glowColor} className="p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-5 h-5 ${project.iconColor}`} />
                    <span className={`px-2 py-0.5 text-xs rounded-full border font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-display font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground/60 leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/4 border border-white/8 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
