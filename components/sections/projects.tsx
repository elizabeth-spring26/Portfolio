"use client";

import Image from "next/image";
import { Landmark } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  /** Mono kicker: era or domain, then category. */
  meta: string;
  /** One short line: what it is. */
  summary: string;
  /** What changed as a result. */
  impact: string;
  tags: string[];
  status: "production" | "active" | "completed";
  /** Tailwind col-span at lg. The uneven spans are what break the grid up. */
  span: string;
  featured?: boolean;
  /** Real photo of the work, shown as a band at the top of the card. */
  image?: { src: string; alt: string; position?: string };
};

const projects: Project[] = [
  {
    title: "Daily Cash Bot",
    meta: "2026 / AI Agent",
    summary: "A Plaid agent that sends one morning message: balance, pending charges, net cash.",
    impact: "6 different bank accounts, one number, every morning.",
    tags: ["AI Agents", "Plaid", "Fintech", "Automation"],
    status: "production",
    span: "lg:col-span-7",
    featured: true,
  },
  {
    title: "AI Sales Agents",
    meta: "B2B / Automation",
    summary: "Agents that qualify leads and draft follow-ups after discovery calls.",
    impact: "Post-call follow-up runs with no human in the loop.",
    tags: ["AI Agents", "n8n", "B2B", "Sales Automation"],
    status: "production",
    span: "lg:col-span-5",
  },
  {
    title: "Buildathon Organizer",
    meta: "2025 / Partnerships",
    summary: "Secured Anthropic, GitHub, and Cursor as sponsors for Babson's AI Lab.",
    impact: "A full-day AI hackathon at The Generator.",
    tags: ["Anthropic", "GitHub", "Cursor", "Event Organizing"],
    status: "completed",
    span: "lg:col-span-7",
    image: {
      src: "/projects/buildathon.png",
      alt: "Hackathon participants with The Generator banner outside Richard Knight Auditorium, Babson College",
      position: "50% 60%",
    },
  },
  {
    title: "Newsletter AI Automation",
    meta: "AI Agent / Content",
    summary: "Agents that scan sources and draft executive briefings.",
    impact: "Hours of manual research cut each week.",
    tags: ["AI Agents", "Claude Code", "Content Automation"],
    status: "production",
    span: "lg:col-span-5",
  },
  {
    title: "Small Business AI Consulting",
    meta: "G1000 / Consulting",
    summary:
      "Live demos, API keys, and MCP setup through the AI & Small Business Bootcamp (G1000 Program).",
    impact: "80+ small businesses advised on AI.",
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
  const { title, meta, summary, impact, tags, status, featured, image } = project;

  return (
    <article
      tabIndex={0}
      className={cn(
        "group h-full flex flex-col rounded-lg border border-border bg-card p-6 sm:p-7",
        image && "sm:flex-row sm:gap-6",
        "transition-colors hover:border-primary",
        "focus-visible:outline-none focus-visible:border-primary",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background"
      )}
      style={{ transitionDuration: "var(--dur-base)" }}
    >
      {image && (
        // Beside the text from sm up, so the photo sets no extra row height.
        <div className="relative aspect-[2/1] mb-5 overflow-hidden rounded border border-border sm:aspect-auto sm:mb-0 sm:w-[44%] sm:min-h-[200px] shrink-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 44vw, 100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
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
              "font-display text-heading leading-tight",
              featured ? "text-[1.625rem]" : "text-xl"
            )}
          >
            {title}
          </h3>
        </div>

        <p
          className={cn(
            "flex-1 max-w-[62ch] text-foreground/85 leading-relaxed",
            featured ? "text-[0.9375rem]" : "text-sm"
          )}
        >
          {summary}
        </p>

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
      </div>
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
          description="AI agents in production, and the partnerships behind them."
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
