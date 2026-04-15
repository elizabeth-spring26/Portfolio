"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";
import { GraduationCap, Trophy, BookOpen, Star } from "lucide-react";

const awards = [
  { label: "Diversity Leadership Scholarship", icon: Star },
  { label: "Excellence in Entrepreneurship & Ecommerce", icon: Trophy },
  { label: "1st Place: Business Plan (FBLA)", icon: Trophy },
  { label: "1st Place: Mobile App Development (FBLA)", icon: Trophy },
];

const courses = [
  "Business Analytics",
  "Accounting",
  "AP Macroeconomics",
  "Foundations of Management & Entrepreneurship",
  "Technology Entrepreneurship",
];

const involvement = [
  "CODE (Community of Developers and Entrepreneurs)",
  "Babson Asian Pacific Student Association",
  "The Generator (AI Lab)",
];

export function EducationSection() {
  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Education
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
          Where I&apos;m learning.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main education card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <GlowCard glowColor="rgba(139, 92, 246, 0.35)" className="p-6 sm:p-8 h-full">
              <div className="flex items-start gap-4 mb-7">
                <div
                  className="w-11 h-11 rounded-md border border-violet-500/30 flex items-center justify-center shrink-0"
                  style={{ background: "hsl(260 14% 12%)" }}
                >
                  <GraduationCap className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground">Babson College</h3>
                  <p className="text-sm text-violet-400 font-medium">Wellesley, Massachusetts</p>
                </div>
              </div>

              <div className="space-y-4 mb-7">
                <div>
                  <p className="text-foreground font-semibold text-sm">
                    Bachelor of Science in Business Administration
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Concentration: Technology Entrepreneurship
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Expected</p>
                    <p className="text-foreground font-semibold text-sm">May 2028</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">GPA</p>
                    <p className="text-violet-400 font-bold text-sm">3.75</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    Relevant Coursework
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courses.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground"
                      style={{ background: "hsl(260 14% 10%)" }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-3">
                  Involvement
                </p>
                <div className="flex flex-wrap gap-2">
                  {involvement.map((org) => (
                    <span
                      key={org}
                      className="px-3 py-1 text-xs rounded-full border border-violet-500/25 text-violet-300"
                      style={{ background: "hsl(270 14% 11%)" }}
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Awards card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard glowColor="rgba(109, 40, 217, 0.3)" className="p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2.5 mb-7">
                <Trophy className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-display font-bold text-foreground">Awards</h3>
              </div>

              <div className="space-y-3">
                {awards.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3.5 rounded-md border border-border"
                    style={{ background: "hsl(260 14% 10%)" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/75 leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
