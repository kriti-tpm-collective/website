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
        className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <span className="transition group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Resources
      </Link>

      <header className="mt-8">
        <p className="inline-block rounded-md bg-sticky-yellow px-2 py-0.5 text-xs font-bold tracking-[0.08em] text-ink uppercase">
          {resource.category}
        </p>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-[-0.045em] text-ink md:text-6xl">
          {resource.title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-muted">{resource.summary}</p>
        <div className="mt-9 border-t-[1.5px] border-dashed border-ink/25" />
      </header>

      <div className="mt-10">
        <PortableBody value={resource.body} />
      </div>
    </article>
  );
}
