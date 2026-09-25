"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MILESTONES = [
  {
    year: "1959",
    title: "Colima",
    description:
      "Nace en Colima. Desde joven desarrolla una visión clara: el carácter, la constancia y la capacidad de reinventarse son el verdadero destino.",
  },
  {
    year: "1990s",
    title: "Director BBVA Toluca",
    description:
      "Antes del año 2000, lidera como director de BBVA Toluca, forjando criterio, liderazgo y una profunda comprensión del sector financiero.",
  },
  {
    year: "2000",
    title: "Fundación de Kutsol",
    description:
      "Fundó la promotoría Kutsol, dando inicio a una trayectoria emprendedora en el mundo asegurador que marcaría a generaciones de asesores.",
  },
  {
    year: "2020",
    title: "Primer libro",
    description:
      "Publica su primer libro y descubre que escribir es la forma más honesta de compartir lo aprendido sobre la vida, el negocio y la resiliencia.",
  },
  {
    year: "2021",
    title: "Dos Veces Viuda",
    description:
      "Once historias de mujeres que vivieron la pérdida más de una vez y encontraron la fortaleza para reinventarse. Resiliencia, amor propio y una nueva oportunidad.",
  },
  {
    year: "2022",
    title: "Momentos Inesperados",
    description:
      "Redefino la percepción del Seguro de Gastos Médicos: no es un lujo, es una necesidad. Un libro esencial para asesores, empresarios y familias.",
  },
  {
    year: "2023",
    title: "Cambiando Vidas",
    description:
      "Relatos del sector financiero que transforman la manera de emprender. Estrategias reales del mundo asegurador y bancario para evolucionar de emprendedor a empresario.",
  },
  {
    year: "2024",
    title: "Camino al Chingonario",
    description:
      "Dos caminos: uno hacia la abundancia, otro hacia la mediocridad. Una guía para desbloquear el potencial interior y alcanzar la prosperidad con fluidez y equilibrio.",
  },
  {
    year: "Hoy",
    title: "El Tío Cool",
    description:
      "Transforma el sector asegurador con Inteligencia Artificial. Como coach y escritor, forma asesores que no solo venden: construyen confianza, legado y resultados en la era digital.",
  },
];

export default function HistoriaTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".historia-timeline-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".historia-milestone", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".historia-timeline-track",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".historia-timeline-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".historia-timeline-track",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1.5,
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
      <div className="mx-auto max-w-[90rem]">
        <div className="historia-timeline-heading mb-16 md:mb-20">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
            El camino
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-[0.03em] text-black md:text-5xl lg:text-6xl">
            Una vida de
            <br />
            transformación
          </h2>
        </div>

        <div className="historia-timeline-track relative">
          <div
            className="historia-timeline-line absolute bottom-0 left-[1.125rem] top-0 w-px origin-top scale-y-0 bg-black/15 md:left-6"
            aria-hidden="true"
          />

          <ul className="space-y-12 md:space-y-16">
            {MILESTONES.map((item) => (
              <li
                key={item.year + item.title}
                className="historia-milestone relative grid gap-4 pl-12 md:grid-cols-[8rem_1fr] md:gap-10 md:pl-16"
              >
                <span className="absolute left-3 top-1.5 h-3 w-3 rounded-full bg-black md:left-[1.125rem]" />
                <p className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-black md:text-3xl">
                  {item.year}
                </p>
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em] text-black md:text-xl">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl font-display text-sm font-bold leading-relaxed text-black/70 md:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
