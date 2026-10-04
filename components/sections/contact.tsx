import { site } from "@/content/site";
import { Emph } from "@/components/ui/editorial";
import { StatusDot } from "@/components/hero";

const strip = "PROBLEM → USERS → DECISION → SHIPPED • ";

export function ContactSection() {
  return (
    <section id="contact" className="overflow-hidden bg-ink pb-10 pt-24">
      {/* Decorative marquee */}
      <div className="overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex w-max whitespace-nowrap text-[10vw] leading-none tracking-tight text-cream/10">
          {[0, 1].map((i) => (
            <span key={i}>{strip.repeat(3)}</span>
          ))}
        </div>
      </div>

      <div className="shell mt-16">
        <h2 className="text-5xl tracking-tight md:text-7xl">
          <Emph text="Let's build something" word="build" />
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-cream px-7 py-3.5 text-ink transition-colors duration-300 hover:bg-accent hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Email me ↗
          </a>
          {site.resume ? (
            <a
              href={site.resume}
              download
              className="rounded-full border border-stroke px-7 py-3.5 transition-colors duration-300 hover:border-cream"
            >
              Download resume
            </a>
          ) : (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-stroke px-7 py-3.5 transition-colors duration-300 hover:border-cream"
            >
              LinkedIn ↗
            </a>
          )}
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t border-stroke pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© 2026 Elizabeth Tran</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-accent"
            >
              LinkedIn
            </a>
            {site.resume && (
              <a href={site.resume} className="transition-colors duration-300 hover:text-accent">
                Resume
              </a>
            )}
          </div>
          <p className="flex items-center gap-2.5">
            <StatusDot />
            {site.availability}
          </p>
        </footer>
      </div>
    </section>
  );
}
