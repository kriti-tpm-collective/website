import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "TPM Collective is a professional destination for Technical Program Managers, founded by Kriti Thakur.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-14 md:py-20">
      <PageIntro
        eyebrow="the why behind the what"
        title="Why TPM Collective exists"
        description={settings.mission}
      />

      <div className="mt-14 grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
          <p>
            Technical Program Managers sit at a demanding intersection: technology depth,
            organizational navigation, and delivery leadership. The work is high-leverage and often
            under-documented. Too much of the craft lives in private Slack threads, inherited
            templates, and hard-won intuition.
          </p>
          <p>
            TPM Collective exists to make that craft more visible — through writing that respects
            practitioners, resources worth returning to, and gatherings where people can think
            together without the theater of generic networking.
          </p>
          <p>
            We are building a destination, not a feed. Quality over volume. Practice over
            performance. Community that grows from substance.
          </p>

          <div className="paper-card mt-10 p-7 md:p-9">
            <span className="tape" aria-hidden="true" />
            <p className="font-hand text-2xl text-ink-muted">the human behind it</p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-[-0.035em] text-ink">
              Kriti Thakur
            </h2>
            <p className="text-sm font-semibold text-ink">Founder</p>
            <p className="mt-4">
              Kriti is a Technical Program Manager and the founder of TPM Collective. She writes
              about the practice of leading complex technical programs — alignment across orgs,
              risk that changes the plan, honest roadmaps, and the judgment calls that never make
              it into the job description.
            </p>
            <p className="mt-4">
              The essays here come from that work: field notes for people who sit between teams and
              are accountable for making hard things move.
            </p>
          </div>
        </div>

        <aside className="h-fit md:sticky md:top-24">
          <p className="font-hand text-[1.75rem] text-ink-muted">three pillars, zero buzzwords</p>
          <ul className="mt-5 space-y-5">
            <li className="-rotate-2 rounded-[4px] border border-ink/80 bg-sticky-yellow p-5 shadow-[3px_4px_0_rgba(11,22,48,0.85)] transition hover:rotate-0">
              <p className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">Think</p>
              <p className="mt-1 text-ink/75">Essays and field notes that sharpen judgment.</p>
            </li>
            <li className="rotate-1 rounded-[4px] border border-ink/80 bg-sticky-mint p-5 shadow-[3px_4px_0_rgba(11,22,48,0.85)] transition hover:rotate-0">
              <p className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">Connect</p>
              <p className="mt-1 text-ink/75">
                Events and conversations among people who do the work.
              </p>
            </li>
            <li className="-rotate-1 rounded-[4px] border border-ink/80 bg-sticky-blue p-5 shadow-[3px_4px_0_rgba(11,22,48,0.85)] transition hover:rotate-0">
              <p className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">Lead</p>
              <p className="mt-1 text-ink/75">Resources and frameworks for programs that matter.</p>
            </li>
          </ul>
          <Link href="/articles" className="btn-primary mt-8 w-full">
            Read the essays
          </Link>
        </aside>
      </div>
    </div>
  );
}
