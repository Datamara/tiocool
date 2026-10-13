import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Tío | Tío Cool",
  description:
    "La trayectoria de Luis Lara Esqueda, El Tío Cool: la autoridad detrás de la tecnología, los cursos y los libros para asesores.",
};

export default function HistoriaLayout({ children }: LayoutProps<"/historia">) {
  return children;
}
