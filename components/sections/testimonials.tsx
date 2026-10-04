"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/editorial";
import { FadeUp } from "@/components/ui/fade-up";

const brandonLinks = [
  { label: "Course page", href: "https://student-page-share.lovable.app/" },
  { label: "Brandon's portfolio", href: "https://brandons-website-eight.vercel.app/" },
  { label: "Restaurant agent repo", href: "https://github.com/Brandon455345/Duchess" },
];

const SHOT_SRC = "/testimonials/daily-cash-agent.jpeg";
const SHOT_ALT =
  "Telegram bot delivering a daily cash position report with current balance, pending charges, and net cash for the next day";

/** Full screenshot. Closes on Escape, backdrop click, or the X; focus returns to the opener. */
function Lightbox({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daily cash report, full screenshot"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-6"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 p-2 text-cream/70 transition-colors duration-300 hover:text-accent"
      >
        <X className="h-5 w-5" />
      </button>
      <Image
        src={SHOT_SRC}
        alt={SHOT_ALT}
        width={739}
        height={1600}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[86vh] w-auto"
      />
    </div>
  );
}

function Attribution({ src, name, meta }: { src: string; name: string; meta: string }) {
  return (
    <figcaption className="mt-8 flex items-center gap-3">
      <Image src={src} alt={name} width={44} height={44} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <cite className="block text-sm not-italic">{name}</cite>
        <span className="label text-[10px] text-muted">{meta}</span>
      </div>
    </figcaption>
  );
}

const quoteClass = "font-display text-2xl italic leading-snug md:text-[1.75rem]";

/** Quotes are verbatim. Do not edit, shorten, or correct them. */
export function TestimonialsSection() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <section id="testimonials" className="bg-ink py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Testimonials"
          title="In their words"
          italic="words"
          sub="The people I built for."
        />

        <div className="grid border-t border-stroke md:grid-cols-2">
          {/* David */}
          <FadeUp className="border-b border-stroke py-10 md:border-b-0 md:border-r md:pr-10">
            <figure>
              <p className="label text-muted">Client · Daily Cash Agent</p>
              <blockquote className="mt-5">
                <p className={quoteClass}>
                  Liz did an outstanding job building an AI-powered Daily Cash Management agent
                  that has become an incredibly valuable tool for me. She continues to provide
                  excellent support, proactively maintaining the agent and quickly resolving any
                  bugs that arise, making the entire solution reliable and hugely helpful to our
                  daily workflow. I would recommend her without hesitation.
                </p>
              </blockquote>

              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Expand the daily cash report screenshot"
                className="group relative mt-8 block aspect-[739/420] w-[220px] overflow-hidden border border-stroke focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream"
              >
                <Image
                  src={SHOT_SRC}
                  alt={SHOT_ALT}
                  fill
                  sizes="220px"
                  className="object-cover"
                  style={{ objectPosition: "50% 10%" }}
                />
                <span className="label absolute bottom-1.5 right-1.5 bg-ink/85 px-1.5 py-0.5 text-[9px] text-cream/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  Expand
                </span>
              </button>

              <Attribution
                src="/testimonials/david.png"
                name="David"
                meta="Co-founder, Metal Fuels · Boston, MA"
              />
            </figure>
          </FadeUp>

          {/* Brandon */}
          <FadeUp className="py-10 md:pl-10" delay={0.08}>
            <figure>
              <p className="label text-muted">Student · AI Agents Course</p>
              <blockquote className="mt-5">
                <p className={quoteClass}>
                  The course was amazing and opened my mind to different paths that I could venture
                  too. Additionally, the lessons were very helpful and straightforward, which is
                  nice for someone who is a slow learner
                </p>
              </blockquote>

              <p className="label mt-8 text-cream/70">5 sessions · 10 hours · 1:1</p>
              <p className="mt-2 text-sm text-muted">
                Agent fundamentals, Claude Code, and building and selling his first AI agent.
              </p>
              <ul className="mt-3 space-y-1">
                {brandonLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cream/60 transition-colors duration-300 hover:text-accent"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <Attribution
                src="/testimonials/brandon.png"
                name="Brandon"
                meta="High school student · AI Agents Course"
              />
            </figure>
          </FadeUp>
        </div>
      </div>

      {open && <Lightbox onClose={close} />}
    </section>
  );
}
