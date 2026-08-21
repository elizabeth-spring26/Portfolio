"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

type TestimonialLink = { label: string; href: string };

const brandonLinks: TestimonialLink[] = [
  { label: "Course page", href: "https://student-page-share.lovable.app/" },
  { label: "Brandon's portfolio", href: "https://brandons-website-eight.vercel.app/" },
  { label: "Restaurant agent repo", href: "https://github.com/Brandon455345/Duchess" },
];

const SCREENSHOT_SRC = "/testimonials/daily-cash-agent.jpeg";
const SCREENSHOT_ALT =
  "Telegram bot delivering a daily cash position report with current balance, pending charges, and net cash for the next day";

function Lightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daily cash report, full screenshot"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-background/92"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={SCREENSHOT_SRC}
          alt={SCREENSHOT_ALT}
          width={739}
          height={1600}
          className="max-h-[86vh] w-auto rounded-lg border border-border"
        />
      </div>
    </div>
  );
}

function Attribution({
  src,
  name,
  meta,
}: {
  src: string;
  name: string;
  meta: string;
}) {
  return (
    <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-content mx-auto">
        <SectionHeader index="03" label="Testimonials" title="Who I've built for" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center items-stretch">
          {/* Brandon */}
          <figure className="w-full max-w-[460px] h-full flex flex-col rounded-lg border border-border bg-card p-6">
            <blockquote className="flex-1">
              <p className="text-[0.9375rem] text-foreground/85 leading-[1.6]">
                The course was amazing and opened my mind to different paths that I could venture
                too. Additionally, the lessons were very helpful and straightforward, which is nice
                for someone who is a slow learner
              </p>
            </blockquote>

            <p className="text-[0.8125rem] text-muted-foreground leading-relaxed mt-5">
              Five sessions, about ten hours, one-on-one. Agent foundations, building with Claude
              Code, and the business side of selling an agent.
            </p>

            <ul className="mt-4 space-y-1">
              {brandonLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <span className="underline decoration-transparent group-hover:decoration-current underline-offset-4 transition-colors duration-200">
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
          </figure>

          {/* David */}
          <figure className="w-full max-w-[460px] h-full flex flex-col rounded-lg border border-border bg-card p-6">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Expand the daily cash report screenshot"
              className="group relative block w-full h-[150px] overflow-hidden rounded-md border border-border mb-5"
            >
              <Image
                src={SCREENSHOT_SRC}
                alt={SCREENSHOT_ALT}
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover object-[center_19%]"
              />
              <span className="absolute bottom-2 right-2 font-mono text-[0.625rem] px-1.5 py-0.5 rounded-sm bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
                expand
              </span>
            </button>

            <blockquote className="flex-1">
              <p className="text-[0.9375rem] text-foreground/85 leading-[1.6]">
                Liz did an outstanding job building an AI-powered Daily Cash Management agent that
                has become an incredibly valuable tool for me. She continues to provide excellent
                support, proactively maintaining the agent and quickly resolving any bugs that
                arise, making the entire solution reliable and hugely helpful to our daily workflow.
                I would recommend her without hesitation.
              </p>
            </blockquote>

            <p className="text-[0.8125rem] text-muted-foreground leading-relaxed mt-5">
              Aggregates balances across multiple bank accounts through Plaid and delivers a daily
              cash position report on its own.
            </p>

            <Attribution
              src="/testimonials/david.png"
              name="David"
              meta="Co-founder, Metal Fuels · Boston, MA"
            />
          </figure>
        </div>
      </div>

      {lightboxOpen && <Lightbox onClose={closeLightbox} />}
    </section>
  );
}
