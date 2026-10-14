"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TechnologyEntrySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tech-entry-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.9,
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
      className="bg-lavender px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8 md:gap-10">
        <p className="tech-entry-reveal font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal md:text-xs">
          Cómo entré a la tecnología
        </p>
        <h2 className="tech-entry-reveal font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.03em] text-black sm:text-4xl md:text-5xl">
          El mundo ya no es igual.
        </h2>
        <div className="tech-entry-reveal flex max-w-2xl flex-col gap-6">
          <p className="font-display text-lg font-bold leading-relaxed text-black md:text-2xl">
            Me costó trabajo entender este cambio. La tecnología y la IA tienen
            que estar presentes en la industria de los seguros.
          </p>
          <p className="font-display text-lg font-bold leading-relaxed text-black md:text-2xl">
            Hasta que aprendí.
          </p>
        </div>
        <Link
          href="/cursos"
          className="tech-entry-reveal font-display text-base font-bold uppercase tracking-[0.16em] text-royal transition-colors hover:text-azure md:text-lg"
        >
          ¿Quieres saber cómo?
        </Link>
      </div>
    </section>
  );
}
