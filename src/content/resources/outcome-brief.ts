import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Resource } from "@/lib/types";

export const outcomeBrief: Resource = {
  _id: "res-outcome-brief",
  title: "One-Page Outcome Brief",
  slug: "one-page-outcome-brief",
  summary:
    "A single page that aligns teams on the outcome, constraints, non-goals, and decision owners before the work fans out.",
  category: "Templates",
  featured: true,
  body: [
    paragraph(
      "Cross-org programs do not usually fail from lack of effort. They fail because people are optimizing for slightly different outcomes while believing they share one. The one-page outcome brief is the cheapest way to catch that early.",
      "p1",
    ),
    paragraph(
      "If it does not fit on one page, you are not done clarifying. You are still collecting ambition.",
      "p2",
    ),

    heading("What belongs on the page", "h1"),
    ...bullets(
      [
        "Outcome — the change in the world or the business, stated without solution language.",
        "Why now — the forcing function: market, risk, dependency, commitment, or cost of delay.",
        "Users / customers — who feels the change, in concrete terms.",
        "Success signals — 2–4 measurable or observable indicators.",
        "Constraints — time, staffing, compliance, technical, partner, or political realities.",
        "Non-goals — what we are explicitly not doing in this phase.",
        "Decision owners — who closes outcome definition, technical approach, and launch call.",
        "Open questions — the unknowns that could still reshape the plan.",
      ],
      "b1",
    ),
    quote(
      "A good brief makes disagreement early and cheap. A vague brief makes disagreement late and expensive.",
      "q1",
    ),

    heading("Fill-in template", "h2"),
    ...bullets(
      [
        "Outcome: We will [observable change] for [audience] so that [value].",
        "Why now: [forcing function + cost of waiting].",
        "Success signals: [signal 1]; [signal 2]; [signal 3].",
        "Constraints: [hard limits the plan must respect].",
        "Non-goals this phase: [explicit exclusions].",
        "Decision owners: Outcome — [name]; Approach — [name]; Launch — [name].",
        "Open questions: [question] (needed by [date]).",
      ],
      "b2",
    ),

    heading("How to run it", "h3"),
    ...bullets(
      [
        "Draft before kickoff, not after the first three syncs.",
        "Review with the Accountable owners until the outcome sentence is stable.",
        "Link the brief from every status update and decision log.",
        "When priorities change, update the brief and note what changed — do not ghost-edit.",
      ],
      "b3",
    ),
    paragraph(
      "This page will not replace discovery. It will keep discovery pointed at the same target.",
      "p3",
    ),
  ],
};
