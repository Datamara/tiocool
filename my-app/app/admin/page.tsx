import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { createSupabaseAuthClient } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin | Tío Cool",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type ContactRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string;
  source: string;
  created_at: string;
};

type InterestRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  created_at: string;
  courses: { title: string; slug: string } | { title: string; slug: string }[] | null;
};

const SOURCE_LABELS: Record<string, string> = {
  contacto: "Contacto",
  historia: "El Tío",
};

function formatWhen(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(value));
}

function courseTitle(courses: InterestRow["courses"]) {
  if (!courses) return "Curso de IA";
  if (Array.isArray(courses)) return courses[0]?.title ?? "Curso de IA";
  return courses.title;
}

export default async function AdminPage() {
  const supabase = await createSupabaseAuthClient();

  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: membership } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const [contactsResult, interestsResult] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("id, first_name, last_name, email, phone, message, source, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("course_interests")
      .select(
        "id, first_name, last_name, email, phone, company, message, created_at, courses!inner(title, slug)",
      )
      .eq("courses.slug", "ia-completo-2026")
      .order("created_at", { ascending: false }),
  ]);

  const contacts = (contactsResult.data ?? []) as ContactRow[];
  const interests = (interestsResult.data ?? []) as InterestRow[];
  const readError = contactsResult.error || interestsResult.error;

  return (
    <main className="min-h-dvh bg-white px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal">
              Portal
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-[0.03em] text-black md:text-5xl">
              Admin
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-black/50 transition-colors hover:text-black"
            >
              Ver el sitio
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-royal transition-colors hover:text-azure"
              >
                Salir
              </button>
            </form>
          </div>
        </div>

        {readError ? (
          <p className="mt-10 border border-red-200 bg-red-50 px-4 py-3 font-display text-sm font-bold text-red-700">
            No se pudieron leer los registros. Aplica la migración del portal
            en Supabase.
          </p>
        ) : null}

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-black">
              Contacto
            </h2>
            <p className="mt-2 font-display text-sm font-bold text-black/50">
              {contacts.length} {contacts.length === 1 ? "mensaje" : "mensajes"}
            </p>
            <ul className="mt-6 space-y-4">
              {contacts.length === 0 ? (
                <li className="border border-black/10 bg-lavender px-5 py-6 font-display text-sm font-bold text-black/60">
                  Todavía no hay mensajes.
                </li>
              ) : (
                contacts.map((item) => (
                  <li key={item.id} className="border border-black/10 px-5 py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-lg font-bold uppercase tracking-[0.03em] text-black">
                        {item.first_name} {item.last_name}
                      </p>
                      <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-royal">
                        {SOURCE_LABELS[item.source] ?? item.source}
                      </p>
                    </div>
                    <p className="mt-2 font-display text-sm font-bold text-black/70">
                      <a href={`mailto:${item.email}`} className="hover:text-royal">
                        {item.email}
                      </a>
                      {item.phone ? ` · ${item.phone}` : ""}
                    </p>
                    <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black">
                      {item.message}
                    </p>
                    <p className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
                      {formatWhen(item.created_at)}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-black">
              Curso de IA
            </h2>
            <p className="mt-2 font-display text-sm font-bold text-black/50">
              {interests.length}{" "}
              {interests.length === 1 ? "registro" : "registros"}
            </p>
            <ul className="mt-6 space-y-4">
              {interests.length === 0 ? (
                <li className="border border-black/10 bg-lavender px-5 py-6 font-display text-sm font-bold text-black/60">
                  Todavía no hay interés registrado.
                </li>
              ) : (
                interests.map((item) => (
                  <li key={item.id} className="border border-black/10 px-5 py-5">
                    <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-royal">
                      {courseTitle(item.courses)}
                    </p>
                    <p className="mt-2 font-display text-lg font-bold uppercase tracking-[0.03em] text-black">
                      {item.first_name} {item.last_name}
                    </p>
                    <p className="mt-2 font-display text-sm font-bold text-black/70">
                      <a href={`mailto:${item.email}`} className="hover:text-royal">
                        {item.email}
                      </a>
                      {item.phone ? ` · ${item.phone}` : ""}
                    </p>
                    {item.company ? (
                      <p className="mt-2 font-display text-sm font-bold text-black/70">
                        {item.company}
                      </p>
                    ) : null}
                    {item.message ? (
                      <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black">
                        {item.message}
                      </p>
                    ) : null}
                    <p className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
                      {formatWhen(item.created_at)}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
