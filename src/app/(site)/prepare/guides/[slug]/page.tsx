import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/prepare/ContentBlocks";
import { getOverviewBySlug, getOverviews } from "@/content/prepare";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getOverviews().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getOverviewBySlug(slug);
  if (!guide) return { title: "Guide" };
  return {
    title: guide.title,
    description: `Interview prep guide: ${guide.title}`,
  };
}

export default async function PrepareGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getOverviewBySlug(slug);
  if (!guide) notFound();

  const guides = getOverviews();
  const index = guides.findIndex((item) => item.slug === slug);
  const prev = guides[index - 1];
  const next = guides[index + 1];

  return (
    <article className="container-page max-w-3xl py-12 md:py-16">
      <Link
        href="/prepare"
        className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <span className="transition group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Prepare
      </Link>

      <header className="mt-8">
        <p className="font-hand inline-block -rotate-2 rounded-md bg-sticky-yellow px-3 py-0.5 text-xl text-ink">
          start here · {index + 1} of {guides.length}
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.045em] text-ink md:text-5xl">
          {guide.title}
        </h1>
        <div className="mt-8 border-t-[1.5px] border-dashed border-ink/25" />
      </header>

      <div className="mt-10">
        <ContentBlocks blocks={guide.blocks} />
      </div>

      <nav className="mt-14 flex flex-col gap-4 border-t-[1.5px] border-dashed border-ink/25 pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <Link href={`/prepare/guides/${prev.slug}`} className="text-sm font-semibold text-ink">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/prepare/guides/${next.slug}`}
            className="text-sm font-semibold text-ink sm:text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <Link href="/prepare#pillars" className="text-sm font-semibold text-ink sm:text-right">
            Browse the pillars →
          </Link>
        )}
      </nav>
    </article>
  );
}
