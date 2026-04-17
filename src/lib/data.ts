interface IProject {
  id: string;
  slug: string;
  category: string;
  title: string;
  img: string;
  zIndex?: string;
  client: string;
  url_web: string;
  year: string;
  stat: string;
  tech: string[];
  longDescription: string;
  features: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const PROJECTS_DATA_ALL: IProject[] = [
  {
    id: "proj-1",
    slug: "macshop",
    category: "eCommerce",
    title: "MacShop",
    img: "https://res.cloudinary.com/dbwupri3k/image/upload/v1776395495/chroxel/66690216-99ae-408f-89e0-5eb8336e1071.png",
    zIndex: "z-[25]",
    client: "Empresa MacShop",
    url_web: "https://www.tiendamacshop.com/",
    year: "2026",
    stat: "+15% Ventas Mensuales",
    tech: ["Next.js", "Tailwind CSS", "Shopify API", "Framer Motion"],
    longDescription:
      "Desarrollo de una plataforma de comercio electrónico de alto rendimiento con un enfoque minimalista. Optimizamos el túnel de conversión y la velocidad de carga para garantizar una experiencia de compra fluida e intuitiva.",
    features: [
      "Carrito de Compras Dinámico",
      "Pasarela de Pagos Integrada",
      "Buscador con Filtros Avanzados",
    ],
    testimonial: {
      quote:
        "La nueva tienda en línea ha superado nuestras expectativas, no solo en diseño, sino en la velocidad con la que los clientes pueden finalizar sus compras.",
      author: "MacShop",
      role: "",
    },
  },
  {
    id: "proj-2",
    slug: "equimas",
    category: "eCommerce",
    title: "EQUIMAS",
    img: "https://res.cloudinary.com/dbwupri3k/image/upload/v1776395543/chroxel/51e609ee-63f7-4afd-b2c5-5a4193ff6e68.png",
    zIndex: "z-[20]",
    client: "EQUIMAS Corp",
    url_web: "https://equimas.com.co/",
    year: "2023",
    stat: "-30% Tasa de Abandono",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    longDescription:
      "Creación de una solución de eCommerce escalable adaptada a las necesidades específicas del catálogo de EQUIMAS. Se implementó un panel administrativo personalizado para la gestión ágil de inventario y pedidos.",
    features: [
      "Panel de Administración Custom",
      "Gestión de Inventario en Tiempo Real",
      "Integración Multi-sucursal",
    ],
    testimonial: {
      quote:
        "El control que ahora tenemos sobre nuestro inventario y la facilidad de uso para nuestros clientes ha marcado un antes y un después en EQUIMAS.",
      author: "[Nombre del Contacto]",
      role: "Director Operativo en EQUIMAS",
    },
  },
  {
    id: "proj-3",
    slug: "jake-tienda-electronica",
    category: "eCommerce",
    title: "Jake Tienda Electrónica",
    img: "https://res.cloudinary.com/dbwupri3k/image/upload/v1776395549/chroxel/29686ae5-7f97-447f-b05f-6fc11166c54d.png",
    zIndex: "z-[20]",
    client: "Jake Electronics",
    url_web: "https://www.jaketiendaelectronica.com/",
    year: "2024",
    stat: "+85% Retención de Usuarios",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    longDescription:
      "Rediseño completo de la tienda digital para destacar productos tecnológicos de alta demanda. Incorporamos galerías inmersivas y un proceso de checkout simplificado a un solo paso.",
    features: [
      "Checkout de Un Solo Paso",
      "Galería de Productos Interactiva",
      "Sistema de Reseñas de Usuarios",
    ],
    testimonial: {
      quote:
        "Nuestros clientes aman el nuevo diseño. Las ventas de nuestros productos estrella se dispararon gracias a la nueva presentación visual.",
      author: "[Nombre de Jake / Fundador]",
      role: "Fundador de Jake Tienda",
    },
  },
  {
    id: "proj-4",
    slug: "jbl-popayan",
    category: "eCommerce",
    title: "JBL Popayán",
    img: "https://res.cloudinary.com/dbwupri3k/image/upload/v1776395684/chroxel/a9f45e67-0f16-4936-b85c-bb9187b76f06.png",
    zIndex: "z-[10]",
    client: "Distribuidor Autorizado JBL",
    url_web: "https://jbl-popayan.netlify.app/",
    year: "2023",
    stat: "+200% Alcance Local",
    tech: ["Webflow", "GSAP", "Shopify Buy Button"],
    longDescription:
      "Desarrollo de una landing page transaccional enfocada en el mercado local de Popayán. El sitio combina animaciones atractivas que reflejan la energía de la marca con una experiencia de compra directa.",
    features: [
      "Diseño Orientado a Móviles (Mobile-First)",
      "Animaciones de Scroll Avanzadas",
      "Botón de Compra Rápida",
    ],
    testimonial: {
      quote:
        "Tener presencia oficial y profesional en la ciudad nos ha permitido conectar mucho mejor con el público audiófilo local.",
      author: "[Nombre del Distribuidor]",
      role: "Gerente de JBL Popayán",
    },
  },
];
