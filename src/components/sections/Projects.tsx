"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { IProject } from "@/lib/data";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";

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

      revealOnScroll(".reveal-head", { y: 26, duration: 0.9 });
      revealOnScroll(".proj-card");

      // Parallax leve de la imagen destacada
      gsap.to(".featured-media", {
        scrollTrigger: {
          trigger: ".featured-card",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        yPercent: -8,
        ease: "none",
      });

      // Las imágenes de Notion cargan después del primer paint y cambian el
      // alto de la sección: sin este refresco los triggers quedan desfasados.
      refreshTriggersWhenReady(container.current);
    },
    { scope: container, dependencies: [projects] },
  );

  const featured = projects[0];
  const rest = projects.slice(1, 4);

  return (
    <section
      id="projects"
      ref={container}
      className="py-[120px] bg-luxury-card border-y border-luxury-border"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end gap-6">
          <div>
            <span className="reveal-head block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
              {"// Casos de éxito"}
            </span>
            <h2 className="reveal-head font-display text-4xl md:text-[46px] font-bold tracking-[-0.025em] leading-[1.06] mt-3.5">
              Trabajo que habla por sí solo.
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="reveal-head hidden sm:inline-flex items-center h-[50px] px-6 rounded-[11px] bg-transparent text-luxury-ink border border-luxury-line font-display font-semibold text-[15px] hover:border-luxury-accent transition-all whitespace-nowrap"
          >
            Ver todos
          </Link>
        </div>

        {/* Destacado */}
        {featured && (
          <Link
            href={`/proyecto/${featured.slug}`}
            className="proj-card featured-card group block mt-[52px] bg-luxury-bg border border-luxury-line rounded-[18px] overflow-hidden hover:border-luxury-accent/50 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[340px] overflow-hidden">
                {featured.img ? (
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="featured-media absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-[1.16] transition-transform duration-1000"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EEF1F4] to-[#E3E7EC]" />
                )}
                <div className="grid-grain absolute inset-0 opacity-40" />
              </div>
              <div className="p-9 flex flex-col justify-center">
                <h3 className="font-display text-3xl font-semibold">
                  {featured.title}
                </h3>
                <p className="text-luxury-muted text-sm mt-2">
                  {featured.client}
                  {featured.year && ` · ${featured.year}`}
                </p>
                <div className="flex gap-1.5 flex-wrap mt-6">
                  {featured.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Resto */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {rest.map((proj) => (
              <Link
                key={proj.id}
                href={`/proyecto/${proj.slug}`}
                className="proj-card group bg-luxury-bg border border-luxury-line rounded-[18px] overflow-hidden hover:border-luxury-accent/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {proj.img ? (
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EEF1F4] to-[#E3E7EC]" />
                  )}
                  <div className="grid-grain absolute inset-0 opacity-40" />
                </div>
                <div className="p-[22px]">
                  <h3 className="font-display text-[19px] font-semibold">
                    {proj.title}
                  </h3>
                  <p className="text-luxury-muted text-[13px] mt-1">
                    {proj.year}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mt-3.5">
                    {proj.tech.slice(0, 3).map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/proyectos"
            className="inline-flex items-center h-[50px] px-6 rounded-[11px] bg-transparent text-luxury-ink border border-luxury-line font-display font-semibold text-[15px] hover:border-luxury-accent transition-all"
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
