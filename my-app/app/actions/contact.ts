"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function submitContact(
  formData: FormData,
): Promise<ActionResult> {
  const firstName = String(formData.get("nombre") ?? "").trim();
  const lastName = String(formData.get("apellido") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("telefono") ?? "").trim() || null;
  const message = String(formData.get("mensaje") ?? "").trim();
  const source = String(formData.get("source") ?? "historia").trim();

  if (!firstName || !lastName || !email || !message) {
    return { success: false, error: "Completa todos los campos requeridos." };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      success: false,
      error: "Supabase no está configurado. Revisa las variables de entorno.",
    };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    message,
    source,
  });

  if (error) {
    console.error("Contact submission error:", error.message);
    return { success: false, error: "No pudimos enviar tu mensaje. Intenta de nuevo." };
  }

  return { success: true };
}
