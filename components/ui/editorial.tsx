import { cn } from "@/lib/utils";

/** Sets exactly one word of a heading in display italic. */
export function Emph({ text, word }: { text: string; word: string }) {
  const i = text.indexOf(word);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-display italic font-normal tracking-normal">{word}</span>
      {text.slice(i + word.length)}
    </>
  );
}

/** `01 / Work`, with a short hairline before it. */
export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="label flex items-center gap-3 text-muted">
      <span className="h-px w-8 bg-stroke" aria-hidden="true" />
      {index} / {label}
    </p>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  italic,
  sub,
  className,
}: {
  index: string;
  label: string;
  title: string;
  italic: string;
  sub?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <Eyebrow index={index} label={label} />
      <h2 className="mt-5 text-4xl md:text-6xl tracking-tight leading-[1.02]">
        <Emph text={title} word={italic} />
      </h2>
      {sub && <p className="mt-4 max-w-xl text-muted">{sub}</p>}
    </header>
  );
}

/** Outlined, never filled: status reads as metadata, not decoration. */
export function StatusPill({ status }: { status: string }) {
  return (
    <span className="label inline-flex items-center rounded-full border border-stroke px-3 py-1 text-[10px] text-cream/80">
      {status}
    </span>
  );
}
