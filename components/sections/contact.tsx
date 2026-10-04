"use client";

import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const contactLinks = [
  {
    label: "Email",
    value: "etran2@babson.edu",
    href: "mailto:etran2@babson.edu",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "elizabeth-tran-5807b2244",
    href: "https://www.linkedin.com/in/elizabeth-tran-5807b2244/",
    icon: Linkedin,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader
          index="06"
          label="Contact"
          title="Let's build something"
          description="Have an AI workflow that should exist? Let's talk."
        />

        <Reveal>
        <div className="border-t border-border">
          {contactLinks.map(({ label, value, href, icon: Icon }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 border-b border-border py-5 transition-colors duration-200 hover:text-primary"
              >
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 shrink-0" />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground w-20 shrink-0">
                  {label}
                </span>
                <span className="text-sm text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {value}
                </span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
