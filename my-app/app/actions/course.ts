"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ActionResult = {
  success: boolean;
  error?: string;
};

const DEFAULT_COURSE_SLUG = "ia-completo-2026";

export async function submitCourseInterest(
  formData: FormData,
): Promise<ActionResult> {
  const firstName = String(formData.get("nombre") ?? "").trim();
  const lastName = String(formData.get("apellido") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("telefono") ?? "").trim() || null;
  const company = String(formData.get("empresa") ?? "").trim() || null;
  const message = String(formData.get("mensaje") ?? "").trim() || null;
  const courseSlug =
    String(formData.get("course_slug") ?? DEFAULT_COURSE_SLUG).trim() ||
    DEFAULT_COURSE_SLUG;

  if (!firstName || !lastName || !email) {
    return { success: false, error: "Nombre, apellido y email son requeridos." };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      success: false,
      error: "Supabase no está configurado. Revisa las variables de entorno.",
    };
  }

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (courseError || !course) {
    console.error("Course lookup error:", courseError?.message);
    return {
      success: false,
      error: "El curso no está disponible en este momento.",
    };
  }

  const { error } = await supabase.from("course_interests").insert({
    course_id: course.id,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    company,
    message,
  });

  if (error) {
    console.error("Course interest error:", error.message);
    return {
      success: false,
      error: "No pudimos registrar tu interés. Intenta de nuevo.",
    };
  }

  return { success: true };
}
