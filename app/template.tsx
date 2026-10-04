"use client";

import { useEffect } from "react";
import { MotionConfig, motion } from "framer-motion";

/**
 * Remounts on every route change, so it carries the 300ms page fade.
 * The very first paint is never faded: server HTML must not ship at opacity 0.
 */
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const fade = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={fade ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
