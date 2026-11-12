import { kritiThakur } from "@/content/author";
import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Article } from "@/lib/types";

export const roadmapsArePromises: Article = {
  _id: "article-roadmap-vs-delivery",
  title: "Roadmaps Are Promises. Delivery Is Evidence.",
  slug: "roadmaps-are-promises-delivery-is-evidence",
  excerpt:
    "TPMs sit between ambition and reality. Keep the narrative and the forecast separate — or watch trust erode in both directions.",
  publishedAt: "2025-08-18T10:00:00.000Z",
  readingTimeMinutes: 10,
  featured: false,
  topics: [
    { title: "Roadmapping", slug: "roadmapping" },
    { title: "Stakeholder management", slug: "stakeholder-management" },
  ],
  author: kritiThakur,
  body: [
    paragraph(
      "A roadmap is a story about where the organization wants to go. Delivery is evidence about what the organization can actually ship. Confusion between the two is one of the fastest ways I have seen trust decay — inside a team, and between a team and its leaders.",
      "p1",
    ),
    paragraph(
      "Technical Program Managers live in that confusion by default. We are asked to protect ambition and protect reality at the same time. Done poorly, that makes you the person who always says no, or the person who always says yes and then manages disappointment. Done well, it makes you the person who keeps both conversations honest.",
      "p2",
    ),

    heading("Ambition is not a schedule", "h1"),
    paragraph(
      "Strategy decks love dates. Market windows love dates. Sales conversations love dates. None of that automatically creates capacity, sequencing, or dependency clarity. A date without a plan is a wish wearing a calendar invite.",
      "p3",
    ),
    paragraph(
      "I do not resent ambition. Ambition is how organizations stretch. What I resent is ambition laundered through a roadmap as if it were a forecast. When leadership presents a desired outcome as a committed timeline, engineering hears a promise. When that promise breaks, people do not blame the strategy. They blame the system that pretended the strategy was already a plan.",
      "p4",
    ),
    quote(
      "If you need a date to inspire, say so. If you need a date to commit, earn it.",
      "q1",
    ),

    heading("Separate narrative from forecast", "h2"),
    paragraph(
      "I keep two layers visible in every serious program conversation.",
      "p5",
    ),
    paragraph(
      "The narrative layer answers: What are we trying to become? Why does this matter now? What customer or business problem are we solving? This layer can be bold. It should be.",
      "p6",
    ),
    paragraph(
      "The forecast layer answers: Given what we know about scope, dependencies, staffing, and risk, what can we ship in this window — and with what confidence? This layer must be boringly honest. It should change when evidence changes.",
      "p7",
    ),
    paragraph(
      "Mixing the layers produces political theater. People argue about wording instead of tradeoffs. Teams sandbag. Leaders push. Everyone leaves the room with a different private interpretation of what was “agreed.”",
      "p8",
    ),

    heading("Make milestones that can fail visibly", "h3"),
    paragraph(
      "A healthy roadmap has checkpoints that can tell you bad news early. Not vanity milestones. Not “kickoff complete.” Checkpoints that prove or disprove a critical assumption: the API contract is agreed, the migration path works on a subset, the vendor can meet the volume, the design clears the review that usually blocks launch.",
      "p9",
    ),
    paragraph(
      "If your milestones only celebrate progress and never threaten the plan, they are ceremony. Ceremony feels good. It does not protect delivery.",
      "p10",
    ),

    heading("Say capacity in plain language", "h4"),
    paragraph(
      "Stakeholders often hear “we’re busy” as negotiation. They hear “we have 1.5 engineers for this stream through March, and two hard dependencies outside our control” as information. Same underlying constraint. Different usefulness.",
      "p11",
    ),
    paragraph(
      "As a TPM, translate capacity into consequences. Not as a threat. As a map:",
      "p12",
    ),
    ...bullets(
      [
        "If we keep Scope A, the earliest honest window is X.",
        "If we need date Y, Scope B is what fits with current staffing.",
        "If both Scope A and date Y are required, we need staffing or sequencing changes — here are the options.",
      ],
      "b1",
    ),
    paragraph(
      "People can disagree with your numbers. They cannot productively disagree with silence.",
      "p13",
    ),

    heading("Keep a change log for the truth", "h5"),
    paragraph(
      "Priorities shift. That is normal. What damages credibility is the quiet rewrite — the roadmap that changes without acknowledgment, as if the previous version never existed.",
      "p14",
    ),
    paragraph(
      "A simple change log solves more trust problems than most process frameworks: what changed, why it changed, who decided, and what is no longer true. It takes minutes. It prevents weeks of “I thought we were still doing…” conversations.",
      "p15",
    ),
    paragraph(
      "I have found that leaders respect this more than they resist it. Most executives are not asking TPMs to protect a fiction. They are asking for a clear read so they can make tradeoffs. Give them that read.",
      "p16",
    ),

    heading("You do not have to be the person who always says no", "h6"),
    paragraph(
      "Honesty is not obstruction. Obstruction is hiding constraints until they explode. Honesty is offering the organization a choice while choice still exists.",
      "p17",
    ),
    paragraph(
      "Roadmaps are promises about intent. Delivery is evidence about reality. Your job is to keep those two in conversation with each other — never pretending they are the same thing.",
      "p18",
    ),
  ],
};
