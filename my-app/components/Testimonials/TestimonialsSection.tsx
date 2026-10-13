"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marco González",
    role: "SMNYL",
    quote:
      "Luis Lara es un excelente coach que nos ha ayudado a entender los seguros de una manera profunda y humana.",
  },
  {
    id: "2",
    name: "Raúl López",
    role: "Director General BBVA",
    quote:
      "Luis nos ha enseñado mucho a través de sus 3 distintos libros que hablan de la importancia de no rendirse, luchar por tus sueños y ser valiente.",
  },
  {
    id: "3",
    name: "Laura Sánchez",
    role: "Asesora Consolidada Kutsol",
    quote:
      "Gracias a Luis entendí la importancia de usar la IA en mi negocio de seguros. Me motiva saber que mi edad no está peleada con ser un nómada de la tecnología.",
  },
  {
    id: "4",
    name: "Patricia Mendoza",
    role: "Gerente Regional MetLife",
    quote:
      "El Tío Cool transformó la forma en que mi equipo ve el servicio al cliente. Hoy vendemos con propósito y confianza.",
  },
  {
    id: "5",
    name: "Carlos Ruiz",
    role: "Asesor Senior GNP",
    quote:
      "Sus libros me dieron la mentalidad para pasar de sobrevivir a prosperar en una industria cada vez más competitiva.",
  },
  {
    id: "6",
    name: "Ana Torres",
    role: "Coach de Ventas",
    quote:
      "La combinación de seguros, tecnología y humanidad que enseña Luis es exactamente lo que el mercado necesita hoy.",
  },
  {
    id: "7",
    name: "Fernando Díaz",
    role: "Director Comercial AXA",
    quote:
      "Implementamos sus estrategias de IA y duplicamos nuestra productividad sin perder el trato personal con nuestros clientes.",
  },
  {
    id: "8",
    name: "Gabriela Herrera",
    role: "Emprendedora Financiera",
    quote:
      "Luis no solo enseña técnicas de venta; te ayuda a construir una identidad profesional sólida y auténtica.",
  },
  {
    id: "9",
    name: "Roberto Sánchez",
    role: "Presidente AMASFAC",
    quote:
      "Su visión sobre el futuro de los seguros en la era digital es clara, práctica y profundamente inspiradora.",
  },
  {
    id: "10",
    name: "Diana Morales",
    role: "Asesora Top Producer",
    quote:
      "Cada curso con El Tío Cool es un antes y un después. Sales con herramientas reales y una mentalidad imparable.",
  },
];

const STAGGER_CLASS = ["", "md:mt-14", "md:mt-28"];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-royal/20 bg-lavender font-display text-[10px] font-bold text-royal">
      {initials}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const stagger = STAGGER_CLASS[index % STAGGER_CLASS.length];

  return (
    <article
      className={`testimonial-card relative z-0 flex min-h-[15rem] w-[13.5rem] shrink-0 cursor-default flex-col rounded-sm bg-white p-4 transition-[filter,opacity,transform] duration-1000 ease-out will-change-[filter,opacity,transform] group-hover/testimonials:scale-[0.98] group-hover/testimonials:opacity-45 group-hover/testimonials:blur-[6px] hover:z-10 hover:scale-100 hover:opacity-100 hover:blur-none sm:min-h-[18rem] sm:w-[14rem] md:min-h-[20rem] md:w-[16.5rem] md:p-5 ${stagger}`}
    >
      <div className="mb-4 flex flex-col gap-3">
        <Avatar name={testimonial.name} />
        <div>
          <h3 className="font-display text-xs font-bold leading-tight text-black md:text-sm">
            {testimonial.name}
          </h3>
          <p className="mt-1 font-display text-[10px] font-bold leading-snug text-black/65 md:text-[11px]">
            {testimonial.role}
          </p>
        </div>
      </div>
      <p className="font-display text-[11px] font-bold leading-snug text-black md:text-xs">
        {testimonial.quote}
      </p>
    </article>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !viewport || !track || !progress) return;

      const getScrollDistance = () =>
        Math.max(track.scrollWidth - viewport.clientWidth, 0);

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() * 1.35 + window.innerHeight}`,
          pin: true,
          scrub: 2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.to(progress, {
              scaleX: Math.max(0.04, self.progress),
              transformOrigin: "left center",
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          },
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="comentarios"
      className="relative flex min-h-dvh flex-col overflow-x-clip bg-lavender px-5 py-10 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col">
        <div className="mb-10 md:mb-14">
          <h2 className="font-display text-3xl font-bold uppercase tracking-[0.04em] text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Comentarios
          </h2>
          <div className="mt-6 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-[0.04] rounded-full bg-royal"
            />
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative flex-1 overflow-hidden pb-8"
        >
          <div
            ref={trackRef}
            className="group/testimonials flex w-max items-start gap-5 md:gap-6"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
