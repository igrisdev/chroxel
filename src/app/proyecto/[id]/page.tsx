"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IProjectDetail } from "@/lib/data";
import Link from "next/link";

export default function ProjectPage() {
  const { id } = useParams();
  const container = useRef<HTMLDivElement>(null);
  const imageLinkRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<IProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  useGSAP(
    () => {
      if (!project) return;

      gsap.from(".reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

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

          const onMouseEnter = () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
          };

          const onMouseLeave = () => {
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
          };

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
    { scope: container, dependencies: [project] }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <div className="w-8 h-8 border-2 border-luxury-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg text-luxury-ink font-display text-2xl">
        Proyecto no encontrado
      </div>
    );

  return (
    <div
      ref={container}
      className="bg-luxury-bg min-h-screen flex flex-col relative overflow-x-hidden pt-20"
    >
      {/* Header del Proyecto */}
      <section className="max-w-7xl w-full mx-auto px-4 mb-12 md:mb-20 relative z-10">
        <Link
          href={"/"}
          className="group text-luxury-accent font-display font-bold tracking-widest text-xs mb-8 flex items-center gap-2 hover:text-luxury-ink transition-colors w-fit"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          VOLVER
        </Link>
        <p className="reveal text-luxury-accent font-display font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
          {project.category}
        </p>
        <h1 className="reveal font-display text-4xl md:text-6xl lg:text-8xl font-bold text-luxury-ink tracking-tighter mb-8 md:mb-12 leading-tight">
          {project.title}
        </h1>

        <div className="reveal aspect-video w-full rounded-2xl md:rounded-3xl border border-luxury-border shadow-sm relative">
          <Link
            ref={imageLinkRef}
            href={project.url_web}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full h-full relative overflow-hidden rounded-2xl md:rounded-3xl lg:cursor-none"
          >
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      {/* Contenido Técnico */}
      <section className="max-w-7xl w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-24 md:pb-32 relative z-10">
        <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
          {/* Descripción */}
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-luxury-ink mb-6">
              Descripción
            </h2>
            <p className="text-luxury-slate text-lg md:text-xl leading-relaxed font-light text-balance">
              {project.longDescription}
            </p>
          </div>

          {/* Características */}
          {project.features.length > 0 && (
            <div className="reveal">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-luxury-ink mb-6">
                Características
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-5 md:p-6 border border-luxury-border rounded-xl md:rounded-2xl bg-white shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
                  >
                    <div className="w-2 h-2 rounded-full bg-luxury-accent mt-2 shrink-0"></div>
                    <span className="font-medium text-luxury-ink text-sm md:text-base leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonio */}
          {project.testimonial.quote && (
            <div className="reveal bg-luxury-ink p-8 md:p-14 rounded-2xl md:rounded-[3rem] text-white relative overflow-hidden shadow-xl mt-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-accent/20 rounded-full blur-[80px] pointer-events-none"></div>
              <p className="text-xl md:text-3xl font-light italic mb-8 relative z-10 leading-relaxed text-balance">
                {`"${project.testimonial.quote}"`}
              </p>
              <div className="relative z-10">
                <p className="font-bold text-luxury-accent uppercase tracking-widest text-sm mb-1">
                  {project.testimonial.author}
                </p>
                <p className="text-white/60 text-xs md:text-sm font-medium">
                  {project.testimonial.role}
                </p>
              </div>
            </div>
          )}

          {/* Detalles del Proyecto */}
          {(project.status || project.end_date) && (
            <div className="reveal">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-luxury-ink mb-6">
                Detalles del Proyecto
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {project.status && (
                  <div className="p-5 md:p-6 border border-luxury-border rounded-xl md:rounded-2xl bg-white shadow-sm">
                    <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                      Estado
                    </p>
                    <p className="text-luxury-ink font-bold text-sm md:text-base">
                      {project.status}
                    </p>
                  </div>
                )}
                {project.year && (
                  <div className="p-5 md:p-6 border border-luxury-border rounded-xl md:rounded-2xl bg-white shadow-sm">
                    <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                      Fecha Inicio
                    </p>
                    <p className="text-luxury-ink font-bold text-sm md:text-base">
                      {project.year}
                    </p>
                  </div>
                )}
                {project.end_date && (
                  <div className="p-5 md:p-6 border border-luxury-border rounded-xl md:rounded-2xl bg-white shadow-sm">
                    <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                      Fecha Fin
                    </p>
                    <p className="text-luxury-ink font-bold text-sm md:text-base">
                      {project.end_date.split("-")[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 self-start w-full">
          <div className="reveal lg:sticky top-32 bg-white border border-luxury-border p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-luxury-ink border-b border-luxury-border pb-4 mb-6 text-sm md:text-base tracking-widest">
              FICHA TÉCNICA
            </h3>
            <div className="flex flex-col gap-6">
              {/* Logo Empresa */}
              {project.logo_url && (
                <div className="flex justify-center pb-4 border-b border-luxury-border/50">
                  <img
                    src={project.logo_url}
                    alt={`${project.title} logo`}
                    className="max-h-16 max-w-[160px] object-contain"
                  />
                </div>
              )}

              {project.client && (
                <div>
                  <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-1.5">
                    Cliente
                  </p>
                  <p className="text-luxury-ink font-bold text-sm md:text-base">
                    {project.client}
                  </p>
                </div>
              )}

              {project.year && (
                <div>
                  <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-1.5">
                    Año
                  </p>
                  <p className="text-luxury-ink font-bold text-sm md:text-base">
                    {project.year}
                    {project.end_date && ` — ${project.end_date.split("-")[0]}`}
                  </p>
                </div>
              )}

              {/* Framework */}
              {project.framework_icon && (
                <div>
                  <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                    Framework
                  </p>
                  {project.framework_url ? (
                    <a
                      href={project.framework_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-luxury-bg border border-luxury-border rounded-full text-[10px] md:text-xs font-bold text-luxury-ink hover:border-luxury-accent transition-colors"
                    >
                      {project.framework_icon}
                      <span className="text-luxury-accent">↗</span>
                    </a>
                  ) : (
                    <span className="px-3 py-1.5 bg-luxury-bg border border-luxury-border rounded-full text-[10px] md:text-xs font-bold text-luxury-ink">
                      {project.framework_icon}
                    </span>
                  )}
                </div>
              )}

              {/* GitHub */}
              {project.github_url && (
                <div>
                  <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                    Repositorio
                  </p>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-luxury-bg border border-luxury-border rounded-full text-[10px] md:text-xs font-bold text-luxury-ink hover:border-luxury-accent transition-colors"
                  >
                    GitHub
                    <span className="text-luxury-accent">↗</span>
                  </a>
                </div>
              )}

              {/* Tecnologías */}
              <div>
                <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                  Tecnologías
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-luxury-bg border border-luxury-border rounded-full text-[10px] md:text-xs font-bold text-luxury-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impacto */}
              {project.stat && (
                <div className="pt-4 mt-2 border-t border-luxury-border/50">
                  <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                    Impacto
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-luxury-accent tracking-tighter">
                    {project.stat}
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>

      {/* CURSOR PERSONALIZADO */}
      <div
        ref={cursorRef}
        className="hidden lg:flex fixed top-0 left-0 w-32 h-32 bg-luxury-accent rounded-full z-[100] pointer-events-none items-center justify-center text-center scale-0 opacity-0"
      >
        <span className="font-display font-bold text-xs tracking-wider text-luxury-ink">
          VISITAR WEB
        </span>
      </div>
    </div>
  );
}
