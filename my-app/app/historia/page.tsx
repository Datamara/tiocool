import Footer from "@/components/Footer/Footer";
import HistoriaBooks from "@/components/Historia/HistoriaBooks";
import HistoriaContact from "@/components/Historia/HistoriaContact";
import HistoriaHero from "@/components/Historia/HistoriaHero";
import HistoriaMission from "@/components/Historia/HistoriaMission";
import HistoriaStory from "@/components/Historia/HistoriaStory";
import HistoriaTimeline from "@/components/Historia/HistoriaTimeline";
import Navbar from "@/components/Navbar/Navbar";

export default function HistoriaPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <HistoriaHero />
        <HistoriaStory />
        {/* <HistoriaTimeline /> */}
        <HistoriaMission />
        <HistoriaContact />
      </main>
      <Footer />
    </>
  );
}
