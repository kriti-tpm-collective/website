import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/PortableBody";
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
      <Link
        href="/articles"
        className="text-sm font-medium text-ink-muted transition hover:text-accent"
      >
        ← Articles
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-faint">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-brand md:text-5xl md:leading-[1.12]">
          {article.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <span className="font-medium text-ink">{article.author.name}</span>
          {article.author.role ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{article.author.role}</span>
            </>
          ) : null}
        </div>
        <div className="mt-8 h-px bg-line" />
      </header>

      <div className="mt-10">
        <PortableBody value={article.body} />
      </div>

      {article.topics.length > 0 ? (
        <footer className="mt-14 border-t border-line pt-8">
          <div className="flex flex-wrap gap-2">
            {article.topics.map((topic) => (
              <span
                key={topic.slug}
                className="rounded-full bg-bg px-3 py-1.5 text-xs font-medium text-ink-muted"
              >
                {topic.title}
              </span>
            ))}
          </div>
        </footer>
      ) : null}
    </article>
  );
}
