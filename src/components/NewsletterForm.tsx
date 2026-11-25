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
      className="relative scroll-mt-24 rounded-[22px] border-[1.5px] border-ink bg-sticky-yellow px-6 py-10 shadow-[6px_6px_0_var(--ink)] md:px-12 md:py-14"
    >
      <div
        className="absolute top-5 right-5 hidden rotate-6 rounded-lg border-2 border-dashed border-ink/60 px-3 py-2 text-center sm:block"
        aria-hidden="true"
      >
        <p className="text-[10px] font-bold tracking-[0.14em] text-ink/70 uppercase">Inbox</p>
        <p className="font-display text-lg leading-none font-bold text-ink">Approved</p>
      </div>
      <div className="max-w-xl">
        <p className="font-hand text-[1.75rem] text-ink-muted">psst — one more tab, but a good one</p>
        <h2 className="font-display mt-1 text-4xl font-bold tracking-[-0.04em] text-ink md:text-5xl">
          Get the field notes.
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{blurb}</p>

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
            className="min-h-12 flex-1 rounded-full border-[1.5px] border-ink bg-surface px-5 text-ink outline-none placeholder:text-ink-faint focus:ring-4 focus:ring-accent/25"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary !min-h-12 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? "Joining…" : "Count me in"}
          </button>
        </form>

        {message ? (
          <p
            className={`mt-4 text-sm font-semibold ${status === "error" ? "text-danger" : "text-ink"}`}
            role="status"
          >
            {message}
          </p>
        ) : (
          <p className="mt-4 text-sm text-ink/60">
            No spam. No “circling back.” Unsubscribe in one click.
          </p>
        )}
      </div>
    </section>
  );
}
