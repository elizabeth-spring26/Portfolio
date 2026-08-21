"use client";

import { useEffect, useState } from "react";

const DURATION = 1200;

/** Matches --ease-out closely enough for a number tween. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Counts from 0 to `target` with requestAnimationFrame on an eased curve.
 * Returns `target` outright until started, so the server-rendered markup and
 * the reduced-motion path both show the real number rather than a zero.
 */
export function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!start || prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let frame = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - t0) / DURATION, 1);
      setValue(target * easeOut(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  return value;
}
