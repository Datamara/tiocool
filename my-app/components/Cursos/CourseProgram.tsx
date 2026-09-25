"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AiBackground from "./AiBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MODULES = [
  {
    num: "01",
    title: "Fundamentos de IA aplicada al negocio",
  },
  {
    num: "02",
    title: "Automatización inteligente para asesores",
  },
  {
    num: "03",
    title: "Herramientas de productividad con IA",
  },
  {
    num: "04",
    title: "Casos de uso en seguros y finanzas",
  },
  {
    num: "05",
    title: "Ética, confianza y transformación digital",
  },
];

export default function CourseProgram() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !viewport || !track || !progress) return;

      gsap.from(".cursos-program-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const getScrollDistance = () =>
        Math.max(track.scrollWidth - viewport.clientWidth, 0);

      gsap.fromTo(
        track,
        { x: () => viewport.clientWidth + 48 },
        {
          x: () => -getScrollDistance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(getScrollDistance() * 1.4, window.innerHeight * 0.85)}`,
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.to(progress, {
                scaleX: Math.max(0.04, self.progress),
                transformOrigin: "left center",
                duration: 0.3,
                ease: "power2.out",
                overwrite: true,
              });

              gsap.utils
                .toArray<HTMLElement>(".cursos-module-card", section)
                .forEach((card, i) => {
                  const cardProgress = self.progress * MODULES.length - i;
                  const rotate = gsap.utils.clamp(-8, 8, 8 - cardProgress * 16);
                  gsap.set(card, { rotate, force3D: true });
                });
            },
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <AiBackground variant="section" />

      <div className="relative mx-auto flex min-h-screen max-w-[90rem] flex-col px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="cursos-program-heading mb-8 md:mb-12">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
            Programa
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[0.03em] text-white md:text-5xl">
            Qué aprenderás
          </h2>
          <div className="mt-5 h-px w-full max-w-md overflow-hidden bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-[0.04] bg-white/60"
            />
          </div>
        </div>

        <div ref={viewportRef} className="relative flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full w-max items-stretch gap-4 md:gap-6"
          >
            {MODULES.map((module) => (
              <article
                key={module.num}
                className="cursos-module-card flex h-[min(52vh,28rem)] w-[min(78vw,22rem)] shrink-0 flex-col justify-between border border-white/10 p-6 will-change-transform md:h-[min(58vh,32rem)] md:w-[min(42vw,26rem)] md:p-8"
              >
                <span className="font-display text-4xl font-bold tabular-nums text-white/15 md:text-5xl">
                  {module.num}
                </span>
                <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-[0.03em] text-white md:text-xl lg:text-2xl">
                  {module.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
