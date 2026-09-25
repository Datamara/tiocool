"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { formatPrice, type BookProduct } from "@/lib/books";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LibrosGridProps = {
  books: BookProduct[];
};

export default function LibrosGrid({ books }: LibrosGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".libros-grid-item", {
        y: 50,
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
      className="border-t border-black/10 bg-white px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-12 md:mb-16">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
            Catálogo completo
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-[0.03em] text-black md:text-4xl">
            Compara y elige
          </h2>
        </div>

        <ul className="grid gap-8 md:grid-cols-2">
          {books.map((book) => (
            <li
              key={book.id}
              className="libros-grid-item group grid gap-6 border border-black/10 p-6 transition-colors hover:border-black/25 md:grid-cols-[10rem_1fr] md:p-8"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div>
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-black/45">
                    {book.quote}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-[0.04em] text-black">
                    {book.title}
                  </h3>
                  <p className="mt-3 font-display text-sm font-bold leading-relaxed text-black/70">
                    {book.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                  <div>
                    <p className="font-display text-2xl font-bold tabular-nums text-black">
                      {formatPrice(book.price)}
                    </p>
                    {book.priceNote && (
                      <p className="mt-1 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-black/45">
                        {book.priceNote}
                      </p>
                    )}
                  </div>
                  <Link
                    href={book.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-black px-5 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-75 md:text-xs"
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
