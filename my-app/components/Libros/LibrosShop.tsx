"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { formatPrice, type BookProduct } from "@/lib/books";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLLAPSED_WIDTH = 140;
const EXPANDED_WIDTH = 400;

type LibrosShopProps = {
  books: BookProduct[];
  defaultBookId: string;
};

function BookShopCard({
  book,
  isActive,
  onActivate,
  onDeactivate,
}: {
  book: BookProduct;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const content = contentRef.current;
      if (!card || !content) return;

      gsap.to(card, {
        width: isActive ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        duration: 0.55,
        ease: "power3.out",
      });

      gsap.to(content, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 16,
        duration: 0.45,
        ease: "power2.out",
        delay: isActive ? 0.1 : 0,
      });
    },
    { dependencies: [isActive] },
  );

  return (
    <div
      ref={cardRef}
      className="book-shop-card relative h-[24rem] shrink-0 overflow-hidden bg-zinc-900 md:h-[30rem]"
      style={{ width: isActive ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      tabIndex={0}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <Image
        src={book.cover}
        alt={book.title}
        fill
        sizes="400px"
        className={`object-cover transition-transform duration-700 ${
          isActive ? "scale-105" : "scale-100"
        }`}
      />

      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-between bg-black/65 p-5 md:p-6 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
          {book.quote}
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-display text-base font-bold uppercase leading-tight tracking-[0.06em] text-white md:text-lg">
              {book.title}
            </h3>
            <p className="mt-3 font-display text-[11px] font-bold leading-relaxed text-white/85 md:text-xs">
              {book.description}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
            <div>
              <p className="font-display text-2xl font-bold tabular-nums text-white md:text-3xl">
                {formatPrice(book.price)}
              </p>
              {book.priceNote && (
                <p className="mt-1 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
                  {book.priceNote}
                </p>
              )}
            </div>
            <Link
              href={book.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-white px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black md:text-xs"
            >
              Comprar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LibrosShop({ books, defaultBookId }: LibrosShopProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const deactivateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeId, setActiveId] = useState(defaultBookId);

  const handleActivate = (id: string) => {
    if (deactivateTimeout.current) clearTimeout(deactivateTimeout.current);
    setActiveId(id);
  };

  const handleDeactivate = () => {
    deactivateTimeout.current = setTimeout(
      () => setActiveId(defaultBookId),
      100,
    );
  };

  useGSAP(
    () => {
      gsap.from(".libros-shop-intro", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".book-shop-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".libros-shop-gallery",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#070707] px-6 py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-12 md:gap-16">
        <div className="libros-shop-intro max-w-3xl space-y-4 text-center">
          <p className="font-display text-lg font-bold leading-relaxed text-white md:text-xl">
            Esta es una lección clave que enseño en mis libros de seguros para
            construir una confianza sólida.
          </p>
          <p className="font-display text-sm font-bold leading-relaxed text-white/70 md:text-base">
            Sin embargo, hoy en día, la IA —y cómo usas la tecnología— da forma
            a cómo las personas te reconocen, confían en ti y haces que tu
            negocio crezca.
          </p>
        </div>

        <div
          className="libros-shop-gallery flex w-full justify-center gap-3 overflow-x-auto pb-4 md:gap-5"
          onMouseLeave={() => setActiveId(defaultBookId)}
        >
          {books.map((book) => (
            <BookShopCard
              key={book.id}
              book={book}
              isActive={activeId === book.id}
              onActivate={() => handleActivate(book.id)}
              onDeactivate={handleDeactivate}
            />
          ))}
        </div>

        <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
          Precios referencia ·{" "}
          <Link
            href="https://www.tiocool.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 underline-offset-2 hover:text-white hover:underline"
          >
            tiocool.org
          </Link>
        </p>
      </div>
    </section>
  );
}
