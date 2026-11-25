import Link from "next/link";

export function EventsEmptyState() {
  return (
    <div className="paper-card grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:items-center md:p-9">
      <div
        className="hover-wiggle mx-auto w-28 overflow-hidden rounded-xl border-[1.5px] border-ink bg-surface text-center shadow-[var(--shadow-pop)] sm:mx-0"
        aria-hidden="true"
      >
        <div className="bg-signal-red py-1 text-xs font-bold tracking-[0.18em] text-white uppercase">
          TBD
        </div>
        <div className="font-display py-3 text-4xl font-bold text-ink">??</div>
      </div>
      <div>
        <p className="font-hand text-2xl text-ink-muted">status: finding a time that works for everyone</p>
        <h3 className="font-display mt-1 text-2xl font-bold tracking-[-0.02em] text-ink">
          Nothing on the calendar — yet.
        </h3>
        <p className="mt-2 max-w-lg leading-relaxed text-ink-muted">
          Small rooms, sharp questions, zero networking theater. The first gatherings are being
          planned now. Newsletter folks hear first.
        </p>
        <Link
          href="/#newsletter"
          className="mt-4 inline-block font-semibold text-accent underline decoration-2 underline-offset-4 hover:text-accent-hover"
        >
          Save me a seat →
        </Link>
      </div>
    </div>
  );
}
