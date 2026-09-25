import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos | Tío Cool",
  description:
    "Curso Completo de IA — 10 de diciembre 2026. Luis Lara, Bernardo García Zermeño y Adrián Cedillo.",
};

export default function CursosLayout({ children }: LayoutProps<"/cursos">) {
  return children;
}
