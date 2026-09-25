"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
  "Inteligencia Artificial",
  "Emprendedor",
  "Explorador",
  "Promotor",
  "Coach",
  "Nómada",
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setVisible(false);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIndex((current) => (current + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <h1
      className={`relative z-20 font-display text-center text-3xl font-bold uppercase leading-tight tracking-[0.06em] text-WHITE transition-all duration-500 ease-out md:text-5xl lg:text-6xl ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-live="polite"
    >
      {WORDS[index]}
    </h1>
  );
}
