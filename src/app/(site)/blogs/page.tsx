import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { StoryCard } from "@/components/StoryCard";
import { listPublishedStories } from "@/lib/community-store";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Medium-style stories from TPM Collective members. Sign in and publish your own.",
};

export default async function BlogsPage() {
  const stories = await listPublishedStories();

  return (
    <div className="container-page py-14 md:py-20">
      <PageIntro
        eyebrow="from the room"
        title="Blogs"
        description="Medium-style stories from members. Create an account, write in a quiet editor, and publish when it is ready. Drafts stay private to you."
      />
      <div className="mt-8">
        <Link href="/write" className="btn-primary">
          Write a story
        </Link>
      </div>

      {stories.length === 0 ? (
        <p className="mt-14 max-w-xl text-lg text-ink-muted">
          No stories yet. Be the first to publish one.
        </p>
      ) : (
        <div className="mt-12 divide-y-[1.5px] divide-dashed divide-ink/20 md:mt-16">
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
