"use client";

import { Mail, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div
            className="flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-foreground font-mono text-[0.625rem]">
              ET
            </div>
            <div>
              <p className="font-display text-foreground text-[0.9375rem]">Elizabeth Tran</p>
              <p className="font-mono text-[0.6875rem] text-muted-foreground">
                Agent Automation Builder &amp; Growth Expert
              </p>
            </div>
          </div>

          {/* Social links */}
          <div
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
          </div>

          {/* Copyright */}
          <p
            className="font-mono text-[0.6875rem] text-muted-foreground"
          >
            © {currentYear} Elizabeth Tran. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
