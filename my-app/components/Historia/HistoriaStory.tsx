"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HistoriaStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(".historia-story-quote", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".historia-story-block", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".historia-story-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".historia-story-photo", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen max-h-screen flex-col justify-center overflow-hidden bg-[#7A93A8] px-6 py-4 md:px-12 md:py-6 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <blockquote className="historia-story-quote mb-6 max-w-3xl font-display text-xl font-bold leading-[1.2] tracking-[0.02em] text-white md:mb-8 md:text-2xl lg:text-3xl">
          «La mentalidad te mantiene en el juego; la tecnología te hace
          ganarlo».
        </blockquote>

        <div className="historia-story-grid grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="historia-story-photo relative mx-auto aspect-[3/4] max-h-[34vh] w-full max-w-xs overflow-hidden lg:mx-0 lg:max-h-[42vh] lg:max-w-sm">
            <Image
              src="/luis/tio_cool_fake4.jpg"
              alt="Libros y escritura"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-4 md:space-y-5">
            <div className="historia-story-block space-y-2">
              <h2 className="font-display text-lg font-bold uppercase tracking-[0.04em] text-white md:text-xl">
                Soy Luis Lara Esqueda
              </h2>
              <p className="font-display text-sm font-bold leading-relaxed text-white md:text-base">
                Nací en Colima en 1959. Escritor apasionado por contar relatos
                que conectan con la resiliencia, el crecimiento personal y la
                superación. A través de mis libros, comparto experiencias que
                reflejan el poder del cambio y la capacidad de reinventarnos
                ante la adversidad.
              </p>
            </div>

            <div className="historia-story-block space-y-2">
              <p className="font-display text-sm font-bold leading-relaxed text-white md:text-base">
                Antes del año 2000 fui director de BBVA Toluca. En el 2000
                fundé la promotoría Kutsol, donde construí décadas de liderazgo
                en el sector financiero y asegurador.
              </p>
            </div>

            <div className="historia-story-block space-y-2">
              <p className="font-display text-sm font-bold leading-relaxed text-white md:text-base">
                Conocido como El Tío Cool, hoy estoy transformando el sector
                asegurador con Inteligencia Artificial: combino narrativa,
                coaching y tecnología para que los asesores blinden su
                mentalidad y multipliquen resultados en la era digital.
              </p>
            </div>

            <div className="historia-story-block">
              <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white md:text-sm">
                Heráclito dijo: «Carácter es destino». Este camino lo demuestra
                cada página, cada conferencia y cada conversación con quienes
                buscan reinventarse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
