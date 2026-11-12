import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Resource } from "@/lib/types";

export const programDecisionLog: Resource = {
  _id: "res-decision-log",
  title: "Program Decision Log Template",
  slug: "program-decision-log-template",
  summary:
    "A lightweight template for capturing decisions, owners, and the context future-you will need when the room has moved on.",
  category: "Templates",
  featured: true,
  body: [
    paragraph(
      "Most program pain is recycled ambiguity. A decision was “made,” nobody wrote it down, and three weeks later two teams are building from different assumptions. This template exists to stop that loop.",
      "p1",
    ),
    paragraph(
      "Keep it short. If the log becomes a novel, people stop reading it. If it becomes optional, people stop writing it. Aim for a living record that takes under five minutes to update.",
      "p2",
    ),

    heading("How to use it", "h1"),
    paragraph(
      "Create one log per program. Share it in the same place as your outcome brief. Review it in the same forums where delivery decisions are made — not in a side document nobody opens.",
      "p3",
    ),
    ...bullets(
      [
        "Log decisions when they change the plan, not every hallway conversation.",
        "Write for a smart person who was not in the room.",
        "Prefer clarity over diplomacy. Soft language recreates the ambiguity.",
        "Link supporting docs. Do not paste entire decks into the log.",
      ],
      "b1",
    ),

    heading("The fields", "h2"),
    paragraph("Use these columns. Rename nothing unless you have a strong reason.", "p4"),
    ...bullets(
      [
        "Date — when the decision was closed.",
        "Decision — one sentence stating what was decided.",
        "Context — why this came up, in 2–4 sentences.",
        "Options considered — the real alternatives, not a theatrical list.",
        "Owner — the person accountable for the decision.",
        "Impact — what changes in scope, sequence, staffing, or date.",
        "Not decided / deferred — anything left open, with a reopen date.",
      ],
      "b2",
    ),

    heading("Example entry", "h3"),
    quote(
      "Date: 2025-10-03 · Decision: Ship Phase 1 without partner SSO; SSO moves to Phase 2. Context: Partner integration estimate grew from 3 to 7 weeks after discovery. Waiting blocks the internal launch window. Options: (A) delay launch 6 weeks for SSO, (B) launch without SSO and add later, (C) cut another Phase 1 feature to keep SSO. Owner: Priya N. (Eng Director). Impact: Launch stays on Nov 12; SSO backlog item created with dependency on partner API freeze. Deferred: Exact SSO UX for Phase 2 — revisit Oct 20.",
      "q1",
    ),

    heading("Copy-ready starter rows", "h4"),
    paragraph(
      "Paste this into Notion, Google Docs, or a spreadsheet and fill the first real decision this week.",
      "p5",
    ),
    ...bullets(
      [
        "Date | Decision | Context | Options considered | Owner | Impact | Deferred",
        "[date] | [one-sentence decision] | [why now] | [A / B / C] | [name] | [what changes] | [what remains open + date]",
      ],
      "b3",
    ),

    heading("Operating rules", "h5"),
    ...bullets(
      [
        "No decision owner = not a decision yet.",
        "If two teams disagree on what was decided, the log wins — then update the log.",
        "Reversals are allowed. Silent rewrites are not. Add a new entry that supersedes the old one.",
        "Archive resolved items monthly so the active view stays scannable.",
      ],
      "b4",
    ),
    paragraph(
      "A decision log will not make hard tradeoffs easy. It will make them durable — which is what programs need when memory fades and incentives diverge.",
      "p6",
    ),
  ],
};
