import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import type { EventItem } from "@/lib/types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-ink-faint">
        <span className="font-medium text-accent">
          {event.locationType.replace("-", " ")}
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={event.startDate}>{formatDateTime(event.startDate)}</time>
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
        <Link href={`/events/${event.slug}`} className="hover:text-accent">
          {event.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-ink-muted">{event.summary}</p>
      <p className="mt-4 text-sm text-ink-faint">{event.location}</p>
    </article>
  );
}
