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
        className="text-sm font-medium text-ink-muted transition hover:text-accent"
      >
        ← Events
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">
          {event.locationType.replace("-", " ")}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-brand md:text-5xl">
          {event.title}
        </h1>
        <p className="mt-5 text-lg text-ink-muted">{event.summary}</p>
        <dl className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface p-6 text-sm sm:grid-cols-2">
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
