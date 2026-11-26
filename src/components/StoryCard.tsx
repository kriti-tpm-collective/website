import Link from "next/link";
import { AuthorMark } from "@/components/AuthorMark";
import { formatDate } from "@/lib/format";
import type { StorySummary } from "@/lib/community-store";

export function StoryCard({
  story,
  showStatus = false,
}: {
  story: StorySummary;
  showStatus?: boolean;
}) {
  const href = story.status === "published" ? `/blogs/${story.slug}` : `/write/${story.id}`;
  const when = story.publishedAt ?? story.updatedAt;
  const title = story.title || "Untitled";

  return (
    <article className="group">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-ink-faint">
        <time dateTime={when}>{formatDate(when)}</time>
        <span aria-hidden="true">·</span>
        <span>{story.readingTimeMinutes} min read</span>
        {showStatus ? (
          <span
            className={`rounded-full border border-ink/15 px-2 py-0.5 text-[11px] font-bold tracking-[0.04em] uppercase ${
              story.status === "published" ? "bg-sticky-mint text-ink" : "bg-sticky-pink text-ink"
            }`}
          >
            {story.status}
          </span>
        ) : null}
      </div>
      <h3 className="font-display mt-2.5 text-[1.75rem] leading-[1.15] font-bold tracking-[-0.03em] text-ink md:text-[2.1rem]">
        <Link
          href={href}
          className="bg-[linear-gradient(var(--sticky-yellow),var(--sticky-yellow))] bg-[length:0%_0.4em] bg-[position:0_88%] bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_0.4em]"
        >
          {title}
        </Link>
      </h3>
      {story.subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-[1.075rem]">{story.subtitle}</p>
      ) : null}
      <div className="mt-4 flex items-center gap-2.5 text-sm">
        <AuthorMark name={story.author.name} size="sm" />
        <Link href={`/authors/${story.author.id}`} className="font-semibold text-ink hover:underline">
          {story.author.name}
        </Link>
      </div>
    </article>
  );
}
