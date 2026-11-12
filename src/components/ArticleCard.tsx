import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";

export function ArticleCard({
  article,
  large = false,
}: {
  article: Article;
  large?: boolean;
}) {
  return (
    <article className="group">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-faint">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTimeMinutes} min read</span>
      </div>

      <h3
        className={`mt-2.5 font-semibold tracking-[-0.025em] text-ink transition-colors group-hover:text-accent ${
          large ? "text-[1.65rem] leading-snug md:text-[1.85rem]" : "text-xl leading-snug"
        }`}
      >
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>

      <p
        className={`mt-3 leading-relaxed text-ink-muted ${
          large ? "text-base md:text-[1.05rem]" : "text-[0.95rem]"
        }`}
      >
        {article.excerpt}
      </p>

      {article.topics.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.topics.map((topic) => (
            <span
              key={topic.slug}
              className="rounded-full bg-bg px-2.5 py-1 text-xs font-medium text-ink-muted"
            >
              {topic.title}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
