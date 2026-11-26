import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorMark } from "@/components/AuthorMark";
import { StoryCard } from "@/components/StoryCard";
import { getAuthor, listStoriesByAuthor } from "@/lib/community-store";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthor(id);
  if (!author) return { title: "Author" };
  return {
    title: author.name,
    description: `Stories by ${author.name} on TPM Collective.`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;
  const author = await getAuthor(id);
  if (!author) notFound();

  const stories = await listStoriesByAuthor(author.id, true);

  return (
    <div className="container-page py-14 md:py-20">
      <div className="flex items-center gap-4">
        <AuthorMark name={author.name} />
        <div>
          <p className="font-hand text-2xl text-ink-muted">member</p>
          <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-ink md:text-5xl">{author.name}</h1>
        </div>
      </div>

      {stories.length === 0 ? (
        <p className="mt-12 text-lg text-ink-muted">No published stories yet.</p>
      ) : (
        <div className="mt-12 divide-y-[1.5px] divide-dashed divide-ink/20">
          {stories.map((story) => (
            <div key={story.id} className="py-10 first:pt-0">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
