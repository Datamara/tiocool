import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libros | Tío Cool",
  description:
    "Libros para asesores: mentalidad y criterio para el negocio. Dos Veces Viuda, Momentos Inesperados, Cambiando Vidas y Camino al Chingonario.",
};

export default function LibrosLayout({ children }: LayoutProps<"/libros">) {
  return children;
}
