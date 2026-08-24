import { ProjectDetailSkeleton } from "@/components/ui/Skeleton";

// Se muestra mientras se resuelve un proyecto que aún no está pre-generado
// (o mientras se revalida su caché).
export default function Loading() {
  return <ProjectDetailSkeleton />;
}
