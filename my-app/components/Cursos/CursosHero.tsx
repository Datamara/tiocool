"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AiBackground from "./AiBackground";
import CourseCountdown from "./CourseCountdown";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SplitLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <span className={`cursos-hero-title-line inline-block ${className}`}>
        {children}
      </span>
    </span>
  );
}

export default function CursosHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".cursos-hero-label", { y: 20, opacity: 0, duration: 0.6 })
        .from(
          ".cursos-hero-title-line",
          { yPercent: 100, duration: 0.9, stagger: 0.1 },
          "-=0.3",
        )
        .from(".cursos-hero-sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".cursos-hero-countdown-wrap", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".cursos-hero-visual",
          { scale: 0.85, opacity: 0, duration: 1 },
          "-=0.55",
        )
        .from(".cursos-hero-scroll-hint", { opacity: 0, duration: 0.5 }, "-=0.2");

      gsap.to(".cursos-hero-orbit-outer", {
        rotate: 360,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".cursos-hero-orbit-inner", {
        rotate: -360,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(".cursos-hero-inner", {
            y: self.progress * -40,
            opacity: 1 - self.progress * 0.35,
            force3D: true,
          });
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <AiBackground variant="hero" />

      <div className="cursos-hero-inner relative z-10 mx-auto flex min-h-screen max-w-[90rem] flex-col justify-center px-6 py-4 md:px-12 md:py-8 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-3xl space-y-8 md:space-y-10">
            <p className="cursos-hero-label font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/45 md:text-xs">
              Próximo lanzamiento · 10 dic 2026
            </p>

            <h1 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-[0.02em] text-white md:text-6xl lg:text-7xl xl:text-8xl">
              <SplitLine>Curso Completo</SplitLine>
              <SplitLine className="text-blue-400">de IA</SplitLine>
            </h1>

            <p className="cursos-hero-sub max-w-lg font-display text-sm font-bold leading-relaxed text-white/55 md:text-base">
              Inteligencia Artificial aplicada al sector asegurador y financiero.
              Tres mentores. Una sola transformación.
            </p>

            <div className="cursos-hero-countdown-wrap max-w-md space-y-3">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                Cuenta regresiva
              </p>
              <CourseCountdown />
            </div>
          </div>

          <div className="cursos-hero-visual relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center md:max-w-sm lg:max-w-md">
            <div className="cursos-hero-orbit-outer absolute inset-0 rounded-full border border-dashed border-white/15" />
            <div className="cursos-hero-orbit-inner absolute inset-8 rounded-full border border-white/10 md:inset-10" />
            <div className="relative z-10 aspect-square w-[72%]">
              <Image
                src="/luis/curso_ia.jpg"
                alt="Cerebro digital — Curso de IA"
                fill
                priority
                sizes="(max-width: 768px) 280px, 360px"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>

        <p className="cursos-hero-scroll-hint mt-16 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/25 md:mt-20">
          Scroll
        </p>
      </div>
    </section>
  );
}
