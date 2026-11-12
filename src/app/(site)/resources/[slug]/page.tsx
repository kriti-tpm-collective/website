import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/PortableBody";
import { getResourceBySlug, getResources } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return { title: "Resource" };
  return {
    title: resource.title,
    description: resource.summary,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <Link
        href="/resources"
        className="text-sm font-medium text-ink-muted transition hover:text-accent"
      >
        ← Resources
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">{resource.category}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-brand md:text-5xl md:leading-[1.12]">
          {resource.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{resource.summary}</p>
        <div className="mt-8 h-px bg-line" />
      </header>

      <div className="mt-10">
        <PortableBody value={resource.body} />
      </div>
    </article>
  );
}
