import { ProjectsGridSkeleton, SkeletonRegion } from "@/components/ui/Skeleton";

// La cabecera es estática, así que se pinta al instante y sólo la rejilla
// necesita marcador de posición.
export default function Loading() {
  return (
    <div className="bg-luxury-bg min-h-screen pt-[110px] pb-32">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-luxury-ink tracking-[-0.03em] mb-4 leading-tight">
          Todos los <span className="text-luxury-accent-2">proyectos</span>
        </h1>
        <p className="text-luxury-slate text-lg md:text-xl max-w-2xl mb-16 font-light leading-relaxed">
          Plataformas web, sistemas empresariales y tiendas online que hemos
          construido para nuestros clientes en Colombia.
        </p>
        <SkeletonRegion>
          <ProjectsGridSkeleton count={6} />
        </SkeletonRegion>
      </div>
    </div>
  );
}
