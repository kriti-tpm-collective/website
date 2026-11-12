import { kritiThakur } from "@/content/author";
import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Article } from "@/lib/types";

export const theCraftBetweenTheOrgs: Article = {
  _id: "article-craft-between-orgs",
  title: "The Craft Between the Orgs",
  slug: "the-craft-between-the-orgs",
  excerpt:
    "Technical Program Management is not project tracking with better slides. It is the craft of making complex technical work move across people, systems, and incentives that were never designed to line up.",
  publishedAt: "2025-06-02T10:00:00.000Z",
  readingTimeMinutes: 11,
  featured: false,
  topics: [
    { title: "TPM craft", slug: "tpm-craft" },
    { title: "Program leadership", slug: "program-leadership" },
  ],
  author: kritiThakur,
  body: [
    paragraph(
      "When people ask what a Technical Program Manager does, they often want a tidy answer: drive timelines, run standups, manage dependencies, update stakeholders. Those are activities. They are not the craft.",
      "p1",
    ),
    paragraph(
      "The craft sits in the spaces between teams. Between a product ambition and an engineering constraint. Between a security requirement and a launch window. Between what leadership promised externally and what the system can honestly support. Between the plan that looked clean on a whiteboard and the organization that has to live with it.",
      "p2",
    ),
    paragraph(
      "That in-between work is high leverage and poorly documented. A lot of it lives in private Slack threads, inherited templates, and judgment calls nobody teaches in onboarding. TPM Collective exists because I believe that craft deserves a public home.",
      "p3",
    ),

    heading("Not a project manager with a technical adjective", "h1"),
    paragraph(
      "The title confuses people. Some hear “program” and think portfolio bureaucracy. Some hear “technical” and expect you to be the architect. Some hear “manager” and assume people-management. None of those captures the job well.",
      "p4",
    ),
    paragraph(
      "The useful distinction is this: you are accountable for movement across a system of teams, not for the output of a single team. You need enough technical depth to detect nonsense, enough organizational skill to navigate incentives, and enough delivery judgment to know when a plan is a plan and when it is a wish.",
      "p5",
    ),
    quote(
      "If your value disappears when the tickets are up to date, you were tracking work. If your value shows up when the work gets politically or technically hard, you were leading a program.",
      "q1",
    ),

    heading("What the work actually looks like", "h2"),
    paragraph(
      "On a good week, the craft looks deceptively quiet. You clarify an outcome so two teams stop building past each other. You get a decision owner named before a dependency becomes a surprise. You rewrite a status note so leadership sees the real tradeoff. You kill a meeting that was performing alignment without producing it.",
      "p6",
    ),
    paragraph(
      "On a hard week, the craft is heavier. A critical path breaks. A partner team reorgs. A compliance review lands late. A date that was always fragile becomes publicly committed. Then the job is to keep the system honest without letting panic become the operating system.",
      "p7",
    ),
    paragraph("The skills that matter most in those moments are not exotic:", "p8"),
    ...bullets(
      [
        "Seeing the whole board — technical, organizational, and temporal.",
        "Naming tradeoffs early enough that choice still exists.",
        "Building artifacts that travel without you.",
        "Holding a standard of candor when optimism would be easier.",
        "Creating just enough structure that energy turns into progress.",
      ],
      "b1",
    ),

    heading("Why this work needs a collective", "h3"),
    paragraph(
      "Engineering has deep written culture. Product has a loud one. TPM work has historically been apprenticed in hallways. That leaves too many people reinventing the same patterns alone — especially when they are the only TPM in a business unit, or the first TPM a company has hired.",
      "p9",
    ),
    paragraph(
      "I started TPM Collective to build a destination for that practice: writing that respects the difficulty of the job, resources worth returning to, and eventually gatherings where people can think together without networking theater.",
      "p10",
    ),
    paragraph(
      "We will grow carefully. Quality over volume. Substance over performance. The goal is not another feed. The goal is a place Technical Program Managers can come to sharpen judgment.",
      "p11",
    ),

    heading("If you do this work, you already know", "h4"),
    paragraph(
      "You know the feeling of being thanked for “keeping things organized” when what you actually did was prevent a quiet collision between three roadmaps. You know the cost of being the translator for too long. You know how rare it is to find writing that speaks to the job as it is lived.",
      "p12",
    ),
    paragraph(
      "This is for that job. The craft between the orgs. Think. Connect. Lead.",
      "p13",
    ),
  ],
};
