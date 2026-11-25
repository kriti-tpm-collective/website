import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/PortableBody";
import { getEventBySlug, getEvents } from "@/lib/content";
import { formatDateTime } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <Link
        href="/events"
        className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <span className="transition group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Events
      </Link>

      <header className="mt-8">
        <p className="inline-block rounded-full bg-sticky-mint px-3 py-1 text-sm font-semibold text-ink capitalize">
          {event.locationType.replace("-", " ")}
        </p>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-[-0.045em] text-ink md:text-6xl">
          {event.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-muted">{event.summary}</p>
        <dl className="paper-card mt-8 grid gap-4 p-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-faint">When</dt>
            <dd className="mt-1 font-medium text-ink">
              <time dateTime={event.startDate}>{formatDateTime(event.startDate)}</time>
            </dd>
          </div>
          <div>
            <dt className="text-ink-faint">Where</dt>
            <dd className="mt-1 font-medium text-ink">{event.location}</dd>
          </div>
        </dl>
        {event.registrationUrl ? (
          <a href={event.registrationUrl} className="btn-primary mt-8">
            Register
          </a>
        ) : null}
      </header>

      {event.body?.length ? (
        <div className="mt-10">
          <PortableBody value={event.body} />
        </div>
      ) : null}
    </article>
  );
}
