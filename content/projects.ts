/**
 * Selected work. Verified facts only: every line here is already true on the
 * live site or was written by Elizabeth. Optional fields stay empty rather than
 * guessed. Case study pages render only the sections that have content, so
 * filling a field here is all it takes to add it.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** object-position for the 4:3 crop. */
  position?: string;
};

export type ProjectLine = { label: string; text: string };

export type Project = {
  slug: string;
  title: string;
  /** The one word in the title set in display italic. Must appear in `title`. */
  italic: string;
  tags: string[];
  status: "Shipped" | "In progress" | "Ongoing";
  /** Mono eyebrow on the case study page: role / timeline / team, where known. */
  meta: string;
  /** One-line TL;DR on the case study page. */
  tldr: string;
  /** The labelled lines shown in the Work list (Problem first, Result last). */
  lines: ProjectLine[];
  image?: ProjectImage;
  /** Case study sections beyond the lines above. Leave empty until written. */
  caseStudy?: Partial<
    Record<
      "Context" | "Research" | "Options I considered" | "What I'd do next",
      string
    >
  >;
};

export const projects: Project[] = [
  {
    slug: "daily-cash-agent",
    title: "Daily Cash Agent",
    italic: "Cash",
    tags: ["AI Agent", "Plaid", "Fintech"],
    status: "Shipped",
    meta: "2026 · Client project",
    tldr: "One morning message replaces checking 6 different bank accounts by hand.",
    lines: [
      {
        label: "Problem",
        text: "A founder checked 6 different bank accounts by hand every morning to get one number.",
      },
      {
        label: "What I learned",
        text: "He didn't want a dashboard. He wanted the answer pushed to him.",
      },
      {
        label: "What I decided",
        text: "One Telegram message (balance, pending charges, net cash) instead of an app.",
      },
      {
        label: "Result",
        text: "Runs unattended every morning. The client still uses it and recommends it.",
      },
    ],
    image: {
      src: "/testimonials/daily-cash-agent.jpeg",
      alt: "Telegram bot delivering a daily cash position report with current balance, pending charges, and net cash",
      width: 739,
      height: 1600,
      position: "50% 8%",
    },
  },
  {
    slug: "babson-ai-hackathon",
    title: "Babson's Largest AI Hackathon",
    italic: "Hackathon",
    tags: ["Partnerships", "Community"],
    status: "Shipped",
    meta: "2025 · The Generator, Babson's AI Lab",
    tldr: "Secured Anthropic, GitHub, and Cursor as sponsors for The Generator's flagship build event.",
    lines: [
      {
        label: "Problem",
        text: "The Generator needed industry weight behind its flagship build event.",
      },
      {
        label: "Result",
        text: "3 sponsors secured (Anthropic, GitHub, and Cursor) for a full-day AI hackathon at The Generator.",
      },
    ],
    image: {
      src: "/projects/buildathon.png",
      alt: "Hackathon participants with The Generator banner outside Richard Knight Auditorium, Babson College",
      width: 1109,
      height: 721,
      position: "50% 60%",
    },
  },
  {
    slug: "ai-sales-agents",
    title: "AI Sales Agents",
    italic: "Sales",
    tags: ["AI Agents", "n8n", "B2B"],
    status: "Shipped",
    meta: "B2B · Automation",
    tldr: "Agents that keep a deal moving after the discovery call.",
    lines: [
      {
        label: "Problem",
        text: "B2B pipelines lose deals in the gap after a discovery call.",
      },
      {
        label: "What I built",
        text: "Agents that qualify leads, draft personalized follow-ups, and hold context across client conversations.",
      },
      {
        label: "Result",
        text: "Post-call follow-up and stakeholder tracking run without a human in the loop.",
      },
    ],
  },
  {
    slug: "newsletter-ai-automation",
    title: "Newsletter AI Automation",
    italic: "Newsletter",
    tags: ["AI Agents", "Claude Code", "Content"],
    status: "Shipped",
    meta: "AI Agent · Content",
    tldr: "An executive briefing that researches and drafts itself.",
    lines: [
      {
        label: "Problem",
        text: "C-suite readers needed a briefing nobody had hours to research.",
      },
      {
        label: "What I built",
        text: "Agents that monitor sources, extract key insights, and draft executive-ready summaries.",
      },
      {
        label: "Result",
        text: "Hours of manual research a week, removed.",
      },
    ],
  },
  {
    slug: "small-business-ai-bootcamp",
    title: "Small Business AI Bootcamp (G1000 Program)",
    italic: "Bootcamp",
    tags: ["AI Consulting", "API Keys", "MCPs"],
    status: "Ongoing",
    meta: "Student Lead · AI & Small Business Bootcamp (G1000 Program)",
    tldr: "Putting AI into the daily operations of 80+ small businesses.",
    lines: [
      {
        label: "Problem",
        text: "Owners with real operational problems and no way into AI tooling.",
      },
      {
        label: "What I did",
        text: "Live demos, API key setup, and MCP integrations, from automating customer responses to marketing workflows.",
      },
      {
        label: "Result",
        text: "80+ small business owners advised on putting AI into daily operations.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
