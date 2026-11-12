"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ blurb }: { blurb: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
      setStatus("success");
      setMessage(data.message || "You're on the list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-24 rounded-2xl border border-line bg-surface px-6 py-10 shadow-[var(--shadow-soft)] md:px-10 md:py-12"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-brand md:text-3xl">
          Stay in the loop
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">{blurb}</p>

        <form
          onSubmit={onSubmit}
          className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="min-h-11 flex-1 rounded-full border border-line-strong bg-bg px-4 text-ink outline-none placeholder:text-ink-faint focus:border-accent focus:ring-4 focus:ring-accent-soft"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? "Joining…" : "Subscribe"}
          </button>
        </form>

        {message ? (
          <p
            className={`mt-4 text-sm ${status === "error" ? "text-danger" : "text-success"}`}
            role="status"
          >
            {message}
          </p>
        ) : (
          <p className="mt-4 text-xs text-ink-faint">No spam. Unsubscribe anytime.</p>
        )}
      </div>
    </section>
  );
}
