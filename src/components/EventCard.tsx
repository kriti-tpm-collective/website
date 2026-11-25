import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import type { EventItem } from "@/lib/types";

export function EventCard({ event }: { event: EventItem }) {
  const start = new Date(event.startDate);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(start);
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(start);

  return (
    <article className="paper-card group grid gap-6 p-6 sm:grid-cols-[auto_1fr] md:p-8">
      <div
        className="w-20 overflow-hidden rounded-xl border-[1.5px] border-ink bg-surface text-center"
        aria-hidden="true"
      >
        <div className="bg-signal-red py-1 text-xs font-bold tracking-[0.16em] text-white uppercase">
          {month}
        </div>
        <div className="font-display py-2 text-3xl font-bold text-ink">{day}</div>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-ink-faint">
          <span className="rounded-full bg-sticky-mint px-2.5 py-0.5 font-semibold text-ink capitalize">
            {event.locationType.replace("-", " ")}
          </span>
          <time dateTime={event.startDate}>{formatDateTime(event.startDate)}</time>
        </div>
        <h3 className="font-display mt-3 text-2xl font-bold tracking-[-0.03em] text-ink">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {event.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ink-muted">{event.summary}</p>
        <p className="mt-4 text-sm text-ink-faint">{event.location}</p>
      </div>
    </article>
  );
}
