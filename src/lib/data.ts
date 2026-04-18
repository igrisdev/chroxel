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
    stat: "+10% Ventas Mensuales",
    tech: ["Next.js", "Shopify", "Framer Motion", "Tailwind CSS", "Vercel"],
    longDescription:
      "Elevamos la presencia digital de MacShop con una tienda en línea diseñada a la medida, inspirada en la elegancia y simplicidad del ecosistema Apple. Nos enfocamos en crear un sitio extremadamente rápido y fácil de navegar que se sincroniza de forma invisible con su sistema de inventario actual. El resultado es un proceso de compra tan fluido e intuitivo que atrapa al cliente desde el primer clic hasta el pago final, impulsando las ventas de forma natural.",
    features: [
      "Pasarela de Pagos",
      "Carrito de Compras",
      "Sincronización de inventario en tiempo real con Shopify",
      "Experiencia de usuario premium",
      "Estabilidad Asegurada",
      "Adaptable a cualquier dispositivo",
      "Búsqueda de productos Avanzada",
      "Ordenado por Categorías y SubCategorías",
    ],
    testimonial: {
      quote:
        "El salto de calidad respecto a nuestra web anterior es abismal. La nueva plataforma transmite perfectamente el valor premium de nuestros productos, y la extrema fluidez del sitio se ha reflejado directamente en nuestras ventas mensuales.",
      author: "CEO de MacShop",
      role: "Dirección General",
    },
  },
  {
    id: "proj-2",
    slug: "equimas",
    category: "eCommerce",
    title: "EQUIMAS",
    img: "https://res.cloudinary.com/dbwupri3k/image/upload/v1776395543/chroxel/51e609ee-63f7-4afd-b2c5-5a4193ff6e68.png",
    zIndex: "z-[20]",
    client: "EQUIMAS",
    url_web: "https://equimas.com.co/",
    year: "2026",
    stat: "-30% Tasa de Abandono",
    tech: ["Next.js", "Shopify", "Framer Motion", "Tailwind CSS", "Vercel"],
    longDescription:
      "Desarrollamos una tienda en línea robusta y atractiva para EQUIMAS, diseñada específicamente para transmitir la alta calidad y resistencia de sus barriles ahumadores y equipos industriales. Creamos una plataforma visualmente impactante que facilita la exploración del catálogo y simplifica el proceso de compra de principio a fin. Además, dotamos a la empresa con un sistema de administración a la medida que les permite gestionar sus pedidos e inventario de forma impecable, lo que se ha traducido en una mejor atención y un aumento directo en sus ventas.",
    features: [
      "Pasarela de Pagos",
      "Carrito de Compras",
      "Sincronización de inventario en tiempo real con Shopify",
      "Experiencia de usuario premium",
      "Estabilidad Asegurada",
      "Adaptable a cualquier dispositivo",
      "Búsqueda de productos Avanzada",
      "Ordenado por Categorías y SubCategorías",
    ],
    testimonial: {
      quote:
        "La nueva página web captura a la perfección la esencia y calidad de nuestros equipos. No solo nos entregaron un diseño espectacular que a nuestros clientes les encanta usar, sino que el sistema detrás de la tienda nos facilitó la operación diaria. Desde el lanzamiento, el impacto positivo en nuestras ventas ha sido innegable.",
      author: "Gerencia",
      role: "EQUIMAS",
    },
  },
  {
    id: "proj-3",
    slug: "jake-tienda-electronica",
    category: "eCommerce",
    title: "Jake Tienda Electrónica",
    img: "https://res.cloudinary.com/dbwupri3k/image/upload/v1776395549/chroxel/29686ae5-7f97-447f-b05f-6fc11166c54d.png",
    zIndex: "z-[20]",
    client: "Jake Tienda Electrónica",
    url_web: "https://www.jaketiendaelectronica.com/",
    year: "2025",
    stat: "+85% Retención de Usuarios",
    tech: ["Next.js", "Shopify", "Framer Motion", "Tailwind CSS", "Vercel"],
    longDescription:
      "Rediseñamos por completo la plataforma de Jake Tienda Electrónica para crear un espacio digital vibrante, especializado en equipos de audio profesional y tecnología para eventos. Nos enfocamos en construir una tienda de alta conversión que no solo destaca la calidad visual de los equipos, sino que facilita al máximo la compra integrando opciones de financiamiento y logística de envíos a toda Colombia. Gracias a un proceso de pago ultra rápido y un diseño pensado para vender, la página logró maximizar el retorno de las campañas publicitarias durante la exigente temporada navideña.",
    features: [
      "Pasarela de Pagos",
      "Carrito de Compras",
      "Sincronización de inventario en tiempo real con Shopify",
      "Experiencia de usuario premium",
      "Estabilidad Asegurada",
      "Adaptable a cualquier dispositivo",
      "Búsqueda de productos Avanzada",
      "Ordenado por Categorías y SubCategorías",
    ],
    testimonial: {
      quote:
        "La transformación de la página fue un éxito total. El diseño hace que nuestros equipos de audio luzcan increíbles y facilitó muchísimo la compra para los clientes, especialmente con las opciones de financiamiento. Gracias a esta nueva plataforma, logramos capitalizar al máximo la publicidad navideña, alcanzando 25 millones en ventas en tan solo tres meses. Superó absolutamente todas mis expectativas.",
      author: "Jake",
      role: "Fundador de Jake Tienda Electrónica",
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
    year: "2025",
    stat: "Sin Datos Estadísticos",
    tech: ["Next.js", "Shopify", "Framer Motion", "Tailwind CSS", "Vercel"],
    longDescription:
      "Diseñamos una experiencia de comercio electrónico exclusiva y vibrante, dedicada 100% al ecosistema de productos de audio JBL para el mercado de Popayán. Inspirados en la energía de la marca, creamos un entorno digital inmersivo con animaciones fluidas que capturan la atención desde el primer instante. Nuestro enfoque fue construir un escaparate moderno que no solo resaltara la potencia y calidad de los equipos, sino que también ofreciera a los usuarios locales un proceso de compra rápido, directo y perfectamente optimizado para teléfonos móviles.",
    features: [
      "Pasarela de Pagos",
      "Carrito de Compras",
      "Sincronización de inventario en tiempo real con Shopify",
      "Experiencia de usuario premium",
      "Estabilidad Asegurada",
      "Adaptable a cualquier dispositivo",
      "Búsqueda de productos Avanzada",
      "Ordenado por Categorías y SubCategorías",
    ],
    testimonial: {
      quote:
        "El resultado final capturó a la perfección la esencia que caracteriza a JBL. La plataforma nos otorgó una presencia oficial sumamente profesional, moderna y atractiva en la ciudad. Nos encantó cómo el diseño facilita a nuestros clientes descubrir y enamorarse de nuestros equipos de audio con total fluidez.",
      author: "Fundador",
      role: "JBL Popayán",
    },
  },
];
