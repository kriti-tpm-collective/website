import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { EventCard } from "@/components/EventCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  getArticles,
  getEvents,
  getResources,
  getSiteSettings,
} from "@/lib/content";

export default async function HomePage() {
  const [settings, articles, events, resources] = await Promise.all([
    getSiteSettings(),
    getArticles(),
    getEvents(),
    getResources(),
  ]);

  const [lead, ...restFeatured] = articles.filter((article) => article.featured);
  const secondary = restFeatured[0];
  const latest = articles.filter((a) => a._id !== lead?._id && a._id !== secondary?._id).slice(0, 4);
  const nextEvent = events[0];
  const featuredResources = resources.filter((resource) => resource.featured).slice(0, 2);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_-10%,rgba(26,95,255,0.06),transparent_50%)]"
          aria-hidden="true"
        />
        <div className="container-page relative py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="animate-fade-up mb-8 flex items-center gap-3">
              <Image
                src="/brand/tpm-collective-logo.png"
                alt=""
                width={44}
                height={44}
                priority
                className="h-11 w-11 rounded-lg object-cover"
              />
              <p className="text-sm font-medium text-ink-muted">{settings.tagline}</p>
            </div>
            <h1 className="animate-fade-up-delay text-5xl font-semibold tracking-[-0.045em] text-brand md:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
              TPM Collective
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
              {settings.mission}
            </p>
            <div className="animate-fade-up-delay-2 mt-9 flex flex-wrap gap-3">
              <Link href="/articles" className="btn-primary">
                Read the latest
              </Link>
              <Link href="/#newsletter" className="btn-secondary">
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {lead ? (
        <section className="container-page py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-brand md:text-3xl">
              Featured
            </h2>
            <Link
              href="/articles"
              className="text-sm font-medium text-ink-muted transition hover:text-accent"
            >
              All articles
            </Link>
          </div>

          <div className={`grid gap-12 ${secondary ? "lg:grid-cols-[1.35fr_1fr] lg:gap-16" : ""}`}>
            <ArticleCard article={lead} large />
            {secondary ? (
              <div className="border-t border-line pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
                <ArticleCard article={secondary} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {nextEvent ? (
        <section className="border-y border-line bg-surface">
          <div className="container-page grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:py-20">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-brand md:text-3xl">
                Upcoming event
              </h2>
              <p className="mt-3 max-w-md text-ink-muted">
                Conversations for people who run complex technical programs.
              </p>
              <Link
                href="/events"
                className="mt-5 inline-block text-sm font-medium text-accent hover:text-accent-hover"
              >
                View all events
              </Link>
            </div>
            <EventCard event={nextEvent} />
          </div>
        </section>
      ) : null}

      {featuredResources.length > 0 ? (
        <section className="container-page py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-brand md:text-3xl">
              Resources
            </h2>
            <Link
              href="/resources"
              className="text-sm font-medium text-ink-muted transition hover:text-accent"
            >
              Browse all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredResources.map((resource) => (
              <Link
                key={resource._id}
                href={`/resources/${resource.slug}`}
                className="rounded-2xl border border-line bg-surface p-6 transition hover:border-line-strong hover:shadow-[var(--shadow-soft)]"
              >
                <p className="text-xs font-medium tracking-[0.04em] text-accent uppercase">
                  {resource.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{resource.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {latest.length > 0 ? (
        <section className="border-t border-line bg-surface">
          <div className="container-page py-16 md:py-20">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-brand md:text-3xl">
                Latest writing
              </h2>
              <Link
                href="/articles"
                className="text-sm font-medium text-ink-muted transition hover:text-accent"
              >
                More
              </Link>
            </div>
            <div className="divide-y divide-line">
              {latest.map((article) => (
                <div key={article._id} className="py-8 first:pt-0 last:pb-0">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-page py-16 md:py-24">
        <NewsletterForm blurb={settings.newsletterBlurb} />
      </section>
    </div>
  );
}
