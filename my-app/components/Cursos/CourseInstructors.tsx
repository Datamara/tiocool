"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AiBackground from "./AiBackground";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INSTRUCTORS = [
  {
    name: "Luis Lara Esqueda",
    role: "El Tío Cool",
    bio: "Comparte mentalidad y tecnología con asesores y líderes del sector.",
    image: "/curso/curso_luis.jpg",
    position: "object-top",
    local: true,
  },
  {
    name: "Bernardo García Zermeño",
    role: "Cofundador Asygurare",
    bio: "Ingeniero en software y empresario. Construye Asygurare: cartera, agenda y Apolo, el agente de IA de los asesores.",
    image: "/curso/bernardo.jpeg",
    position: "object-center",
    local: false,
  },
  {
    name: "Mariano Lara García de Alba",
    role: "Cofundador de Datamara",
    bio: "Emprendedor. Construye software e inteligencia artificial para que las empresas los usen en su día a día.",
    image: "/curso/mariano.jpeg",
    position: "object-center",
    local: false,
  },
];

const STAGGER = [0, 48, 96];

export default function CourseInstructors() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !viewport || !track || !progress) return;

      gsap.from(".cursos-instructors-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const getScrollDistance = () =>
        Math.max(track.scrollWidth - viewport.clientWidth, 0);

      gsap.fromTo(
        track,
        { x: () => viewport.clientWidth * 0.4 },
        {
          x: () => -getScrollDistance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(getScrollDistance() * 1.5, window.innerHeight)}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.to(progress, {
                scaleX: Math.max(0.04, self.progress),
                transformOrigin: "left center",
                duration: 0.3,
                ease: "power2.out",
                overwrite: true,
              });
            },
          },
        },
      );

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  function handleImageLoad() {
    ScrollTrigger.refresh();
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      <AiBackground variant="section" />

      <div className="relative mx-auto flex min-h-screen max-w-[90rem] flex-col px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="cursos-instructors-heading mb-8 md:mb-12">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal">
            Mentores
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[0.03em] text-black md:text-5xl">
            Quienes imparten
          </h2>
          <div className="mt-5 h-px w-full max-w-md overflow-hidden bg-lavender">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-[0.04] bg-royal"
            />
          </div>
        </div>

        <div ref={viewportRef} className="relative flex-1 overflow-hidden pb-4">
          <div
            ref={trackRef}
            className="flex w-max items-start gap-5 md:gap-7"
          >
            {INSTRUCTORS.map((instructor, index) => (
              <article
                key={instructor.name}
                className="cursos-instructor-card relative flex min-h-[min(62vh,34rem)] w-[min(82vw,20rem)] shrink-0 flex-col border border-royal/15 bg-white will-change-transform md:w-[min(38vw,24rem)]"
                style={{ marginTop: STAGGER[index % STAGGER.length] }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-lavender">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    sizes="(max-width: 768px) 82vw, 24rem"
                    className={`object-cover grayscale ${instructor.position}`}
                    unoptimized={!instructor.local}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="space-y-2 border-t border-royal/15 p-5 md:p-6">
                  <h3 className="font-display text-base font-bold uppercase leading-tight tracking-[0.04em] text-black md:text-lg">
                    {instructor.name}
                  </h3>
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-royal md:text-xs">
                    {instructor.role}
                  </p>
                  <p className="font-display text-xs font-bold leading-relaxed text-black/70 md:text-sm">
                    {instructor.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
