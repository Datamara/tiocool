export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  readTime: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ia-en-seguros",
    title: "IA en seguros: de la curiosidad a la ventaja competitiva",
    excerpt:
      "La Inteligencia Artificial ya no es opcional para asesores y promotorías. Es la herramienta que separa a quienes escalan de quienes se quedan atrás.",
    date: "2026-03-12",
    category: "Inteligencia Artificial",
    readTime: "5 min",
    content: [
      "Durante años, la Inteligencia Artificial parecía un tema lejano para el sector asegurador. Algo reservado para grandes corporativos con presupuestos millonarios. Eso cambió.",
      "Hoy, un asesor puede automatizar seguimientos, personalizar propuestas, analizar carteras y responder dudas de clientes en minutos — no en horas. La pregunta ya no es si adoptar IA, sino cuándo y cómo hacerlo sin perder el factor humano que define nuestra profesión.",
      "En el curso completo de IA que estamos preparando, no hablamos de teoría abstracta. Hablamos de casos reales: cotizaciones más rápidas, prospección inteligente, contenido que conecta y procesos que liberan tiempo para lo que importa: las relaciones.",
      "La tecnología no reemplaza al asesor. Le da superpoderes. Y quienes los entienden primero, ganan.",
    ],
  },
  {
    slug: "mentalidad-de-abundancia",
    title: "Mentalidad de abundancia: el camino al chingonario",
    excerpt:
      "Existen dos caminos: abundancia o mediocridad. La diferencia no está en el talento, sino en las decisiones diarias que tomamos.",
    date: "2026-02-08",
    category: "Coaching",
    readTime: "4 min",
    content: [
      "He visto a cientos de emprendedores con el mismo potencial llegar a resultados completamente distintos. No por suerte. Por mentalidad.",
      "La mentalidad de escasez te hace competir, compararte y guardar. La mentalidad de abundancia te hace crear, colaborar y compartir. Ambas son hábitos que se entrenan.",
      "En Camino al Chingonario escribí sobre este proceso: desbloquear tu máximo potencial desde la paz interior, el autoconocimiento y la valentía. No es motivación vacía. Es un mapa.",
      "Si estás leyendo esto, ya diste un paso. El siguiente es actuar con intención.",
    ],
  },
  {
    slug: "seguro-gastos-medicos",
    title: "El seguro de gastos médicos no es un lujo",
    excerpt:
      "Redefinir el papel del seguro en nuestra vida: de un «por si acaso» a una protección esencial para familias y empresarios.",
    date: "2026-01-20",
    category: "Seguros",
    readTime: "6 min",
    content: [
      "En Momentos Inesperados planteé una idea simple pero poderosa: el seguro de gastos médicos no es un lujo, es una necesidad.",
      "Lo he visto en la práctica. Familias que pensaron que «nunca les pasaría» y enfrentaron diagnósticos, hospitalizaciones y decisiones imposibles sin la red de protección adecuada.",
      "Como asesores, tenemos la responsabilidad de traducir lo complejo en algo claro. No se trata de vender pánico. Se trata de ofrecer certeza en un mundo incierto.",
      "Cada conversación honesta sobre protección es una oportunidad de cambiar una vida. Esa es la esencia de nuestro oficio.",
    ],
  },
  {
    slug: "historias-que-transforman",
    title: "Por qué escribo historias que transforman",
    excerpt:
      "Las historias no solo entretienen. Cambian perspectivas, abren conversaciones y dejan huella en quien las lee.",
    date: "2025-12-05",
    category: "Escritura",
    readTime: "3 min",
    content: [
      "Empecé a escribir porque las historias me salvaron antes de que yo supiera salvar a otros. Cada libro que publiqué nació de una conversación real, de un dolor compartido o de una lección que merecía ser contada.",
      "Dos Veces Viuda, Cambiando Vidas, Momentos Inesperados… todos tienen algo en común: personas reales enfrentando lo inesperado y encontrando una salida.",
      "Escribir no es escapar de la realidad. Es ordenarla, darle sentido y ofrecerla a quien la necesita en el momento justo.",
      "Si una sola frase de lo que escribo ayuda a alguien a dar un paso, ya valió la pena.",
    ],
  },
];

export function getBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
