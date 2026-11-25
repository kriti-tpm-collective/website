"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Note = {
  text: string;
  footnote?: string;
  color: string;
  top: string;
  left: string;
  rotate: number;
};

const notes: Note[] = [
  { text: "Who’s the DRI?", color: "bg-sticky-yellow", top: "4%", left: "6%", rotate: -6 },
  {
    text: "It’s green.*",
    footnote: "*mostly",
    color: "bg-sticky-mint",
    top: "2%",
    left: "54%",
    rotate: 5,
  },
  {
    text: "Blocked on legal (again)",
    color: "bg-sticky-pink",
    top: "36%",
    left: "30%",
    rotate: -2,
  },
  {
    text: "Let’s take this offline",
    color: "bg-sticky-blue",
    top: "64%",
    left: "2%",
    rotate: 4,
  },
  {
    text: "Can we get 5 mins? (it’s 45)",
    color: "bg-sticky-yellow",
    top: "62%",
    left: "56%",
    rotate: -5,
  },
];

export function StickyBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <div
        ref={boardRef}
        className="relative h-[340px] rounded-[22px] border-[1.5px] border-ink bg-[radial-gradient(circle,rgba(11,22,48,0.13)_1px,transparent_1.5px)] bg-[length:22px_22px] shadow-[var(--shadow-pop)] sm:h-[400px]"
      >
        <ul aria-label="Things TPMs say, on sticky notes" className="contents">
          {notes.map((note, index) => (
            <motion.li
              key={note.text}
              drag={!reduceMotion}
              dragConstraints={boardRef}
              dragElastic={0.15}
              dragMomentum={false}
              initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: note.rotate }}
              transition={{ delay: 0.25 + index * 0.08, type: "spring", stiffness: 260, damping: 18 }}
              whileHover={reduceMotion ? undefined : { scale: 1.04, rotate: note.rotate * 0.4 }}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 20, boxShadow: "8px 10px 0 rgba(11,22,48,0.9)" }}
              style={{ top: note.top, left: note.left }}
              className={`${note.color} absolute w-[42%] max-w-[190px] cursor-grab touch-none rounded-[3px] border border-ink/80 px-4 py-4 shadow-[3px_4px_0_rgba(11,22,48,0.85)] select-none active:cursor-grabbing`}
            >
              <span className="font-hand block text-[1.45rem] leading-[1.05] text-ink sm:text-[1.65rem]">
                {note.text}
              </span>
              {note.footnote ? (
                <span className="font-hand mt-1 block text-lg text-ink-muted">
                  {note.footnote}
                </span>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
      {!reduceMotion ? (
        <p className="font-hand mt-3 text-right text-xl text-ink-muted" aria-hidden="true">
          ↑ go on, rearrange the board. it’s literally the job.
        </p>
      ) : null}
    </div>
  );
}
