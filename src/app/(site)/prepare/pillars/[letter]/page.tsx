import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPillarByLetter, getPillars, pillarTheme } from "@/content/prepare";

type Props = { params: Promise<{ letter: string }> };

export async function generateStaticParams() {
  return getPillars().map((pillar) => ({ letter: pillar.letter.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  const pillar = getPillarByLetter(letter);
  if (!pillar) return { title: "Pillar" };
  return {
    title: `Pillar ${pillar.letter}: ${pillar.name}`,
    description: pillar.question,
  };
}

export default async function PillarPage({ params }: Props) {
  const { letter } = await params;
  const pillar = getPillarByLetter(letter);
  if (!pillar) notFound();

  const theme = pillarTheme[pillar.letter] ?? pillarTheme.A;
  const pillars = getPillars();
  const index = pillars.findIndex((item) => item.letter === pillar.letter);
  const prev = pillars[index - 1];
  const next = pillars[index + 1];

  return (
    <div className="container-page py-12 md:py-16">
      <Link
        href="/prepare"
        className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition hover:text-ink"
      >
        <span className="transition group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Prepare
      </Link>

      <header
        className={`mt-8 overflow-hidden rounded-[24px] border-[1.5px] border-ink p-7 shadow-[4px_4px_0_var(--ink)] md:p-10 ${theme.sticky}`}
      >
        <p className="text-sm font-bold tracking-[0.1em] text-ink/70 uppercase">
          Pillar {pillar.letter}
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-[-0.045em] text-ink md:text-6xl">
          {pillar.name}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-ink/85 italic md:text-2xl">
          {pillar.question}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
          {pillar.lead}
        </p>
      </header>

      <div className="mt-10 space-y-4">
        {pillar.skills.map((skill, skillIndex) => (
          <Link
            key={skill.id}
            href={`/prepare/skills/${skill.slug}`}
            className="paper-card group flex flex-col gap-3 p-5 no-underline md:flex-row md:items-start md:gap-6 md:p-6"
          >
            <span
              className={`font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-ink text-lg font-extrabold ${theme.soft}`}
            >
              {skill.code}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                  {skill.title}
                </h2>
                <span className="text-xs font-semibold text-ink-faint">
                  {skillIndex + 1}/{pillar.skills.length}
                </span>
              </div>
              <p className="mt-2 max-w-[44em] font-serif leading-relaxed text-ink-muted">
                {skill.oneliner.replace(/\*/g, "")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                Open chapter
                <span className="transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <nav className="mt-12 flex flex-col gap-3 border-t-[1.5px] border-dashed border-ink/25 pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={`/prepare/pillars/${prev.letter.toLowerCase()}`}
            className="text-sm font-semibold text-ink"
          >
            ← Pillar {prev.letter}: {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/prepare/pillars/${next.letter.toLowerCase()}`}
            className="text-sm font-semibold text-ink sm:text-right"
          >
            Pillar {next.letter}: {next.name} →
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
