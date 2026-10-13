import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprende | Tío Cool",
  description:
    "Ideas para asesores sobre seguros, Inteligencia Artificial y cómo aplicar la tecnología en el negocio.",
};

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return children;
}
