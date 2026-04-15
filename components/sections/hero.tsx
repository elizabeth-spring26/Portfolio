"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const nameReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const scrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient background — single violet glow, upper right */}
      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(270 60% 50% / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Name */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              variants={nameReveal}
              className="font-display font-bold tracking-tight text-foreground leading-[0.93]"
              style={{ fontSize: "clamp(3.2rem, 9.5vw, 7.5rem)" }}
            >
              Elizabeth Tran
            </motion.h1>
          </div>

          {/* Divider line — animates in after name */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="h-px origin-left mb-8 mt-6"
            style={{ width: "clamp(120px, 20vw, 220px)", background: "hsl(270 76% 62%)" }}
          />

          {/* Tagline */}
          <div className="overflow-hidden mb-4">
            <motion.p
              variants={item}
              className="font-display font-semibold text-violet-400"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
            >
              I build AI that works for people.
            </motion.p>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-12">
            <motion.p
              variants={item}
              className="text-sm text-muted-foreground tracking-widest uppercase"
            >
              AI Agent Builder&nbsp;&nbsp;·&nbsp;&nbsp;Automation Expert&nbsp;&nbsp;·&nbsp;&nbsp;Entrepreneur
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div variants={item} className="flex items-center gap-4 flex-wrap">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-display font-semibold text-sm rounded-md transition-colors duration-200"
            >
              See My Work
              <span aria-hidden="true">→</span>
            </button>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
            >
              Resume
              <span className="text-xs" aria-hidden="true">↓</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-4 sm:left-8 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, hsl(270 76% 62% / 0.5), transparent)" }}
        />
        <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
