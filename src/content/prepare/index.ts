import playbookData from "./playbook.json";
import type { OverviewGuide, Pillar, Playbook, SkillChapter } from "./types";

export const playbook = playbookData as unknown as Playbook;

export const pillarTheme: Record<
  string,
  { sticky: string; soft: string; label: string }
> = {
  A: { sticky: "bg-sticky-blue", soft: "bg-sticky-blue/35", label: "Strategy" },
  B: { sticky: "bg-sticky-mint", soft: "bg-sticky-mint/40", label: "Execution" },
  C: { sticky: "bg-sticky-yellow", soft: "bg-sticky-yellow/40", label: "Risk" },
  D: { sticky: "bg-sticky-pink", soft: "bg-sticky-pink/40", label: "People" },
  E: { sticky: "bg-accent-soft", soft: "bg-accent-soft", label: "Acumen" },
  F: { sticky: "bg-bg-deep", soft: "bg-bg-deep", label: "Ownership" },
};

export function getOverviews(): OverviewGuide[] {
  return playbook.overviews;
}

export function getOverviewBySlug(slug: string): OverviewGuide | undefined {
  return playbook.overviews.find((guide) => guide.slug === slug);
}

export function getPillars(): Pillar[] {
  return playbook.pillars;
}

export function getPillarByLetter(letter: string): Pillar | undefined {
  const key = letter.toUpperCase();
  return playbook.pillars.find((pillar) => pillar.letter === key);
}

export function getChapters(): SkillChapter[] {
  return playbook.chapters as SkillChapter[];
}

export function getChapterBySlug(slug: string): SkillChapter | undefined {
  return playbook.chapters.find((chapter) => chapter.slug === slug);
}

export function getChapterById(id: string): SkillChapter | undefined {
  return playbook.chapters.find((chapter) => chapter.id === id);
}

export function getAdjacentChapters(slug: string): {
  prev?: SkillChapter;
  next?: SkillChapter;
} {
  const index = playbook.chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) return {};
  return {
    prev: playbook.chapters[index - 1],
    next: playbook.chapters[index + 1],
  };
}

export function getPillarForChapter(chapter: SkillChapter): Pillar | undefined {
  return getPillarByLetter(chapter.pillar);
}
