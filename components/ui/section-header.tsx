"use client";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Zero-padded ordinal shown in the mono eyebrow, e.g. "02". */
  index: string;
  /** Uppercase label shown beside the ordinal. */
  label: string;
  /** Display-face heading. No trailing period. */
  title: string;
  /** Optional supporting line under the heading. */
  description?: string;
  className?: string;
}

/** Eyebrow, heading, and subheading read as one unit and reveal together. */
export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn(className)}>
      <div style={{ marginBottom: "var(--space-block)" }}>
        <p
          className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground"
          style={{ marginBottom: "var(--space-tight)" }}
        >
          <span className="tnum">{index}</span>
          <span className="mx-1.5 opacity-40">/</span>
          {label}
        </p>
        <h2
          className="font-display text-foreground leading-[1.08]"
          style={{ fontSize: "clamp(1.875rem, 3.4vw, 2.625rem)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="text-muted-foreground leading-relaxed max-w-[58ch]"
            style={{ marginTop: "calc(var(--space-tight) * 2)" }}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
