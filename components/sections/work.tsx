"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { Emph, SectionHeading, StatusPill } from "@/components/ui/editorial";
import { FadeUp } from "@/components/ui/fade-up";

const PREVIEW_W = 320;
const PREVIEW_H = 240;

/**
 * Desktop-only preview that trails the cursor while a row with an image is
 * hovered. Position is written straight to style in rAF, never React state.
 */
function CursorPreview({ project }: { project: Project | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (ref.current) {
          ref.current.style.transform = `translate3d(${pos.current.x + 24}px, ${
            pos.current.y - PREVIEW_H / 2
          }px, 0)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const img = project?.image;
  // Keep the last image mounted so it can fade out rather than vanish.
  const last = useRef(img);
  if (img) last.current = img;
  const shown = last.current;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden overflow-hidden md:block"
      style={{ width: PREVIEW_W, height: PREVIEW_H }}
    >
      <div
        className="relative h-full w-full transition-[opacity,transform] duration-300"
        style={{
          opacity: img ? 0.85 : 0,
          transform: img ? "scale(1)" : "scale(0.96)",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {shown && (
          <Image
            src={shown.src}
            alt=""
            fill
            sizes={`${PREVIEW_W}px`}
            className="object-cover"
            style={{ objectPosition: shown.position ?? "50% 50%" }}
          />
        )}
      </div>
    </div>
  );
}

function Row({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover: (p: Project | null) => void;
}) {
  const { slug, title, italic, tags, status, lines, image } = project;

  return (
    <FadeUp>
      <article
        className="group relative grid gap-6 border-t border-stroke py-10 md:grid-cols-12"
        onMouseEnter={() => onHover(project)}
        onMouseLeave={() => onHover(null)}
      >
        <p className="label text-muted md:col-span-1 md:pt-3">
          {String(index + 1).padStart(2, "0")}
        </p>

        <div className="md:col-span-5">
          <h3 className="text-3xl tracking-tight md:text-4xl">
            {/* The whole row is the link target; the title carries the name. */}
            <Link
              href={`/work/${slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline underline-offset-8"
            >
              <Emph text={title} word={italic} />
            </Link>
          </h3>
          <p className="label mt-4 text-muted">{tags.join(" · ")}</p>
          <div className="mt-4 flex items-center gap-4">
            <StatusPill status={status} />
            <span className="label inline-flex items-center gap-1.5 text-cream/50 transition-colors duration-300 group-hover:text-accent">
              Case study
              <ArrowRight
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        <dl className="space-y-4 md:col-span-6">
          {lines.map((l) => (
            <div key={l.label}>
              <dt className="label text-muted">{l.label}</dt>
              <dd className="mt-1 leading-relaxed text-cream/90">{l.text}</dd>
            </div>
          ))}
        </dl>

        {/* Mobile: the image sits under the text instead of trailing the cursor. */}
        {image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden md:hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: image.position ?? "50% 50%" }}
            />
          </div>
        )}
      </article>
    </FadeUp>
  );
}

export function WorkSection() {
  const [hovered, setHovered] = useState<Project | null>(null);

  return (
    <section id="work" className="bg-ink py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Work"
          title="Selected work"
          italic="work"
          sub="Each one starts with a problem and ends with a decision I had to defend."
        />

        <div className="border-b border-stroke">
          {projects.map((p, i) => (
            <Row key={p.slug} project={p} index={i} onHover={setHovered} />
          ))}
        </div>
      </div>

      <CursorPreview project={hovered} />
    </section>
  );
}
