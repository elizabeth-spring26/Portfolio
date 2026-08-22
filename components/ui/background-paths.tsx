"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

/**
 * Decorative background. The paths draw themselves in once on load via CSS and
 * then hold still — no idle loop, and no JS animation library.
 *
 * pathLength={1} is required: `.hero-path` sets stroke-dasharray in the same
 * normalized unit, so without it the dash would be one user unit wide.
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
            // The old ramp (0.1 + i * 0.03) topped out near fully opaque and cut
            // across the portrait. The paths are a backdrop, not a subject.
            strokeOpacity={0.04 + path.id * 0.005}
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
      className="relative w-full flex items-center overflow-hidden bg-background pt-28 pb-20 lg:pt-24 lg:pb-24 lg:min-h-[min(86vh,900px)]"
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 w-full max-w-content mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-10 lg:gap-12 items-center">
          {/* Load sequence: name -> tagline -> CTA -> portrait, 660ms end to end. */}
          <div>
            <h1
              className="hero-item hero-item-1 font-display mb-5 tracking-tight text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {title}
            </h1>

            <p
              className="hero-item hero-item-2 text-foreground/80 mb-4"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
            >
              I build AI that works for people.
            </p>

            <p className="hero-item hero-item-2 font-mono text-xs text-foreground/75 mb-9 tracking-[0.14em] uppercase max-w-[46ch]">
              <span className="whitespace-nowrap">AI Agent Builder</span>
              <span className="mx-2.5 text-muted-foreground" aria-hidden="true">•</span>
              <span className="whitespace-nowrap">Automation Expert</span>
              <span className="mx-2.5 text-muted-foreground" aria-hidden="true">•</span>
              <span className="whitespace-nowrap">Entrepreneur</span>
            </p>

            <div className="hero-item hero-item-3 flex items-center gap-3 flex-wrap">
              <Button
                variant="ghost"
                onClick={onCTAClick ?? scrollToProjects}
                className="group rounded-lg border border-border bg-card px-6 py-5 text-sm text-foreground transition-colors hover:border-primary hover:bg-card focus-visible:ring-2 focus-visible:ring-ring"
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

              <Button
                asChild
                variant="ghost"
                className="group rounded-lg border border-transparent px-6 py-5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring"
                style={{ transitionDuration: "var(--dur-base)" }}
              >
                <a href="#contact">
                  Contact
                  <span
                    className="ml-3 transition-transform group-hover:translate-x-1"
                    style={{ transitionDuration: "var(--dur-base)" }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </Button>
            </div>
          </div>

          {/* Portrait. A hairline frame offset behind the image gives the
              editorial crop without wrapping the photo in a heavy card. */}
          <div className="hero-item hero-item-4 relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[460px]">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border border-primary/25"
              aria-hidden="true"
            />
            <Image
              src="/headshot.png"
              alt="Elizabeth Tran"
              width={700}
              height={755}
              priority
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 380px, 320px"
              className="relative w-full h-auto rounded-lg border border-border"
              style={{ filter: "saturate(0.92)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
