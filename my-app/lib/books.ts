import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BookRow } from "@/lib/supabase/types";

export type BookProduct = {
  id: string;
  title: string;
  quote: string;
  description: string;
  price: number;
  priceNote?: string;
  cover: string;
  buyUrl: string;
  kind?: "book" | "course";
  ctaLabel?: string;
};

export const AI_COURSE_ITEM: BookProduct = {
  id: "curso-ia-completo",
  title: "Curso Completo de IA",
  quote: "La tecnología te hace ganarlo.",
  description:
    "Domina la Inteligencia Artificial aplicada al sector asegurador y financiero. Tres mentores. Un curso transformador.",
  price: 0,
  priceNote: "Inicio · 10 de diciembre 2026",
  cover: "",
  buyUrl: "/cursos",
  kind: "course",
  ctaLabel: "Ver curso",
};

export const FALLBACK_BOOKS: BookProduct[] = [
  {
    id: "dos-veces-viuda",
    title: "Dos Veces Viuda",
    quote: "Carácter es destino.",
    description:
      "Once historias de mujeres que vivieron la pérdida en más de una ocasión y lograron reinventarse. Resiliencia, amor propio y la fortaleza de quienes, a pesar del dolor, encontraron una nueva oportunidad.",
    price: 300,
    priceNote: "Tapa blanda · Bonobos Editores",
    cover: "/libros/dos_veces_viuda.png",
    buyUrl: "https://www.tiocool.org/",
  },
  {
    id: "momentos-inesperados",
    title: "Momentos Inesperados",
    quote: "El Seguro de Gastos Médicos no es un lujo, es una necesidad.",
    description:
      "Redefine el papel del seguro en nuestra vida, pasando de ser un «por si acaso» a una protección esencial. Ideal para asesores, empresarios y familias que buscan entender su verdadero valor.",
    price: 279,
    priceNote: "Bonobos Editores",
    cover: "/libros/momentos_inesperados.png",
    buyUrl: "https://www.tiocool.org/",
  },
  {
    id: "cambiando-vidas",
    title: "Cambiando Vidas",
    quote: "Historias que transforman la manera de emprender.",
    description:
      "Recopila relatos del sector financiero, consejos prácticos y estrategias para que emprendedores evolucionen a empresarios, basados en experiencias reales del sector asegurador y bancario.",
    price: 279,
    priceNote: "AM Editores",
    cover: "/libros/cambiando_vidas.png",
    buyUrl: "https://www.ameditores.com/product/cambiando-vidas/",
  },
  {
    id: "camino-chingonario",
    title: "Camino al Chingonario",
    quote: "Dos caminos: abundancia o mediocridad. Tú decides.",
    description:
      "Guía para desbloquear tu máximo potencial y alcanzar la prosperidad desde la paz interior, el autoconocimiento y la valentía. Un proceso claro y comprobado para emprendedores y buscadores de éxito.",
    price: 279,
    priceNote: "Edición digital e impresa",
    cover: "/libros/camino_al_chingonario.png",
    buyUrl: "https://www.tiocool.org/",
  },
];

export function mapBookRow(row: BookRow): BookProduct {
  return {
    id: row.slug,
    title: row.title,
    quote: row.quote,
    description: row.description,
    price: Number(row.price),
    priceNote: row.price_note ?? undefined,
    cover: row.cover_url,
    buyUrl: row.buy_url,
  };
}

export async function getBooks(): Promise<BookProduct[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return FALLBACK_BOOKS;
  }

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    console.error("Error fetching books from Supabase:", error?.message);
    return FALLBACK_BOOKS;
  }

  return data.map(mapBookRow);
}

export function getDefaultBookId(books: BookProduct[]) {
  if (books.length === 0) return "";
  const middleIndex = Math.floor(books.length / 2);
  return books[middleIndex]?.id ?? books[0].id;
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(amount);
}
