import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorMark } from "@/components/AuthorMark";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryBody } from "@/components/StoryBody";
import { getCurrentUser } from "@/lib/auth";
import { getStoryBySlug } from "@/lib/community-store";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const user = await getCurrentUser();
  const story = await getStoryBySlug(slug, user?.id);
  if (!story) return { title: "Story" };
  return {
    title: story.title || "Untitled",
    description: story.subtitle || `A story by ${story.author.name} on TPM Collective.`,
    robots: story.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

export default async function BlogStoryPage({ params }: Props) {
  const { slug } = await params;
  const user = await getCurrentUser();
  const story = await getStoryBySlug(slug, user?.id);
  if (!story) notFound();

  const when = story.publishedAt ?? story.updatedAt;
  const isAuthor = user?.id === story.author.id;

  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <ReadingProgress />
      <Link
        href="/blogs"
        className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <span className="transition group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Blogs
      </Link>

      {story.status === "draft" ? (
        <p className="mt-6 rounded-xl border-[1.5px] border-ink bg-sticky-pink px-4 py-3 text-sm font-semibold text-ink">
          This draft is only visible to you.
        </p>
      ) : null}

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-ink-faint">
          <time dateTime={when}>{formatDate(when)}</time>
          <span aria-hidden="true">·</span>
          <span>{story.readingTimeMinutes} min read</span>
        </div>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-[-0.045em] text-ink md:text-6xl">
          {story.title || "Untitled"}
        </h1>
        {story.subtitle ? <p className="mt-6 text-xl leading-relaxed text-ink-muted">{story.subtitle}</p> : null}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <Link href={`/authors/${story.author.id}`} className="flex items-center gap-3 text-sm">
            <AuthorMark name={story.author.name} />
            <span className="font-semibold text-ink">{story.author.name}</span>
          </Link>
          {isAuthor ? (
            <Link href={`/write/${story.id}`} className="btn-secondary !min-h-9 !px-4 !text-sm">
              Edit
            </Link>
          ) : null}
        </div>
        <div className="mt-9 border-t-[1.5px] border-dashed border-ink/25" />
      </header>

      <div className="mt-10">
        {story.body.trim() ? (
          <StoryBody body={story.body} />
        ) : (
          <p className="text-lg text-ink-muted">This story does not have a body yet.</p>
        )}
      </div>
    </article>
  );
}
