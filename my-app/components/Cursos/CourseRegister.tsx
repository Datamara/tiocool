"use client";

import { useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { submitCourseInterest } from "@/app/actions/course";
import AiBackground from "./AiBackground";
import CourseCountdown from "./CourseCountdown";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CourseRegister() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const form = formRef.current;
      if (!section || !form) return;

      gsap.from(".cursos-register-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(form, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
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
    formData.set("course_slug", "ia-completo-2026");

    startTransition(async () => {
      const result = await submitCourseInterest(formData);

      if (result.success) {
        setSubmitted(true);
        return;
      }

      setError(result.error ?? "Ocurrió un error. Intenta de nuevo.");
    });
  }

  const inputClass =
    "w-full border border-white/10 bg-transparent px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40";

  return (
    <section
      ref={sectionRef}
      id="registro"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black px-6 py-16 md:px-12 md:py-20 lg:px-16"
    >
      <AiBackground variant="section" />

      <div className="relative mx-auto grid w-full max-w-[90rem] items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="cursos-register-copy space-y-6 md:space-y-8">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
            Acceso anticipado
          </p>

          <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[0.03em] text-white md:text-5xl lg:text-6xl">
            Registra tu
            <br />
            interés
          </h2>

          <p className="max-w-md font-display text-sm font-bold leading-relaxed text-white/55 md:text-base">
            Sé de los primeros en acceder. Te avisamos cuando abramos
            inscripciones.
          </p>

          <div className="max-w-md space-y-3 pt-2">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
              10 de diciembre, 2026
            </p>
            <CourseCountdown />
          </div>
        </div>

        <div
          ref={formRef}
          className="border border-white/10 p-5 md:p-8"
        >
          {submitted ? (
            <div className="flex min-h-[18rem] flex-col items-start justify-center md:min-h-[22rem]">
              <p className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-white md:text-3xl">
                ¡Gracias!
              </p>
              <p className="mt-4 max-w-sm font-display text-sm font-bold leading-relaxed text-white/50">
                Hemos recibido tu interés. Te contactaremos pronto con los
                detalles del curso.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
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
              <input
                type="text"
                name="empresa"
                placeholder="Empresa / Promotoría (opcional)"
                className={inputClass}
              />
              <textarea
                name="mensaje"
                rows={3}
                placeholder="¿Por qué te interesa el curso?"
                className={`${inputClass} resize-none`}
              />
              {error && (
                <p className="font-display text-xs font-bold uppercase tracking-wide text-red-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full border border-white bg-white px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-85 disabled:opacity-50 sm:w-auto"
              >
                {isPending ? "Enviando..." : "Registrar interés"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
