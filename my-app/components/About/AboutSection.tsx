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

      tl.from(".about-quote", {
        y: 60,
        opacity: 0,
        duration: 1,
      })
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
      className="relative flex flex-col justify-center bg-white px-5 py-16 sm:px-6 md:min-h-screen md:px-12 md:py-16 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex max-w-xl flex-col gap-8 md:gap-10">
          <blockquote className="about-quote font-display text-xl font-bold leading-[1.15] tracking-[0.02em] text-black sm:text-2xl md:text-3xl lg:text-4xl">
            «La mentalidad te mantiene en el juego; la tecnología te hace
            ganarlo».
          </blockquote>

          <span
            className="about-quote-line block h-px w-16 bg-royal"
            aria-hidden="true"
          />

          <div className="about-bio flex flex-col gap-5">
            <p className="max-w-sm font-display text-sm font-bold leading-relaxed text-black/70 md:text-base">
              Luis Lara Esqueda. Décadas en la industria de los seguros. Hoy
              pone la tecnología en el centro del negocio.
            </p>
            <Link
              href="/historia"
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal transition-colors hover:text-azure md:text-xs"
            >
              El Tío
            </Link>
          </div>
        </div>

        <div className="about-portrait relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden sm:max-w-sm lg:mx-0 lg:max-w-md">
          <div className="about-portrait-image relative h-full w-full">
            <Image
              src="/home/main.jpg"
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
