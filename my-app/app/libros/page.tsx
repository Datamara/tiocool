import Footer from "@/components/Footer/Footer";
import LibrosGrid from "@/components/Libros/LibrosGrid";
import LibrosHero from "@/components/Libros/LibrosHero";
import LibrosShop from "@/components/Libros/LibrosShop";
import Navbar from "@/components/Navbar/Navbar";
import { getBooks, getDefaultBookId } from "@/lib/books";

export default async function LibrosPage() {
  const books = await getBooks();
  const defaultBookId = getDefaultBookId(books);

  return (
    <>
      <Navbar theme="light" />
      <main>
        <LibrosGrid books={books} />
      </main>
      <Footer />
    </>
  );
}
