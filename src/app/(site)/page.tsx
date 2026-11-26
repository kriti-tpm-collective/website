import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { EventCard } from "@/components/EventCard";
import { EventsEmptyState } from "@/components/EventsEmptyState";
import { HonorsMarquee } from "@/components/HonorsMarquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RotatingWord } from "@/components/RotatingWord";
import { Scribble } from "@/components/Scribble";
import { StickyBoard } from "@/components/StickyBoard";
import { WatermelonTest } from "@/components/WatermelonTest";
import { StoryCard } from "@/components/StoryCard";
import { listPublishedStories } from "@/lib/community-store";
import {
  getArticles,
  getEvents,
  getResources,
  getSiteSettings,
} from "@/lib/content";

const resourceTilts = ["md:-rotate-1", "md:rotate-1", "md:rotate-[0.5deg]", "md:-rotate-[0.5deg]"];

function SectionHeading({
  kicker,
  title,
  href,
  linkLabel,
}: {
  kicker: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-hand text-2xl text-ink-muted">{kicker}</p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.04em] text-ink md:text-5xl">
          {title}
        </h2>
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-semibold text-ink underline decoration-signal-amber decoration-2 underline-offset-4"
        >
          {linkLabel}
          <span className="transition group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}

export default async function HomePage() {
  const [settings, articles, events, resources, stories] = await Promise.all([
    getSiteSettings(),
    getArticles(),
    getEvents(),
    getResources(),
    listPublishedStories(),
  ]);

  const issueNumber = (id: string) => articles.length - articles.findIndex((a) => a._id === id);
  const [lead, ...restFeatured] = articles.filter((article) => article.featured);
  const secondary = restFeatured[0];
  const latest = articles.filter((a) => a._id !== lead?._id && a._id !== secondary?._id).slice(0, 4);
  const nextEvent = events[0];
  const featuredResources = resources.filter((resource) => resource.featured).slice(0, 2);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-14 py-16 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:py-24">
          <div>
            <h1 className="font-display animate-fade-up text-[3.25rem] leading-[0.95] font-extrabold tracking-[-0.055em] text-ink sm:text-7xl lg:text-[4.4rem] xl:text-[5.4rem]">
              Make hard things
              <br />
              <em className="font-serif font-normal tracking-[-0.035em] italic">
                <Scribble>
                  <RotatingWord words={["move.", "ship.", "land.", "make sense."]} />
                </Scribble>
              </em>
            </h1>

            <p className="animate-fade-up-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
              {settings.mission}
            </p>

            <div className="animate-fade-up-delay-2 mt-9 flex flex-wrap gap-3">
              <Link href="/articles" className="btn-primary">
                Read the field notes
              </Link>
              <Link href="/#newsletter" className="btn-secondary">
                Subscribe
              </Link>
            </div>

            <p className="animate-fade-up-delay-2 mt-8 text-sm text-ink-faint">
              Written by a working TPM.{" "}
              <span className="font-semibold text-ink-muted">Not a content calendar.</span>
            </p>
          </div>

          <div className="animate-fade-up-delay">
            <StickyBoard />
          </div>
        </div>
      </section>

      <HonorsMarquee />

      {lead ? (
        <section className="container-page py-20 md:py-24">
          <SectionHeading
            kicker="start here →"
            title="Fresh from the field"
            href="/articles"
            linkLabel="All articles"
          />

          <div className={`grid gap-8 ${secondary ? "lg:grid-cols-[1.35fr_1fr] lg:gap-10" : ""}`}>
            <div className="paper-card p-7 md:p-10">
              <span className="tape" aria-hidden="true" />
              <ArticleCard article={lead} large number={issueNumber(lead._id)} />
            </div>
            {secondary ? (
              <div className="paper-card bg-sticky-blue/40 p-7 md:p-8 lg:mt-10 lg:rotate-1">
                <ArticleCard article={secondary} number={issueNumber(secondary._id)} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <WatermelonTest />

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          kicker="small rooms, sharp questions"
          title={nextEvent ? "Upcoming gathering" : "Gatherings"}
          href="/events"
          linkLabel="View all events"
        />
        {nextEvent ? <EventCard event={nextEvent} /> : <EventsEmptyState />}
      </section>

      {featuredResources.length > 0 ? (
        <section className="border-y-[1.5px] border-ink bg-bg-deep">
          <div className="container-page py-20 md:py-24">
            <SectionHeading
              kicker="steal these. really."
              title="The toolkit"
              href="/resources"
              linkLabel="Browse all"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {featuredResources.map((resource, index) => (
                <Link
                  key={resource._id}
                  href={`/resources/${resource.slug}`}
                  className={`paper-card group block p-7 ${resourceTilts[index % resourceTilts.length]}`}
                >
                  <span className="inline-block rounded-md bg-sticky-yellow px-2 py-0.5 text-xs font-bold tracking-[0.08em] text-ink uppercase">
                    {resource.category}
                  </span>
                  <h3 className="font-display mt-4 text-2xl font-bold tracking-[-0.03em] text-ink">
                    {resource.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{resource.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                    Open it
                    <span className="transition group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          kicker="before the panel"
          title="Prepare for the interview"
          href="/prepare"
          linkLabel="Open the playbook"
        />
        <Link
          href="/prepare"
          className="paper-card group grid gap-6 p-7 no-underline md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-9"
        >
          <div>
            <p className="inline-block rounded-md bg-sticky-pink px-2 py-0.5 text-xs font-bold tracking-[0.08em] text-ink uppercase">
              6 pillars · 27 skills
            </p>
            <h3 className="font-display mt-4 text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              Theory and tools for the questions after your STAR story
            </h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-muted">
              Principles, frameworks, metrics, and 60-second answers — organized the way Sr. TPM
              interviews actually probe.
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink">
              Start preparing
              <span className="transition group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {["A", "B", "C", "D", "E", "F"].map((letter, index) => (
              <span
                key={letter}
                className={`font-display flex aspect-square items-center justify-center rounded-2xl border-[1.5px] border-ink text-xl font-extrabold ${
                  [
                    "bg-sticky-blue",
                    "bg-sticky-mint",
                    "bg-sticky-yellow",
                    "bg-sticky-pink",
                    "bg-accent-soft",
                    "bg-bg-deep",
                  ][index]
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </Link>
      </section>

      {latest.length > 0 ? (
        <section className="container-page py-20 md:py-24">
          <SectionHeading
            kicker="more from the notebook"
            title="Latest writing"
            href="/articles"
            linkLabel="More"
          />
          <div className="divide-y-[1.5px] divide-dashed divide-ink/20">
            {latest.map((article) => (
              <div key={article._id} className="py-8 first:pt-0 last:pb-0">
                <ArticleCard article={article} number={issueNumber(article._id)} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          kicker="anyone with an account"
          title="Blogs"
          href="/blogs"
          linkLabel="All blogs"
        />
        {stories.length === 0 ? (
          <div className="rounded-[18px] border-[1.5px] border-dashed border-ink/30 bg-surface px-6 py-8 md:px-8">
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
              Member stories, written in a quiet editor and published when they are ready.
            </p>
            <Link href="/write" className="btn-primary mt-5">
              Write a story
            </Link>
          </div>
        ) : (
          <div className="divide-y-[1.5px] divide-dashed divide-ink/20">
            {stories.slice(0, 3).map((story) => (
              <div key={story.id} className="py-8 first:pt-0 last:pb-0">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container-page pb-20 md:pb-28">
        <NewsletterForm blurb={settings.newsletterBlurb} />
      </section>
    </div>
  );
}
