import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const SECTIONS = [
  {
    title: "El sitio",
    paragraphs: [
      "Tío Cool es el hub de Luis Lara Esqueda para la industria de los seguros. Aquí se publican ideas, libros, el curso de IA y el camino hacia el software de Datamara Seguros.",
      "Al usar este sitio aceptas estas condiciones. Si algo de aquí cambia la forma en que quieres usarlo, puedes dejar de navegarlo y escribirnos.",
    ],
  },
  {
    title: "Qué ofrece",
    paragraphs: [
      "El contenido del blog, la historia y las páginas de tecnología es informativo. Ayuda a entender la industria, la mentalidad y el uso de la tecnología. No es una póliza, una asesoría personalizada ni una oferta de seguro.",
      "Los libros se presentan en este sitio y la compra ocurre en la tienda o editorial enlazada. Esas compras se rigen por las condiciones de quien las vende.",
      "Asygurare, KanKanKan y los demás productos de Datamara Seguros viven en sus propios sitios. Al salir de Tío Cool, aplican las condiciones de cada uno.",
    ],
  },
  {
    title: "Curso de IA",
    paragraphs: [
      "Registrar interés en el Curso de IA guarda tu nombre, apellido, correo, teléfono, empresa y el mensaje que quieras dejar. Con eso te contactamos sobre fechas, lugar y la apertura de inscripciones.",
      "Registrar interés no aparta un lugar, no confirma inscripción y no genera un cobro. La inscripción, el precio y las condiciones del curso se comunican cuando el registro quede abierto.",
    ],
  },
  {
    title: "Contacto",
    paragraphs: [
      "El formulario de contacto pide nombre, apellido, correo, teléfono y mensaje. Lo usamos para responder lo que escribiste: el curso, el software o una conversación con Luis.",
      "El teléfono publicado, 999 233 8183, es otro canal para lo mismo.",
    ],
  },
  {
    title: "Datos",
    paragraphs: [
      "Los datos de los formularios se guardan para dar seguimiento. No los pedimos para venderlos. Se comparten solo con quien necesita responderte dentro de este proyecto.",
      "Puedes pedir la corrección o la eliminación de tus datos escribiendo por la página de contacto, con el mismo correo que usaste al enviar el formulario.",
    ],
  },
  {
    title: "Uso del sitio",
    paragraphs: [
      "Puedes leer, compartir los enlaces y usar la información para tu trabajo en la industria. El texto, las fotos, la marca Tío Cool y el diseño de este sitio pertenecen a sus titulares.",
      "Queda fuera copiar el sitio, usar la marca como si fuera propia o cargar contenido que afecte a otras personas o al funcionamiento de la página.",
    ],
  },
  {
    title: "Disponibilidad",
    paragraphs: [
      "El sitio puede actualizarse, pausarse o cambiar de dirección. Las fechas del curso, los textos y los enlaces se revisan, y aun así pueden ajustarse cuando la industria o el calendario lo pidan.",
    ],
  },
  {
    title: "Cambios y contacto",
    paragraphs: [
      "Estas condiciones se actualizan en esta misma página. La versión vigente es la que está publicada.",
      "Para una duda sobre estos términos, escribe desde la página de contacto.",
    ],
  },
] as const;

export default function TerminosPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <header className="bg-white px-6 pb-12 pt-4 md:px-12 md:pb-16 lg:px-16">
          <div className="mx-auto max-w-[90rem]">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-royal md:text-xs">
              14 de octubre de 2026
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.02em] text-black md:text-7xl">
              Términos y condiciones
            </h1>
            <p className="mt-6 max-w-2xl font-display text-base font-bold leading-relaxed text-black/75 md:text-xl">
              Cómo se usa este sitio, qué significa registrar interés en el
              curso y qué pasa con los datos que envías.
            </p>
            <span
              className="mt-8 block h-px w-32 bg-royal"
              aria-hidden="true"
            />
          </div>
        </header>

        <section className="bg-lavender px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-12 md:gap-16">
            {SECTIONS.map((section) => (
              <article key={section.title}>
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-black md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-display text-base font-bold leading-relaxed text-black/80 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
            <p className="font-display text-sm font-bold leading-relaxed text-black/70">
              También puedes escribir desde{" "}
              <Link href="/contacto" className="text-royal hover:text-azure">
                contacto
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
