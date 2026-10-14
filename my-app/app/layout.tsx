import type { Metadata } from "next";
import { Sora } from "next/font/google";
import GoogleTags from "@/components/Analytics/GoogleTags";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tío Cool",
  description:
    "Hub de tecnología para la industria de los seguros. Cursos de IA, Datamara Seguros y aprendizaje con Luis Lara.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-body text-black">
        <GoogleTags />
        {children}
      </body>
    </html>
  );
}
