"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";

type NavbarProps = {
  theme?: "light" | "dark";
};

export default function Navbar({ theme: _theme = "light" }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="relative z-50 w-full shrink-0 border-b border-black/5 bg-white">
      <nav className="flex w-full items-center justify-between px-5 py-4 md:items-end md:px-12 md:py-8">
        <Link
          href="/"
          className="font-title text-2xl font-bold uppercase leading-none tracking-[0.04em] text-black sm:text-3xl md:text-5xl lg:text-6xl"
        >
          TÍO COOL
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="relative block h-3.5 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-black transition ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-6 bg-black transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-black transition ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>

        <ul className="hidden max-w-[58%] flex-wrap items-center justify-end gap-x-4 gap-y-2 md:flex lg:max-w-none lg:gap-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-royal lg:text-xs lg:tracking-[0.18em] ${
                  pathname === link.href ? "text-royal" : "text-black"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {mounted && open
        ? createPortal(
            <div
              id="site-menu"
              className="fixed inset-0 z-[80] flex flex-col bg-white px-6 pb-10 pt-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="font-title text-2xl font-bold uppercase leading-none tracking-[0.04em] text-black sm:text-3xl"
                  onClick={() => setOpen(false)}
                >
                  TÍO COOL
                </Link>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <span className="relative block h-3.5 w-6" aria-hidden="true">
                    <span className="absolute left-0 top-1.5 h-0.5 w-6 rotate-45 bg-black" />
                    <span className="absolute left-0 top-1.5 h-0.5 w-6 -rotate-45 bg-black" />
                  </span>
                </button>
              </div>

              <ul className="mt-12 flex flex-col gap-7">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`font-title text-3xl font-bold uppercase leading-none tracking-[0.06em] ${
                        pathname === link.href ? "text-royal" : "text-black"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
