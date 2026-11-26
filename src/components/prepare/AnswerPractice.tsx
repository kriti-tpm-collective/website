"use client";

import { useEffect, useState } from "react";
import { RichText } from "@/components/prepare/RichText";
import { useStudy } from "@/components/prepare/StudyControls";

export function AnswerPractice({
  prompt,
  answer,
}: {
  prompt?: string;
  answer: string;
}) {
  const { studyMode } = useStudy();
  const [revealed, setRevealed] = useState(!studyMode);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRevealed(!studyMode);
  }, [studyMode, answer]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const hide = studyMode && !revealed;

  return (
    <figure className="rounded-2xl border-[1.5px] border-ink bg-surface p-5 shadow-[3px_3px_0_var(--ink)] md:p-6">
      {prompt ? (
        <p className="font-hand text-2xl text-ink-muted">
          “{prompt.replace(/^"|"$/g, "")}”
        </p>
      ) : null}
      <blockquote
        className={`mt-3 font-serif text-lg leading-relaxed text-ink transition ${
          hide ? "select-none blur-[6px]" : ""
        }`}
        aria-hidden={hide}
      >
        <RichText text={answer} />
      </blockquote>
      <figcaption className="mt-5 flex flex-wrap items-center gap-3 border-t border-dashed border-ink/20 pt-4">
        {studyMode ? (
          <button
            type="button"
            className="btn-secondary !min-h-9 !px-4 !text-sm"
            onClick={() => setRevealed((value) => !value)}
          >
            {revealed ? "Hide answer" : "Show answer"}
          </button>
        ) : null}
        <button
          type="button"
          className="btn-secondary !min-h-9 !px-4 !text-sm"
          onClick={() => {
            if (running) {
              setRunning(false);
              return;
            }
            setSeconds(0);
            setRunning(true);
            if (studyMode) setRevealed(true);
          }}
        >
          {running ? `Stop · ${seconds}s` : "Time me out loud"}
        </button>
        <span className="text-xs font-medium text-ink-faint">Aim for 45–75 seconds</span>
      </figcaption>
    </figure>
  );
}
