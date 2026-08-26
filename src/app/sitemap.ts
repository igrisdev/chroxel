import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/notion";
import { absoluteUrl } from "@/lib/site";

// Se revalida cada minuto para incluir los proyectos nuevos de Notion.
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/proyectos"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const projects = await getAllProjects();
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: absoluteUrl(`/proyecto/${project.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    // Si Notion falla no tumbamos el sitemap: al menos indexamos lo estático.
    console.error("No se pudieron añadir los proyectos al sitemap:", error);
    return staticRoutes;
  }
}
