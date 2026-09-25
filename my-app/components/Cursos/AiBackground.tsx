"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type AiBackgroundProps = {
  variant?: "hero" | "section";
};

export default function AiBackground({ variant = "section" }: AiBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const orbs = container.querySelectorAll<HTMLElement>(".ai-orb");
      const line = container.querySelector<HTMLElement>(".ai-line");

      gsap.to(orbs, {
        y: variant === "hero" ? 16 : 10,
        duration: 6,
        ease: "sine.inOut",
        stagger: 0.4,
        repeat: -1,
        yoyo: true,
      });

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      }
    },
    { scope: containerRef, dependencies: [variant] },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={`ai-orb absolute rounded-full blur-3xl ${
          variant === "hero"
            ? "-right-24 top-1/4 h-80 w-80 bg-white/[0.03]"
            : "-left-32 bottom-0 h-64 w-64 bg-white/[0.02]"
        }`}
      />
      {variant === "hero" && (
        <div className="ai-orb absolute -left-16 bottom-1/4 h-56 w-56 rounded-full bg-white/[0.02] blur-3xl" />
      )}
      <div className="ai-line absolute inset-x-6 top-0 h-px bg-white/10 md:inset-x-12 lg:inset-x-16" />
    </div>
  );
}
