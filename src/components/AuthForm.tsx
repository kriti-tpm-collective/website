"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup, type ActionState } from "@/server/auth-actions";

const fieldClass =
  "min-h-12 w-full rounded-2xl border-[1.5px] border-ink bg-bg px-4 text-ink outline-none placeholder:text-ink-faint focus:ring-4 focus:ring-accent/20";

export function AuthForm({ mode, next }: { mode: "login" | "signup"; next: string }) {
  const actionFn = mode === "login" ? login : signup;
  const [state, action, pending] = useActionState<ActionState, FormData>(actionFn, undefined);
  const switchHref = mode === "login" ? `/signup?next=${encodeURIComponent(next)}` : `/login?next=${encodeURIComponent(next)}`;

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <p className="font-hand text-2xl text-ink-muted">
          {mode === "login" ? "welcome back" : "pull up a chair"}
        </p>
        <h1 className="font-display mt-1 text-4xl font-bold tracking-[-0.04em] text-ink">
          {mode === "login" ? "Sign in" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {mode === "login"
            ? "Signed-in members can write and publish blogs."
            : "Any account can write a Medium-style blog and publish it to the collective."}
        </p>
      </div>

      {mode === "signup" ? (
        <label className="block text-sm font-semibold text-ink">
          Name
          <input
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Kriti Thakur"
            className={`${fieldClass} mt-1.5`}
          />
        </label>
      ) : null}

      <label className="block text-sm font-semibold text-ink">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={`${fieldClass} mt-1.5`}
        />
      </label>

      <label className="block text-sm font-semibold text-ink">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={mode === "signup" ? 8 : 1}
          maxLength={200}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
          className={`${fieldClass} mt-1.5`}
        />
      </label>

      <input type="hidden" name="next" value={next} />

      {state?.error ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-sticky-pink px-3 py-2 text-sm font-semibold text-ink">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn-primary mt-1 disabled:cursor-wait disabled:opacity-70">
        {pending ? "One moment…" : mode === "login" ? "Sign in" : "Create account"}
      </button>

      <p className="text-sm text-ink-muted">
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <Link href={switchHref} className="font-semibold text-ink underline decoration-signal-amber decoration-2 underline-offset-4">
          {mode === "login" ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
