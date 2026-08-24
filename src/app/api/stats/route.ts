import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/notion";

export const dynamic = "force-dynamic";

export interface IStats {
  projects: number;
  clients: number;
  technologies: number;
  years: number;
}

export async function GET() {
  try {
    const projects = await getAllProjects();

    const clients = new Set(
      projects.map((p) => p.client.trim().toLowerCase()).filter(Boolean),
    );

    const technologies = new Set(
      projects.flatMap((p) => p.tech.map((t) => t.trim().toLowerCase())).filter(Boolean),
    );

    const years = projects
      .map((p) => parseInt(p.year, 10))
      .filter((y) => !Number.isNaN(y));
    const currentYear = new Date().getFullYear();
    // Años de trayectoria: desde el proyecto más antiguo hasta hoy (mínimo 1).
    const experience =
      years.length > 0 ? Math.max(1, currentYear - Math.min(...years) + 1) : 0;

    const stats: IStats = {
      projects: projects.length,
      clients: clients.size,
      technologies: technologies.size,
      years: experience,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error computing stats from Notion:", error);
    return NextResponse.json(
      { error: "Failed to compute stats" },
      { status: 500 },
    );
  }
}
