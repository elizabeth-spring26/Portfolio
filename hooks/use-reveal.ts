"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once when it scrolls into view, then stops observing.
 * Deliberately does not re-animate on scroll back up.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -10% 0px"
) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Without IntersectionObserver, show immediately rather than hide forever.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.unobserve(entry.target);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, shown };
}
