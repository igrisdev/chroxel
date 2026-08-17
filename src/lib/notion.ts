import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

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

async function queryDatabase(filter?: object, sorts?: object[]) {
  const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
  const payload = { filter, sorts };
  console.log("Notion query URL:", url);
  console.log("Notion query payload:", JSON.stringify(payload));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Notion API error body:", body);
    throw new Error(`Notion API error: ${res.status} - ${body}`);
  }
  return res.json() as Promise<{ results: PageObjectResponse[] }>;
}

function getPlainText(
  properties: PageObjectResponse["properties"],
  name: string
): string {
  const prop = properties[name];
  if (!prop || prop.type !== "rich_text") return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

function getTitle(
  properties: PageObjectResponse["properties"],
  name: string
): string {
  const prop = properties[name];
  if (!prop || prop.type !== "title") return "";
  return prop.title.map((t) => t.plain_text).join("");
}

function getSelect(
  properties: PageObjectResponse["properties"],
  name: string
): string {
  const prop = properties[name];
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name ?? "";
}

function getMultiSelect(
  properties: PageObjectResponse["properties"],
  name: string
): string[] {
  const prop = properties[name];
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((s) => s.name);
}

function getUrl(
  properties: PageObjectResponse["properties"],
  name: string
): string {
  const prop = properties[name];
  if (!prop || prop.type !== "url") return "";
  return prop.url ?? "";
}

function getDate(
  properties: PageObjectResponse["properties"],
  name: string
): string {
  const prop = properties[name];
  if (!prop || prop.type !== "date") return "";
  return prop.date?.start ?? "";
}

function getFiles(
  properties: PageObjectResponse["properties"],
  name: string
): string {
  const prop = properties[name];
  if (!prop || prop.type !== "files") return "";
  const file = prop.files[0];
  if (!file) return "";
  if (file.type === "external") return file.external.url;
  if (file.type === "file") return file.file.url;
  return "";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractYear(dateStr: string): string {
  if (!dateStr) return "";
  return dateStr.split("-")[0];
}

function mapPageToProject(page: PageObjectResponse): IProject {
  const { properties } = page;

  return {
    id: page.id,
    slug: generateSlug(getTitle(properties, "Titulo")),
    category: getSelect(properties, "Seleccionar"),
    title: getTitle(properties, "Titulo"),
    img: getFiles(properties, "Imagen Presentación"),
    client: getPlainText(properties, "Nombre Empresa"),
    url_web: getUrl(properties, "Pagina Web Empresa"),
    year: extractYear(getDate(properties, "Fecha Inicio")),
    tech: getMultiSelect(properties, "Tags"),
  };
}

function mapPageToProjectDetail(page: PageObjectResponse): IProjectDetail {
  const { properties } = page;
  const base = mapPageToProject(page);

  const featuresRaw = getPlainText(properties, "Características");
  const features = featuresRaw
    ? featuresRaw.split("\n").filter((f) => f.trim() !== "")
    : [];

  return {
    ...base,
    longDescription: getPlainText(properties, "Descripción"),
    stat: getPlainText(properties, "Impacto"),
    features,
    testimonial: {
      quote: getPlainText(properties, "Testimonio"),
      author: getPlainText(properties, "Autor Testimonio"),
      role: getPlainText(properties, "Cargo Testimonio"),
    },
    github_url: getUrl(properties, "Link GitHub") || undefined,
    logo_url: getFiles(properties, "Logo Empresa") || undefined,
    framework_icon:
      getSelect(properties, "Icono Framework Principal") || undefined,
    framework_url: getUrl(properties, "Link Pagina Framework") || undefined,
    status: getSelect(properties, "Estado") || undefined,
    end_date: getDate(properties, "Fecha Fin") || undefined,
  };
}

export async function getAllProjects(): Promise<IProject[]> {
  const { results } = await queryDatabase(
    { property: "Estado", status: { equals: "Listo" } },
    [{ property: "Fecha Inicio", direction: "descending" }]
  );

  return results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map(mapPageToProject);
}

export async function getProjectBySlug(
  slug: string
): Promise<IProjectDetail | null> {
  const { results } = await queryDatabase({
    property: "Estado",
    status: { equals: "Listo" },
  });

  const page = results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .find((p) => {
      const title = getTitle(p.properties, "Titulo");
      return generateSlug(title) === slug;
    });

  if (!page) return null;

  return mapPageToProjectDetail(page);
}
