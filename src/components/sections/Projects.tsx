"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PROJECTS_DATA_ALL } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const PROJECTS_DATA = PROJECTS_DATA_ALL.slice(0, 4).map((project) => ({
  id: project.id,
  category: project.category,
  title: project.title,
  img: project.img,
  zIndex: project.zIndex,
  slug: project.slug,
}));

export default function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // --- 1. Animación y Ajuste del Texto Principal ---
        // Subimos el texto drásticamente (y: -150) para que no toque la curva de imágenes.
        // Mantenemos la animación de entrada suave.
        gsap.from("#projects-title-text", {
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%", // Empieza un poco antes para que se vea la subida
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: -150, // Lo movemos hacia arriba drásticamente
          duration: 1.5,
          ease: "expo.out",
        });

        // --- 2. Timeline de las 4 tarjetas formando la CURVA VERDE ---
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom", // Inicia cuando la sección asoma (final del Hero)
            end: "top 5%", // Termina cuando la sección está casi arriba para un scroll suave
            scrub: 1.5,
          },
        });

        // Calculamos las posiciones basándonos en la curva cóncava suave.
        // '0' al final de cada tween asegura que todas las animaciones corran en paralelo.

        // #proj-1: Extremo IZQUIERDO, arriba en la curva, rotación negativa pronunciada.
        tl.from(
          "#proj-1",
          {
            y: () => -window.innerHeight * 0.9, // Bastante arriba
            x: () => -window.innerWidth * 0.3, // Muy a la izquierda
            scale: 1.1,
            rotation: -25, // Rotación hacia afuera pronunciada
            ease: "power2.inOut",
          },
          0,
        );

        // #proj-3: Izquierda CENTRO, punto más bajo de la curva izquierda, rotación suave.
        tl.from(
          "#proj-3",
          {
            y: () => -window.innerHeight * 1.1, // Más abajo que el extremo
            x: () => -window.innerWidth * 0.1, // Hacia el centro
            scale: 1.2,
            rotation: -8, // Rotación suave hacia afuera
            ease: "power2.inOut",
          },
          0,
        );

        // #proj-4: Derecha CENTRO, punto más bajo de la curva derecha, rotación suave simétrica.
        tl.from(
          "#proj-4",
          {
            y: () => -window.innerHeight * 1.1, // Simétrico a proj-3
            x: () => window.innerWidth * 0.1, // Hacia el centro
            scale: 1.15,
            rotation: 8, // Rotación suave hacia afuera (simétrica)
            ease: "power2.inOut",
          },
          0,
        );

        // #proj-2: Extremo DERECHO, arriba en la curva (simétrico a proj-1), rotación positiva pronunciada.
        tl.from(
          "#proj-2",
          {
            y: () => -window.innerHeight * 0.9, // Bastante arriba (ligeramente diferente para asimetría orgánica)
            x: () => window.innerWidth * 0.3, // Muy a la derecha
            scale: 1.1,
            rotation: 25, // Rotación hacia afuera pronunciada (simétrica)
            ease: "power2.inOut",
          },
          0,
        );
      });

      // --- Animaciones para Móvil (Mantenemos la cuadrícula) ---
      mm.add("(max-width: 1023px)", () => {
        gsap.from("#projects-title-text", {
          scrollTrigger: { trigger: container.current, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
        gsap.utils.toArray(".project-item").forEach((item: any) => {
          gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 85%" },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      id="projects"
      ref={container}
      className="py-32 bg-luxury-bg relative"
    >
      {/* Contenedor del título con ID específico para subirlo */}
      <div
        id="projects-title-text"
        className="max-w-7xl mx-auto px-6 mb-32 text-center relative z-40"
      >
        <h2 className="font-display text-5xl md:text-7xl font-bold text-luxury-ink tracking-tighter leading-tight">
          Transformamos tu <br />
          <span className="text-luxury-accent">visión</span> en realidad.
        </h2>
        <p className="text-luxury-slate text-xl max-w-2xl mx-auto mt-8 font-light italic">
          Inmersión total en tu visión para definir los cimientos de un proyecto
          extraordinario.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-20">
        {PROJECTS_DATA.map((proj) => (
          <Link
            key={proj.id}
            id={proj.id}
            href={`/proyecto/${proj.slug}`}
            className={`project-item group relative aspect-video bg-luxury-card rounded-3xl overflow-hidden ${proj.zIndex} border border-luxury-border shadow-md hover:shadow-2xl transition-shadow duration-500`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/90 via-luxury-ink/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={proj.img}
              alt={proj.category}
              className="w-full h-full group-hover:scale-105 transition-transform duration-1000"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 p-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-luxury-accent font-display tracking-widest text-xs mb-3 uppercase font-bold">
                {proj.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                {proj.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
