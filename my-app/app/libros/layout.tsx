import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libros | Tío Cool",
  description:
    "Compra los libros de Luis Lara Esqueda: Dos Veces Viuda, Momentos Inesperados, Cambiando Vidas y Camino al Chingonario.",
};

export default function LibrosLayout({ children }: LayoutProps<"/libros">) {
  return children;
}
