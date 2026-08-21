"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-foreground font-mono text-[0.625rem]">
              ET
            </div>
            <div>
              <p className="font-display text-foreground text-[0.9375rem]">Elizabeth Tran</p>
              <p className="font-mono text-[0.6875rem] text-muted-foreground">
                AI Agent Builder &amp; Automation Expert
              </p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <a
              href="mailto:etran2@babson.edu"
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/elizabeth-tran-5807b2244/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="font-mono text-[0.6875rem] text-muted-foreground"
          >
            © {currentYear} Elizabeth Tran. Built with Next.js.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
