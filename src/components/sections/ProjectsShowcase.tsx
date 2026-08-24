"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { IProject } from "@/lib/data";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

/**
 * Tarjetas de proyecto de la home. Recibe los datos ya resueltos en el
 * servidor; aquí sólo viven las animaciones.
 */
export default function ProjectsShowcase({
  projects,
}: {
  projects: IProject[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (projects.length === 0) return;

      // `root` limita el selector a esta sección: sin él, se animarían también
      // las tarjetas de otras secciones que comparten la clase.
      revealOnScroll(".proj-card", { root: container.current });

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

      // Las imágenes de Notion fijan su alto después del primer paint.
      refreshTriggersWhenReady(container.current);
    },
    { scope: container, dependencies: [projects] },
  );

  if (projects.length === 0) return null;

  const featured = projects[0];
  const rest = projects.slice(1, 4);

  return (
    <div ref={container}>
      {/* Destacado */}
      <Link
        href={`/proyecto/${featured.slug}`}
        className="proj-card featured-card group block mt-[52px] bg-luxury-bg border border-luxury-line rounded-[18px] overflow-hidden hover:border-luxury-accent/50 transition-all"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[340px] overflow-hidden">
            {featured.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.img}
                alt={`Sitio web de ${featured.title} desarrollado por Chroxel`}
                className="featured-media absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-[1.16] transition-transform duration-1000"
                // Es la imagen más grande del primer scroll: la priorizamos
                // para que el LCP no dependa de una carga diferida.
                fetchPriority="high"
                decoding="async"
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={proj.img}
                    alt={`Sitio web de ${proj.title} desarrollado por Chroxel`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
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
    </div>
  );
}
