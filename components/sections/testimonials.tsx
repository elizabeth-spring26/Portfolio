"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

type TestimonialLink = { label: string; href: string };

const brandonLinks: TestimonialLink[] = [
  { label: "Course page", href: "https://student-page-share.lovable.app/" },
  { label: "Brandon's portfolio", href: "https://brandons-website-eight.vercel.app/" },
  { label: "Restaurant agent repo", href: "https://github.com/Brandon455345/Duchess" },
];

const SHOT_SRC = "/testimonials/daily-cash-agent.jpeg";
const SHOT_W = 739;
const SHOT_H = 1600;
const SHOT_ALT =
  "Telegram bot delivering a daily cash position report with current balance, pending charges, and net cash for the next day";

const cardClass =
  "w-full max-w-[460px] h-full flex flex-col rounded-lg border border-border bg-card p-5";
const quoteClass = "text-[0.875rem] text-foreground/85 leading-[1.55]";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * FLIP: the expanded image starts transformed onto the thumbnail's rect, then
 * transitions to identity. Only transform and opacity are animated.
 */
function Lightbox({
  origin,
  onClose,
}: {
  origin: DOMRect | null;
  onClose: () => void;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    const el = imgRef.current;
    if (!el || !origin || prefersReducedMotion()) {
      setOpen(true);
      return;
    }

    const target = el.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const scale = target.width ? origin.width / target.width : 1;

    el.style.transform = "translate(" + dx + "px, " + dy + "px) scale(" + scale + ")";
    el.classList.add("animating");

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });

    const cleanup = () => el.classList.remove("animating");
    el.addEventListener("transitionend", cleanup, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("transitionend", cleanup);
    };
  }, [origin]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daily cash report, full screenshot"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
      style={{
        background: "hsl(var(--background) / 0.94)",
        opacity: open ? 1 : 0,
        transition: "opacity var(--dur-base) var(--ease-out)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors"
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        <X className="w-5 h-5" />
      </button>
      <div
        ref={imgRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: open ? "none" : undefined,
          transformOrigin: "center",
          transition: "transform var(--dur-base) var(--ease-out)",
        }}
      >
        <Image
          src={SHOT_SRC}
          alt={SHOT_ALT}
          width={SHOT_W}
          height={SHOT_H}
          className="max-h-[86vh] w-auto rounded-lg border border-border"
        />
      </div>
    </div>
  );
}

function Attribution({ src, name, meta }: { src: string; name: string; meta: string }) {
  return (
    <figcaption className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
      <Image
        src={src}
        alt={name}
        width={44}
        height={44}
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0">
        <cite className="not-italic text-sm font-medium text-foreground block">{name}</cite>
        <span className="font-mono text-[0.6875rem] text-muted-foreground">{meta}</span>
      </div>
    </figcaption>
  );
}

export function TestimonialsSection() {
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const expand = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOrigin(e.currentTarget.getBoundingClientRect());
    setOpen(true);
  };

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="03" label="Testimonials" title="Who I've built for" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center items-stretch">
          {/* Brandon */}
          <Reveal className="w-full flex justify-center">
            <figure className={cardClass}>
              <blockquote>
                <p className={quoteClass}>
                  The course was amazing and opened my mind to different paths that I could venture
                  too. Additionally, the lessons were very helpful and straightforward, which is
                  nice for someone who is a slow learner
                </p>
              </blockquote>

              {/* Footer group pins to the bottom so extra height collapses below
                  the quote rather than opening a hole in the middle. */}
              <div className="mt-auto pt-5">
                <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
                  Five sessions, about ten hours, one-on-one. Agent foundations, building with
                  Claude Code, and the business side of selling an agent.
                </p>

                <ul className="mt-3 space-y-1">
                  {brandonLinks.map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm transition-colors"
                        style={{ transitionDuration: "var(--dur-fast)" }}
                      >
                        <span className="underline decoration-transparent group-hover:decoration-current underline-offset-4 transition-colors">
                          {label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>

                <Attribution
                  src="/testimonials/brandon.png"
                  name="Brandon"
                  meta="High school student · AI Agents Course"
                />
              </div>
            </figure>
          </Reveal>

          {/* David — screenshot column beside the text column */}
          <Reveal delay={60} className="w-full flex justify-center">
            <figure className={cardClass}>
              <div className="flex flex-col min-[700px]:flex-row gap-5 h-full">
                <button
                  type="button"
                  onClick={expand}
                  aria-label="Expand the daily cash report screenshot"
                  className="group relative shrink-0 rounded-md border border-border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-[120px] aspect-[739/1600] mx-auto min-[700px]:w-[200px] min-[700px]:mx-0"
                  style={{ background: "hsl(240 8% 4%)" }}
                >
                  <Image
                    src={SHOT_SRC}
                    alt={SHOT_ALT}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                  <span
                    className="absolute bottom-1.5 right-1.5 font-mono text-[0.625rem] px-1.5 py-0.5 rounded-sm bg-background/85 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                    style={{ transitionDuration: "var(--dur-base)" }}
                  >
                    expand
                  </span>
                </button>

                <div className="flex flex-col flex-1 min-w-0">
                  <blockquote>
                    <p className={quoteClass}>
                      Liz did an outstanding job building an AI-powered Daily Cash Management agent
                      that has become an incredibly valuable tool for me. She continues to provide
                      excellent support, proactively maintaining the agent and quickly resolving any
                      bugs that arise, making the entire solution reliable and hugely helpful to our
                      daily workflow. I would recommend her without hesitation.
                    </p>
                  </blockquote>

                  <div className="mt-auto pt-4">
                    <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
                      Aggregates balances across multiple bank accounts through Plaid and delivers a
                      daily cash position report on its own.
                    </p>
                    <Attribution
                      src="/testimonials/david.png"
                      name="David"
                      meta="Co-founder, Metal Fuels · Boston, MA"
                    />
                  </div>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>

      {open && <Lightbox origin={origin} onClose={close} />}
    </section>
  );
}
