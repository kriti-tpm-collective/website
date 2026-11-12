import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Resource } from "@/lib/types";

export const raciLite: Resource = {
  _id: "res-raci-lite",
  title: "RACI-Lite for Multi-Team Initiatives",
  slug: "raci-lite-multi-team",
  summary:
    "A stripped-down responsibility model focused on decision rights — something teams will actually keep current.",
  category: "Frameworks",
  featured: true,
  body: [
    paragraph(
      "Classic RACI charts die for predictable reasons. Too many rows. Too many stakeholders. Too much debate about whether someone is a C or an I. By the time the matrix is “complete,” the program has already moved.",
      "p1",
    ),
    paragraph(
      "RACI-Lite keeps the useful idea — clear responsibility — and throws away the ceremony. Use it for the few workstreams and decisions that actually create collision.",
      "p2",
    ),

    heading("The only roles that matter here", "h1"),
    ...bullets(
      [
        "Accountable — one person who can close the decision or own the outcome. Never a committee.",
        "Responsible — the people doing the work.",
        "Consulted — people whose input can change the decision before it is closed.",
        "Informed — people who need the outcome, not a seat in every discussion.",
      ],
      "b1",
    ),
    quote(
      "If more than one name is Accountable, you do not have accountability. You have shared hope.",
      "q1",
    ),

    heading("Build it in 30 minutes", "h2"),
    paragraph("Do not start with every task in the program. Start with friction.", "p3"),
    ...bullets(
      [
        "List 5–9 critical workstreams or decision types (examples: API contract, launch criteria, staffing tradeoffs, vendor path, compliance gate).",
        "For each, name one Accountable person.",
        "Add Responsible teams or named leads.",
        "Add Consulted only where silence would create rework.",
        "Put everyone else in Informed — and mean it.",
      ],
      "b2",
    ),

    heading("Template table", "h3"),
    paragraph("Copy this structure into a doc or sheet:", "p4"),
    ...bullets(
      [
        "Workstream / Decision | Accountable | Responsible | Consulted | Informed | Notes",
        "Outcome definition | [name] | [PM / TPM] | [Eng + Design leads] | [Leadership] | Single source of truth owner",
        "Technical approach | [Eng lead] | [Eng team] | [Arch / Security as needed] | [Program] | Spike criteria in notes",
        "Launch readiness | [TPM] | [Eng + Ops] | [Support / Legal] | [Stakeholders] | Go/no-go checklist linked",
        "Cross-team dependency calls | [TPM] | [Team leads] | [Affected PMs] | [Directors] | Escalation path in notes",
      ],
      "b3",
    ),

    heading("Rules that keep it alive", "h4"),
    ...bullets(
      [
        "Update when ownership changes — not on a ceremonial cadence.",
        "If a decision is stuck, check Accountable first. Usually the problem is there.",
        "Consulted does not mean veto. If someone has veto power, say so explicitly.",
        "Refuse to expand the matrix to include every meeting attendee.",
      ],
      "b4",
    ),
    paragraph(
      "RACI-Lite is not governance theater. It is a map of who can move the program — and who is waiting on whom.",
      "p5",
    ),
  ],
};
