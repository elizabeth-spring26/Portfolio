import Image from "next/image";
import { site } from "@/content/site";

const recently = [
  "Shipped an AI cash agent a client uses every morning",
  "Designed a lead-screening workflow for a law firm",
  "Leading user research on healthcare language barriers in Vietnam",
];

const toolkit = [
  "User research & discovery",
  "PRDs & prioritization",
  "Prototyping with Claude Code",
  "AI agents, APIs, MCPs",
  "Partnerships & GTM",
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function StatusDot() {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden="true">
      <span className="pulse-dot absolute inset-0 rounded-full bg-accent" />
    </span>
  );
}

/**
 * One 100dvh composition. Layers, bottom to top: vignette, scrolling name,
 * portrait, legibility scrim, cream rule, meta grid + footer strip.
 */
export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative h-[100dvh] min-h-[560px] overflow-hidden bg-ink"
    >
      {/* 1. Ground */}
      <div
        className="anim-fade-in absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 40%, #1c1c1c 0%, #0c0c0c 70%)" }}
        aria-hidden="true"
      />

      {/* 2. Scrolling name, passing behind the portrait */}
      <div
        className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]"
        style={d(500)}
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max whitespace-nowrap text-[16vh] leading-none tracking-tight text-cream sm:text-[26vh]">
          {[0, 1].map((i) => (
            <span key={i} className="pr-[6vw]">
              Elizabeth&nbsp;—&nbsp;Tran&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* 3. Portrait. Feathered into the ground so a rectangular photo reads as
          a cutout; swap for /headshot-cutout.png and drop the mask once it exists. */}
      <div
        className="pointer-events-none absolute bottom-[9rem] left-1/2 z-20 h-[58vh] w-auto max-w-[92vw] -translate-x-1/2 md:h-[78vh] md:bottom-0 md:left-auto md:right-[4vw] md:translate-x-0"
        style={{ aspectRatio: "3 / 4" }}
      >
        <div
          className="anim-rise-in relative h-full w-full"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 58% 52% at 50% 42%, #000 38%, transparent 82%)",
            maskImage: "radial-gradient(ellipse 58% 52% at 50% 42%, #000 38%, transparent 82%)",
          }}
        >
          <Image
            src="/headshot.jpg"
            alt="Elizabeth Tran"
            fill
            priority
            sizes="(min-width: 768px) 59vh, 92vw"
            className="object-cover"
            style={{ objectPosition: "50% 100%", filter: "saturate(0.7) brightness(0.9)" }}
          />
        </div>
      </div>

      {/* Scrim: keeps the meta grid legible wherever it crosses the photo. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[55%] bg-gradient-to-t from-ink via-ink/85 to-transparent"
        aria-hidden="true"
      />

      {/* 4. Cream rule */}
      <div
        className="anim-line absolute inset-x-6 bottom-[9rem] z-30 h-px bg-cream sm:inset-x-10 sm:bottom-40"
        aria-hidden="true"
      />

      {/* 5a. Meta grid */}
      <div className="absolute inset-x-6 bottom-[10rem] z-30 grid grid-cols-2 gap-6 sm:inset-x-10 sm:bottom-44 lg:grid-cols-4 lg:gap-8">
        <h1 className="anim-fade-up text-xl leading-tight md:text-2xl" style={d(1300)}>
          Product-minded
          <br />
          <span className="font-display text-3xl italic md:text-4xl">builder</span>
        </h1>

        <div className="anim-fade-up" style={d(1400)}>
          <p className="label mb-2 text-muted">What I do</p>
          <p className="max-w-[240px] text-sm text-cream/90">
            I find the real problem, talk to the people who have it, and ship the smallest thing
            that fixes it.
          </p>
        </div>

        <div className="anim-fade-up hidden lg:block" style={d(1500)}>
          <p className="label mb-2 text-muted">Recently</p>
          <ul className="space-y-0.5 text-sm text-cream/90">
            {recently.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="anim-fade-up hidden lg:block" style={d(1600)}>
          <p className="label mb-2 text-muted">Toolkit</p>
          <ul className="space-y-0.5 text-sm text-cream/90">
            {toolkit.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5b. Footer strip */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-6 px-6 pb-5 text-xs sm:px-10 sm:pb-8 sm:text-sm">
        <div className="anim-fade-up space-y-1.5" style={d(1500)}>
          <p className="flex items-center gap-2.5">
            <StatusDot />
            {site.availability}
          </p>
          <a
            href="#work"
            className="inline-block text-cream/70 transition-colors duration-300 hover:text-accent"
          >
            See my work ↓
          </a>
        </div>
        <p className="anim-fade-up text-right text-cream/70" style={d(1600)}>
          Babson College &rsquo;28
          <br />
          Business · Technology Entrepreneurship
        </p>
      </div>
    </section>
  );
}
