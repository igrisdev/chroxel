import { siteConfig, absoluteUrl } from "@/lib/site";

/**
 * Inserta datos estructurados (JSON-LD) en la página.
 *
 * Google los usa para entender el negocio y mostrar resultados enriquecidos.
 * Se serializa escapando "<" para que ningún dato de Notion pueda cerrar la
 * etiqueta script.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Identidad de la empresa: quiénes somos, qué hacemos y dónde operamos. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/chroxel_logo_v1.png"),
    image: absoluteUrl("/chroxel_logo_v1.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    slogan: siteConfig.slogan,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    knowsAbout: siteConfig.keywords,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de desarrollo de software",
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": absoluteUrl("/#organization") },
        },
      })),
    },
  };
}

/** El sitio como entidad, para que Google entienda su estructura. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "es-CO",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

/** Migas de pan: ayudan a Google a mostrar la jerarquía en los resultados. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
