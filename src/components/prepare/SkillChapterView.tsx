import Link from "next/link";
import { AnswerPractice } from "@/components/prepare/AnswerPractice";
import { DataTable } from "@/components/prepare/ContentBlocks";
import { Followups } from "@/components/prepare/Followups";
import { RichText } from "@/components/prepare/RichText";
import { SkillCheckboxes } from "@/components/prepare/StudyControls";
import { pillarTheme } from "@/content/prepare";
import type { Pillar, SkillChapter, SkillSection } from "@/content/prepare/types";

export function SkillChapterView({
  chapter,
  pillar,
  prev,
  next,
}: {
  chapter: SkillChapter;
  pillar: Pillar;
  prev?: SkillChapter;
  next?: SkillChapter;
}) {
  const theme = pillarTheme[chapter.pillar] ?? pillarTheme.A;

  return (
    <article>
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/prepare"
          className="font-semibold text-ink-muted transition hover:text-ink"
        >
          ← Prepare
        </Link>
        <span className="text-ink-faint">/</span>
        <Link
          href={`/prepare/pillars/${chapter.pillar.toLowerCase()}`}
          className="font-semibold text-ink-muted transition hover:text-ink"
        >
          Pillar {chapter.pillar}
        </Link>
      </div>

      <header className={`rounded-[22px] border-[1.5px] border-ink p-6 shadow-[3px_3px_0_var(--ink)] md:p-8 ${theme.soft}`}>
        <div className="flex flex-wrap items-start gap-5">
          <span className={`font-display flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-ink text-2xl font-extrabold text-ink ${theme.sticky}`}>
            {chapter.code}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-[0.1em] text-ink-muted uppercase">
              Pillar {chapter.pillar} · {pillar.name}
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold tracking-[-0.04em] text-ink md:text-5xl">
              {chapter.title}
            </h1>
            <p className="mt-4 max-w-[40em] font-serif text-lg leading-relaxed text-ink md:text-xl">
              <RichText text={chapter.oneliner} />
            </p>
            <div className="mt-5">
              <SkillCheckboxes skillId={chapter.id} />
            </div>
          </div>
        </div>
      </header>

      <nav
        aria-label="Chapter sections"
        className="mt-8 flex gap-2 overflow-x-auto pb-2 md:flex-wrap"
      >
        {chapter.sections.map((section) => (
          <a
            key={section.n}
            href={`#sec-${section.n}`}
            className="shrink-0 rounded-full border border-ink/20 bg-surface px-3 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-ink hover:text-ink"
          >
            {section.n}. {shortLabel(section)}
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-5">
        {chapter.sections.map((section) => (
          <SectionCard key={section.n} section={section} />
        ))}
      </div>

      <nav className="mt-12 flex flex-col gap-4 border-t-[1.5px] border-dashed border-ink/25 pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={`/prepare/skills/${prev.slug}`}
            className="group paper-card max-w-sm p-4 no-underline"
          >
            <p className="text-xs font-bold tracking-[0.08em] text-ink-faint uppercase">
              Previous
            </p>
            <p className="mt-1 font-display text-lg font-bold tracking-[-0.02em] text-ink">
              <span className="transition group-hover:-translate-x-0.5" aria-hidden="true">
                ←
              </span>{" "}
              {prev.code} {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/prepare/skills/${next.slug}`}
            className="group paper-card max-w-sm p-4 text-right no-underline sm:ml-auto"
          >
            <p className="text-xs font-bold tracking-[0.08em] text-ink-faint uppercase">
              Next
            </p>
            <p className="mt-1 font-display text-lg font-bold tracking-[-0.02em] text-ink">
              {next.code} {next.title}{" "}
              <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}

function shortLabel(section: SkillSection): string {
  const map: Record<string, string> = {
    probe: "Probe",
    principles: "Principles",
    dodont: "Do / Don't",
    tools: "Tools",
    metrics: "Metrics",
    wrong: "When wrong",
    grows: "Levels",
    answer: "60s answer",
    followups: "Follow-ups",
    ops: "Principles map",
  };
  return map[section.kind] ?? section.heading.slice(0, 18);
}

function SectionCard({ section }: { section: SkillSection }) {
  const tint =
    section.kind === "wrong"
      ? "bg-[#fff4e5]"
      : section.kind === "probe"
        ? "bg-bg-deep/60"
        : "bg-surface";

  return (
    <section
      id={`sec-${section.n}`}
      className={`scroll-mt-24 rounded-[20px] border-[1.5px] border-ink/15 ${tint} overflow-hidden`}
    >
      <div className="flex items-baseline gap-3 border-b border-ink/10 px-5 py-4 md:px-6">
        <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
          {section.n}
        </span>
        <h2 className="font-display text-xl font-bold tracking-[-0.025em] text-ink md:text-2xl">
          {section.heading}
        </h2>
      </div>
      <div className="px-5 py-5 md:px-6 md:py-6">
        <SectionBody section={section} />
      </div>
    </section>
  );
}

function SectionBody({ section }: { section: SkillSection }) {
  switch (section.kind) {
    case "probe":
      return (
        <div className="space-y-4">
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="max-w-[46em] leading-relaxed text-ink-muted">
              <RichText text={paragraph} />
            </p>
          ))}
          {section.items && section.items.length > 0 ? (
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-ink/12 border-l-4 border-l-accent bg-surface px-4 py-3 leading-relaxed text-ink"
                >
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    case "principles":
      return (
        <ul className="max-w-[48em] list-disc space-y-3 pl-5 leading-relaxed text-ink-muted marker:text-accent">
          {section.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "dodont":
      return (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[color-mix(in_srgb,var(--success)_12%,white)] p-4 md:p-5">
              <h3 className="font-display text-lg font-bold text-success">Do</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink md:text-base">
                {section.dos.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="font-bold text-success">✓</span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[color-mix(in_srgb,var(--danger)_10%,white)] p-4 md:p-5">
              <h3 className="font-display text-lg font-bold text-danger">Don&apos;t</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink md:text-base">
                {section.donts.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="font-bold text-danger">✕</span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {section.redFlag ? (
            <div className="rounded-2xl border-[1.5px] border-danger/40 bg-[#2b1214] px-4 py-3.5 text-sm leading-relaxed text-[#ffe3e3] md:px-5 md:text-base">
              <RichText text={section.redFlag} />
            </div>
          ) : null}
        </div>
      );
    case "tools":
      return (
        <div className="space-y-4">
          {section.table ? (
            <DataTable headers={section.table.headers} rows={section.table.rows} />
          ) : null}
          {section.notes?.map((note) => (
            <p key={note} className="max-w-[46em] leading-relaxed text-ink-muted">
              <RichText text={note} />
            </p>
          ))}
        </div>
      );
    case "metrics":
    case "wrong":
      return (
        <ul className="max-w-[48em] list-disc space-y-3 pl-5 leading-relaxed text-ink-muted marker:text-accent">
          {section.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "grows":
      return (
        <div className="grid gap-3 md:grid-cols-3">
          {section.levels.map((level) => (
            <div
              key={level.title}
              className={`rounded-2xl border-[1.5px] p-4 ${
                level.target
                  ? "border-ink bg-sticky-yellow shadow-[3px_3px_0_var(--ink)]"
                  : "border-ink/15 bg-surface"
              }`}
            >
              {level.target ? (
                <p className="mb-1 text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
                  Your target level
                </p>
              ) : null}
              <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
                {level.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                <RichText text={level.text} />
              </p>
            </div>
          ))}
        </div>
      );
    case "answer":
      return <AnswerPractice prompt={section.prompt} answer={section.answer} />;
    case "followups":
      return <Followups items={section.followups} />;
    case "ops":
      return (
        <ul className="space-y-3">
          {section.ops.map((op) => (
            <li
              key={`${op.label}-${op.text}`}
              className="flex flex-col gap-2 rounded-2xl border border-ink/12 bg-surface p-4 sm:flex-row sm:items-start sm:gap-4"
            >
              <span
                className={`inline-flex w-fit shrink-0 rounded-full border-[1.5px] border-ink px-3 py-1 text-xs font-bold ${
                  op.amazon ? "bg-sticky-blue" : "bg-sticky-mint"
                }`}
              >
                {op.label}
              </span>
              <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                <RichText text={op.text} />
              </p>
            </li>
          ))}
        </ul>
      );
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}
