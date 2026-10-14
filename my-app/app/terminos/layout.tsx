import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones | Tío Cool",
  description:
    "Condiciones de uso del sitio de Tío Cool: contenido, curso de IA, contacto y datos que se envían.",
};

export default function TerminosLayout({
  children,
}: LayoutProps<"/terminos">) {
  return children;
}
