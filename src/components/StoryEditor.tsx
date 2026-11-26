"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { wordCount } from "@/lib/story-text";
import type { StoryView } from "@/lib/community-store";
import { saveStoryAction } from "@/server/story-actions";
import type { ActionState } from "@/server/auth-actions";

function insertAround(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  placeholder: string,
) {
  const selected = value.slice(start, end) || placeholder;
  const next = value.slice(0, start) + before + selected + after + value.slice(end);
  const selectionStart = start + before.length;
  return { next, selectionStart, selectionEnd: selectionStart + selected.length };
}

export function StoryEditor({ story, authorName }: { story?: StoryView; authorName: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveStoryAction, undefined);
  const [title, setTitle] = useState(story?.title ?? "");
  const [subtitle, setSubtitle] = useState(story?.subtitle ?? "");
  const [body, setBody] = useState(story?.body ?? "");
  const [intent, setIntent] = useState<"draft" | "publish" | "unpublish">("draft");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = bodyRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.max(element.scrollHeight, 320)}px`;
  }, [body]);

  function apply(before: string, after = "", placeholder = "text") {
    const element = bodyRef.current;
    const start = element?.selectionStart ?? body.length;
    const end = element?.selectionEnd ?? body.length;
    const result = insertAround(body, start, end, before, after, placeholder);
    setBody(result.next);
    requestAnimationFrame(() => {
      element?.focus();
      element?.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }

  const words = wordCount(body);
  const minutes = Math.max(1, Math.round(words / 220));
  const published = story?.status === "published";

  return (
    <form action={action}>
      {story ? <input type="hidden" name="id" value={story.id} /> : null}
      <div className="sticky top-16 z-40 border-b border-ink/10 bg-bg/90 backdrop-blur-md">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-sm text-ink-muted">
            Writing as <span className="font-semibold text-ink">{authorName}</span>
            {published ? <span className="ml-2 rounded-full bg-sticky-mint px-2 py-0.5 text-xs font-bold text-ink">Published</span> : null}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending}
              onClick={() => setIntent("draft")}
              className="btn-secondary !min-h-9 !px-4 !text-sm disabled:cursor-wait disabled:opacity-70"
            >
              {pending && intent === "draft" ? "Saving…" : "Save draft"}
            </button>
            {published ? (
              <button
                type="submit"
                name="intent"
                value="unpublish"
                disabled={pending}
                onClick={() => setIntent("unpublish")}
                className="btn-secondary !min-h-9 !px-4 !text-sm disabled:cursor-wait disabled:opacity-70"
              >
                {pending && intent === "unpublish" ? "Updating…" : "Unpublish"}
              </button>
            ) : null}
            <button
              type="submit"
              name="intent"
              value="publish"
              disabled={pending}
              onClick={() => setIntent("publish")}
              className="btn-primary !min-h-9 !px-4 !text-sm disabled:cursor-wait disabled:opacity-70"
            >
              {pending && intent === "publish" ? "Publishing…" : published ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        {state?.error ? (
          <p role="alert" className="container-page pb-3 text-sm font-semibold text-danger">
            {state.error}
          </p>
        ) : null}
      </div>

      <div className="container-page max-w-3xl py-10 md:py-14">
        <label className="sr-only" htmlFor="story-title">
          Title
        </label>
        <input
          id="story-title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={140}
          placeholder="Title"
          className="w-full bg-transparent font-display text-4xl font-bold tracking-[-0.045em] text-ink outline-none placeholder:text-ink-faint md:text-6xl"
        />
        <label className="sr-only" htmlFor="story-subtitle">
          Subtitle
        </label>
        <input
          id="story-subtitle"
          name="subtitle"
          value={subtitle}
          onChange={(event) => setSubtitle(event.target.value)}
          maxLength={280}
          placeholder="Subtitle"
          className="mt-4 w-full bg-transparent text-xl leading-relaxed text-ink-muted outline-none placeholder:text-ink-faint"
        />

        <div className="mt-8 flex flex-wrap gap-2 border-y border-dashed border-ink/20 py-3">
          <ToolbarButton label="Bold" onClick={() => apply("**", "**", "bold text")} />
          <ToolbarButton label="Italic" onClick={() => apply("*", "*", "italic text")} />
          <ToolbarButton label="Heading" onClick={() => apply("## ", "", "Heading")} />
          <ToolbarButton label="Quote" onClick={() => apply("> ", "", "A line worth keeping")} />
          <ToolbarButton label="List" onClick={() => apply("- ", "", "List item")} />
        </div>

        <label className="sr-only" htmlFor="story-body">
          Story
        </label>
        <textarea
          id="story-body"
          ref={bodyRef}
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={50000}
          placeholder="Tell your story…"
          className="mt-6 min-h-[50vh] w-full resize-none bg-transparent font-serif text-[1.25rem] leading-[1.8] text-ink outline-none placeholder:text-ink-faint"
        />
        <p className="mt-2 text-sm text-ink-faint">
          {words === 0 ? "Start writing" : `${words} words · ${minutes} min read`}
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          Blank line between paragraphs. **bold**, *italic*, ## heading, &gt; quote, - list.
        </p>
      </div>
    </form>
  );
}

function ToolbarButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-ink/15 bg-surface px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-sticky-yellow"
    >
      {label}
    </button>
  );
}
