"use client";

import { useState } from "react";
import { RichText } from "@/components/prepare/RichText";
import { useStudy } from "@/components/prepare/StudyControls";

export function Followups({
  items,
}: {
  items: { question: string; angle: string }[];
}) {
  const { studyMode } = useStudy();

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <FollowupItem key={item.question} item={item} studyMode={studyMode} />
      ))}
    </ul>
  );
}

function FollowupItem({
  item,
  studyMode,
}: {
  item: { question: string; angle: string };
  studyMode: boolean;
}) {
  const [open, setOpen] = useState(!studyMode);

  return (
    <li className="rounded-2xl border-[1.5px] border-ink/15 bg-surface overflow-hidden">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left md:px-5"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="font-semibold text-ink">
          <RichText text={item.question} />
        </span>
        <span className="shrink-0 text-sm font-semibold text-ink-faint">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="border-t border-dashed border-ink/15 bg-sticky-yellow/30 px-4 py-3 md:px-5">
          <p className="text-xs font-bold tracking-[0.08em] text-ink-muted uppercase">
            Angle to take
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink md:text-base">
            <RichText text={item.angle} />
          </p>
        </div>
      ) : null}
    </li>
  );
}
