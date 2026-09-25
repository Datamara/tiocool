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
    bio: "Coach, escritor y referente en seguros. Mentalidad humana y estrategia para asesores y líderes.",
    image: "/luis/luislara.jpeg",
    local: true,
  },
  {
    name: "Bernardo García Zermeño",
    role: "Fundador de Datamara",
    bio: "Software y datos conectados con IA. Soluciones que escalan con precisión.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    local: false,
  },
  {
    name: "Adrián Cedillo",
    role: "Fundador de Doko · FinTech Cedi",
    bio: "Fintech y productos digitales que simplifican finanzas para asesores y empresas.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
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
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <AiBackground variant="section" />

      <div className="relative mx-auto flex min-h-screen max-w-[90rem] flex-col px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="cursos-instructors-heading mb-8 md:mb-12">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
            Mentores
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-[0.03em] text-white md:text-5xl">
            Quienes imparten
          </h2>
          <div className="mt-5 h-px w-full max-w-md overflow-hidden bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-[0.04] bg-white/60"
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
                className="cursos-instructor-card relative flex min-h-[min(62vh,34rem)] w-[min(82vw,20rem)] shrink-0 flex-col border border-white/10 will-change-transform md:w-[min(38vw,24rem)]"
                style={{ marginTop: STAGGER[index % STAGGER.length] }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    sizes="(max-width: 768px) 82vw, 24rem"
                    className="object-cover object-center grayscale"
                    unoptimized={!instructor.local}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="space-y-2 border-t border-white/10 p-5 md:p-6">
                  <h3 className="font-display text-base font-bold uppercase leading-tight tracking-[0.04em] text-white md:text-lg">
                    {instructor.name}
                  </h3>
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white/45 md:text-xs">
                    {instructor.role}
                  </p>
                  <p className="font-display text-xs font-bold leading-relaxed text-white/55 md:text-sm">
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
