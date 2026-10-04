import Image from "next/image";

const recently = [
  "Shipped an AI cash agent a client uses every morning",
  "Designed a lead-screening workflow for a law firm",
  "Leading user research on healthcare language barriers in Vietnam",
];

const toolkit = [
  "User research & discovery",
  "Strategy & problem scoping",
  "Prototyping with Claude Code",
  "AI agents, APIs, MCPs",
  "Partnerships & GTM",
  "Growth & content",
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * One 100dvh composition built as a column, so nothing overlaps the portrait:
 * nav clearance → portrait (flex-1) → meta grid → cream rule → footer strip.
 * The scrolling name sits behind everything and passes behind the photo.
 */
export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex h-[100dvh] min-h-[640px] flex-col overflow-hidden bg-ink"
    >
      {/* Ground */}
      <div
        className="anim-fade-in absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 40%, #1c1c1c 0%, #0c0c0c 70%)" }}
        aria-hidden="true"
      />

      {/* Scrolling name, passing behind the portrait */}
      <div
        className="anim-fade-up absolute inset-x-0 top-[14vh] z-10 overflow-hidden"
        style={d(500)}
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max whitespace-nowrap text-[15vh] leading-none tracking-tight text-cream sm:text-[26vh]">
          {[0, 1].map((i) => (
            <span key={i} className="pr-[6vw]">
              Elizabeth&nbsp;—&nbsp;Tran&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Portrait: its own space, never under text. Muted to sit in the
          black and cream palette. */}
      <div className="relative z-20 flex min-h-0 flex-1 justify-center px-6 pb-8 pt-[27vh] sm:px-10 md:justify-end md:pt-28">
        <div className="anim-rise-in relative h-full" style={{ aspectRatio: "3 / 4" }}>
          <Image
            src="/headshot.jpg"
            alt="Elizabeth Tran"
            fill
            priority
            sizes="(min-width: 768px) 40vh, 60vw"
            className="border border-cream/15 object-cover"
            style={{ objectPosition: "50% 92%", filter: "saturate(0.72) contrast(1.03)" }}
          />
        </div>
      </div>

      {/* Meta grid */}
      <div className="relative z-30 grid grid-cols-2 gap-6 px-6 pb-6 sm:px-10 lg:grid-cols-4 lg:gap-8">
        <h1 className="anim-fade-up text-xl leading-tight md:text-2xl" style={d(1300)}>
          Builder &amp;
          <br />
          <span className="font-display text-3xl italic md:text-4xl">operator</span>
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

      {/* Cream rule */}
      <div className="anim-line relative z-30 mx-6 h-px bg-cream sm:mx-10" aria-hidden="true" />

      {/* Footer strip */}
      <div className="relative z-30 flex items-end justify-between gap-6 px-6 pb-5 pt-5 text-xs sm:px-10 sm:pb-8 sm:text-sm">
        <a
          href="#work"
          className="anim-fade-up text-cream/80 transition-colors duration-300 hover:text-accent"
          style={d(1500)}
        >
          See my work ↓
        </a>
        <p className="anim-fade-up text-right text-cream/70" style={d(1600)}>
          Babson College &rsquo;28
          <br />
          Business · Technology Entrepreneurship
        </p>
      </div>
    </section>
  );
}
