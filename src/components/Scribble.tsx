import type { ReactNode } from "react";

export function Scribble({
  children,
  color = "var(--signal-amber)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span className="scribble">
      {children}
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M3 9 C 45 3, 90 2, 130 6 S 185 12, 197 5"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
