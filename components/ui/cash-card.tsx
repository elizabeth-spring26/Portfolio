/**
 * A recreated Telegram-style report from the Daily Cash Agent, built in HTML.
 * The figures are invented sample data and are labelled as such; the real
 * client screenshot stays only in the testimonial lightbox.
 */
const rows = [
  { label: "Current balance", value: "$12,480.00" },
  { label: "Pending charges", value: "$1,215.40" },
  { label: "Net tomorrow", value: "$11,264.60" },
];

export function CashCard({ className }: { className?: string }) {
  return (
    <figure
      className={`relative flex flex-col justify-end overflow-hidden border border-stroke bg-[#0f1a21] p-5 ${className ?? ""}`}
      aria-label="Example Daily Cash Agent message with sample data"
    >
      <span className="label absolute right-3 top-3 rounded-full border border-cream/20 px-2 py-0.5 text-[9px] text-cream/60">
        Sample data
      </span>

      {/* Chat header */}
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b8fd6] font-mono text-[11px] text-white"
          aria-hidden="true"
        >
          DC
        </span>
        <div className="leading-tight">
          <p className="text-sm text-cream">dailycashbot</p>
          <p className="text-[11px] text-cream/45">bot</p>
        </div>
      </div>

      {/* Message bubble */}
      <div className="max-w-[300px] rounded-2xl rounded-bl-sm bg-[#1d2c38] px-4 py-3 text-sm text-cream shadow-sm">
        <p className="font-medium">Operating account</p>
        <dl className="mt-2 space-y-1">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-6">
              <dt className="text-cream/70">{r.label}</dt>
              <dd className="tnum">{r.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-right text-[11px] text-cream/40">6:45 AM</p>
      </div>
    </figure>
  );
}
