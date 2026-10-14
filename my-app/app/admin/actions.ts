"use server";

import { redirect } from "next/navigation";
import { createSupabaseAuthClient } from "@/lib/supabase/auth";

export type LoginState = {
  error?: string;
};

export async function signIn(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Escribe el correo y la contraseña." };
  }

  const supabase = await createSupabaseAuthClient();

  if (!supabase) {
    return {
      error: "Supabase no está configurado. Revisa las variables de entorno.",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Correo o contraseña incorrectos." };
  }

  const { data: membership } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!membership) {
    await supabase.auth.signOut();
    return { error: "Esta cuenta no tiene acceso al portal." };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseAuthClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
