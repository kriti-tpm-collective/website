"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ProgressMap = Record<string, { studied?: boolean; said?: boolean }>;

type StudyContextValue = {
  studyMode: boolean;
  setStudyMode: (value: boolean) => void;
  progress: ProgressMap;
  mark: (skillId: string, field: "studied" | "said", value: boolean) => void;
  doneCount: number;
  totalSkills: number;
};

const StudyContext = createContext<StudyContextValue | null>(null);

const STORAGE_KEY = "tpm-prepare-progress-v1";
const STUDY_KEY = "tpm-prepare-study-mode-v1";

export function StudyProvider({
  skillIds,
  children,
}: {
  skillIds: string[];
  children: ReactNode;
}) {
  const [studyMode, setStudyModeState] = useState(false);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(JSON.parse(stored) as ProgressMap);
      const mode = localStorage.getItem(STUDY_KEY);
      if (mode === "1") setStudyModeState(true);
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress, ready]);

  const setStudyMode = useCallback((value: boolean) => {
    setStudyModeState(value);
    try {
      localStorage.setItem(STUDY_KEY, value ? "1" : "0");
    } catch {
      // ignore
    }
  }, []);

  const mark = useCallback((skillId: string, field: "studied" | "said", value: boolean) => {
    setProgress((current) => ({
      ...current,
      [skillId]: { ...current[skillId], [field]: value },
    }));
  }, []);

  const doneCount = useMemo(
    () => skillIds.filter((id) => progress[id]?.studied && progress[id]?.said).length,
    [progress, skillIds],
  );

  const value = useMemo(
    () => ({
      studyMode,
      setStudyMode,
      progress,
      mark,
      doneCount,
      totalSkills: skillIds.length,
    }),
    [studyMode, setStudyMode, progress, mark, doneCount, skillIds.length],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used within StudyProvider");
  return ctx;
}

export function StudyModeToggle() {
  const { studyMode, setStudyMode } = useStudy();
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] border-ink/20 bg-surface px-3.5 py-2 text-sm font-semibold text-ink">
      <input
        type="checkbox"
        checked={studyMode}
        onChange={(event) => setStudyMode(event.target.checked)}
        className="h-4 w-4 accent-[var(--accent)]"
      />
      Study mode
      <span className="hidden text-xs font-medium text-ink-faint sm:inline">
        hides answers until you reveal them
      </span>
    </label>
  );
}

export function StudyProgressBar() {
  const { doneCount, totalSkills } = useStudy();
  const pct = totalSkills === 0 ? 0 : Math.round((doneCount / totalSkills) * 100);

  return (
    <div className="min-w-[10rem]">
      <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
        <span>
          {doneCount}/{totalSkills} skills ready
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full border border-ink/15 bg-bg-deep">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function SkillCheckboxes({ skillId }: { skillId: string }) {
  const { progress, mark } = useStudy();
  const entry = progress[skillId] ?? {};

  return (
    <div className="flex flex-wrap gap-4 text-sm text-ink-muted">
      <label className="inline-flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={Boolean(entry.studied)}
          onChange={(event) => mark(skillId, "studied", event.target.checked)}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        Studied
      </label>
      <label className="inline-flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={Boolean(entry.said)}
          onChange={(event) => mark(skillId, "said", event.target.checked)}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        Said it out loud
      </label>
    </div>
  );
}
