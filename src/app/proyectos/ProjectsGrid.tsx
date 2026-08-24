"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { IProject } from "@/lib/data";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";

/**
 * Sólo la parte interactiva del listado. Recibe los proyectos ya resueltos en
 * el servidor, así el HTML llega completo a Google y las animaciones se montan
 * después en el cliente.
 */
export default function ProjectsGrid({ projects }: { projects: IProject[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (projects.length === 0) return;
      revealOnScroll(".proj-card", { root: container.current });
      refreshTriggersWhenReady(container.current);
    },
    { scope: container, dependencies: [projects] },
  );

  if (projects.length === 0) {
    return (
      <p className="text-center text-luxury-slate text-lg py-32">
        No se encontraron proyectos.
      </p>
    );
  }

  return (
    <div
      ref={container}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {projects.map((proj) => (
        <Link
          key={proj.id}
          href={`/proyecto/${proj.slug}`}
          className="proj-card group bg-luxury-card border border-luxury-line rounded-[18px] overflow-hidden hover:border-luxury-accent/50 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            {proj.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proj.img}
                alt={`Captura del proyecto ${proj.title} desarrollado por Chroxel`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#EEF1F4] to-[#E3E7EC]" />
            )}
            <div className="grid-grain absolute inset-0 opacity-40" />
          </div>
          <div className="p-[22px]">
            <h2 className="font-display text-[19px] font-semibold">
              {proj.title}
            </h2>
            <p className="text-luxury-muted text-[13px] mt-1">
              {proj.client}
              {proj.year && ` · ${proj.year}`}
            </p>
            <div className="flex gap-1.5 flex-wrap mt-3.5">
              {proj.tech.slice(0, 4).map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
