import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/notion";
import { IProject } from "@/lib/data";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import ProjectsGrid from "./ProjectsGrid";

// Se revalida cada minuto: Google recibe HTML estático y rápido, y los
// proyectos nuevos de Notion aparecen solos sin volver a desplegar.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portafolio de proyectos de software",
  description:
    "Conoce los proyectos de software, plataformas web y tiendas online que Chroxel ha desarrollado para empresas en Colombia.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Portafolio de proyectos | Chroxel",
    description:
      "Proyectos de software, plataformas web y tiendas online desarrollados por Chroxel para empresas en Colombia.",
    url: "/proyectos",
    type: "website",
  },
};

export default async function ProjectsPage() {
  let projects: IProject[] = [];

  try {
    projects = await getAllProjects();
  } catch (error) {
    console.error("No se pudieron cargar los proyectos:", error);
  }

  return (
    <div className="bg-luxury-bg min-h-screen pt-[110px] pb-32">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/proyectos" },
        ])}
      />

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
          Plataformas web, sistemas empresariales y tiendas online que hemos
          construido para nuestros clientes en Colombia.
        </p>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
