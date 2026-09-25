import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Historia | Tío Cool",
  description:
    "Conoce la historia de Luis Lara Esqueda — El Tío Cool. Escritor, coach y mentor en seguros e Inteligencia Artificial.",
};

export default function HistoriaLayout({ children }: LayoutProps<"/historia">) {
  return children;
}
