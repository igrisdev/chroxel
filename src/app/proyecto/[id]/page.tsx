"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS_DATA_ALL } from "@/lib/data";
import Link from "next/link";

export default function ProjectPage() {
  const { id } = useParams();
  const container = useRef(null);

  const project = PROJECTS_DATA_ALL.find((p) => p.slug === id);

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

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
      <section className="max-w-7xl w-full mx-auto px-6 mb-12 md:mb-20 relative z-10">
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
        {/* Escalabilidad en texto para que no se rompa en móvil */}
        <h1 className="reveal font-display text-4xl md:text-6xl lg:text-8xl font-bold text-luxury-ink tracking-tighter mb-8 md:mb-12 leading-tight">
          {project.title}
        </h1>

        <div className="reveal aspect-video md:aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden border border-luxury-border shadow-2xl relative">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-center"
          />
        </div>
      </section>

      {/* Contenido Técnico */}
      {/* Grid de 12 columnas para mejor control de proporciones (8 y 4) */}
      <section className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-24 md:pb-32 relative z-10">
        {/* Columna Izquierda (Contenido Principal) */}
        <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-luxury-ink mb-6">
              El Desafío
            </h2>
            {/* text-balance evita viudas (palabras sueltas al final) en el párrafo */}
            <p className="text-luxury-slate text-lg md:text-xl leading-relaxed font-light text-balance">
              {project.longDescription}
            </p>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="p-5 md:p-6 border border-luxury-border rounded-xl md:rounded-2xl bg-white shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
              >
                {/* shrink-0 evita que el punto decorativo se aplaste si el texto es muy largo */}
                <div className="w-2 h-2 rounded-full bg-luxury-accent mt-2 shrink-0"></div>
                <span className="font-medium text-luxury-ink text-sm md:text-base leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Testimonio */}
          <div className="reveal bg-luxury-ink p-8 md:p-14 rounded-2xl md:rounded-[3rem] text-white relative overflow-hidden shadow-xl mt-4">
            {/* pointer-events-none para que el blur no bloquee clics accidentales */}
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
        </div>

        {/* Sidebar Ficha Técnica */}
        {/* self-start es CRUCIAL aquí para que no se estire a lo largo del grid y el sticky funcione */}
        <aside className="lg:col-span-4 self-start w-full">
          {/* lg:sticky asegura que solo flote en escritorio. En móvil se apila normalmente abajo. */}
          <div className="reveal lg:sticky top-32 bg-white border border-luxury-border p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-luxury-ink border-b border-luxury-border pb-4 mb-6 text-sm md:text-base tracking-widest">
              FICHA TÉCNICA
            </h3>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-1.5">
                  Cliente
                </p>
                <p className="text-luxury-ink font-bold text-sm md:text-base">
                  {project.client}
                </p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-1.5">
                  Año
                </p>
                <p className="text-luxury-ink font-bold text-sm md:text-base">
                  {project.year}
                </p>
              </div>
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
              <div className="pt-4 mt-2 border-t border-luxury-border/50">
                <p className="text-[10px] md:text-xs text-luxury-slate font-bold uppercase tracking-widest mb-2">
                  Impacto
                </p>
                <p className="text-3xl md:text-4xl font-bold text-luxury-accent tracking-tighter">
                  {project.stat}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
