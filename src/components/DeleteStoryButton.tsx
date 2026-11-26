"use client";

import { useActionState } from "react";
import { deleteStoryAction } from "@/server/story-actions";
import type { ActionState } from "@/server/auth-actions";

export function DeleteStoryButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(deleteStoryAction, undefined);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Delete this story? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending} className="text-sm font-semibold text-danger hover:underline disabled:opacity-70">
        {pending ? "Deleting…" : "Delete"}
      </button>
      {state?.error ? (
        <p role="alert" className="mt-1 text-sm font-semibold text-danger">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
