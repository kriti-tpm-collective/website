import { kritiThakur } from "@/content/author";
import { bullets, heading, paragraph, quote } from "@/content/helpers";
import type { Article } from "@/lib/types";

export const runningAiPrograms: Article = {
  _id: "article-ai-programs",
  title: "Running AI Programs Without the Hype Hangover",
  slug: "running-ai-programs-without-the-hype-hangover",
  excerpt:
    "AI initiatives fail for familiar reasons: unclear outcomes, fuzzy ownership, and demo-driven timelines. The TPM craft still applies — with a few new failure modes you cannot ignore.",
  publishedAt: "2025-07-09T10:00:00.000Z",
  readingTimeMinutes: 12,
  featured: false,
  topics: [
    { title: "AI program leadership", slug: "ai-program-leadership" },
    { title: "Program leadership", slug: "program-leadership" },
  ],
  author: kritiThakur,
  body: [
    paragraph(
      "Every few years, technology creates a new category of program that leadership wants shipped yesterday. Right now that category is AI. The tools are new. Many of the failure modes are not.",
      "p1",
    ),
    paragraph(
      "I have watched AI initiatives stall for the same reasons classic platform rewrites stall: unclear success metrics, missing owners, demo timelines disconnected from operational readiness, and stakeholder excitement that outruns the team’s ability to evaluate quality.",
      "p2",
    ),
    paragraph(
      "That should be comforting. It means Technical Program Managers already have useful instincts. It should also be sobering. Familiar failure modes dressed in new vocabulary still fail.",
      "p3",
    ),

    heading("“Use AI” is not an outcome", "h1"),
    paragraph(
      "If the program goal is “add AI,” you do not have a program. You have a slogan. Outcomes need operational teeth: reduce handle time by a defined amount, improve triage accuracy against a labeled set, unblock a workflow that currently requires three teams and a spreadsheet, or cut the cost of a manual review loop without raising error rates beyond an agreed threshold.",
      "p4",
    ),
    paragraph(
      "I push for this early, even when it makes the room uncomfortable. Vague AI goals create infinite scope. Every model improvement looks like progress. Every demo looks like momentum. Nobody can tell you when you are done, or when you should stop.",
      "p5",
    ),
    quote(
      "If you cannot describe the job to be done without saying “AI,” you are not ready to run an AI program. You are ready to run a discovery spike.",
      "q1",
    ),

    heading("Put evaluation on the critical path", "h2"),
    paragraph(
      "In traditional software, we still underinvest in quality gates. In AI programs, underinvesting in evaluation is existential. Model behavior is not a side quest for a research week. It is a delivery dependency.",
      "p6",
    ),
    paragraph(
      "That means evaluation design belongs in the plan from the start: what “good” means, what data you will use to measure it, who judges edge cases, how often you re-measure after prompt or model changes, and what happens when quality regresses.",
      "p7",
    ),
    paragraph(
      "I have seen teams ship a polished interface on top of an unevaluated model and call it a launch. Users found the failures immediately. Trust dropped faster than the demo had risen. The recovery cost more than doing evaluation properly the first time.",
      "p8",
    ),

    heading("Human review is part of the system, not a temporary crutch", "h3"),
    paragraph(
      "There is a fantasy that AI programs graduate from human-in-the-loop to full autonomy in a straight line. Some do. Many should not — at least not for the decisions that carry legal, safety, financial, or reputational risk.",
      "p9",
    ),
    paragraph(
      "Design the human review path as a first-class workflow: who reviews, with what SLA, with what escalation, and with what feedback loop back into the model or prompts. If review is an afterthought, it becomes a bottleneck and a blame magnet.",
      "p10",
    ),

    heading("Ownership gets weird. Make it explicit.", "h4"),
    paragraph(
      "AI programs often cut across product, engineering, data, research, legal, security, and operations. That is fertile ground for diffused accountability. Everyone is involved. No one is responsible.",
      "p11",
    ),
    paragraph("Write the ownership map early:", "p12"),
    ...bullets(
      [
        "Who owns the product outcome?",
        "Who owns model quality and evaluation?",
        "Who owns data access, retention, and consent constraints?",
        "Who can say no on risk grounds — and how is that decision timed?",
        "Who owns the operational runbook after launch?",
      ],
      "b1",
    ),
    paragraph(
      "If those answers are fuzzy, your Gantt chart is fiction.",
      "p13",
    ),

    heading("Protect the team from demo-driven timelines", "h5"),
    paragraph(
      "Demos are useful. They create energy and reveal gaps. They are also dangerous when they become the planning system. A timeline built around “we need something impressive for the offsite” will systematically underfund evaluation, documentation, monitoring, and the boring integration work that makes a demo into a product.",
      "p14",
    ),
    paragraph(
      "As a TPM, your job includes translating executive excitement into a sequence that can survive contact with reality. That may mean offering a staged path: a supervised pilot with clear metrics, then a broader rollout with kill criteria, then automation where evidence supports it. Stages are not pessimism. They are how you keep the hangover from becoming a write-off.",
      "p15",
    ),

    heading("The TPM craft still wins", "h6"),
    paragraph(
      "Clear outcomes. Owned decisions. Visible risks. Honest forecasts. Feedback loops that change the plan. None of that is unique to AI. All of it is more important when the technology invites magical thinking.",
      "p16",
    ),
    paragraph(
      "Run AI programs like programs — not like demos with a backlog attached. The hype will move on. The operational debt will not.",
      "p17",
    ),
  ],
};
