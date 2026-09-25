"use client";

import { useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { submitContact } from "@/app/actions/contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
  { label: "TikTok", href: "https://www.tiktok.com" },
];

type ContactSectionProps = {
  source?: string;
};

export default function ContactSection({ source = "contacto" }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useGSAP(
    () => {
      gsap.from(".contact-section-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set("source", source);

    startTransition(async () => {
      const result = await submitContact(formData);

      if (result.success) {
        setSubmitted(true);
        return;
      }

      setError(result.error ?? "Ocurrió un error. Intenta de nuevo.");
    });
  }

  const inputClass =
    "w-full border border-black/15 bg-transparent px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-black placeholder:text-black/35 outline-none focus:border-black";

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="contact-section-content mx-auto max-w-[90rem]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="space-y-6">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">
              Contacto
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-[0.03em] text-black md:text-5xl lg:text-6xl">
              ¿Quieres
              <br />
              contactarme?
            </h2>
            <p className="max-w-xl font-display text-base font-bold leading-relaxed text-black/75 md:text-lg">
              Escríbeme para entrevistas, conferencias, colaboraciones o
              cualquier consulta. Estaré en contacto lo antes posible.
            </p>
            <a
              href="tel:+529992338183"
              className="inline-block font-display text-2xl font-bold uppercase tracking-[0.06em] text-black transition-opacity hover:opacity-60 md:text-3xl"
            >
              999 233 8183
            </a>
          </div>

          <div>
            {submitted ? (
              <div className="flex min-h-[20rem] flex-col items-center justify-center border border-black/10 p-8 text-center">
                <p className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-black">
                  ¡Gracias!
                </p>
                <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black/65">
                  Hemos recibido tu mensaje. Estaré en contacto lo antes
                  posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Nombre"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="apellido"
                    required
                    placeholder="Apellido"
                    className={inputClass}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className={inputClass}
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  className={inputClass}
                />
                <textarea
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Mensaje"
                  className={`${inputClass} resize-none`}
                />
                {error && (
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-black px-6 py-4 font-display text-xs font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80 disabled:opacity-50 sm:w-auto"
                >
                  {isPending ? "Enviando..." : "Enviar"}
                </button>
              </form>
            )}
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/10 pt-8">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-black/55 transition-opacity hover:text-black"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
