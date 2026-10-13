"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Curso de IA", "Datamara Seguros", "Aprende en el blog"];

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
    <p
      className={`relative z-20 max-w-[18rem] font-title text-base font-bold uppercase leading-tight tracking-[0.06em] text-[#E3E7FC] transition-all duration-500 ease-out sm:max-w-none sm:text-xl md:text-2xl md:tracking-[0.08em] xl:text-xl ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-live="polite"
    >
      {WORDS[index]}
    </p>
  );
}
