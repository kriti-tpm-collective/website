"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { assessStatus, statusSignals, type Mood, type Rag } from "@/lib/status-check";

const ragOptions: { value: Rag; label: string; swatch: string }[] = [
  { value: "green", label: "Green", swatch: "bg-signal-green" },
  { value: "amber", label: "Amber", swatch: "bg-signal-amber" },
  { value: "red", label: "Red", swatch: "bg-signal-red" },
];

const fills: Record<Rag, string> = {
  green: "#1f9d55",
  amber: "#f2a516",
  red: "#e5484d",
};

function StatusFace({ actual, mood, watermelon }: { actual: Rag; mood: Mood; watermelon: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="h-48 w-48 drop-shadow-[6px_8px_0_rgba(0,0,0,0.35)] md:h-60 md:w-60"
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="76"
        animate={{
          fill: fills[actual],
          stroke: watermelon ? "#1f9d55" : "#0b1630",
          strokeWidth: watermelon ? 14 : 3,
        }}
        transition={{ duration: 0.35 }}
      />
      {watermelon ? (
        <>
          <circle cx="100" cy="100" r="67" fill="none" stroke="#c8f0d6" strokeWidth="4" />
          {[
            [70, 62, -20],
            [132, 64, 25],
            [58, 108, -40],
            [144, 112, 40],
            [100, 160, 0],
          ].map(([cx, cy, r]) => (
            <ellipse
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              rx="3"
              ry="5.5"
              fill="#0b1630"
              transform={`rotate(${r} ${cx} ${cy})`}
            />
          ))}
        </>
      ) : null}

      <circle cx="76" cy="92" r="8" fill="#0b1630" />
      <circle cx="124" cy="92" r="8" fill="#0b1630" />
      <circle cx="79" cy="89" r="2.5" fill="white" />
      <circle cx="127" cy="89" r="2.5" fill="white" />

      {mood === "happy" ? (
        <path d="M70 118 Q100 148 130 118" fill="none" stroke="#0b1630" strokeWidth="6" strokeLinecap="round" />
      ) : null}
      {mood === "worried" ? (
        <>
          <path d="M62 72 L88 78" stroke="#0b1630" strokeWidth="5" strokeLinecap="round" />
          <path d="M138 72 L112 78" stroke="#0b1630" strokeWidth="5" strokeLinecap="round" />
          <path d="M76 132 Q100 122 124 132" fill="none" stroke="#0b1630" strokeWidth="6" strokeLinecap="round" />
        </>
      ) : null}
      {mood === "shocked" ? (
        <>
          <path d="M62 68 L88 74" stroke="#0b1630" strokeWidth="5" strokeLinecap="round" />
          <path d="M138 68 L112 74" stroke="#0b1630" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="100" cy="132" rx="13" ry="16" fill="#0b1630" />
        </>
      ) : null}
      {mood === "nervous" ? (
        <>
          <path
            d="M70 126 Q78 118 86 126 T102 126 T118 126 T132 126"
            fill="none"
            stroke="#0b1630"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M152 58 Q160 72 152 78 Q144 72 152 58 Z" fill="#cfe1ff" stroke="#0b1630" strokeWidth="2" />
        </>
      ) : null}
    </motion.svg>
  );
}

export function WatermelonTest() {
  const [reported, setReported] = useState<Rag>("green");
  const [checked, setChecked] = useState<boolean[]>(() => statusSignals.map(() => false));

  const count = checked.filter(Boolean).length;
  const result = assessStatus(reported, count);

  function toggle(index: number) {
    setChecked((current) => current.map((value, i) => (i === index ? !value : value)));
  }

  return (
    <section
      aria-labelledby="watermelon-heading"
      className="relative overflow-hidden bg-brand text-[#f6efe2]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1.5px)] bg-[length:26px_26px]"
        aria-hidden="true"
      />
      <div className="container-page relative grid gap-12 py-20 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-center text-center">
          <p className="font-hand -rotate-3 rounded-2xl bg-sticky-yellow px-4 py-1.5 text-2xl text-ink shadow-[3px_3px_0_rgba(0,0,0,0.4)]">
            reality says: {result.isWatermelon ? "watermelon" : result.actual}
          </p>
          <div className="mt-6">
            <StatusFace actual={result.actual} mood={result.mood} watermelon={result.isWatermelon} />
          </div>
          <div aria-live="polite" className="mt-6 max-w-sm">
            <p className="font-display text-2xl font-bold tracking-[-0.02em]">{result.title}</p>
            <p className="mt-2 leading-relaxed text-[#f6efe2]/75">{result.body}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-signal-amber uppercase">
            The Watermelon Test
          </p>
          <h2
            id="watermelon-heading"
            className="font-display mt-3 text-4xl font-bold tracking-[-0.035em] md:text-5xl"
          >
            Is your program{" "}
            <em className="font-serif font-normal text-sticky-mint italic">actually</em> green?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#f6efe2]/75">
            Pick what your status report says, then tick what’s true. Be honest — nothing leaves
            your browser.
          </p>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold text-[#f6efe2]/90">
              Your report currently says…
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {ragOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-[#f6efe2]/30 px-4 py-2 text-sm font-semibold transition has-[:checked]:border-[#f6efe2] has-[:checked]:bg-[#f6efe2] has-[:checked]:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sticky-yellow"
                >
                  <input
                    type="radio"
                    name="reported-status"
                    value={option.value}
                    checked={reported === option.value}
                    onChange={() => setReported(option.value)}
                    className="sr-only"
                  />
                  <span className={`h-3 w-3 rounded-full ${option.swatch}`} aria-hidden="true" />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold text-[#f6efe2]/90">
              Meanwhile, in reality…
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {statusSignals.map((signal, index) => (
                <label
                  key={signal}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] border-[#f6efe2]/20 bg-white/[0.03] px-4 py-3 text-[0.95rem] leading-snug transition hover:border-[#f6efe2]/50 has-[:checked]:border-signal-red has-[:checked]:bg-signal-red/15 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sticky-yellow"
                >
                  <input
                    type="checkbox"
                    checked={checked[index]}
                    onChange={() => toggle(index)}
                    className="peer sr-only"
                  />
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-[1.5px] border-[#f6efe2]/50 text-xs font-bold text-white peer-checked:border-signal-red peer-checked:bg-signal-red"
                    aria-hidden="true"
                  >
                    {checked[index] ? "✓" : ""}
                  </span>
                  <span>{signal}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/articles/status-updates-that-create-clarity"
              className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-[#f6efe2] bg-sticky-yellow px-5 font-semibold text-ink shadow-[3px_3px_0_#f6efe2] transition hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_#f6efe2]"
            >
              Write the honest version →
            </Link>
            <Link
              href="/resources/status-narrative-guide"
              className="text-sm font-semibold text-[#f6efe2]/80 underline decoration-[#f6efe2]/40 underline-offset-4 hover:text-[#f6efe2]"
            >
              Grab the status narrative guide
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#f6efe2]/45">
            Satire, mostly. Not an actual risk model — but if this stung a little, that’s data.
          </p>
        </div>
      </div>
    </section>
  );
}
