"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BOOKS = [
  {
    title: "Dos Veces Viuda",
    cover: "/libros/dos_veces_viuda.png",
    quote: "Once historias de reinvention tras la pérdida.",
  },
  {
    title: "Momentos Inesperados",
    cover: "/libros/momentos_inesperados.png",
    quote: "El seguro de gastos médicos no es un lujo, es una necesidad.",
  },
  {
    title: "Cambiando Vidas",
    cover: "/libros/cambiando_vidas.png",
    quote: "Historias del sector financiero que transforman.",
  },
  {
    title: "Camino al Chingonario",
    cover: "/libros/camino_al_chingonario.png",
    quote: "Dos caminos: abundancia o mediocridad. Tú decides.",
  },
];

export default function HistoriaBooks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".historia-books-heading", {
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

      gsap.from(".historia-book-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".historia-books-grid",
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
      className="bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="historia-books-heading mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              Biblioteca
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-[0.03em] text-white md:text-5xl">
              Mis libros
            </h2>
          </div>
          <Link
            href="/libros"
            className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-70"
          >
            Ver en la landing →
          </Link>
        </div>

        <div className="historia-books-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKS.map((book) => (
            <article key={book.title} className="historia-book-item group">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-white md:text-base">
                {book.title}
              </h3>
              <p className="mt-2 font-display text-[11px] font-bold leading-snug text-white/60 md:text-xs">
                {book.quote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
