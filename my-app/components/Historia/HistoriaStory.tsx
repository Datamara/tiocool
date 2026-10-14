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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
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
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col bg-lavender px-6 py-16 md:px-12 md:py-20 lg:min-h-screen lg:max-h-screen lg:justify-center lg:overflow-hidden lg:py-6 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <blockquote className="historia-story-quote mb-10 max-w-3xl font-display text-2xl font-bold leading-[1.25] tracking-[0.02em] text-black lg:mb-8 lg:text-3xl">
          «La mentalidad te mantiene en el juego; la tecnología te hace
          ganarlo».
        </blockquote>

        <div className="historia-story-grid grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10">
          <div className="historia-story-photo relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden lg:mx-0 lg:max-h-[42vh] lg:max-w-sm">
            <Image
              src="/about/about_2.jpg"
              alt="Libros y escritura"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-8 lg:space-y-5">
            <div className="historia-story-block space-y-3 lg:space-y-2">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-black lg:text-xl">
                Luis Lara Esqueda
              </h2>
              <p className="font-display text-base font-bold leading-relaxed text-black md:text-base">
                Nació en Colima en 1959. Escritor de relatos que conectan con
                la resiliencia, el crecimiento y la superación. En sus libros
                comparte experiencias sobre el cambio y la capacidad de
                reinventarse.
              </p>
            </div>

            <div className="historia-story-block">
              <p className="font-display text-base font-bold leading-relaxed text-black md:text-base">
                Antes del año 2000 fue director de BBVA Toluca. En el 2000
                fundó la promotoría Kutsol, donde construyó décadas de
                liderazgo en el sector financiero y asegurador.
              </p>
            </div>

            <div className="historia-story-block">
              <p className="font-display text-base font-bold leading-relaxed text-black md:text-base">
                Conocido como El Tío Cool, hoy pone la tecnología en manos de
                los asesores: narrativa, coaching e Inteligencia Artificial
                para blindar la mentalidad y multiplicar resultados en la era
                digital.
              </p>
            </div>

            <div className="historia-story-block">
              <p className="font-display text-sm font-bold uppercase leading-relaxed tracking-[0.12em] text-black md:text-sm">
                Heráclito dijo: «Carácter es destino». Ese camino se lee en
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
