import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Templates, frameworks, and guides for Technical Program Managers — practical tools for complex programs.",
};

const categoryColors = ["bg-sticky-yellow", "bg-sticky-mint", "bg-sticky-pink", "bg-sticky-blue"];

export default async function ResourcesPage() {
  const resources = await getResources();
  const categories = [...new Set(resources.map((resource) => resource.category))];

  return (
    <div className="container-page py-14 md:py-20">
      <PageIntro
        eyebrow="steal these. really."
        title="Resources"
        description="Templates, frameworks, and guides you can put to work on your next program."
      />

      <div className="mt-12 space-y-14 md:mt-16">
        {categories.map((category, categoryIndex) => (
          <section key={category}>
            <h2 className="font-display flex items-center gap-3 text-2xl font-bold tracking-[-0.03em] text-ink">
              <span
                className={`${categoryColors[categoryIndex % categoryColors.length]} h-4 w-4 rounded-full border-[1.5px] border-ink`}
                aria-hidden="true"
              />
              {category}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource) => (
                  <Link
                    key={resource._id}
                    href={`/resources/${resource.slug}`}
                    className="paper-card group block p-6 md:p-7"
                  >
                    <h3 className="font-display text-xl font-bold tracking-[-0.025em] text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{resource.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                      Open resource
                      <span className="transition group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
