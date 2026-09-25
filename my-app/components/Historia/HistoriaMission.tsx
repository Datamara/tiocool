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
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen max-h-screen flex-col justify-center overflow-hidden bg-black px-6 py-4 md:px-12 md:py-6 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="historia-mission-text space-y-4 md:space-y-5">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
            El propósito
          </p>
          <h2 className="font-display text-2xl font-bold uppercase leading-[1.1] tracking-[0.03em] text-white md:text-3xl lg:text-4xl">
            Historias que acompañan.
            <br />
            Herramientas que sirven.
          </h2>
          <p className="max-w-lg font-display text-sm font-bold leading-relaxed text-white md:text-base">
            Comparto lo aprendido en libros, cursos e IA para que tengas más
            claridad, confianza y resultados en el sector asegurador — sin
            rodeos.
          </p>

          <ul className="historia-pillars grid gap-3 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.label}
                className="historia-pillar rounded-sm border border-white/15 bg-white/5 p-3 md:p-4"
              >
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white md:text-xs">
                  {pillar.label}
                </p>
                <p className="mt-1 font-display text-[11px] font-bold leading-snug text-white/90 md:text-xs">
                  {pillar.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="historia-mission-image relative mx-auto aspect-[4/5] max-h-[38vh] w-full max-w-xs overflow-hidden lg:mx-0 lg:max-h-[48vh] lg:max-w-md">
          <Image
            src="/luis/tio_cool_fake5.jpg"
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
