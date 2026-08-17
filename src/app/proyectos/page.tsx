"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IProject } from "@/lib/data";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: IProject[]) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-luxury-bg min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="group text-luxury-accent font-display font-bold tracking-widest text-xs mb-8 flex items-center gap-2 hover:text-luxury-ink transition-colors w-fit"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          VOLVER
        </Link>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-luxury-ink tracking-tighter mb-4 leading-tight">
          Todos los <span className="text-luxury-accent">proyectos</span>
        </h1>
        <p className="text-luxury-slate text-lg md:text-xl max-w-2xl mb-16 font-light">
          Nuestro portafolio completo de proyectos destacados.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={`/proyecto/${proj.slug}`}
                className="group relative aspect-video bg-luxury-card rounded-3xl overflow-hidden border border-luxury-border shadow-md hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/90 via-luxury-ink/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
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
        )}
      </div>
    </div>
  );
}
