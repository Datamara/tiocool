import ContactHero from "@/components/Contact/ContactHero";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function ContactoPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <ContactHero />
        <ContactSection source="contacto" />
      </main>
      <Footer />
    </>
  );
}
