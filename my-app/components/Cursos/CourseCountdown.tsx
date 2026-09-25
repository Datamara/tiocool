"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-12-10T09:00:00-06:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

export default function CourseCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="course-countdown grid grid-cols-4 gap-px overflow-hidden border border-white/10 bg-white/10">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center bg-black px-2 py-4 md:px-4 md:py-5"
        >
          <span className="font-display text-2xl font-bold tabular-nums leading-none text-white md:text-4xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-2 font-display text-[8px] font-bold uppercase tracking-[0.22em] text-white/40 md:text-[10px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
