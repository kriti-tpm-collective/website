import { bullets, heading, paragraph } from "@/content/helpers";
import type { Resource } from "@/lib/types";

export const essentialReading: Resource = {
  _id: "res-reading-list",
  title: "Essential Reading for Practicing TPMs",
  slug: "essential-reading-practicing-tpms",
  summary:
    "A short, opinionated reading list on systems thinking, organizational design, and technical delivery leadership — books worth the time.",
  category: "Reading lists",
  featured: false,
  body: [
    paragraph(
      "There is no single canon for Technical Program Management. There is, however, a small set of books that sharpen the instincts the job rewards: seeing systems, navigating organizations, and shipping through ambiguity.",
      "p1",
    ),
    paragraph(
      "This list is short on purpose. Finish these before you expand it.",
      "p2",
    ),

    heading("Systems and complexity", "h1"),
    ...bullets(
      [
        "Thinking in Systems — Donella Meadows. The clearest introduction to feedback loops, stocks, flows, and leverage points. Directly useful when programs behave in non-linear ways.",
        "The Goal — Eliyahu Goldratt. A narrative introduction to bottlenecks and throughput. Changes how you see critical path and local optimization.",
      ],
      "b1",
    ),

    heading("Organizations and influence", "h2"),
    ...bullets(
      [
        "The Manager’s Path — Camille Fournier. Especially strong on engineering org dynamics, staff/principal influence, and how technical leadership actually works.",
        "An Elegant Puzzle — Will Larson. Org design, hiring, and the messy reality of growing engineering organizations — frequent context for TPMs.",
        "The Making of a Manager — Julie Zhuo. Clear thinking on expectations, feedback, and operating cadence. Useful even if you do not manage people directly.",
      ],
      "b2",
    ),

    heading("Delivery and product judgment", "h3"),
    ...bullets(
      [
        "Inspired — Marty Cagan. Helps TPMs understand strong product organizations — and spot when “roadmap” is really a feature factory.",
        "Accelerate — Nicole Forsgren, Jez Humble, Gene Kim. Evidence-backed view of delivery performance. Useful when conversations about process become ideological.",
        "Team Topologies — Matthew Skelton & Manuel Pais. A practical language for team boundaries and interaction modes — gold for cross-org programs.",
      ],
      "b3",
    ),

    heading("How to read this as a TPM", "h4"),
    paragraph(
      "Do not read for quotes. Read for transferable moves: how to find the bottleneck, how to redraw a boundary, how to make a tradeoff discussable. After each book, write one page: what you will try on your current program in the next two weeks.",
      "p3",
    ),
    paragraph(
      "If you only pick three to start: Thinking in Systems, Team Topologies, and Accelerate.",
      "p4",
    ),
  ],
};
