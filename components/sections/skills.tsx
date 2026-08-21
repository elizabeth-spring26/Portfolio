"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const skillCategories = [
  {
    id: "ai-agents",
    label: "AI Agent Building",
    subtitle: "Primary expertise",
    skills: [
      "AI Agents",
      "Prompt Engineering",
      "Hugging Face",
      "API Integrations",
      "MCPs",
      "Agentic Workflows",
    ],
  },
  {
    id: "automation",
    label: "Automation & Dev Tools",
    subtitle: "Daily drivers",
    skills: ["Claude Code", "n8n", "Microsoft 365 Copilot", "Python"],
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship & Leadership",
    subtitle: "Babson-built",
    skills: ["Product Management", "B2B Sales", "Supply Chain", "Team Leadership"],
  },
  {
    id: "marketing",
    label: "Marketing & Growth",
    subtitle: "5M+ views",
    skills: [
      "Social Media Marketing",
      "Influencer Outreach",
      "Content Strategy",
      "TikTok / Instagram / LinkedIn",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    subtitle: "Data-driven",
    skills: ["Excel", "Minitab", "Business Analytics"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="04" label="Skills" title="Tools of the trade" />

        {/* Hairline rows rather than cards — the list is reference material, not a showcase. */}
        <Reveal>
        <div className="border-t border-border">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_1fr] gap-x-10 gap-y-3 border-b border-border py-7"
            >
              <div>
                <h3 className="font-display text-lg text-foreground leading-snug">{cat.label}</h3>
                <p className="font-mono text-[0.6875rem] text-muted-foreground mt-1">
                  {cat.subtitle}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:pt-1">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm text-foreground/75">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
