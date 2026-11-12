import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Resource } from "@/lib/types";

export const statusNarrativeGuide: Resource = {
  _id: "res-status-narrative",
  title: "Status Narrative Guide",
  slug: "status-narrative-guide",
  summary:
    "A practical structure for status updates that create clarity — what to lead with, what to cut, and how to make the ask unmistakable.",
  category: "Guides",
  featured: false,
  body: [
    paragraph(
      "A status update has one job: help the right people understand position, trajectory, and what must happen next. Everything else is optional. Most updates fail because they optimize for coverage instead of decisions.",
      "p1",
    ),

    heading("The five-part shape", "h1"),
    paragraph("Use this shape every time. Consistency trains readers to find the signal.", "p2"),
    ...bullets(
      [
        "Headline — one sentence on health relative to the outcome.",
        "What changed — only material changes since last update.",
        "Risks and blockers — owned, dated, consequential.",
        "Decision needed — who, by when, and consequence of delay.",
        "Next milestones — few, near, and testable.",
      ],
      "b1",
    ),
    quote(
      "If a reader finishes and still asks what you need, rewrite the top — not the appendix.",
      "q1",
    ),

    heading("Color means something", "h2"),
    ...bullets(
      [
        "Green — current plan hits the committed outcome without changing scope, staffing, or date.",
        "Yellow — it will not, unless something changes soon.",
        "Red — it will not, and the needed change is already overdue.",
      ],
      "b2",
    ),
    paragraph(
      "Never mark green while critical dependencies are unsigned. Color and narrative must agree, or both lose trust.",
      "p3",
    ),

    heading("Copy-ready template", "h3"),
    paragraph("Paste and fill:", "p4"),
    ...bullets(
      [
        "Status: [Green / Yellow / Red] — [one-sentence headline]",
        "What changed: [2–4 bullets of material change only]",
        "Risks / blockers: [risk] — Owner: [name] — Trigger/date: [when] — Next action: [what]",
        "Decision needed: [decision] — Decider: [name] — Needed by: [date] — If delayed: [impact]",
        "Next milestones: [milestone + date] · [milestone + date]",
      ],
      "b3",
    ),

    heading("Cut ruthlessly", "h4"),
    ...bullets(
      [
        "Completed trivia that does not change trajectory",
        "Meetings that produced no decision",
        "Risks with no program impact",
        "Long histories readers already know",
      ],
      "b4",
    ),
    paragraph(
      "Your reputation as a TPM compounds when people learn: if it is in your update, it matters.",
      "p5",
    ),
  ],
};
