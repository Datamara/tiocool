import CourseInstructors from "@/components/Cursos/CourseInstructors";
import CourseProgram from "@/components/Cursos/CourseProgram";
import CourseRegister from "@/components/Cursos/CourseRegister";
import CursosHero from "@/components/Cursos/CursosHero";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function CursosPage() {
  return (
    <div className="bg-black">
      <Navbar theme="dark" />
      <main>
        <CursosHero />
        <CourseProgram />
        <CourseInstructors />
        <CourseRegister />
      </main>
      <Footer />
    </div>
  );
}
