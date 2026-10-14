"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PILLARS = [
  { label: "Resiliencia", text: "Aprender de experiencias reales." },
  { label: "Seguros", text: "Vender con propósito y claridad." },
  { label: "Tecnología", text: "IA práctica, no moda pasajera." },
  { label: "Legado", text: "Dejar algo útil a los demás." },
];

export default function HistoriaMission() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.from(".historia-mission-text", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".historia-pillar", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".historia-pillars",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".historia-mission-image", {
          scale: 1.1,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col bg-white px-6 py-16 md:px-12 md:py-20 lg:min-h-screen lg:max-h-screen lg:justify-center lg:overflow-hidden lg:py-6 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <div className="historia-mission-text space-y-6 lg:space-y-5">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal">
            El propósito
          </p>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.1] tracking-[0.03em] text-black md:text-3xl lg:text-4xl">
            Historias que acompañan.
            <br />
            Herramientas que sirven.
          </h2>
          <p className="max-w-lg font-display text-base font-bold leading-relaxed text-black/70 md:text-base">
            Luis comparte lo aprendido en libros, cursos e IA para que el
            asesor tenga más claridad, confianza y resultados en el sector
            asegurador.
          </p>

          <ul className="historia-pillars grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.label}
                className="historia-pillar rounded-sm border border-royal/15 bg-lavender p-5 lg:p-4"
              >
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-royal">
                  {pillar.label}
                </p>
                <p className="mt-2 font-display text-sm font-bold leading-snug text-black/75 lg:mt-1 lg:text-xs">
                  {pillar.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="historia-mission-image relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden lg:mx-0 lg:max-h-[48vh] lg:max-w-md">
          <Image
            src="/about/about_3.jpg"
            alt="Luis Lara compartiendo conocimiento"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
