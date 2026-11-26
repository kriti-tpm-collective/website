import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteStoryButton } from "@/components/DeleteStoryButton";
import { StoryCard } from "@/components/StoryCard";
import { getCurrentUser } from "@/lib/auth";
import { listStoriesByAuthor } from "@/lib/community-store";

export const metadata: Metadata = {
  title: "Your stories",
  robots: { index: false, follow: false },
};

export default async function YourStoriesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/me");

  const stories = await listStoriesByAuthor(user.id);

  return (
    <div className="container-page py-14 md:py-20">
      <p className="font-hand inline-block -rotate-2 rounded-md bg-sticky-yellow px-3 py-0.5 text-2xl text-ink">
        your desk
      </p>
      <h1 className="font-display mt-4 text-5xl font-bold tracking-[-0.045em] text-ink md:text-6xl">
        {user.name}
      </h1>
      <p className="mt-4 text-lg text-ink-muted">
        Signed in as {user.email}. Drafts stay private until you publish them.
      </p>
      <div className="mt-8">
        <Link href="/write" className="btn-primary">
          New story
        </Link>
      </div>

      {stories.length === 0 ? (
        <p className="mt-14 max-w-xl text-lg text-ink-muted">You have not written a story yet.</p>
      ) : (
        <div className="mt-12 divide-y-[1.5px] divide-dashed divide-ink/20">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col gap-4 py-10 first:pt-0 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <StoryCard story={story} showStatus />
              </div>
              <div className="flex items-center gap-4 md:pt-8">
                <Link href={`/write/${story.id}`} className="text-sm font-semibold text-ink hover:underline">
                  Edit
                </Link>
                {story.status === "published" ? (
                  <Link href={`/blogs/${story.slug}`} className="text-sm font-semibold text-ink hover:underline">
                    View
                  </Link>
                ) : null}
                <DeleteStoryButton id={story.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
