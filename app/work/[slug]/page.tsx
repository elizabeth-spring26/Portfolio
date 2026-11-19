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
import { getProject, projects, type Project, type Writeup } from "@/content/projects";
import { site } from "@/content/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = p.metaTitle ?? `${p.title} — Elizabeth Tran`;
  const url = `/work/${p.slug}`;
  return {
    title,
    description: p.tldr,
    alternates: { canonical: url },
    openGraph: { title, description: p.tldr, url, type: "article", siteName: "Elizabeth Tran" },
    twitter: { card: "summary_large_image", title, description: p.tldr },
  };
}

/** Screenshot, or a clearly marked placeholder until one is added in content/projects.ts. */
function Screenshot({ shot }: { shot: NonNullable<Writeup["sections"][number]["screenshots"]>[number] }) {
  return (
    <figure>
      {shot.src ? (
        <div
          className="relative w-full overflow-hidden border border-stroke bg-surface"
          style={{ aspectRatio: shot.width && shot.height ? `${shot.width} / ${shot.height}` : "16 / 10" }}
        >
          <Image
            src={shot.src}
            alt={shot.alt ?? shot.label}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-contain"
          />
        </div>
      ) : (
        // TODO: placeholder. Replace by setting `src` on this screenshot in content/projects.ts.
        <div className="flex aspect-[16/10] w-full items-center justify-center border border-dashed border-stroke bg-surface">
          <span className="label text-muted">Screenshot to come</span>
        </div>
      )}
      <figcaption className="label mt-3 text-muted">{shot.label}</figcaption>
    </figure>
  );
}

function WriteupBody({ writeup }: { writeup: Writeup }) {
  return (
    <div className="mt-16 md:mt-24">
      {writeup.sections.map((s) => (
        <div key={s.heading}>
          <FadeUp>
            <section className="grid gap-4 border-t border-stroke py-10 md:grid-cols-12">
              <h2 className="text-2xl tracking-tight md:col-span-4 md:text-3xl">{s.heading}</h2>
              <div className="md:col-span-8">
                {s.body && <p className="text-xl leading-relaxed">{s.body}</p>}
                {s.bullets && (
                  <ul className="mt-6 space-y-5">
                    {s.bullets.map((b) => (
                      <li key={b.text} className="flex gap-4 text-lg leading-relaxed text-cream/90">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-cream/50" aria-hidden="true" />
                        <span>
                          {b.lead && <span className="text-cream">{b.lead} </span>}
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </FadeUp>

          {s.screenshots && (
            <FadeUp>
              <div className="mb-10 grid gap-6 md:grid-cols-2">
                {s.screenshots.map((shot) => (
                  <Screenshot key={shot.label} shot={shot} />
                ))}
              </div>
            </FadeUp>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-4 border-t border-stroke py-10 md:grid md:grid-cols-12">
        <p className="label text-muted md:col-span-4">Built with</p>
        <div className="md:col-span-8">
          <ul className="flex flex-wrap gap-2">
            {writeup.builtWith.map((t) => (
              <li key={t}>
                <StatusPill status={t} />
              </li>
            ))}
          </ul>
          {writeup.note && <p className="mt-4 text-sm text-muted">{writeup.note}</p>}
        </div>
      </div>
    </div>
  );
}

/** Map list lines onto the case study outline. */
const LINE_TO_SECTION: Record<string, string> = {
  Problem: "Users & problem",
  "What I learned": "Research",
  "What I decided": "Decision & tradeoffs",
  Approach: "Decision & tradeoffs",
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
      <main id="main" className="bg-ink pt-32 md:pt-40">
        <article className="shell">
          <Link
            href="/#work"
            className="label text-muted transition-colors duration-300 hover:text-cream"
          >
            {project.writeup ? "← Back to work" : "← All work"}
          </Link>

          <header className="mt-10 max-w-4xl">
            {project.meta && <p className="label mb-5 text-muted">{project.meta}</p>}
            <h1 className=" text-5xl leading-[1.02] tracking-tight md:text-7xl">
              <Emph text={project.title} word={project.italic} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-cream/85">{project.tldr}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <StatusPill status={project.status} />
              <span className="label text-muted">{project.tags.join(" · ")}</span>
            </div>
          </header>

          {project.writeup ? (
            <WriteupBody writeup={project.writeup} />
          ) : (
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
          )}

          {project.writeup && (
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-lg text-cream underline decoration-cream/40 underline-offset-4 transition-opacity duration-300 hover:opacity-60"
            >
              Get in touch →
            </a>
          )}

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
              className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cream"
              aria-hidden="true"
            />
          </Link>
        </article>

        <ContactSection />
      </main>
    </>
  );
}
