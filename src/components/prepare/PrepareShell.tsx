"use client";

import {
  StudyModeToggle,
  StudyProgressBar,
  StudyProvider,
} from "@/components/prepare/StudyControls";

export function PrepareShell({
  skillIds,
  children,
}: {
  skillIds: string[];
  children: React.ReactNode;
}) {
  return (
    <StudyProvider skillIds={skillIds}>
      <div className="border-b border-ink/10 bg-bg-deep/50">
        <div className="container-page flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <StudyModeToggle />
          <StudyProgressBar />
        </div>
      </div>
      {children}
    </StudyProvider>
  );
}
