"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navLinks, socialLinks } from "@/content/site";

const EASE = "cubic-bezier(0.76,0,0.24,1)";

/**
 * Fixed bar on a blurred ink ground. `intro` runs the hero entrance stagger (home page only).
 */
export function Nav({ intro = false }: { intro?: boolean }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // A closed drawer is off-canvas; inert keeps its links out of the tab order.
  useEffect(() => {
    if (drawerRef.current) drawerRef.current.inert = !open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const anim = (delay: number) =>
    intro ? { className: "anim-fade-up", style: { "--d": `${delay}ms` } as React.CSSProperties } : {};

  const linkClass =
    "transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:underline underline-offset-4";

  return (
    <>
      {/* Solid, blurred ground so the bar never sits on top of section content. */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-stroke bg-ink/80 px-6 text-cream backdrop-blur-md sm:px-10">
        <Link href="/" style={anim(800).style} className={cn("text-lg tracking-wide", linkClass, intro && "anim-fade-up")}>
          Elizabeth Tran
        </Link>

        {/* One row from 1100px; below that everything lives in the drawer. */}
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm min-[1100px]:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((l, i) => (
              <li key={l.href} {...anim(1000 + i * 80)}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-stroke" aria-hidden="true" />
          <ul className="flex items-center gap-7">
            {socialLinks.map((l, i) => (
              <li key={l.href} {...anim(1000 + (navLinks.length + i) * 80)}>
                <a
                  href={l.href}
                  className={linkClass}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Three bars morph into an X. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] min-[1100px]:hidden"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px w-6 bg-cream"
              style={{
                transition: `transform 500ms ${EASE}, opacity 500ms ${EASE}`,
                transform: open
                  ? i === 0
                    ? "translateY(6px) rotate(45deg)"
                    : i === 2
                      ? "translateY(-6px) rotate(-45deg)"
                      : "none"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm min-[1100px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ transition: `opacity 500ms ${EASE}` }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        ref={drawerRef}
        className="fixed inset-y-0 right-0 z-[45] flex w-[80%] max-w-sm flex-col justify-between bg-surface px-8 py-10 pt-28 min-[1100px]:hidden"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: `transform 600ms ${EASE}`,
        }}
      >
        <div>
          <p className="label text-cream/50">Site Index</p>
          <ul className="mt-6 space-y-3">
            {navLinks.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "transition-[opacity,transform] duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: open ? `${300 + i * 80}ms` : "0ms", transitionTimingFunction: EASE }}
              >
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-4xl tracking-tight focus-visible:outline-none focus-visible:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-cream/50">Find Me</p>
          <ul className="mt-4 space-y-2 text-sm">
            {socialLinks.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "transition-[opacity,transform] duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: open ? `${550 + i * 60}ms` : "0ms", transitionTimingFunction: EASE }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-accent transition-colors duration-300"
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
