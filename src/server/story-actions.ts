"use server";

import { revalidatePath } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { deleteStory, saveStory, type StoryView } from "@/lib/community-store";
import type { ActionState } from "@/server/auth-actions";

function revalidateStory(story: Pick<StoryView, "slug" | "author">) {
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/me");
  revalidatePath(`/blogs/${story.slug}`);
  revalidatePath(`/authors/${story.author.id}`);
}

export async function saveStoryAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Sign in to write a story." };

  const intent = String(formData.get("intent") || "draft");
  if (intent !== "draft" && intent !== "publish" && intent !== "unpublish") {
    return { error: "Unknown action." };
  }

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const body = String(formData.get("body") || "").replace(/\r\n/g, "\n");

  if (title.length > 140) return { error: "Title must be 140 characters or fewer." };
  if (subtitle.length > 280) return { error: "Subtitle must be 280 characters or fewer." };
  if (body.length > 50_000) return { error: "This story is too long to save." };

  const publishing = intent === "publish";
  if (publishing && title.length < 2) return { error: "Add a title before publishing." };
  if (publishing && body.trim().length < 1) return { error: "Write the story before publishing." };

  let saved: StoryView;
  try {
    saved = await saveStory({
      id: id || undefined,
      authorId: user.id,
      title,
      subtitle,
      body,
      status: publishing ? "published" : "draft",
    });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof Error && error.message.startsWith("You can only")) {
      return { error: error.message };
    }
    return { error: "Could not save this story." };
  }

  revalidateStory(saved);
  redirect(publishing ? `/blogs/${saved.slug}` : `/write/${saved.id}`);
}

export async function deleteStoryAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Sign in to delete a story." };

  const id = String(formData.get("id") || "").trim();
  if (!id) return { error: "Missing story." };

  let removed: { slug: string };
  try {
    removed = await deleteStory(id, user.id);
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof Error && error.message.startsWith("You can only")) {
      return { error: error.message };
    }
    return { error: "Could not delete this story." };
  }

  revalidateStory({ slug: removed.slug, author: { id: user.id, name: user.name } });
  redirect("/me");
}
