import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import RotatingText from "@/components/Hero/RotatingText";

const HERO_IMAGE = "/home/tio_hero.jpg";

export default function HeroSection() {
  return (
    <section className="relative flex h-dvh flex-col overflow-hidden bg-(--background)">
      <div className="relative z-20 shrink-0 bg-(--background)">
        <Navbar />
      </div>

      <main className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top grayscale"
        />

        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-white/40"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:justify-start md:px-16 lg:px-24">
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-5 md:max-w-xl md:items-start md:gap-7 md:text-left lg:max-w-2xl">
            <h1 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[0.03em] text-black sm:text-4xl md:text-4xl md:tracking-[0.04em] md:text-white xl:text-4xl">
              Tecnología
              <br />
              para los seguros
            </h1>
            <RotatingText />
          </div>
        </div>
      </main>
    </section>
  );
}
