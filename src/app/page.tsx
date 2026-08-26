import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
// import Stats from "@/components/sections/Stats";

// La sección de proyectos lee de Notion, así que la home también debe
// revalidarse; sin esto quedaría congelada en el momento del build.
export const revalidate = 60;

export const metadata: Metadata = {
  // La home usa el título por defecto (con la marca y la palabra clave
  // principal), por eso se declara absolute y no pasa por la plantilla.
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Process />
      {/* <Stats /> */}
    </>
  );
}
