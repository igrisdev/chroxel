import { getNotionImageUrl, IMAGE_PROPERTIES, type ImageKind } from "@/lib/notion";

/**
 * Sirve las imágenes de Notion bajo una URL propia y estable.
 *
 * Los enlaces de Notion caducan en 1 hora, así que no pueden quedar escritos en
 * un HTML cacheado. Aquí resolvemos la firma vigente en cada petición y
 * devolvemos los bytes, de modo que el navegador y el CDN cachean por su cuenta
 * sin depender de la caducidad de Notion.
 */

// Un id de página de Notion es un UUID (con o sin guiones).
const PAGE_ID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; kind: string }> },
) {
  const { id, kind } = await params;

  if (!PAGE_ID.test(id) || !(kind in IMAGE_PROPERTIES)) {
    return new Response("Petición no válida", { status: 400 });
  }

  try {
    const url = await getNotionImageUrl(id, kind as ImageKind);
    if (!url) return new Response("Imagen no encontrada", { status: 404 });

    const upstream = await fetch(url, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return new Response("No se pudo obtener la imagen", { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/png",
        // Las imágenes de un proyecto casi nunca cambian: las cacheamos un día
        // y permitimos servir una copia antigua mientras se refresca.
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error(`Error sirviendo la imagen ${kind} de ${id}:`, error);
    return new Response("Error al servir la imagen", { status: 500 });
  }
}
