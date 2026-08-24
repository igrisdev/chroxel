/**
 * Tipos de proyecto: única fuente de verdad.
 *
 * `src/lib/notion.ts` los importa en lugar de redefinirlos, para que el mapeo
 * desde Notion y lo que consumen las páginas no puedan divergir.
 */
export interface IProject {
  id: string;
  slug: string;
  category: string;
  title: string;
  img: string;
  client: string;
  url_web: string;
  year: string;
  tech: string[];
}

export interface IProjectDetail extends IProject {
  longDescription: string;
  /** Métrica de impacto (sólo se carga en el detalle). */
  stat: string;
  features: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  github_url?: string;
  logo_url?: string;
  framework_icon?: string;
  framework_url?: string;
  status?: string;
  end_date?: string;
}
