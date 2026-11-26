import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { StoryEditor } from "@/components/StoryEditor";
import { getCurrentUser } from "@/lib/auth";
import { getStoryById } from "@/lib/community-store";

export const metadata: Metadata = {
  title: "Edit story",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/write/${id}`);

  const story = await getStoryById(id, user.id);
  if (!story) notFound();

  return <StoryEditor story={story} authorName={user.name} />;
}
