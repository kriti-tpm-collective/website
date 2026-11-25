import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { PageIntro } from "@/components/PageIntro";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Essays and field notes on technical program management — alignment, risk, delivery, and leadership.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container-page py-14 md:py-20">
      <PageIntro
        eyebrow="field notes, not thought leadership"
        title="Articles"
        description="Field notes from Kriti Thakur on technical program management — alignment, risk, delivery, and the craft of leading complex work."
      />
      <div className="mt-12 divide-y-[1.5px] divide-dashed divide-ink/20 md:mt-16">
        {articles.map((article, index) => (
          <div key={article._id} className="py-10 first:pt-0">
            <ArticleCard article={article} large number={articles.length - index} />
          </div>
        ))}
      </div>
    </div>
  );
}
