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
    <div className="course-countdown grid grid-cols-4 gap-px overflow-hidden bg-royal/20">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex min-w-0 flex-col items-center bg-white px-1 py-3 sm:px-2 sm:py-4 md:px-4 md:py-5"
        >
          <span className="font-display text-xl font-bold tabular-nums leading-none text-royal sm:text-2xl md:text-4xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-2 font-display text-[8px] font-bold uppercase tracking-[0.12em] text-black/45 sm:tracking-[0.18em] md:text-[10px] md:tracking-[0.22em]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
