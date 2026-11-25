import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { topicChipColor } from "@/components/ArticleCard";
import { PortableBody } from "@/components/PortableBody";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getArticleBySlug, getArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <ReadingProgress />
      <Link
        href="/articles"
        className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <span className="transition group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Articles
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-ink-faint">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-[-0.045em] text-ink md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-muted">{article.excerpt}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <span
            className="font-display grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-ink bg-sticky-yellow font-bold text-ink"
            aria-hidden="true"
          >
            {article.author.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <span className="font-semibold text-ink">{article.author.name}</span>
          {article.author.role ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{article.author.role}</span>
            </>
          ) : null}
        </div>
        <div className="mt-9 border-t-[1.5px] border-dashed border-ink/25" />
      </header>

      <div className="mt-10">
        <PortableBody value={article.body} />
      </div>

      {article.topics.length > 0 ? (
        <footer className="mt-14 border-t-[1.5px] border-dashed border-ink/25 pt-8">
          <p className="font-hand text-2xl text-ink-muted">filed under</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {article.topics.map((topic) => (
              <span
                key={topic.slug}
                className={`${topicChipColor(topic.slug)} rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink`}
              >
                {topic.title}
              </span>
            ))}
          </div>
        </footer>
      ) : null}

      <aside className="mt-12 flex flex-col gap-4 rounded-[18px] border-[1.5px] border-ink bg-sticky-yellow p-6 shadow-[4px_4px_0_var(--ink)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
            Useful? There’s more where this came from.
          </p>
          <p className="mt-1 text-sm text-ink/70">New field notes, straight to your inbox.</p>
        </div>
        <Link href="/#newsletter" className="btn-primary shrink-0">
          Subscribe
        </Link>
      </aside>
    </article>
  );
}
