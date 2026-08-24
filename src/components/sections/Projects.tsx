import { Suspense } from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/notion";
import Reveal from "@/components/ui/Reveal";
import { ProjectsShowcaseSkeleton } from "@/components/ui/Skeleton";
import ProjectsShowcase from "./ProjectsShowcase";

/**
 * Carga los proyectos en el servidor. Al ir dentro de un <Suspense>, la
 * cabecera de la sección se envía al navegador de inmediato y las tarjetas
 * llegan en streaming, ocupando mientras tanto el skeleton.
 */
async function ProjectsContent() {
  // El try envuelve sólo la petición: construir el JSX dentro no capturaría
  // errores de render (React los lanza más tarde) y ESLint lo señala.
  const projects = await getAllProjects().catch((error) => {
    console.error("No se pudieron cargar los proyectos destacados:", error);
    return [];
  });

  return <ProjectsShowcase projects={projects.slice(0, 4)} />;
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-[120px] bg-luxury-card border-y border-luxury-border"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <Reveal className="flex justify-between items-end gap-6">
          <div>
            <span className="block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
              {"// Casos de éxito"}
            </span>
            <h2 className="font-display text-4xl md:text-[46px] font-bold tracking-[-0.025em] leading-[1.06] mt-3.5">
              Trabajo que habla por sí solo.
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="hidden sm:inline-flex items-center h-[50px] px-6 rounded-[11px] bg-transparent text-luxury-ink border border-luxury-line font-display font-semibold text-[15px] hover:border-luxury-accent transition-all whitespace-nowrap"
          >
            Ver todos
          </Link>
        </Reveal>

        <Suspense fallback={<ProjectsShowcaseSkeleton />}>
          <ProjectsContent />
        </Suspense>

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
