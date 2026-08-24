"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { IProject } from "@/lib/data";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";

export default function ProjectsPage() {
  const container = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: IProject[]) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  useGSAP(
    () => {
      if (projects.length === 0) return;
      revealOnScroll(".proj-card");
      refreshTriggersWhenReady(container.current);
    },
    { scope: container, dependencies: [projects] },
  );

  return (
    <div ref={container} className="bg-luxury-bg min-h-screen pt-[110px] pb-32">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <Link
          href="/"
          className="group font-mono text-xs tracking-[0.06em] text-luxury-accent-2 mb-8 inline-flex items-center gap-1.5 hover:text-luxury-ink transition-colors"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          VOLVER AL INICIO
        </Link>

        <h1 className="font-display text-4xl md:text-6xl font-bold text-luxury-ink tracking-[-0.03em] mb-4 leading-tight">
          Todos los <span className="text-luxury-accent-2">proyectos</span>
        </h1>
        <p className="text-luxury-slate text-lg md:text-xl max-w-2xl mb-16 font-light leading-relaxed">
          Portafolio completo, cargado en tiempo real desde nuestra base de
          datos de proyectos.
        </p>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-luxury-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-luxury-slate text-lg py-32">
            No se encontraron proyectos.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={`/proyecto/${proj.slug}`}
                className="proj-card group bg-luxury-card border border-luxury-line rounded-[18px] overflow-hidden hover:border-luxury-accent/50 hover:-translate-y-1 transition-all duration-300"
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
                  {proj.category && (
                    <div className="absolute left-[18px] top-[18px] tech-tag">
                      {proj.category}
                    </div>
                  )}
                </div>
                <div className="p-[22px]">
                  <h3 className="font-display text-[19px] font-semibold">
                    {proj.title}
                  </h3>
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
        )}
      </div>
    </div>
  );
}
