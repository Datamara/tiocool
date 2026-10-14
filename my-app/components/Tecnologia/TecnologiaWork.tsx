"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CREATIONS = [
  {
    name: "Asygurare",
    text: "El ecosistema para asesores de seguros. Cartera, agenda y Apolo, el agente de IA que trabaja con ellos.",
    href: "https://www.asygurare.com/",
    action: "Visitar Asygurare",
    external: true,
    image: "/datamara_seguros/asygurare.jpg",
  },
  {
    name: "KanKanKan",
    text: "Seguro para perros, pensado para quienes los consideran familia. Respaldado por GNP México.",
    href: "https://www.kankankan.com.mx/",
    action: "Visitar KanKanKan",
    external: true,
    image: "/datamara_seguros/kankankan.png",
  },
  {
    name: "Curso de IA",
    text: "Inteligencia artificial aplicada al sector asegurador.",
    href: "/cursos",
    action: "Registra interés",
    external: false,
    image: "/datamara_seguros/curso_ia.jpg",
  },
] as const;

function CreationPhoto({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-lavender">
      {missing ? (
        <div className="flex h-full items-center justify-center">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal/70">
            Foto
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          ref={(node) => {
            if (node?.complete && node.naturalWidth === 0) setMissing(true);
          }}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

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
        <div className="tecnologia-work-copy max-w-3xl">
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.03em] text-black md:text-5xl">
            ¿Qué hemos creado?
          </h2>
        </div>

        <ul className="tecnologia-points mt-14 grid gap-6 md:grid-cols-3">
          {CREATIONS.map((item) => (
            <li
              key={item.name}
              className="tecnologia-point flex flex-col bg-white p-3 md:p-4"
            >
              <CreationPhoto src={item.image} alt={item.name} />
              <div className="flex flex-1 flex-col justify-between gap-8 px-3 pt-6 pb-3 md:px-4 md:pt-8 md:pb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-black md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black/70 md:text-base">
                    {item.text}
                  </p>
                </div>
                <Link
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal transition-colors hover:text-azure md:text-xs"
                >
                  {item.action}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
