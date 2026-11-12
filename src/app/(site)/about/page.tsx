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
      <PageIntro title="Why TPM Collective exists" description={settings.mission} />

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

          <div className="border-t border-line pt-8">
            <p className="text-xs font-medium tracking-[0.04em] text-ink-faint uppercase">
              Founder
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-brand">
              Kriti Thakur
            </h2>
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

        <aside className="h-fit rounded-2xl border border-line bg-surface p-7 shadow-[var(--shadow-soft)] md:p-8">
          <p className="text-xs font-medium tracking-[0.04em] text-ink-faint uppercase">
            Pillars
          </p>
          <ul className="mt-6 space-y-6">
            <li>
              <p className="text-lg font-semibold tracking-[-0.02em] text-ink">Think</p>
              <p className="mt-1 text-sm text-ink-muted">
                Essays and field notes that sharpen judgment.
              </p>
            </li>
            <li>
              <p className="text-lg font-semibold tracking-[-0.02em] text-ink">Connect</p>
              <p className="mt-1 text-sm text-ink-muted">
                Events and conversations among people who do the work.
              </p>
            </li>
            <li>
              <p className="text-lg font-semibold tracking-[-0.02em] text-ink">Lead</p>
              <p className="mt-1 text-sm text-ink-muted">
                Resources and frameworks for programs that matter.
              </p>
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
