import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tío Cool",
  description:
    "Artículos de Luis Lara Esqueda sobre seguros, Inteligencia Artificial, coaching y transformación personal.",
};

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return children;
}
