"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DatamaraLogo from "@/components/Datamara/DatamaraLogo";

gsap.registerPlugin(useGSAP);

export default function TecnologiaHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".tecnologia-hero-logo", { y: 24, opacity: 0, duration: 0.7 })
        .from(".tecnologia-hero-label", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".tecnologia-hero-title", { y: 70, opacity: 0, duration: 1 }, "-=0.35")
        .from(".tecnologia-hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col gap-8">
        <DatamaraLogo className="tecnologia-hero-logo" />
        <p className="tecnologia-hero-label font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal md:text-xs">
          Cofundador de Datamara Seguros
        </p>
        <h1 className="tecnologia-hero-title font-display text-5xl font-bold uppercase leading-[0.92] tracking-[0.02em] text-black md:text-7xl lg:text-8xl">
          Datamara
          <br />
          Seguros
        </h1>
      </div>

      <div className="mx-auto mt-16 max-w-[90rem] border-t border-royal/20 pt-12 md:mt-24 md:pt-16">
        <p className="tecnologia-hero-sub max-w-4xl font-display text-2xl font-bold leading-[1.15] text-black sm:text-3xl md:text-5xl">
          Datamara Seguros está transformando la tecnología a través de la IA
          en la industria.
        </p>
      </div>
    </section>
  );
}
