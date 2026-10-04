import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { Emph, SectionHeading, StatusPill } from "@/components/ui/editorial";
import { FadeUp } from "@/components/ui/fade-up";
import { CashCard } from "@/components/ui/cash-card";

function Row({ project, index }: { project: Project; index: number }) {
  const { slug, title, italic, tags, status, lines, image, visual } = project;

  return (
    <FadeUp>
      <article className="group relative grid gap-6 border-t border-stroke py-10 md:grid-cols-12">
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
          <div className="mt-4">
            <StatusPill status={status} />
          </div>

          {/* Always visible, at every width. */}
          {visual === "cash-card" && <CashCard className="mt-6 aspect-[4/3] w-full max-w-[380px]" />}
          {image && (
            <div className="relative mt-6 aspect-[4/3] w-full max-w-[380px] overflow-hidden border border-stroke">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 380px, 100vw"
                className="object-cover"
                style={{ objectPosition: image.position ?? "50% 50%" }}
              />
            </div>
          )}
        </div>

        <dl className="space-y-4 md:col-span-6">
          {lines.map((l) => (
            <div key={l.label}>
              <dt className="label text-muted">{l.label}</dt>
              <dd className="mt-1 leading-relaxed text-cream/90">{l.text}</dd>
            </div>
          ))}
        </dl>
      </article>
    </FadeUp>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="bg-forest py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Work"
          title="Selected work"
          italic="work"
        />

        <div className="border-b border-stroke">
          {projects.map((p, i) => (
            <Row key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
