"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { numericValue: 5,    prefix: "",  suffix: "M+", label: "TikTok Views" },
  { numericValue: 100,  prefix: "$", suffix: "K",  label: "Solutions Built" },
  { numericValue: 3000, prefix: "",  suffix: "+",  label: "Students Reached" },
  { numericValue: 60,   prefix: "",  suffix: "+",  label: "Businesses Consulted" },
];

function AnimatedStatValue({
  numericValue,
  prefix,
  suffix,
}: {
  numericValue: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => {
    const rounded = Math.round(v);
    const formatted = rounded >= 1000 ? rounded.toLocaleString() : String(rounded);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      animate(motionVal, numericValue, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    }
  }, [isInView, motionVal, numericValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            About
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Image
              src="/headshot.png"
              alt="Elizabeth Tran"
              width={700}
              height={755}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <motion.h2
              variants={itemVariants}
              className="font-display font-bold text-foreground leading-tight text-center"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Building the future
              <br />one agent at a time.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-foreground/80 leading-relaxed" style={{ maxWidth: "58ch" }}>
              I build AI agents and automate workflows that save real time for real people. At Babson College studying Technology Entrepreneurship, I don&apos;t just study AI. I ship it. From training sales agents that follow up after discovery calls to automating C-suite newsletters, my tools run in production.
            </motion.p>

            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed" style={{ maxWidth: "58ch" }}>
              I&apos;m the External Partnerships Lead at The Generator (Babson&apos;s AI Lab), where I secured sponsorships from Anthropic, OpenAI, Cursor, and more, then co-hosted a buildathon that brought the AI ecosystem to campus. I&apos;m also a Student Lead in the G1000 AI Bootcamp, consulting 60+ small businesses on actually using AI in their operations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {["Claude Code", "n8n", "AI Agents", "Python", "Prompt Engineering", "Microsoft 365 Copilot"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-border text-muted-foreground hover:border-violet-500/40 hover:text-foreground transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 pt-10 border-t border-border flex flex-wrap gap-x-12 gap-y-6 justify-center"
        >
          {stats.map(({ numericValue, prefix, suffix, label }) => (
            <div key={label}>
              <p
                className="font-display font-bold text-foreground leading-none mb-1"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                <AnimatedStatValue numericValue={numericValue} prefix={prefix} suffix={suffix} />
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
