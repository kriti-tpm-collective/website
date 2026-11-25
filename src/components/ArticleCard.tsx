import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";

const chipColors = ["bg-sticky-yellow", "bg-sticky-mint", "bg-sticky-blue", "bg-sticky-pink"];

export function topicChipColor(slug: string): string {
  const hash = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return chipColors[hash % chipColors.length];
}

export function ArticleCard({
  article,
  large = false,
  number,
}: {
  article: Article;
  large?: boolean;
  number?: number;
}) {
  return (
    <article className="group relative">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-ink-faint">
        {number !== undefined ? (
          <>
            <span className="font-hand text-xl text-ink-muted">
              No. {String(number).padStart(2, "0")}
            </span>
            <span aria-hidden="true">·</span>
          </>
        ) : null}
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTimeMinutes} min read</span>
      </div>

      <h3
        className={`font-display mt-2.5 font-bold tracking-[-0.03em] text-ink ${
          large ? "text-[1.75rem] leading-[1.15] md:text-[2.1rem]" : "text-[1.35rem] leading-snug"
        }`}
      >
        <Link
          href={`/articles/${article.slug}`}
          className="bg-[linear-gradient(var(--sticky-yellow),var(--sticky-yellow))] bg-[length:0%_0.4em] bg-[position:0_88%] bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_0.4em] after:absolute after:inset-0 after:content-['']"
        >
          {article.title}
        </Link>
      </h3>

      <p
        className={`mt-3 leading-relaxed text-ink-muted ${
          large ? "text-base md:text-[1.075rem]" : "text-[0.95rem]"
        }`}
      >
        {article.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {article.topics.map((topic) => (
          <span
            key={topic.slug}
            className={`${topicChipColor(topic.slug)} rounded-full border border-ink/15 px-2.5 py-1 text-xs font-semibold text-ink`}
          >
            {topic.title}
          </span>
        ))}
        <span
          className="ml-auto translate-x-0 text-sm font-semibold text-ink opacity-0 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
          aria-hidden="true"
        >
          Read →
        </span>
      </div>
    </article>
  );
}
