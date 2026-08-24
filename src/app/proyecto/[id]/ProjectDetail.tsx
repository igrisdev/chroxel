"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { IProjectDetail } from "@/lib/data";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";
import ContactModal from "@/components/contact/ContactModal";

/** Deriva una etiqueta legible del framework a partir de su URL. */
function frameworkLabel(project: IProjectDetail): string | null {
  if (project.framework_icon) return project.framework_icon;
  if (!project.framework_url) return null;
  try {
    return new URL(project.framework_url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Parte interactiva del detalle (animaciones, cursor personalizado y modal de
 * contacto). El proyecto ya viene resuelto desde el servidor, de modo que el
 * HTML que recibe Google incluye todo el contenido.
 */
export default function ProjectDetail({
  project,
}: {
  project: IProjectDetail;
}) {
  const container = useRef<HTMLDivElement>(null);
  const imageLinkRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useGSAP(
    () => {
      if (!project) return;

      revealOnScroll(".reveal", { y: 26, duration: 0.9, stagger: 0.1 });
      refreshTriggersWhenReady(container.current);

      const mm = gsap.matchMedia();
      const imageLink = imageLinkRef.current;
      const cursor = cursorRef.current;

      if (imageLink && cursor) {
        mm.add("(min-width: 1024px)", () => {
          gsap.set(cursor, { xPercent: -50, yPercent: -50 });
          const xTo = gsap.quickTo(cursor, "x", {
            duration: 0.2,
            ease: "power3",
          });
          const yTo = gsap.quickTo(cursor, "y", {
            duration: 0.2,
            ease: "power3",
          });

          const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
          };
          const onMouseEnter = () =>
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
          const onMouseLeave = () =>
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });

          imageLink.addEventListener("mousemove", onMouseMove);
          imageLink.addEventListener("mouseenter", onMouseEnter);
          imageLink.addEventListener("mouseleave", onMouseLeave);

          return () => {
            imageLink.removeEventListener("mousemove", onMouseMove);
            imageLink.removeEventListener("mouseenter", onMouseEnter);
            imageLink.removeEventListener("mouseleave", onMouseLeave);
          };
        });
      }
    },
    { scope: container, dependencies: [project] },
  );

  const framework = frameworkLabel(project);
  const displayUrl = project.url_web
    ? project.url_web.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  // Sólo mostramos las celdas con dato real: así la ficha se ve compacta y
  // deliberada aunque el proyecto tenga pocos campos llenos en Notion.
  const meta = [
    project.client && { label: "CLIENTE", value: project.client },
    project.year && {
      label: "AÑO",
      value: project.end_date
        ? `${project.year} — ${project.end_date.split("-")[0]}`
        : project.year,
    },
    project.status && { label: "ESTADO", value: project.status },
    framework && { label: "FRAMEWORK", value: framework },
    project.tech.length > 0 && {
      label: "TECNOLOGÍAS",
      value: String(project.tech.length),
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div ref={container} className="bg-luxury-bg min-h-screen pt-[110px]">
      {/* ENCABEZADO */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-12">
        <Link
          href="/proyectos"
          className="group font-mono text-xs tracking-[0.06em] text-luxury-accent-2 inline-flex items-center gap-1.5 hover:text-luxury-ink transition-colors"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          TODOS LOS PROYECTOS
        </Link>

        <div className="mt-8">
          <div>
            <div className="reveal flex items-center gap-4 md:gap-5 mt-4">
              {project.logo_url && (
                <span className="shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl bg-luxury-card border border-luxury-line flex items-center justify-center p-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.logo_url}
                    alt={`Logo de ${project.client || project.title}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </span>
              )}
              <h1 className="font-display text-4xl md:text-6xl font-bold text-luxury-ink tracking-[-0.035em] leading-[1.04]">
                {project.title}
              </h1>
            </div>
            {project.longDescription && (
              <p className="reveal text-luxury-slate text-lg md:text-xl font-light leading-relaxed max-w-xl mt-5">
                {project.longDescription}
              </p>
            )}

            <div className="reveal flex flex-wrap gap-3 mt-8">
              {project.url_web && (
                <a
                  href={project.url_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[50px] px-6 rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold text-[15px] hover:bg-luxury-accent-2 hover:-translate-y-0.5 transition-all"
                >
                  Visitar sitio
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M7 17L17 7M9 7h8v8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[50px] px-6 rounded-[11px] border border-luxury-line text-luxury-ink font-display font-semibold text-[15px] hover:border-luxury-accent transition-all"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                  </svg>
                  Repositorio
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOT EN MARCO DE NAVEGADOR */}
      {project.img && (
        <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-10 ">
          <div className="reveal bg-luxury-card border border-luxury-line rounded-[18px] overflow-hidden shadow-[0_30px_60px_-40px_rgba(19,26,36,0.35)]">
            {/* Barra del navegador con la URL real */}
            <div className="flex items-center gap-2 px-4 py-3.5 border-b border-luxury-line bg-luxury-bg">
              <span className="w-[11px] h-[11px] rounded-full bg-[#E4B7B2]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#EBD6A3]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#BFD8B8]" />
              {displayUrl && (
                <span className="ml-3 font-mono text-[11.5px] text-luxury-muted truncate">
                  {displayUrl}
                </span>
              )}
            </div>

            <a
              ref={imageLinkRef}
              href={project.url_web || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden lg:cursor-none"
            >
              <div className="absolute inset-0 bg-luxury-ink/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img}
                alt={`Sitio web de ${project.title} desarrollado por Chroxel`}
                className="w-full object-cover transition-transform duration-700 lg:group-hover:scale-[1.03]"
              />
            </a>
          </div>
        </section>
      )}

      {/* FICHA TÉCNICA + STACK */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-14 md:mt-20">
        {meta.length > 0 && (
          <div className="reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-luxury-line border border-luxury-line rounded-[18px] overflow-hidden">
            {meta.map((m) => (
              <div key={m.label} className="bg-luxury-card p-6">
                <p className="font-mono text-[10.5px] text-luxury-muted tracking-[0.06em]">
                  {m.label}
                </p>
                <p className="font-display font-semibold text-luxury-ink mt-2 leading-snug">
                  {m.label === "FRAMEWORK" && project.framework_url ? (
                    <a
                      href={project.framework_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-luxury-accent-2 transition-colors"
                    >
                      {m.value}
                    </a>
                  ) : (
                    m.value
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {project.tech.length > 0 && (
          <div className="reveal mt-10">
            <span className="block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
              {"// Stack utilizado"}
            </span>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="tech-tag !h-9 !px-4 !text-[12.5px] !text-luxury-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CARACTERÍSTICAS (si existen) */}
      {project.features.length > 0 && (
        <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <span className="reveal block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
            {"// Características"}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="reveal bg-luxury-card border border-luxury-line rounded-[14px] p-6 flex items-start gap-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-accent mt-2.5 shrink-0" />
                <span className="text-luxury-ink text-[15px] leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIO (si existe) */}
      {project.testimonial.quote && (
        <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <div className="reveal bg-luxury-card border border-luxury-line rounded-[18px] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-luxury-accent/10 blur-[70px] pointer-events-none" />
            <p className="relative font-display text-xl md:text-3xl font-medium leading-snug text-luxury-ink text-balance">
              {`“${project.testimonial.quote}”`}
            </p>
            {project.testimonial.author && (
              <div className="relative mt-8">
                <p className="font-mono text-xs tracking-[0.08em] text-luxury-accent-2">
                  {project.testimonial.author}
                </p>
                {project.testimonial.role && (
                  <p className="text-luxury-muted text-sm mt-1">
                    {project.testimonial.role}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* IMPACTO (si existe) */}
      {project.stat && (
        <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <div className="reveal bg-luxury-accent text-[#181206] rounded-[18px] px-10 py-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
            <span className="font-display text-5xl md:text-6xl font-bold tracking-[-0.03em]">
              {project.stat}
            </span>
            <span className="font-mono text-xs tracking-[0.08em] opacity-70">
              IMPACTO DEL PROYECTO
            </span>
          </div>
        </section>
      )}

      {/* CIERRE */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-12 mt-20 md:mt-28 pb-24 md:pb-32">
        <div className="reveal border-t border-luxury-border pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <p className="font-display text-xl font-semibold text-luxury-ink">
            ¿Quieres algo así para tu negocio?
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center h-[50px] px-6 rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold text-[15px] hover:bg-luxury-accent-2 transition-all"
            >
              Hablemos
            </button>
            <Link
              href="/proyectos"
              className="inline-flex items-center h-[50px] px-6 rounded-[11px] border border-luxury-line text-luxury-ink font-display font-semibold text-[15px] hover:border-luxury-accent transition-all"
            >
              Ver más proyectos
            </Link>
          </div>
        </div>
      </section>

      {/* CURSOR PERSONALIZADO */}
      <div
        ref={cursorRef}
        className="hidden lg:flex fixed top-0 left-0 w-32 h-32 bg-luxury-accent rounded-full z-[100] pointer-events-none items-center justify-center text-center scale-0 opacity-0"
      >
        <span className="font-display font-bold text-xs tracking-wider text-[#151107]">
          VISITAR WEB
        </span>
      </div>

      {/* MODAL DE CONTACTO */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={`Hablemos sobre tu proyecto`}
        description="Cuéntanos qué necesitas construir. Respondemos en menos de 24 horas."
      />
    </div>
  );
}
