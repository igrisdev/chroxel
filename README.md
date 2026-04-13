# Chroxel

Aplicación web construida con Next.js 16 y TypeScript, diseñada como una landing page moderna que usa componentes reutilizables y animaciones con GSAP.

## Descripción del proyecto

- Framework: `Next.js 16` con el enrutador `app/`.
- Lenguajes: `TypeScript`, `JavaScript` y `CSS`.
- Estilos: `Tailwind CSS` y `PostCSS`.
- Animaciones: `gsap` y `@gsap/react` para efectos visuales en secciones de la página.

## Estructura principal

- `app/` — ruta de la aplicación de Next.js, incluyendo el layout global y la página principal.
  - `app/page.tsx` — página de inicio.
  - `app/layout.tsx` — plantilla global de layout.
  - `app/globals.css` — estilos globales.
- `src/components/` — componentes UI compartidos.
  - `layout/` — navegación y footer.
  - `sections/` — secciones de contenido como `Hero`, `Process`, `Projects` y `Services`.
  - `ui/` — componentes reutilizables de interfaz.
- `lib/utils.ts` — utilidades y helpers.

## Cómo ejecutar el proyecto

1. Instala dependencias:

```bash
pnpm install
```

2. Ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

3. Abre el navegador en:

```text
http://localhost:3000
```

## Scripts disponibles

- `pnpm dev` — inicia el servidor de desarrollo.
- `pnpm build` — genera la versión de producción.
- `pnpm start` — ejecuta la aplicación en modo producción tras compilarla.
- `pnpm lint` — ejecuta ESLint para revisar la calidad del código.

## Consideraciones de desarrollo

- La aplicación usa el enrutador `app` de Next.js, por lo que los componentes de página y el layout principal se gestionan desde `app/`.
- Los estilos globales se definen en `app/globals.css` y pueden extenderse agregando clases de Tailwind en los componentes.
- La navegación y las secciones de contenido están desacopladas en componentes separados para facilitar la mantenibilidad.

## Siguientes pasos

- Añadir tests si se desea cubrir componentes y lógica.
- Extender la página con nuevas secciones o páginas adicionales.
- Configurar despliegue en Vercel, Netlify o cualquier plataforma compatible con Next.js.
