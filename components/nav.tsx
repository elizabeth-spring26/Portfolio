"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [underline, setUnderline] = useState<{ x: number; w: number } | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => setMounted(true), []);

  // The nav ground appears only once the hero is behind you.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Two sections can sit inside the band at once. Take the topmost
        // intersecting one rather than letting the last entry win by order.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Measure the active link so one shared bar can slide to it.
  const measure = useCallback(() => {
    const list = listRef.current;
    const el = activeSection ? linkRefs.current[activeSection] : null;
    if (!list || !el) {
      setUnderline(null);
      return;
    }
    const l = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setUnderline({ x: r.left - l.left, w: r.width });
  }, [activeSection]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Ground is its own layer so only opacity animates. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-background/90 backdrop-blur-xl border-b border-border"
          style={{
            opacity: scrolled ? 1 : 0,
            transition: "opacity var(--dur-base) var(--ease-out)",
          }}
        />

        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="flex items-center gap-2.5 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div
                className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-foreground font-mono text-[0.625rem] group-hover:border-foreground/30 transition-colors"
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                ET
              </div>
              <span className="font-display text-foreground hidden sm:block text-[0.9375rem] tracking-tight">
                Elizabeth Tran
              </span>
            </a>

            {/* Desktop links plus one shared underline */}
            <div ref={listRef} className="hidden md:flex items-center gap-0.5 relative">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    ref={(el) => {
                      linkRefs.current[id] = el;
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors rounded-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{ transitionDuration: "var(--dur-fast)" }}
                  >
                    {link.label}
                  </a>
                );
              })}

              <span
                aria-hidden="true"
                className="absolute bottom-0.5 left-0 h-px w-px bg-primary origin-left"
                style={{
                  transform: underline
                    ? `translateX(${underline.x}px) scaleX(${underline.w})`
                    : "translateX(0) scaleX(0)",
                  opacity: underline ? 1 : 0,
                  transition:
                    "transform var(--dur-base) var(--ease-in-out), opacity var(--dur-fast) var(--ease-out)",
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ transitionDuration: "var(--dur-fast)" }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ transitionDuration: "var(--dur-fast)" }}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu opens via grid-template-rows, so no height is animated. */}
      <div
        className="fixed top-16 left-0 right-0 z-40 grid md:hidden bg-background/95 backdrop-blur-xl"
        style={{
          gridTemplateRows: mobileOpen ? "1fr" : "0fr",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          borderBottom: mobileOpen ? "1px solid hsl(var(--border))" : "1px solid transparent",
          transition:
            "grid-template-rows var(--dur-base) var(--ease-in-out), opacity var(--dur-fast) var(--ease-out)",
        }}
      >
        <div className="overflow-hidden">
          <div className="max-w-content mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors font-mono text-[0.6875rem] uppercase tracking-[0.12em] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
