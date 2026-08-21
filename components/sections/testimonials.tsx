"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type TestimonialLink = { label: string; href: string };

const brandonLinks: TestimonialLink[] = [
  { label: "Course page", href: "https://student-page-share.lovable.app/" },
  { label: "Brandon's portfolio", href: "https://brandons-website-eight.vercel.app/" },
  { label: "Restaurant agent repo", href: "https://github.com/Brandon455345/Duchess" },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Testimonials
          </span>
          <motion.div
            className="h-px flex-1 bg-border"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-foreground mb-14 text-center"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          Who I&apos;ve built for.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Brandon */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full rounded-md border border-border p-7 sm:p-8"
          >
            <blockquote className="flex-1">
              <p className="text-lg text-foreground/90 leading-relaxed">
                The course was amazing and opened my mind to different paths that I could venture
                too. Additionally, the lessons were very helpful and straightforward, which is nice
                for someone who is a slow learner
              </p>
            </blockquote>

            <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-[65ch]">
              Five sessions, about ten hours, one-on-one. Agent foundations, building with Claude
              Code, and the business side of selling an agent.
            </p>

            <ul className="mt-4 space-y-1.5">
              {brandonLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span className="underline decoration-transparent group-hover:decoration-current underline-offset-4 transition-colors duration-200">
                      {label}
                    </span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <figcaption className="flex items-center gap-3 mt-7 pt-6 border-t border-border">
              <Image
                src="/testimonials/brandon.png"
                alt="Brandon"
                width={56}
                height={56}
                className="w-11 h-11 rounded-full object-cover shrink-0"
              />
              <div>
                <cite className="not-italic text-sm font-medium text-foreground block">
                  Brandon
                </cite>
                <span className="text-xs text-muted-foreground">
                  High school student · AI Agents Course
                </span>
              </div>
            </figcaption>
          </motion.figure>

          {/* David */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full rounded-md border border-border p-7 sm:p-8"
          >
            <div className="relative w-full aspect-[16/9] rounded-md border border-border overflow-hidden mb-7">
              <Image
                src="/testimonials/daily-cash-agent.jpeg"
                alt="Telegram bot delivering a daily cash position report with per-account balances, pending charges, and net position"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            <blockquote className="flex-1">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Liz did an outstanding job building an AI-powered Daily Cash Management agent that
                has become an incredibly valuable tool for me. She continues to provide excellent
                support, proactively maintaining the agent and quickly resolving any bugs that
                arise, making the entire solution reliable and hugely helpful to our daily workflow.
                I would recommend her without hesitation.
              </p>
            </blockquote>

            <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-[65ch]">
              Aggregates balances across multiple bank accounts through Plaid and delivers a daily
              cash position report on its own.
            </p>

            <figcaption className="flex items-center gap-3 mt-7 pt-6 border-t border-border">
              <Image
                src="/testimonials/david.png"
                alt="David"
                width={56}
                height={56}
                className="w-11 h-11 rounded-full object-cover shrink-0"
              />
              <div>
                <cite className="not-italic text-sm font-medium text-foreground block">David</cite>
                <span className="text-xs text-muted-foreground">
                  Co-founder, Metal Fuels · Boston, MA
                </span>
              </div>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
