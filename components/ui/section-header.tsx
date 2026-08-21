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

export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", className)}>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground mb-5">
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
        <p className="text-muted-foreground leading-relaxed mt-4 max-w-[58ch]">
          {description}
        </p>
      )}
    </div>
  );
}
