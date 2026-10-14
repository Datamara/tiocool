"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CourseCountdown from "@/components/Cursos/CourseCountdown";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PATHS = [
  {
    href: "/blog",
    label: "Aprende",
    text: "Ideas de IA, seguros y criterio para la industria.",
    action: "Entrar al blog",
  },
  {
    href: "/contacto",
    label: "Contacta",
    text: "Por el curso, el software o una conversación con Luis.",
    action: "Escribir",
  },
] as const;

export default function HubPaths() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hub-path", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-lavender px-6 py-20 text-black md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="hub-path font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal md:text-xs">
          El siguiente paso
        </p>
        <h2 className="hub-path mt-4 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[0.03em] sm:text-4xl md:text-6xl">
          Por dónde seguir
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="hub-path flex flex-col justify-between gap-8 bg-white p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-bold uppercase tracking-[0.04em]">
                {PATHS[0].label}
              </h3>
              <p className="font-display text-sm font-bold leading-relaxed text-black/70 md:text-base">
                {PATHS[0].text}
              </p>
            </div>
            <Link
              href={PATHS[0].href}
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal transition-colors hover:text-azure md:text-xs"
            >
              {PATHS[0].action}
            </Link>
          </article>

          <article className="hub-path flex flex-col justify-between gap-8 bg-royal p-6 text-white md:p-8">
            <div className="space-y-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                10 dic 2026
              </p>
              <h3 className="font-display text-3xl font-bold uppercase tracking-[0.04em]">
                Curso de IA
              </h3>
              <p className="font-display text-sm font-bold leading-relaxed text-white/85 md:text-base">
                Cómo Luis aprendió a poner la IA en la industria. El registro
                ya está abierto.
              </p>
              <CourseCountdown />
            </div>
            <Link
              href="/cursos"
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-70 md:text-xs"
            >
              Regístrate
            </Link>
          </article>

          <article className="hub-path flex flex-col justify-between gap-8 bg-white p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-bold uppercase tracking-[0.04em]">
                {PATHS[1].label}
              </h3>
              <p className="font-display text-sm font-bold leading-relaxed text-black/70 md:text-base">
                {PATHS[1].text}
              </p>
            </div>
            <Link
              href={PATHS[1].href}
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal transition-colors hover:text-azure md:text-xs"
            >
              {PATHS[1].action}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
