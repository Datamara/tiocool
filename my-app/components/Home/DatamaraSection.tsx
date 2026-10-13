"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DatamaraLogo from "@/components/Datamara/DatamaraLogo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function DatamaraSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".datamara-reveal", {
        y: 40,
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
      className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <DatamaraLogo className="datamara-reveal" />

        <div className="flex flex-col gap-6">
          <p className="datamara-reveal font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal md:text-xs">
            Cofundador
          </p>
          <h2 className="datamara-reveal font-display text-3xl font-bold uppercase leading-[0.95] tracking-[0.03em] text-black sm:text-4xl md:text-6xl">
            Datamara Seguros
          </h2>
          <blockquote className="datamara-reveal max-w-xl border-l-2 border-royal pl-5 font-display text-lg font-bold leading-snug text-black md:text-2xl">
            «Tomé la decisión de fundar Datamara Seguros para modernizar y digitalizar la
            industria de los seguros.»
          </blockquote>
          <p className="datamara-reveal max-w-xl font-display text-base font-bold leading-relaxed text-black/70 md:text-lg">
            Desarrolla software para la industria aseguradora. Luis lo comparte
            con los asesores que quieren trabajar el negocio con tecnología.
          </p>
          <Link
            href="/tecnologia"
            className="datamara-reveal font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal transition-colors hover:text-azure md:text-xs"
          >
            Conocer la tecnología
          </Link>
        </div>
      </div>
    </section>
  );
}
