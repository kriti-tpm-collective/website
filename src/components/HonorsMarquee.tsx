const honors = [
  { top: "Survivor of", main: "1,000+ Standups" },
  { top: "Certified", main: "Meeting Shortener" },
  { top: "Lifetime", main: "Gantt Whisperer" },
  { top: "Proud owner of", main: "The Unowned" },
  { top: "Professional", main: "Dot Connector" },
  { top: "Most likely to ask", main: "“Who’s the DRI?”" },
  { top: "Fluent in", main: "Eng, PM & Legal" },
];

const leaves = [
  { cx: 15.5, cy: 41, r: -55 },
  { cx: 10.5, cy: 34, r: -38 },
  { cx: 7.6, cy: 26, r: -20 },
  { cx: 7.4, cy: 17.5, r: -4 },
  { cx: 9.8, cy: 9.5, r: 14 },
  { cx: 16.5, cy: 33, r: 40 },
  { cx: 14, cy: 22, r: 30 },
];

function Branch({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 48"
      className={`h-12 w-6 shrink-0 text-ink ${mirrored ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <path d="M18 46 Q 5 31 12 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {leaves.map((leaf) => (
        <ellipse
          key={`${leaf.cx}-${leaf.cy}`}
          cx={leaf.cx}
          cy={leaf.cy}
          rx="2.4"
          ry="4.8"
          fill="currentColor"
          transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
    </svg>
  );
}

function Honor({ top, main }: { top: string; main: string }) {
  return (
    <li className="flex items-center gap-1.5 px-7">
      <Branch />
      <span className="flex min-w-[7.5rem] flex-col items-center text-center leading-none">
        <span className="text-[9px] font-semibold tracking-[0.16em] text-ink-muted uppercase">
          {top}
        </span>
        <span className="font-display mt-1 text-[15px] font-bold tracking-[-0.01em] text-ink uppercase">
          {main}
        </span>
      </span>
      <Branch mirrored />
    </li>
  );
}

export function HonorsMarquee() {
  return (
    <section
      aria-label="Unofficial honors every TPM has earned"
      className="marquee overflow-hidden border-y-[1.5px] border-ink bg-surface py-5"
    >
      <div className="marquee-track">
        <ul className="flex shrink-0">
          {honors.map((honor) => (
            <Honor key={honor.main} {...honor} />
          ))}
        </ul>
        <ul className="flex shrink-0" aria-hidden="true">
          {honors.map((honor) => (
            <Honor key={honor.main} {...honor} />
          ))}
        </ul>
      </div>
    </section>
  );
}
