"use client";

import { Button } from "@/components/ui/button";

/**
 * Decorative background. The paths draw themselves in once on load via CSS and
 * then hold still — no idle loop, and no JS animation library.
 */
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            className="hero-path"
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            pathLength={1}
            style={{ animationDelay: `${path.id * 12}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Elizabeth Tran",
  onCTAClick,
}: {
  title?: string;
  onCTAClick?: () => void;
}) {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Load sequence: name -> tagline -> CTA, 540ms end to end. */}
          <h1
            className="hero-item hero-item-1 font-display mb-6 tracking-tight text-foreground"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
          >
            {title}
          </h1>

          <p
            className="hero-item hero-item-2 text-foreground/80 mb-4"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            I build AI that works for people.
          </p>

          <p className="hero-item hero-item-2 font-mono text-[0.6875rem] text-muted-foreground mb-10 tracking-[0.18em] uppercase">
            AI Agent Builder&nbsp;&nbsp;•&nbsp;&nbsp;Automation Expert&nbsp;&nbsp;•&nbsp;&nbsp;Entrepreneur
          </p>

          <div className="hero-item hero-item-3 flex items-center justify-center gap-6 flex-wrap">
            <Button
              variant="ghost"
              onClick={onCTAClick ?? scrollToProjects}
              className="group rounded-lg border border-border bg-card px-7 py-5 text-sm text-foreground transition-colors hover:border-primary hover:bg-card focus-visible:ring-2 focus-visible:ring-ring"
              style={{ transitionDuration: "var(--dur-base)" }}
            >
              See My Work
              <span
                className="ml-3 text-muted-foreground transition-transform group-hover:translate-x-1"
                style={{ transitionDuration: "var(--dur-base)" }}
                aria-hidden="true"
              >
                →
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className="hero-item hero-item-3 absolute bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.625rem] text-muted-foreground tracking-[0.18em] uppercase">
          Scroll
        </span>
        <span className="w-px h-8 bg-border" />
      </div>
    </section>
  );
}
