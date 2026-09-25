"use client";

import Navbar from "@/components/Navbar/Navbar";
import RotatingText from "@/components/Hero/RotatingText";
import RippleEffect from "@/components/Hero/RippleEffect";

const HERO_IMAGE = "/luis/tio_cool_fake.jpg";

const RIPPLE_STYLE = {
  backgroundImage: `url(${HERO_IMAGE})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
} as const;

const RIPPLE_OPTIONS = {
  imageUrl: HERO_IMAGE,
  perturbance: 0.05,
  dropRadius: 80,
  interactive: true,
} as const;

export default function HeroSection() {
  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-(--background)">
      <div className="relative z-20 shrink-0 bg-(--background)">
        <Navbar />
      </div>

      <main className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 z-0 grayscale">
          {/* Imagen estática de respaldo por si WebGL falla */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={RIPPLE_STYLE}
            aria-hidden="true"
          />

          <RippleEffect
            className="z-[2]"
            style={RIPPLE_STYLE}
            autoDrops={false}
            options={RIPPLE_OPTIONS}
          />
        </div>

        {/* Overlay encima del ripple; pointer-events-none deja pasar el cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-white/40"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 md:px-12">
          <RotatingText />
        </div>
      </main>
    </section>
  );
}
