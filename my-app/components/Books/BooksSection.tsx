"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconNeural } from "@/components/Cursos/AiIcons";
import { formatPrice, type BookProduct } from "@/lib/books";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function RevealWords({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName: string;
}) {
  const words = text.split(/\s+/);

  return (
    <p className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block"
        >
          <span className={`${wordClassName} inline-block`}>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </p>
  );
}

type BooksSectionProps = {
  books: BookProduct[];
  defaultBookId: string;
};

function BookCard({
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
  const isCourse = book.kind === "course";
  const isExternalCover = book.cover.startsWith("http");
  const isExternalLink = book.buyUrl.startsWith("http");

  useGSAP(
    () => {
      const card = cardRef.current;
      const content = contentRef.current;
      if (!card || !content) return;

      gsap.to(card, {
        scale: isActive ? 1.06 : 1,
        zIndex: isActive ? 20 : 0,
        duration: 0.55,
        ease: "power3.out",
      });

      gsap.to(content, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 12,
        duration: 0.4,
        ease: "power2.out",
        delay: isActive ? 0.12 : 0,
      });
    },
    { dependencies: [isActive] },
  );

  return (
    <div
      ref={cardRef}
      className="book-card relative z-0 h-[clamp(14rem,36vh,24rem)] w-[200px] shrink-0 overflow-hidden bg-zinc-900 will-change-transform md:h-[clamp(16rem,40vh,26rem)] md:w-[260px]"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      tabIndex={0}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      {isCourse ? (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-cyan-400 via-indigo-600 to-slate-950 transition-transform duration-700 ${
            isActive ? "scale-105" : "scale-100"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.28),transparent_52%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(255,255,255,0.06)_10px,rgba(255,255,255,0.06)_11px)]" />
          <div className="flex h-full flex-col items-center justify-center gap-4 text-white">
            <IconNeural className="h-8 w-8 text-white/80" />
            <span className="font-display text-5xl font-bold tracking-[0.28em] text-white [writing-mode:vertical-rl] rotate-180">
              IA
            </span>
          </div>
        </div>
      ) : (
        <Image
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 200px, 260px"
          className={`object-cover transition-transform duration-700 ${
            isActive ? "scale-105" : "scale-100"
          }`}
          unoptimized={isExternalCover}
        />
      )}

      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-between bg-black/55 p-5 md:p-6 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          href={book.buyUrl}
          {...(isExternalLink
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="self-end rounded-full border border-white px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black md:text-xs"
        >
          {isCourse
            ? (book.ctaLabel ?? "Ver curso")
            : `Comprar · ${formatPrice(book.price)}`}
        </Link>

        <div className="space-y-2">
          {isCourse && (
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              {book.priceNote}
            </p>
          )}
          <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-[0.06em] text-white md:text-base">
            {book.title}
          </h3>
          <p className="font-display text-[10px] font-bold uppercase leading-snug tracking-[0.08em] text-white/85 md:text-xs">
            {book.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BooksSection({
  books,
  defaultBookId,
}: BooksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      const headingWords = gsap.utils.toArray<HTMLElement>(
        ".books-heading-word",
      );
      const subheadingWords = gsap.utils.toArray<HTMLElement>(
        ".books-subheading-word",
      );

      const words = [...headingWords, ...subheadingWords];

      gsap.set(words, { opacity: 0.12 });

      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.18,
        scrollTrigger: {
          trigger: ".books-copy",
          start: "top 75%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });

      const getTrackBounds = () => {
        const viewportWidth = viewport.clientWidth;
        const trackWidth = track.scrollWidth;
        const overflow = Math.max(trackWidth - viewportWidth, 0);

        return {
          // Track fully off-screen to the right; scroll pulls it in leftward
          startX: viewportWidth + 64,
          endX:
            overflow > 0
              ? -overflow / 2
              : (viewportWidth - trackWidth) / 2,
        };
      };

      gsap.set(track, { x: () => getTrackBounds().startX });
      gsap.set(".book-card", { rotation: 30, transformOrigin: "50% 100%" });

      const getScrollDistance = () => {
        const { startX, endX } = getTrackBounds();
        return Math.max(Math.abs(endX - startX) * 1.1, window.innerHeight * 0.5);
      };

      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTween.fromTo(
        track,
        { x: () => getTrackBounds().startX },
        { x: () => getTrackBounds().endX, ease: "none", force3D: true },
        0,
      );

      scrollTween.fromTo(
        ".book-card",
        { rotation: 30 },
        { rotation: 0, ease: "none", stagger: 0.06, force3D: true },
        0,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="libros"
      className="flex min-h-screen flex-col justify-center bg-black px-6 py-10 md:px-12 md:py-12 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12">
        <div className="books-copy max-w-6xl space-y-4 text-center md:space-y-6">
          <RevealWords
            className="books-heading font-display text-2xl font-bold leading-[1.15] tracking-[0.01em] text-wehit md:text-4xl lg:text-3xl"
            wordClassName="books-heading-word"
            text="Esta es una lección clave que enseño en mis libros de seguros para construir una confianza sólida."
          />
          <RevealWords
            className="books-subheading font-display text-lg font-bold leading-[1.2] tracking-[0.01em] text-white md:text-2xl lg:text-md"
            wordClassName="books-subheading-word"
            text="Sin embargo, hoy en día, la IA —y cómo usas la tecnología— da forma a cómo las personas te reconocen, confían en ti y haces que tu negocio crezca."
          />
        </div>

        <div
          ref={viewportRef}
          className="books-gallery relative w-full overflow-hidden pb-1"
          onMouseLeave={() => setActiveId(defaultBookId)}
        >
          <div
            ref={trackRef}
            className="flex w-max items-center gap-3 md:gap-5"
          >
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isActive={activeId === book.id}
                onActivate={() => handleActivate(book.id)}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
