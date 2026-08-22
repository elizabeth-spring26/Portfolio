"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const skillCategories = [
  {
    id: "build",
    label: "Build",
    subtitle: "Primary expertise",
    skills: [
      "Claude Code",
      "Python",
      "n8n",
      "AI Agents",
      "Prompt Engineering",
      "API Integrations",
      "MCPs",
      "Agentic Workflows",
      "Hugging Face",
      "Microsoft 365 Copilot",
    ],
  },
  {
    id: "operate",
    label: "Operate",
    subtitle: "Babson-built",
    skills: [
      "Product Management",
      "B2B Sales",
      "Supply Chain",
      "Team Leadership",
      "Business Analytics",
      "Excel",
      "Minitab",
    ],
  },
  {
    id: "grow",
    label: "Grow",
    subtitle: "Reach and partnerships",
    skills: [
      "Social Media Marketing",
      "Influencer Outreach",
      "Content Strategy",
      "TikTok / Instagram / LinkedIn",
    ],
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
              className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_1fr] gap-x-10 gap-y-3 border-b border-border py-6"
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
