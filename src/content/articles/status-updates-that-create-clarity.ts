import { kritiThakur } from "@/content/author";
import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Article } from "@/lib/types";

export const statusUpdatesThatCreateClarity: Article = {
  _id: "article-status-updates",
  title: "Status Updates That Create Clarity, Not Noise",
  slug: "status-updates-that-create-clarity",
  excerpt:
    "Most status writing protects the writer. The useful kind protects the program — by making change, risk, and decisions impossible to miss.",
  publishedAt: "2025-11-03T10:00:00.000Z",
  readingTimeMinutes: 9,
  featured: true,
  topics: [
    { title: "Communication", slug: "communication" },
    { title: "Program leadership", slug: "program-leadership" },
  ],
  author: kritiThakur,
  body: [
    paragraph(
      "I have written thousands of status updates. Some of them were useful. Too many were polite fog: green indicators, activity lists, and a closing line that everything was “on track” until, suddenly, it was not.",
      "p1",
    ),
    paragraph(
      "Status writing is one of the highest-leverage skills a Technical Program Manager has. It is also one of the easiest to fake. Anyone can summarize tickets. Fewer people can make a leader see the decision that needs to be made this week.",
      "p2",
    ),

    heading("Activity is not status", "h1"),
    paragraph(
      "“Shipped three stories.” “Held sync with Design.” “Continued migration work.” These statements describe motion. They do not describe position.",
      "p3",
    ),
    paragraph(
      "Status answers different questions: Are we closer to the outcome? What changed since last time? What is newly at risk? What decision is blocking progress? What will be true next week if nothing intervenes?",
      "p4",
    ),
    paragraph(
      "If your update can be copy-pasted from the backlog tool, it is not a status update. It is a mirror held up to the tracker.",
      "p5",
    ),

    heading("Write for decision-makers, not for coverage", "h2"),
    paragraph(
      "A common failure mode is writing to prove you are busy. Another is writing to avoid blame. Both produce long documents that hide the point.",
      "p6",
    ),
    paragraph(
      "I write as if a busy executive will read only the first screen. That constraint is clarifying. Lead with the headline. Put the ask near the top. Put the narrative after.",
      "p7",
    ),
    paragraph("A structure that has worked across companies and program shapes:", "p8"),
    ...bullets(
      [
        "Headline — one sentence on program health relative to the outcome.",
        "What changed — only material changes since the last update.",
        "Risks and blockers — owned, dated, and consequential.",
        "Decision needed — who, by when, and what happens if it slips.",
        "Next milestones — few, testable, and near.",
      ],
      "b1",
    ),
    quote(
      "If a reader finishes your update and still asks “so what do you need from me?”, the update failed — even if every fact in it was accurate.",
      "q1",
    ),

    heading("Color is a claim. Defend it.", "h3"),
    paragraph(
      "Red, yellow, and green are not decorations. They are assertions about trajectory. Green means the current plan will hit the committed outcome without needing a change in scope, staffing, or date. Yellow means it will not unless something changes. Red means it will not, and the change required is already overdue.",
      "p9",
    ),
    paragraph(
      "I have sat in rooms where everything was marked green while three critical dependencies were unsigned. That is not optimism. That is a reporting failure. When color and narrative disagree, people learn to ignore both.",
      "p10",
    ),

    heading("Leave things out on purpose", "h4"),
    paragraph(
      "Noise is not neutral. Every extra paragraph trains readers to skim. Every minor accomplishment listed beside a major risk teaches the organization that all information is equal.",
      "p11",
    ),
    paragraph(
      "Omit completed trivia. Omit meetings that produced no decision. Omit risks with no program impact. Include the uncomfortable dependency. Include the slipped gate. Include the staffing gap you keep hoping will resolve itself.",
      "p12",
    ),
    paragraph(
      "Your credibility compounds when people learn that if it is in your update, it matters — and if it matters, it will be in your update.",
      "p13",
    ),

    heading("Make the writing a habit, not a performance", "h5"),
    paragraph(
      "The best status practice is boringly consistent. Same day. Same shape. Same standard of honesty. Teams stop dreading it. Leaders stop hunting for the buried lede. You stop reinventing the narrative under pressure.",
      "p14",
    ),
    paragraph(
      "I built TPM Collective partly because so much of this craft is taught by scar tissue. Status writing looks soft until you realize it is how organizations allocate attention. Attention is the scarce resource. Write like you know that.",
      "p15",
    ),
  ],
};
