import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getChapters, getOverviews, getPillars, pillarTheme, playbook } from "@/content/prepare";

export const metadata: Metadata = {
  title: "Prepare for the TPM Interview",
  description:
    "A Sr. TPM interview playbook: theory, tools, and metrics for 27 skills across six pillars — built for the follow-up questions after your STAR story.",
};

export default function PreparePage() {
  const pillars = getPillars();
  const overviews = getOverviews();
  const chapterCount = getChapters().length;

  return (
    <div>
      <section className="relative overflow-hidden border-b-[1.5px] border-ink/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, color-mix(in srgb, var(--sticky-yellow) 70%, transparent), transparent 42%), radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--sticky-blue) 55%, transparent), transparent 38%), radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--sticky-mint) 50%, transparent), transparent 40%)",
          }}
        />
        <div className="container-page relative py-14 md:py-20">
          <PageIntro
            eyebrow={playbook.meta.eyebrow ?? "interview prep, without the fluff"}
            title={playbook.meta.title}
            description={playbook.meta.subtitle}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {playbook.meta.layers.map((layer) => (
              <div
                key={layer.title}
                className={`rounded-2xl border-[1.5px] p-5 ${
                  layer.active
                    ? "border-ink bg-brand text-white shadow-[3px_3px_0_var(--ink)]"
                    : "border-ink/20 bg-surface text-ink"
                }`}
              >
                <p className="font-display text-lg font-bold tracking-[-0.02em]">
                  {layer.title}
                </p>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    layer.active ? "text-white/75" : "text-ink-muted"
                  }`}
                >
                  {layer.blurb}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#pillars" className="btn-primary">
              Browse the 6 pillars
            </Link>
            <Link href="#guides" className="btn-secondary">
              How the playbook works
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-faint">
            {chapterCount} skill chapters · same structure every time · study mode built in
          </p>
        </div>
      </section>

      <section id="pillars" className="scroll-mt-24">
        <div className="container-page py-14 md:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="font-hand text-2xl text-ink-muted">the map</p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-ink md:text-4xl">
              Six pillars, 27 skills
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-muted">
              Pillars B, C, and D are where most follow-up questions land. Pillar F is short, but it
              decides close calls at senior levels.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pillars.map((pillar) => {
              const theme = pillarTheme[pillar.letter] ?? pillarTheme.A;
              return (
                <Link
                  key={pillar.id}
                  href={`/prepare/pillars/${pillar.letter.toLowerCase()}`}
                  className="paper-card group flex flex-col p-6 no-underline"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink text-lg font-extrabold ${theme.sticky}`}
                    >
                      {pillar.letter}
                    </span>
                    <div>
                      <p className="text-xs font-bold tracking-[0.08em] text-ink-faint uppercase">
                        Pillar {pillar.letter}
                      </p>
                      <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-ink">
                        {pillar.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 font-serif text-base leading-relaxed text-ink-muted italic">
                    {pillar.question}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {pillar.skills.map((skill) => (
                      <li
                        key={skill.id}
                        className="rounded-md border border-ink/15 bg-bg px-2 py-0.5 text-[11px] font-semibold text-ink-muted"
                      >
                        {skill.code}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                    Open pillar
                    <span className="transition group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page pb-10 md:pb-12">
        <div className="paper-card overflow-hidden p-0">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 md:p-9">
              <p className="font-hand text-2xl text-ink-muted">a study rhythm that works</p>
              <ol className="mt-5 space-y-3 text-base leading-relaxed text-ink-muted">
                <li>
                  <strong className="text-ink">Read</strong> a chapter once, end to end.
                </li>
                <li>
                  <strong className="text-ink">Rewrite</strong> the 60-second answer in your own
                  words, using your own programs.
                </li>
                <li>
                  <strong className="text-ink">Say it out loud</strong>, timed. Aim for 45 to 75
                  seconds.
                </li>
                <li>
                  <strong className="text-ink">Attack it</strong> with the follow-up questions. Gaps
                  are the point.
                </li>
                <li>
                  <strong className="text-ink">Link it</strong> to a STAR story you can actually
                  tell.
                </li>
              </ol>
            </div>
            <div className="border-t-[1.5px] border-ink/10 bg-sticky-mint/50 p-7 md:border-t-0 md:border-l-[1.5px] md:p-9">
              <p className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                Turn on study mode
              </p>
              <p className="mt-3 leading-relaxed text-ink-muted">
                It blurs the sample answers and collapses follow-up angles until you tap them — so
                you practice, not skim.
              </p>
              <Link href="#pillars" className="btn-primary mt-6">
                Pick a pillar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="guides"
        className="scroll-mt-24 border-t border-dashed border-ink/20 bg-bg-deep/25"
      >
        <div className="container-page py-10 md:py-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-hand text-xl text-ink-muted">if you want the orientation</p>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">
                How to use this playbook
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-dashed divide-ink/15 rounded-2xl border border-ink/12 bg-surface/80 px-4 md:px-5">
            {overviews.map((guide, index) => (
              <li key={guide.id}>
                <Link
                  href={`/prepare/guides/${guide.slug}`}
                  className="group flex items-center gap-3 py-3.5 no-underline transition hover:bg-bg/60 md:gap-4"
                >
                  <span className="font-hand inline-flex w-6 shrink-0 justify-center text-lg text-ink-faint">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-ink-muted transition group-hover:text-ink md:text-base">
                    {guide.title}
                  </span>
                  <span
                    className="shrink-0 text-sm text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
