import Link from "next/link";
import { navLinks } from "@/components/Navbar/navLinks";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="flex min-h-[70vh] flex-col justify-end bg-midnight px-6 py-20 text-white md:min-h-[80vh] md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-16 md:flex-row md:items-end md:justify-between md:gap-20">
        <div className="space-y-6">
          <p className="font-title text-6xl font-bold uppercase leading-[0.9] tracking-[0.04em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Tío Cool
          </p>
          <p className="max-w-md font-display text-base font-bold leading-relaxed text-white/70 md:text-lg">
            Tecnología, cursos y software para la industria de los seguros.
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-70 md:text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-[90rem] flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/45 md:text-sm">
            © {new Date().getFullYear()} Tío Cool. Todos los derechos reservados.
          </p>
          <Link
            href="/terminos"
            className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/70 transition-opacity hover:opacity-70 md:text-sm"
          >
            Términos y condiciones
          </Link>
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-white/45 md:text-sm">
          Diseñado por
          <a
            href="https://www.datamara.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-6 w-[9.84rem] shrink-0 overflow-hidden opacity-90 transition-opacity hover:opacity-100 sm:h-7 sm:w-[11.48rem] md:h-8 md:w-[13.12rem]"
          >
            <span className="sr-only">Datamara</span>
            {/* The file is a square with the wordmark in the middle. These offsets crop to the letters. */}
            <img
              src="/datamara/datamara_footer.png"
              alt=""
              className="pointer-events-none absolute h-[1047%] w-auto max-w-none"
              style={{ left: "-29.8%", top: "-473%" }}
            />
          </a>
        </p>
      </div>
    </footer>
  );
}
