"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";

const SERVICES_DATA = [
  {
    title: "Desarrollo Web",
    desc: "Aplicaciones y sitios a medida con arquitecturas modernas, enfocadas en rendimiento y mantenibilidad.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
        <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Diseño UI/UX",
    desc: "Interfaces claras y sistemas de diseño consistentes que guían al usuario y transmiten solidez.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
        <path d="M12 19l7-7-4-4-7 7v4h4zM14 6l4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Sistemas Web",
    desc: "Plataformas internas, paneles y automatizaciones que ordenan procesos críticos con datos en tiempo real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // `root` evita que el selector alcance elementos de otras secciones.
      const root = container.current;
      revealOnScroll(".reveal-head", { y: 26, duration: 0.9, root });
      revealOnScroll(".service-card", { root });
      refreshTriggersWhenReady(container.current);
    },
    { scope: container },
  );

  return (
    <section id="services" ref={container} className="py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <span className="reveal-head block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
          {"// Lo que construimos"}
        </span>
        <h2 className="reveal-head font-display text-4xl md:text-[46px] font-bold tracking-[-0.025em] leading-[1.06] mt-3.5 max-w-2xl">
          De la idea al <span className="text-luxury-accent-2">deploy</span>, sin
          costuras.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[52px]">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.title}
              className="service-card bg-luxury-card border border-luxury-line rounded-[18px] p-[34px] hover:border-luxury-accent/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-[46px] h-[46px] rounded-xl bg-luxury-accent/12 flex items-center justify-center text-luxury-accent-2 p-3">
                {service.icon}
              </div>
              <h3 className="font-display text-[22px] font-semibold mt-6 mb-2.5">
                {service.title}
              </h3>
              <p className="text-luxury-slate text-[15px] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
