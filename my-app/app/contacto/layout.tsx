import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Tío Cool",
  description:
    "Escribe por cursos, software o una conversación con Luis Lara. El hub responde a los asesores.",
};

export default function ContactoLayout({ children }: LayoutProps<"/contacto">) {
  return children;
}
