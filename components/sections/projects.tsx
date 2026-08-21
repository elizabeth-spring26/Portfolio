"use client";

import { Landmark } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  tags: string[];
  status: "Production" | "Active" | "In Progress" | "Completed";
  /** Tailwind col-span at lg. The uneven spans are what break the grid up. */
  span: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Daily Cash Bot",
    description:
      "Aggregates six separate bank accounts through Plaid into one daily message: current balance, pending charges hitting the next day, and net cash after they clear. Runs unattended and delivers the cash position every morning. Built for a Boston fuels company that was previously checking six accounts by hand.",
    tags: ["AI Agents", "Plaid", "Fintech", "Automation"],
    status: "Production",
    span: "lg:col-span-7",
    featured: true,
  },
  {
    title: "AI Sales Agents",
    description:
      "Built AI agents that automate post-discovery-call follow-ups and stakeholder tracking for B2B sales pipelines. Agents qualify leads, draft personalized follow-up emails, and maintain context across client conversations.",
    tags: ["AI Agents", "n8n", "B2B", "Sales Automation"],
    status: "Production",
    span: "lg:col-span-5",
  },
  {
    title: "Buildathon Organizer",
    description:
      "Personally secured partnerships with Anthropic, OpenAI, Tripo AI, Orchestra, and Cursor to sponsor a buildathon hosted at Babson's AI Lab (The Generator). Brought together students, sponsors, and builders for a full-day AI hackathon.",
    tags: ["Anthropic", "OpenAI", "Community", "Event Organizing"],
    status: "Completed",
    span: "lg:col-span-5",
  },
  {
    title: "Newsletter AI Automation",
    description:
      "Created AI agents automating newsletter content curation for C-suite executives. The system monitors relevant sources, extracts key insights, and drafts executive-ready summaries, saving hours of manual research weekly.",
    tags: ["AI Agents", "Claude Code", "Content Automation"],
    status: "Production",
    span: "lg:col-span-7",
  },
  {
    title: "Small Business AI Consulting",
    description:
      "Consulting 80+ small businesses on integrating AI into daily operations through the G1000 AI Bootcamp. Demonstrated live AI applications using API keys and MCPs, from automating customer responses to building marketing workflows.",
    tags: ["AI Consulting", "API Keys", "MCPs"],
    status: "Active",
    span: "lg:col-span-4",
  },
  {
    title: "ProDream AI Growth",
    description:
      "Drove 5M+ TikTok views and engaged 3,000+ students from low-income schools for an AI-powered college counselor (Harvard Innovation Labs × Microsoft for Startups). Designed and executed influencer outreach strategy.",
    tags: ["TikTok", "Growth Marketing", "EdTech"],
    status: "Completed",
    span: "lg:col-span-4",
  },
  {
    title: "Toyota Research Collaboration",
    description:
      "Conducting ongoing academic research conversations with Toyota Research Institute. Drafting research proposals in collaboration with Babson College faculty to explore the intersection of AI and business operations.",
    tags: ["Research", "AI Policy", "Academic"],
    status: "In Progress",
    span: "lg:col-span-4",
  },
];

/** Status reads as plain mono metadata — a dot plus a lowercase label, no pill. */
function Status({ status }: { status: Project["status"] }) {
  const live = status === "Production" || status === "Active";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] lowercase tracking-wide text-muted-foreground shrink-0">
      <span
        className={cn(
          "w-1 h-1 rounded-full",
          live ? "bg-primary" : "bg-muted-foreground/45"
        )}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, description, tags, status, featured } = project;
  return (
    <article
      tabIndex={0}
      className={cn(
        "group h-full flex flex-col rounded-lg border border-border bg-card p-6 sm:p-7",
        "transition-colors hover:border-primary",
        "focus-visible:outline-none focus-visible:border-primary",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background"
      )}
      style={{ transitionDuration: "var(--dur-base)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          {featured && (
            <Landmark className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
          )}
          <h3
            className={cn(
              "font-display text-foreground leading-tight truncate",
              featured ? "text-[1.5rem]" : "text-xl"
            )}
          >
            {title}
          </h3>
        </div>
        <Status status={status} />
      </div>

      <p
        className={cn(
          "text-muted-foreground leading-relaxed flex-1 max-w-[62ch]",
          featured ? "text-[0.9375rem]" : "text-sm"
        )}
      >
        {description}
      </p>

      {/* Signature interaction: metadata surfaces on hover at desktop widths. */}
      <p
        className={cn(
          "font-mono text-[0.6875rem] text-muted-foreground/80 mt-5 pt-4 border-t border-border",
          "md:opacity-0 md:transition-opacity",
          "md:group-hover:opacity-100 md:group-focus-visible:opacity-100",
          "md:group-focus-within:opacity-100"
        )}
        style={{ transitionDuration: "var(--dur-base)" }}
      >
        {tags.join("  ·  ")}
      </p>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader
          index="02"
          label="Projects"
          title="Things I've built"
          description="AI agents running in production, and the partnerships that put them in front of people."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 60} className={project.span}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
