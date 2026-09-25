"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HistoriaHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".historia-hero-label", { y: 30, opacity: 0, duration: 0.8 })
        .from(".historia-hero-title", { y: 80, opacity: 0, duration: 1.1 }, "-=0.4")
        .from(".historia-hero-sub", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".historia-hero-image", { scale: 1.08, opacity: 0, duration: 1.2 }, "-=0.7")
        .from(".historia-hero-line", { scaleX: 0, duration: 0.8 }, "-=0.6");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen max-h-screen flex-col justify-center overflow-hidden bg-white px-6 py-4 md:px-12 md:py-8 lg:px-16"
    >
      <div className="mx-auto grid max-w-[90rem] items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-6 md:space-y-8">
          <h1 className="historia-hero-title font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.02em] text-black md:text-7xl lg:text-8xl">
            Mi
            <br />
            Historia
          </h1>
          <p className="historia-hero-sub max-w-xl font-display text-base font-bold leading-relaxed text-black md:text-xl">
            Historias que inspiran, transforman y dejan huella.
          </p>
          <span
            className="historia-hero-line block h-px w-32 origin-left bg-black/25"
            aria-hidden="true"
          />
        </div>

        <div className="historia-hero-image relative aspect-[4/5] w-full max-w-lg justify-self-end overflow-hidden lg:max-w-none">
          <Image
            src="/luis/tio_cool_fake3.jpg"
            alt="Luis Lara Esqueda, El Tío Cool"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
