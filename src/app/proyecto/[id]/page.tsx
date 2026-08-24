import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/notion";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import ProjectDetail from "./ProjectDetail";

// HTML estático regenerado cada hora: rápido para el usuario y para Googlebot.
export const revalidate = 3600;

/** Pre-genera una página por proyecto para que existan en el build. */
export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return projects.map((project) => ({ id: project.slug }));
  } catch {
    return [];
  }
}

/** Recorta a `max` caracteres sin partir palabras por la mitad. */
function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

/** Descripción para buscadores: usa la de Notion o una generada con sus datos. */
function seoDescription(project: {
  title: string;
  client: string;
  longDescription: string;
  tech: string[];
}): string {
  const base = project.longDescription?.trim();
  if (base && base.length >= 60) return truncate(base);

  const stack = project.tech.slice(0, 4).join(", ");
  // Si el cliente se llama igual que el proyecto, no lo repetimos.
  const forClient =
    project.client && project.client !== project.title
      ? ` para ${project.client}`
      : "";

  const parts = [
    `${project.title}: proyecto desarrollado por Chroxel${forClient}`,
    stack ? `con ${stack}.` : ".",
    base || "",
  ];
  return truncate(parts.join(" "));
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectBySlug(id).catch(() => null);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      robots: { index: false, follow: true },
    };
  }

  const description = seoDescription(project);
  const url = `/proyecto/${project.slug}`;

  // El cliente sólo se añade si aporta información nueva frente al título.
  const showClient = project.client && project.client !== project.title;

  return {
    title: showClient
      ? `${project.title} — ${project.client}`
      : project.title,
    description,
    keywords: [
      project.title,
      project.client,
      ...project.tech,
      "caso de éxito",
      "desarrollo de software Colombia",
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | Proyecto de ${siteConfig.name}`,
      description,
      url,
      type: "article",
      images: project.img
        ? [{ url: project.img, alt: `Sitio web de ${project.title}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description,
      images: project.img ? [project.img] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectBySlug(id).catch(() => null);

  if (!project) notFound();

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: seoDescription(project),
    url: absoluteUrl(`/proyecto/${project.slug}`),
    ...(project.img ? { image: project.img } : {}),
    inLanguage: "es-CO",
    creator: { "@id": absoluteUrl("/#organization") },
    ...(project.client
      ? { sourceOrganization: { "@type": "Organization", name: project.client } }
      : {}),
    ...(project.tech.length > 0 ? { keywords: project.tech.join(", ") } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/proyectos" },
          { name: project.title, url: `/proyecto/${project.slug}` },
        ])}
      />
      <ProjectDetail project={project} />
    </>
  );
}
