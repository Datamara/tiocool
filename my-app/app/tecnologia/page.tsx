import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import TecnologiaClose from "@/components/Tecnologia/TecnologiaClose";
import TecnologiaHero from "@/components/Tecnologia/TecnologiaHero";
import TecnologiaWork from "@/components/Tecnologia/TecnologiaWork";

export default function TecnologiaPage() {
  return (
    <div className="bg-white">
      <Navbar theme="dark" />
      <main>
        <TecnologiaHero />
        <TecnologiaWork />
        <TecnologiaClose />
      </main>
      <Footer />
    </div>
  );
}
