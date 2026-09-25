"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".about-label", {
        y: 24,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".about-quote",
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          "-=0.4",
        )
        .from(
          ".about-quote-line",
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.7,
            transformOrigin: "left center",
          },
          "-=0.55",
        )
        .from(
          ".about-bio",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          ".about-portrait",
          {
            x: 80,
            opacity: 0,
            scale: 1.04,
            duration: 1.1,
          },
          "-=0.85",
        );

      gsap.to(".about-portrait-image", {
        y: -30,
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
      id="historia"
      className="relative flex min-h-screen flex-col justify-center bg-[#051f20] px-6 py-12 md:px-12 md:py-16 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex max-w-xl flex-col gap-8 md:gap-10">
          <blockquote className="about-quote font-display text-2xl font-bold leading-[1.12] tracking-[0.02em] text-white/85 md:text-3xl lg:text-4xl">
            «La mentalidad te mantiene en el juego; la tecnología te hace
            ganarlo».
          </blockquote>

          <span
            className="about-quote-line block h-px w-16 bg-white/25"
            aria-hidden="true"
          />

          <div className="about-bio flex flex-col gap-5">
            <div className="max-w-sm space-y-2 font-display text-sm leading-relaxed md:text-base">
              <p className="text-white">
                Libros para blindar tu mentalidad.
              </p>
              <p className="text-white">
                Cursos para multiplicar resultados con IA.
              </p>
            </div>
            <Link
              href="/historia"
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:text-white md:text-xs"
            >
              Mi historia
            </Link>
          </div>
        </div>

        <div className="about-portrait relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden sm:max-w-sm lg:mx-0 lg:max-w-md">
          <div className="about-portrait-image relative h-full w-full">
            <Image
              src="/luis/tio_cool_fake2.jpg"
              alt="Luis Lara, El Tío Cool"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
