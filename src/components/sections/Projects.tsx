"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { IProject } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: IProject[]) => setProjects(data.slice(0, 4)))
      .catch(() => setProjects([]));
  }, []);

  useGSAP(
    () => {
      if (projects.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.from("#projects-title-text", {
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: -150,
          duration: 1.5,
          ease: "expo.out",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "top 5%",
            scrub: 1.5,
          },
        });

        tl.from(
          "#proj-1",
          {
            y: () => -window.innerHeight * 0.9,
            x: () => -window.innerWidth * 0.3,
            scale: 1.1,
            rotation: -25,
            ease: "power2.inOut",
          },
          0
        );

        tl.from(
          "#proj-3",
          {
            y: () => -window.innerHeight * 1.1,
            x: () => -window.innerWidth * 0.1,
            scale: 1.2,
            rotation: -8,
            ease: "power2.inOut",
          },
          0
        );

        tl.from(
          "#proj-4",
          {
            y: () => -window.innerHeight * 1.1,
            x: () => window.innerWidth * 0.1,
            scale: 1.15,
            rotation: 8,
            ease: "power2.inOut",
          },
          0
        );

        tl.from(
          "#proj-2",
          {
            y: () => -window.innerHeight * 0.9,
            x: () => window.innerWidth * 0.3,
            scale: 1.1,
            rotation: 25,
            ease: "power2.inOut",
          },
          0
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from("#projects-title-text", {
          scrollTrigger: { trigger: container.current, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>(".project-item").forEach((item) => {
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
    { scope: container, dependencies: [projects] }
  );

  const zIndices = ["z-[25]", "z-[20]", "z-[20]", "z-[10]"];

  return (
    <section
      id="projects"
      ref={container}
      className="py-32 bg-luxury-bg relative"
    >
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
        {projects.map((proj, index) => (
          <Link
            key={proj.id}
            id={`proj-${index + 1}`}
            href={`/proyecto/${proj.slug}`}
            className={`project-item group relative aspect-video bg-luxury-card rounded-3xl overflow-hidden ${zIndices[index] || "z-[10]"} border border-luxury-border shadow-md hover:shadow-2xl transition-shadow duration-500`}
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

      <div className="flex justify-center mt-16">
        <Link
          href="/proyectos"
          className="px-8 py-4 border-2 border-luxury-accent text-luxury-accent font-display font-bold tracking-widest text-sm uppercase rounded-full hover:bg-luxury-accent hover:text-white transition-all duration-300"
        >
          Ver más
        </Link>
      </div>
    </section>
  );
}
