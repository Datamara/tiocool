import AboutSection from "@/components/About/AboutSection";
import BooksSection from "@/components/Books/BooksSection";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Hero/HeroSection";
import TestimonialsSection from "@/components/Testimonials/TestimonialsSection";
import { AI_COURSE_ITEM, getBooks } from "@/lib/books";

export default async function Home() {
  const books = [...(await getBooks()), AI_COURSE_ITEM];
  const defaultBookId = AI_COURSE_ITEM.id;

  return (
    <>
      <HeroSection />

      <AboutSection />
      <BooksSection books={books} defaultBookId={defaultBookId} />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
