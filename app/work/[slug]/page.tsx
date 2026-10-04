import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { ContactSection } from "@/components/sections/contact";
import { Emph, StatusPill } from "@/components/ui/editorial";
import { FadeUp } from "@/components/ui/fade-up";
import { CashCard } from "@/components/ui/cash-card";
import { getProject, projects, type Project } from "@/content/projects";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: `${p.title} — Elizabeth Tran`, description: p.tldr };
}

/** Map list lines onto the case study outline. */
const LINE_TO_SECTION: Record<string, string> = {
  Problem: "Users & problem",
  "What I learned": "Research",
  "What I decided": "Decision & tradeoffs",
  "What I built": "What shipped",
  "What I did": "What shipped",
  Result: "Results",
};

const ORDER = [
  "Context",
  "Users & problem",
  "Research",
  "Options I considered",
  "Decision & tradeoffs",
  "What shipped",
  "Results",
  "What I'd do next",
];

/** Only sections with real content render. Nothing is padded out. */
function sectionsFor(p: Project) {
  const map = new Map<string, string>();
  for (const l of p.lines) {
    const key = LINE_TO_SECTION[l.label] ?? l.label;
    map.set(key, map.has(key) ? `${map.get(key)} ${l.text}` : l.text);
  }
  for (const [k, v] of Object.entries(p.caseStudy ?? {})) if (v) map.set(k, v);
  return ORDER.filter((k) => map.has(k)).map((k) => ({ label: k, text: map.get(k)! }));
}

export default function CaseStudy({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const sections = sectionsFor(project);
  const { image, visual } = project;
  // The image sits after the problem, before the decisions.
  const imageAfter = Math.min(1, sections.length - 1);

  return (
    <>
      <Nav />
      <main id="main" className="bg-forest pt-32 md:pt-40">
        <article className="shell">
          <Link
            href="/#work"
            className="label text-muted transition-colors duration-300 hover:text-accent"
          >
            ← All work
          </Link>

          <header className="mt-10 max-w-4xl">
            <p className="label text-muted">{project.meta}</p>
            <h1 className="mt-5 text-5xl leading-[1.02] tracking-tight md:text-7xl">
              <Emph text={project.title} word={project.italic} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-cream/85">{project.tldr}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <StatusPill status={project.status} />
              <span className="label text-muted">{project.tags.join(" · ")}</span>
            </div>
          </header>

          <div className="mt-16 md:mt-24">
            {sections.map((s, idx) => (
              <div key={s.label}>
                <FadeUp>
                  <section className="grid gap-4 border-t border-stroke py-10 md:grid-cols-12">
                    <h2 className="label text-muted md:col-span-4">{s.label}</h2>
                    <p className="text-xl leading-relaxed md:col-span-8">{s.text}</p>
                  </section>
                </FadeUp>

                {visual === "cash-card" && idx === imageAfter && (
                  <FadeUp>
                    <div className="mb-10 flex justify-center border border-stroke bg-ink/30 py-10">
                      <CashCard className="aspect-[4/3] w-full max-w-[420px]" />
                    </div>
                  </FadeUp>
                )}

                {image && idx === imageAfter && (
                  <FadeUp>
                    <div
                      className="relative mb-10 w-full overflow-hidden border border-stroke"
                      style={{
                        aspectRatio: image.width > image.height ? `${image.width} / ${image.height}` : "16 / 10",
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1200px) 1100px, 100vw"
                        className={image.width > image.height ? "object-cover" : "object-contain bg-surface"}
                      />
                    </div>
                  </FadeUp>
                )}
              </div>
            ))}
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-10 flex items-center justify-between border-y border-stroke py-8"
          >
            <span>
              <span className="label block text-muted">Next project</span>
              <span className="mt-2 block text-3xl tracking-tight md:text-4xl">
                <Emph text={next.title} word={next.italic} />
              </span>
            </span>
            <ArrowRight
              className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden="true"
            />
          </Link>
        </article>

        <ContactSection />
      </main>
    </>
  );
}
