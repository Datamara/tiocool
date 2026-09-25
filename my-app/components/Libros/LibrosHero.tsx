"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function LibrosHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".libros-hero-label", { y: 30, opacity: 0, duration: 0.8 })
        .from(".libros-hero-title", { y: 80, opacity: 0, duration: 1.1 }, "-=0.4")
        .from(".libros-hero-sub", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".libros-hero-line", { scaleX: 0, duration: 0.8 }, "-=0.4");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 pb-12 pt-4 md:px-12 md:pb-16 lg:px-16"
    >
      <div className="mx-auto max-w-[90rem]">
        <p className="libros-hero-label font-display text-[10px] font-bold uppercase tracking-[0.28em] text-black/50 md:text-xs">
          Luis Lara Esqueda · El Tío Cool
        </p>
        <h1 className="libros-hero-title mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.02em] text-black md:text-7xl lg:text-8xl">
          Libros
        </h1>
        <p className="libros-hero-sub mt-6 max-w-2xl font-display text-base font-bold leading-relaxed text-black/75 md:text-xl">
          Historias que inspiran, transforman y dejan huella. Pasa el cursor
          sobre cada portada para descubrir la descripción y comprar.
        </p>
        <span
          className="libros-hero-line mt-8 block h-px w-32 origin-left bg-black/25"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
