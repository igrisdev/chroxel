/**
 * Skeletons reutilizables.
 *
 * Son componentes de servidor puros (sin estado ni JS en el cliente): se usan
 * como `fallback` de un `<Suspense>`, así el navegador pinta la estructura de
 * inmediato mientras el contenido real llega en streaming.
 *
 * Regla de oro: cada skeleton debe ocupar aproximadamente el mismo espacio que
 * el contenido que reemplaza, para que al aparecer no se mueva el layout (CLS).
 */

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

/** Envoltorio accesible: anuncia la carga sin leer cada bloque. */
export function SkeletonRegion({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando contenido…</span>
      {children}
    </div>
  );
}

/** Tarjeta de proyecto: imagen 16/10 + título + cliente + tags. */
export function ProjectCardSkeleton() {
  return (
    <div className="bg-luxury-card border border-luxury-line rounded-[18px] overflow-hidden">
      <Skeleton className="aspect-[16/10] !rounded-none" />
      <div className="p-[22px]">
        <Skeleton className="h-[19px] w-3/5" />
        <Skeleton className="h-[13px] w-2/5 mt-2.5" />
        <div className="flex gap-1.5 flex-wrap mt-3.5">
          <Skeleton className="h-[29px] w-[86px] !rounded-lg" />
          <Skeleton className="h-[29px] w-[72px] !rounded-lg" />
          <Skeleton className="h-[29px] w-[64px] !rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Rejilla de tarjetas. `count` y `columns` la adaptan a cada página. */
export function ProjectsGridSkeleton({
  count = 3,
  columns = 3,
}: {
  count?: number;
  columns?: 2 | 3;
}) {
  const cols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${cols} gap-5`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Proyecto destacado de la home: imagen grande + ficha al lado. */
export function FeaturedProjectSkeleton() {
  return (
    <div className="bg-luxury-bg border border-luxury-line rounded-[18px] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <Skeleton className="min-h-[340px] !rounded-none" />
        <div className="p-9 flex flex-col justify-center">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-3" />
          <div className="flex gap-1.5 flex-wrap mt-6">
            <Skeleton className="h-[29px] w-[92px] !rounded-lg" />
            <Skeleton className="h-[29px] w-[78px] !rounded-lg" />
            <Skeleton className="h-[29px] w-[86px] !rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bloque completo de proyectos de la home (destacado + 3 tarjetas). */
export function ProjectsShowcaseSkeleton() {
  return (
    <SkeletonRegion>
      <div className="mt-[52px]">
        <FeaturedProjectSkeleton />
      </div>
      <div className="mt-5">
        <ProjectsGridSkeleton count={3} columns={3} />
      </div>
    </SkeletonRegion>
  );
}

/** Página de detalle de proyecto. */
export function ProjectDetailSkeleton() {
  return (
    <SkeletonRegion>
      <div className="bg-luxury-bg min-h-screen pt-[110px]">
        <section className="max-w-[1180px] mx-auto px-6 md:px-12">
          <Skeleton className="h-3 w-40" />
          <div className="flex items-center gap-4 md:gap-5 mt-8">
            <Skeleton className="shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] !rounded-2xl" />
            <Skeleton className="h-12 md:h-16 w-2/3 max-w-md" />
          </div>
          <Skeleton className="h-5 w-full max-w-xl mt-6" />
          <Skeleton className="h-5 w-2/3 max-w-md mt-2.5" />
          <Skeleton className="h-[50px] w-[190px] mt-8 !rounded-[11px]" />
        </section>

        <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-10">
          <Skeleton className="aspect-[16/9] w-full !rounded-[18px]" />
        </section>

        <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-14 md:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-luxury-line border border-luxury-line rounded-[18px] overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-luxury-card p-6">
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="h-4 w-20 mt-3" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </SkeletonRegion>
  );
}
