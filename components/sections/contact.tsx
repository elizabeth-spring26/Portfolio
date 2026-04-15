"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "etran2@babson.edu",
    href: "mailto:etran2@babson.edu",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "elizabeth-tran-5807b2244",
    href: "https://www.linkedin.com/in/elizabeth-tran-5807b2244/",
    icon: Linkedin,
  },
];

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

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(270 60% 50% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Contact
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-foreground mb-5 leading-tight"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
          >
            Let&apos;s build
            <br />
            something.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg mb-12 leading-relaxed mx-auto"
            style={{ maxWidth: "48ch" }}
          >
            Whether you&apos;re building an AI product, need automation expertise, or want to collaborate on something new. Let&apos;s talk.
          </motion.p>

          {/* Contact links */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
            {contactLinks.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 px-5 py-4 rounded-md border border-border hover:border-violet-500/40 transition-colors duration-200"
                style={{ background: "hsl(260 14% 8%)" }}
              >
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-violet-400 transition-colors duration-200" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm text-foreground font-medium">{value}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto" />
              </a>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <a
              href="mailto:etran2@babson.edu"
              className="inline-flex items-center gap-3 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-display font-semibold rounded-md transition-colors duration-200 group"
            >
              <Mail className="w-4 h-4" />
              Say Hello
              <span
                className="group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
