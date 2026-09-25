import Link from "next/link";
import { navLinks } from "@/components/Navbar/navLinks";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-white/10 bg-black px-6 py-16 md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <p className="font-display text-3xl font-bold uppercase tracking-[0.04em] text-white md:text-4xl">
            Tío Cool
          </p>
          <p className="max-w-md font-display text-sm font-bold leading-relaxed text-white/70 md:text-base">
            Luis Lara Esqueda — Escritor, coach y mentor en seguros e
            Inteligencia Artificial.
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-70 md:text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-[90rem] flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/45">
          © {new Date().getFullYear()} Tío Cool. Todos los derechos reservados.
        </p>
        <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white/45">
          Software diseñado por{" "}
          <span className="underline decoration-white/45 underline-offset-4">
            datamara
          </span>
        </p>
      </div>
    </footer>
  );
}
