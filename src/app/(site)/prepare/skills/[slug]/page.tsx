import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillChapterView } from "@/components/prepare/SkillChapterView";
import {
  getAdjacentChapters,
  getChapterBySlug,
  getChapters,
  getPillarForChapter,
} from "@/content/prepare";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return { title: "Skill" };
  return {
    title: `${chapter.code}: ${chapter.title}`,
    description: chapter.oneliner.replace(/\*/g, ""),
  };
}

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  const pillar = getPillarForChapter(chapter);
  if (!pillar) notFound();

  const { prev, next } = getAdjacentChapters(slug);

  return (
    <div className="container-page max-w-4xl py-12 md:py-16">
      <SkillChapterView chapter={chapter} pillar={pillar} prev={prev} next={next} />
    </div>
  );
}
