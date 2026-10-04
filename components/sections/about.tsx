import { Eyebrow } from "@/components/ui/editorial";
import { FadeUp } from "@/components/ui/fade-up";

const principles = [
  {
    title: "Talk to users before building",
    body: "I ask what someone does every morning before I ask what they want built.",
  },
  {
    title: "Scope the smallest useful thing",
    body: "One Telegram message beat a dashboard for the Daily Cash Agent.",
  },
  {
    title: "Write it down",
    body: "PRDs and one-pagers, so we disagree on paper instead of in production.",
  },
  {
    title: "Stay technical enough to prototype it myself",
    body: "Claude Code, n8n, and APIs mean an idea gets tested this week, not next quarter.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-10">
        <FadeUp className="md:col-span-5">
          <Eyebrow index="03" label="About" />
          <h2 className="mt-5 font-display text-5xl italic tracking-tight md:text-6xl">About</h2>
          <div className="mt-8 space-y-5 leading-relaxed text-cream/85">
            <p>
              I&apos;m a junior at Babson studying Business with a concentration in Technology
              Entrepreneurship. I&apos;m Partnerships Lead at The Generator, Babson&apos;s AI lab,
              and Student Lead for the AI &amp; Small Business Bootcamp (G1000 Program).
            </p>
            <p>
              Building custom AI workflows for two paying clients ($3,000+ in revenue) taught me
              the PM part fast: most clients ask for a tool, but what they need is a clearer
              problem.
            </p>
          </div>
        </FadeUp>

        <FadeUp className="md:col-span-7" delay={0.08}>
          <p className="label text-muted">How I work</p>
          <ul className="mt-5 border-b border-stroke">
            {principles.map((p) => (
              <li key={p.title} className="border-t border-stroke py-5">
                <p className="font-medium">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
