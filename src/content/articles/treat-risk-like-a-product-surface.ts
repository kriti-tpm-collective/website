import { kritiThakur } from "@/content/author";
import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Article } from "@/lib/types";

export const treatRiskLikeAProductSurface: Article = {
  _id: "article-risk-as-product",
  title: "Treat Risk Like a Product Surface",
  slug: "treat-risk-like-a-product-surface",
  excerpt:
    "A risk register nobody acts on creates false confidence. Treat risk as an operational surface — with owners, thresholds, and responses designed before the crisis.",
  publishedAt: "2025-09-22T10:00:00.000Z",
  readingTimeMinutes: 10,
  featured: true,
  topics: [
    { title: "Risk & delivery", slug: "risk-delivery" },
    { title: "Operating systems", slug: "operating-systems" },
  ],
  author: kritiThakur,
  body: [
    paragraph(
      "Somewhere in almost every program folder there is a spreadsheet titled Risk Register. It was created in week two with good intentions. By week eight it is a museum of adjectives: High, Medium, Low. Red, Yellow, Green. No owners. No triggers. No evidence that anyone used it to change a plan.",
      "p1",
    ),
    paragraph(
      "That artifact is worse than having no list. It creates the sensation of control without the practice of control. Leaders glance at it and feel reassured. The program continues exactly as before.",
      "p2",
    ),
    paragraph(
      "I stopped thinking of risk as a document. I started thinking of it as a product surface: something the team inspects, prioritizes, designs against, and improves over time.",
      "p3",
    ),

    heading("Risk is not a feeling. It is a design input.", "h1"),
    paragraph(
      "In technical programs, risk usually means one of a few concrete things: a dependency that may not land, a technical unknown that may explode the estimate, a compliance gate that may reject the design, a staffing assumption that may not hold, or a customer commitment that was made before discovery was finished.",
      "p4",
    ),
    paragraph(
      "Those are not moods. They are constraints on how you sequence work. If a dependency is fragile, you do not put it on the critical path and hope. If a technical unknown is large, you buy information before you buy implementation. If a compliance gate is real, you engage it early enough that “no” is still useful.",
      "p5",
    ),
    quote(
      "If a risk cannot change the plan, it is not being managed. It is being narrated.",
      "q1",
    ),

    heading("Owners beat adjectives", "h2"),
    paragraph(
      "Severity labels are almost useless without three companions: an owner, a trigger, and a next action that can be scheduled.",
      "p6",
    ),
    paragraph(
      "Owner means a person who wakes up responsible for watching the risk — not a team name, not “TBD,” not the TPM by default. Trigger means the signal that tells you the risk is becoming real: a missed integration date, a failed load test, a vendor silence longer than agreed. Next action means something that fits on a calendar this week or next.",
      "p7",
    ),
    paragraph(
      "If you cannot assign an owner, you do not understand the risk yet. If you cannot define a trigger, you will discover the failure the hard way. If you cannot name a next action, you are practicing anxiety, not management.",
      "p8",
    ),

    heading("Design the response before the crisis", "h3"),
    paragraph(
      "The best risk work happens when the room is still calm. That is when you can still choose alternative sequencing, reserve spike capacity, set kill criteria, or get leadership to accept a tradeoff in writing.",
      "p9",
    ),
    paragraph(
      "Under pressure, people invent governance. They call emergency meetings. They escalate without a ask. They rewrite the plan every day. A pre-designed response is quieter and faster: we already decided what we would cut, what we would parallelize, and what we would refuse to pretend is still on track.",
      "p10",
    ),
    paragraph("A practical prep set for any major program:", "p11"),
    ...bullets(
      [
        "What will we stop doing if the critical path slips by two weeks?",
        "What decisions require an executive, and what can the team close alone?",
        "What is the earliest honest date we would tell stakeholders the date moved?",
        "Which mitigations are cheap enough to start now, before we “need” them?",
      ],
      "b1",
    ),

    heading("Separate watch items from active risks", "h4"),
    paragraph(
      "Not everything belongs on the same list. Some items are worth monitoring. Others demand weekly attention. Mixing them trains people to ignore the whole board.",
      "p12",
    ),
    paragraph(
      "I keep the active set short — usually five or fewer. Anything else goes to a watch list with a lighter cadence. The active set gets reviewed in the same forums where delivery decisions are made, not in a side meeting that nobody with authority attends.",
      "p13",
    ),
    paragraph(
      "This is also where TPMs earn trust with engineering. Engineers can smell performative process. A short, owned, action-linked risk list feels like partnership. A bloated register feels like overhead.",
      "p14",
    ),

    heading("Tell the truth early enough for it to matter", "h5"),
    paragraph(
      "Risk communication fails in two opposite ways. One is silence until the crisis is undeniable. The other is constant alarm that trains leaders to tune out.",
      "p15",
    ),
    paragraph(
      "The middle path is disciplined candor: name the risk, name the impact range, name what you are doing, and name what you need. Do it while options still exist. A late risk update is often just a polite failure announcement.",
      "p16",
    ),
    paragraph(
      "I would rather be remembered as the TPM who surfaced an uncomfortable dependency in week three than the TPM who protected optimism until week twelve.",
      "p17",
    ),
    paragraph(
      "Treat risk like a product surface. Inspect it. Prioritize it. Design against it. Improve the system that produces it. That is how programs stay honest under pressure — and how teams keep their credibility when the path gets hard.",
      "p18",
    ),
  ],
};
