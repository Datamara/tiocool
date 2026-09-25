import Link from "next/link";
import { navLinks } from "./navLinks";

type NavbarProps = {
  theme?: "light" | "dark";
};

export default function Navbar({ theme = "light" }: NavbarProps) {
  const isLight = theme === "light";

  return (
    <header
      className={`relative z-20 w-full shrink-0 px-8 py-6 md:px-12 md:py-8 ${
        isLight ? "bg-black" : "bg-black"
      }`}
    >
      <nav className="flex w-full items-end justify-between">
        <Link
          href="/"
          className={`font-display text-4xl font-bold uppercase leading-none tracking-[0.04em] md:text-5xl lg:text-6xl ${
            isLight ? "text-white" : "text-white"
          }`}
        >
          TÍO COOL
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-display text-[10px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-70 lg:text-xs ${
                  isLight ? "text-white" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
