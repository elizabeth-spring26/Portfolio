import Image from "next/image";

const recently = [
  "Shipped an AI cash agent a client uses every morning",
  "Designed a lead-screening workflow for a law firm",
  "Leading user research on healthcare language barriers in Vietnam",
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Feathers the rectangular photo into the black ground. */
const FEATHER = "radial-gradient(ellipse 60% 56% at 50% 42%, #000 44%, transparent 86%)";

/**
 * One 100dvh composition. The name scrolls behind a large, centred portrait
 * that is feathered into the black. The meta grid, rule, and footer strip sit
 * at the bottom over a fade, so text only ever crosses the darkened lower body;
 * her face stays clear above it at every size.
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
            <span key={i} className="pr-[8vw]">
              Elizabeth Tran
            </span>
          ))}
        </div>
      </div>

      {/* Portrait: large, centred, feathered into the ground */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[75vh] -translate-x-1/2 lg:h-[90vh]">
        <div
          className="anim-rise-in relative h-full"
          style={{ aspectRatio: "3 / 4", WebkitMaskImage: FEATHER, maskImage: FEATHER }}
        >
          <Image
            src="/headshot.jpg"
            alt="Elizabeth Tran"
            fill
            priority
            sizes="(min-width: 1024px) 68vh, 56vh"
            className="object-cover"
            style={{ objectPosition: "50% 92%", filter: "saturate(0.72) brightness(0.95)" }}
          />
        </div>
      </div>

      {/* Fade under the text so it stays readable over the photo */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[42%] bg-gradient-to-t from-ink via-ink/85 to-transparent"
        aria-hidden="true"
      />

      {/* Pushes the text block to the bottom */}
      <div className="flex-1" aria-hidden="true" />

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
            I talk to people, find the real problem, and build what fixes it, utilizing AI.
          </p>
        </div>

        <div className="anim-fade-up hidden lg:col-start-4 lg:block" style={d(1500)}>
          <p className="label mb-2 text-muted">Recently</p>
          <ul className="space-y-0.5 text-sm text-cream/90">
            {recently.map((r) => (
              <li key={r}>{r}</li>
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
          className="anim-fade-up text-cream/80 transition-colors duration-300 hover:text-cream"
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
