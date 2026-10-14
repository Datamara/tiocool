import type { Metadata } from "next";
import AdminLogin from "@/components/Admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin | Tío Cool",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-md">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal">
          Portal
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.03em] text-black">
          Admin
        </h1>
        <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black/70">
          Mensajes de contacto e interés en el curso de IA.
        </p>
        <AdminLogin />
      </div>
    </main>
  );
}
