"use client";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger offset in ms. Only used inside the projects grid and stats row. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", shown && "reveal-in", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
