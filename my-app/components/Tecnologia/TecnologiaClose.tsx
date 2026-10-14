"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TecnologiaClose() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tecnologia-close-item", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
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
      className="bg-white px-6 py-20 text-black md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="tecnologia-close-item max-w-3xl space-y-4">
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.03em] md:text-6xl">
            Vamos a crear mucho más
          </h2>
          <p className="font-display text-base font-bold leading-relaxed text-black/70 md:text-lg">
            Únete al blog para no perderte las novedades.
          </p>
        </div>

        <Link
          href="/blog"
          className="tecnologia-close-item bg-royal px-6 py-4 text-center font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-azure md:text-xs"
        >
          Únete al blog
        </Link>
      </div>
    </section>
  );
}
