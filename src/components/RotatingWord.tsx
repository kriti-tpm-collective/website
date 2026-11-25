"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function RotatingWord({
  words,
  intervalMs = 2400,
}: {
  words: string[];
  intervalMs?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length, intervalMs]);

  return (
    <span className="relative inline-flex overflow-hidden pb-[0.12em] align-bottom">
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: "100%", opacity: 0, rotate: 4 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          exit={{ y: "-90%", opacity: 0, rotate: -3 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
