"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const POINTS = [
  {
    label: "Software",
    text: "Herramientas hechas para asesores, promotorías y equipos que viven de los seguros.",
  },
  {
    label: "Industria",
    text: "La tecnología nace del sector asegurador, para el trabajo diario de quien asesora.",
  },
  {
    label: "Luis Lara",
    text: "Pone el software en manos de los asesores, junto con el curso y los libros.",
  },
];

export default function TecnologiaWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tecnologia-work-copy", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".tecnologia-point", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tecnologia-points",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-lavender px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="tecnologia-work-copy max-w-3xl space-y-6">
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.03em] text-black md:text-5xl">
            Tecnología que el asesor puede usar.
          </h2>
          <p className="font-display text-base font-bold leading-relaxed text-black/70 md:text-lg">
            Datamara Seguros desarrolla software para la industria. Es
            tecnología hecha para asesores, promotorías y equipos que viven de
            los seguros. Luis Lara la comparte en el mismo lugar donde se
            aprende y se registra al curso.
          </p>
        </div>

        <ul className="tecnologia-points mt-14 grid gap-6 md:grid-cols-3">
          {POINTS.map((point) => (
            <li
              key={point.label}
              className="tecnologia-point border border-royal/15 bg-white p-6 md:p-8"
            >
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal md:text-xs">
                {point.label}
              </p>
              <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black/75 md:text-base">
                {point.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
