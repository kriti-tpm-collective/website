import { kritiThakur } from "@/content/author";
import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Article } from "@/lib/types";

export const theAlignmentTax: Article = {
  _id: "article-alignment-tax",
  title: "The Alignment Tax: What Cross-Org Programs Really Cost",
  slug: "the-alignment-tax",
  excerpt:
    "Every multi-team initiative pays a hidden tax in meetings, translations, and delayed decisions. The TPM’s job is not to absorb that cost silently — it is to make it visible, and then reduce it.",
  publishedAt: "2025-10-14T10:00:00.000Z",
  readingTimeMinutes: 11,
  featured: true,
  topics: [
    { title: "Cross-org alignment", slug: "cross-org-alignment" },
    { title: "Program leadership", slug: "program-leadership" },
  ],
  author: kritiThakur,
  body: [
    paragraph(
      "I have never seen a cross-org program fail because engineers could not write code. I have seen many stall because three teams believed they were building the same thing, and were not.",
      "p1",
    ),
    paragraph(
      "That gap has a cost. I call it the alignment tax: the continuous overhead of keeping people pointed at the same outcome when they report to different leaders, optimize for different metrics, and speak slightly different dialects of the same strategy.",
      "p2",
    ),
    paragraph(
      "The tax is not imaginary. It shows up as rework, decision latency, duplicated discovery, and the quiet erosion of trust when launches slip for reasons nobody can cleanly explain in a status meeting.",
      "p3",
    ),

    heading("Most organizations undercount it", "h1"),
    paragraph(
      "We are very good at measuring the work that looks like work. Story points. Tickets closed. Sprint velocity. Launch dates. We are much worse at measuring the work that makes that work possible: translating intent across teams, reopening decisions that were never truly closed, and rebuilding shared context every time a stakeholder rotates.",
      "p4",
    ),
    paragraph(
      "Because the alignment tax is hard to put on a dashboard, it gets treated as personality. Someone is “not collaborative enough.” Someone else is “too process-heavy.” The real issue is structural. When a program depends on multiple orgs and no one owns the connective tissue, the tax compounds.",
      "p5",
    ),
    quote(
      "If you cannot name the cost of misalignment, leadership will keep paying it without noticing — until the launch is late and everyone is surprised.",
      "q1",
    ),

    heading("Make the tax visible without becoming theatrical", "h2"),
    paragraph(
      "A TPM’s first useful move is often diagnostic, not heroic. Before you add meetings, inventory the system.",
      "p6",
    ),
    paragraph("I usually start with four questions:", "p7"),
    ...bullets(
      [
        "Which teams must agree for progress to happen this month?",
        "What decisions are currently open, and who can actually close them?",
        "How long has each open decision been waiting?",
        "Where is context being re-explained more than once a week?",
      ],
      "b1",
    ),
    paragraph(
      "Write the answers down somewhere shared. Not in a private notebook. Not in a slide that dies after the steering committee. A living list is enough. The point is not bureaucracy. The point is that invisible costs become negotiable only when they are visible.",
      "p8",
    ),
    paragraph(
      "I have watched teams discover that a “two-week delay” was really a six-week decision queue with no owner. Once that is on paper, the conversation changes. People stop arguing about effort estimates and start arguing about decision rights — which is usually the real bottleneck.",
      "p9",
    ),

    heading("Stop paying with more meetings", "h3"),
    paragraph(
      "The instinct, under misalignment, is to schedule another sync. Sometimes that helps. Often it just spreads the tax across more calendars.",
      "p10",
    ),
    paragraph(
      "Meetings are a blunt instrument. They are useful when you need concurrent judgment — a tradeoff that cannot be resolved asynchronously, a conflict that needs a human room. They are expensive when they become the default mechanism for transferring information that should have been written once.",
      "p11",
    ),
    paragraph(
      "A better pattern looks like this:",
      "p12",
    ),
    ...bullets(
      [
        "One source of truth for outcomes — not five decks with five slightly different north stars.",
        "Named decision owners — not “we’ll align offline.”",
        "Written updates that replace status theater — what changed, what is blocked, what decision is needed.",
        "A cadence that matches the rate of change — weekly when the program is volatile, less often when it is stable.",
      ],
      "b2",
    ),
    paragraph(
      "I am not anti-meeting. I am anti-meeting-as-substitute-for-clarity. If people leave a room with the same ambiguity they brought in, you did not hold a meeting. You held a tax payment.",
      "p13",
    ),

    heading("Design for fewer translations", "h4"),
    paragraph(
      "Cross-org programs create translation work by default. Product speaks in outcomes. Engineering speaks in systems. Legal speaks in constraints. Finance speaks in windows. A TPM sits in the middle and, if you are not careful, becomes the only person who understands the whole map.",
      "p14",
    ),
    paragraph(
      "That feels powerful. It is also fragile. When the program depends on you as the translator, you have not reduced the alignment tax. You have concentrated it.",
      "p15",
    ),
    paragraph(
      "The durable move is to create artifacts that travel without you: a one-page outcome brief, a decision log with context, an interface contract between teams, a dependency map that is ugly but honest. These are not documents for documentation’s sake. They are compression algorithms for organizational understanding.",
      "p16",
    ),

    heading("What good looks like", "h5"),
    paragraph(
      "You know the alignment tax is coming down when a few things start to happen.",
      "p17",
    ),
    paragraph(
      "Decisions close in days instead of lingering across quarters. Teams stop discovering conflicting assumptions in the final integration week. Status conversations get shorter because the written record already carries the load. Leaders ask better questions because the tradeoffs are visible early enough to matter.",
      "p18",
    ),
    paragraph(
      "And you, as the TPM, are less often the hero in the room — and more often the person who made the room unnecessary.",
      "p19",
    ),
    paragraph(
      "That is the real craft. Not collecting alignment. Designing systems where alignment is cheaper to maintain.",
      "p20",
    ),
  ],
};
