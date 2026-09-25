import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Tío Cool",
  description:
    "Contacta a Luis Lara Esqueda — El Tío Cool. Conferencias, entrevistas, colaboraciones y consultas.",
};

export default function ContactoLayout({ children }: LayoutProps<"/contacto">) {
  return children;
}
