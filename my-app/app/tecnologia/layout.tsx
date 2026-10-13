import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tecnología | Tío Cool",
  description:
    "Datamara Seguros desarrolla software para la industria aseguradora. Luis Lara lo comparte con los asesores.",
};

export default function TecnologiaLayout({
  children,
}: LayoutProps<"/tecnologia">) {
  return children;
}
