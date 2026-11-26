import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { StoryEditor } from "@/components/StoryEditor";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Write",
  robots: { index: false, follow: false },
};

export default async function WritePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/write");

  return <StoryEditor authorName={user.name} />;
}
