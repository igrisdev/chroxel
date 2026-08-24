/**
 * Configuración central de SEO.
 *
 * La URL sale de NEXT_PUBLIC_SITE_URL para que al comprar el dominio definitivo
 * baste con cambiar esa variable: canonical, sitemap, robots, Open Graph y los
 * datos estructurados se actualizan solos.
 */
export const siteConfig = {
  name: "Chroxel",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://chroxel.vercel.app"
  ).replace(/\/$/, ""),

  title: "Chroxel | Desarrollo de Software a Medida en Colombia",
  titleTemplate: "%s | Chroxel",

  description:
    "Desarrollamos software a medida en Colombia: plataformas web, sistemas empresariales y e-commerce con ingeniería sólida y diseño de alto nivel.",

  slogan: "Ingeniería de software que tu negocio siente",

  keywords: [
    "desarrollo de software en Colombia",
    "desarrollo web a medida",
    "agencia de software Colombia",
    "empresa de desarrollo de software",
    "software a medida Colombia",
    "desarrollo de aplicaciones web",
    "sistemas web empresariales",
    "diseño UI UX Colombia",
    "desarrollo Next.js",
    "tiendas online Shopify Colombia",
    "automatización de procesos empresariales",
    "desarrollo de páginas web profesionales",
  ],

  locale: "es_CO",
  country: "CO",

  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "johan.manuel.alvarez.pinta@gmail.com",

  /** Servicios que ofrecemos, usados en los datos estructurados. */
  services: [
    {
      name: "Desarrollo Web",
      description:
        "Aplicaciones y sitios a medida con arquitecturas modernas, enfocadas en rendimiento y mantenibilidad.",
    },
    {
      name: "Diseño UI/UX",
      description:
        "Interfaces claras y sistemas de diseño consistentes que guían al usuario y transmiten solidez.",
    },
    {
      name: "Sistemas Web",
      description:
        "Plataformas internas, paneles y automatizaciones que ordenan procesos críticos con datos en tiempo real.",
    },
  ],
} as const;

/** Construye una URL absoluta a partir de una ruta relativa. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
