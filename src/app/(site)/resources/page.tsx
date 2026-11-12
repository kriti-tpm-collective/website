import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Templates, frameworks, and guides for Technical Program Managers — practical tools for complex programs.",
};

export default async function ResourcesPage() {
  const resources = await getResources();
  const categories = [...new Set(resources.map((resource) => resource.category))];

  return (
    <div className="container-page py-14 md:py-20">
      <PageIntro
        title="Resources"
        description="Templates, frameworks, and guides you can put to work on your next program."
      />

      <div className="mt-12 space-y-12 md:mt-16">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-brand">
              {category}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource) => (
                  <Link
                    key={resource._id}
                    href={`/resources/${resource.slug}`}
                    className="rounded-2xl border border-line bg-surface p-6 transition hover:border-line-strong hover:shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {resource.summary}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-accent">
                      Open resource →
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
