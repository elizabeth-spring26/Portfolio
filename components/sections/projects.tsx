"use client";

import { Landmark } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  /** Mono kicker: era or domain, then category. */
  meta: string;
  /** What needed solving. */
  problem: string;
  /** What was actually made. */
  build: string;
  /** What changed as a result. */
  impact: string;
  tags: string[];
  status: "production" | "active" | "completed";
  /** Tailwind col-span at lg. The uneven spans are what break the grid up. */
  span: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Daily Cash Bot",
    meta: "2026 / AI Agent",
    problem:
      "Six bank accounts, checked by hand every morning to find a single number.",
    build:
      "A Plaid-backed agent that aggregates all six into one message: current balance, pending charges hitting the next day, and net cash after they clear.",
    impact: "Six accounts, one number, delivered unattended every morning.",
    tags: ["AI Agents", "Plaid", "Fintech", "Automation"],
    status: "production",
    span: "lg:col-span-7",
    featured: true,
  },
  {
    title: "AI Sales Agents",
    meta: "B2B / Automation",
    problem: "B2B pipelines lose deals in the gap after a discovery call.",
    build:
      "Agents that qualify leads, draft personalized follow-up emails, and hold context across client conversations.",
    impact: "Post-call follow-up and stakeholder tracking run without a human in the loop.",
    tags: ["AI Agents", "n8n", "B2B", "Sales Automation"],
    status: "production",
    span: "lg:col-span-5",
  },
  {
    title: "Buildathon Organizer",
    meta: "2025 / Partnerships",
    problem: "Babson's AI Lab needed industry weight behind its flagship build event.",
    build:
      "Personally secured sponsorships from Anthropic, GitHub, and Cursor.",
    impact:
      "A full-day AI hackathon at The Generator with students, sponsors, and builders in one room.",
    tags: ["Anthropic", "GitHub", "Cursor", "Event Organizing"],
    status: "completed",
    span: "lg:col-span-5",
  },
  {
    title: "Newsletter AI Automation",
    meta: "AI Agent / Content",
    problem: "C-suite readers needed a briefing nobody had hours to research.",
    build:
      "Agents that monitor relevant sources, extract key insights, and draft executive-ready summaries.",
    impact: "Hours of manual research a week, removed.",
    tags: ["AI Agents", "Claude Code", "Content Automation"],
    status: "production",
    span: "lg:col-span-7",
  },
  {
    title: "Small Business AI Consulting",
    meta: "G1000 / Consulting",
    problem: "Owners with real operational problems and no way into AI tooling.",
    build:
      "Live demos, API key setup, and MCP integrations through the AI & Small Business Bootcamp (G1000 Program), from automating customer responses to building marketing workflows.",
    impact: "80+ small businesses advised on putting AI into daily operations.",
    tags: ["AI Consulting", "API Keys", "MCPs"],
    status: "active",
    span: "lg:col-span-12",
  },
];

/** Status reads as plain mono metadata — a dot plus a lowercase label, no pill. */
function Status({ status }: { status: Project["status"] }) {
  const live = status === "production" || status === "active";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-muted-foreground shrink-0">
      <span
        className={cn("w-1 h-1 rounded-full", live ? "bg-primary" : "bg-muted-foreground/45")}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, meta, problem, build, impact, tags, status, featured } = project;

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
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground/70 min-w-0 truncate">
          {meta}
        </p>
        <Status status={status} />
      </div>

      <div className="flex items-center gap-3 mb-3">
        {featured && <Landmark className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />}
        <h3
          className={cn(
            "font-display text-foreground leading-tight",
            featured ? "text-[1.625rem]" : "text-xl"
          )}
        >
          {title}
        </h3>
      </div>

      <div className={cn("space-y-2 flex-1 max-w-[62ch]", featured ? "text-[0.9375rem]" : "text-sm")}>
        <p className="text-muted-foreground leading-relaxed">{problem}</p>
        <p className="text-foreground/85 leading-relaxed">{build}</p>
      </div>

      <p className="mt-4 text-sm leading-relaxed">
        <span
          className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] mr-2"
          style={{ color: "hsl(var(--accent-cool))" }}
        >
          Impact →
        </span>
        <span className="text-foreground/85">{impact}</span>
      </p>

      <p className="font-mono text-[0.6875rem] text-muted-foreground/70 mt-4 pt-4 border-t border-border">
        {tags.join("  ·  ")}
      </p>

      {/* Hands the reader straight to the client's own words. */}
      {featured && (
        <a
          href="#testimonials"
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          style={{ color: "hsl(var(--accent-cool))", transitionDuration: "var(--dur-fast)" }}
        >
          Client feedback
          <span aria-hidden="true">↓</span>
        </a>
      )}
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
