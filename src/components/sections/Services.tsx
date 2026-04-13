"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    title: "Desarrollo Web",
    desc: "Arquitecturas a medida enfocadas en el rendimiento extremo y la exclusividad visual.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        ></path>
      </svg>
    ),
  },
  {
    title: "Diseño UI/UX",
    desc: "Experiencias inmersivas que respiran elegancia y guían intuitivamente al usuario.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.813-3.814a1.151 1.151 0 00-1.627-1.628l-3.814 3.813a15.995 15.995 0 00-4.648 4.764m3.42 3.42a15.993 15.993 0 01-3.42-3.42"
        ></path>
      </svg>
    ),
  },
  {
    title: "Sistemas Web",
    desc: "Soluciones robustas para automatizar procesos críticos con una interfaz impecable.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        ></path>
      </svg>
    ),
  },
];

export default function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%", // Se activa un poco antes para asegurar que se vea la animación
          toggleActions: "play none none reverse",
        },
        y: 100, // Desplazamiento desde abajo
        opacity: 0, // Empieza invisible
        duration: 0.25, // Duración de cada tarjeta
        stagger: 0.1, // Retraso entre tarjetas (0.3s)
        ease: "power3.out",
        clearProps: "all", // Limpia los estilos al terminar para evitar problemas de hover
      });
    },
    { scope: container },
  );

  return (
    <section
      id="services"
      ref={container}
      className="py-32 bg-luxury-card border-t border-luxury-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-luxury-ink text-center mb-24 uppercase tracking-tighter">
          Servicios <span className="text-luxury-accent">Premium</span>
        </h2>

        {/* Asegúrate de que el grid tenga visibilidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={idx}
              className="service-card p-12 border border-luxury-border rounded-3xl bg-luxury-bg hover:border-luxury-accent transition-all group shadow-sm hover:shadow-xl flex flex-col items-start"
            >
              <div className="w-12 h-12 text-luxury-accent mb-10 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-luxury-ink mb-6">
                {service.title}
              </h3>
              <p className="text-luxury-slate leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
