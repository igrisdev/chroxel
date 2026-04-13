import Hero from "@/components/sections/Hero";
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Process />
      <Footer />
    </>
  );
}
