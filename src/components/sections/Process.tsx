"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Descubrimiento",
    desc: "Entendemos negocio, usuarios y requisitos técnicos antes de escribir una línea de código.",
  },
  {
    num: "02",
    title: "Diseño",
    desc: "Arquitectura de información, prototipos y un sistema de diseño listo para escalar.",
  },
  {
    num: "03",
    title: "Ingeniería",
    desc: "Código limpio y probado, con integración continua y revisiones en cada iteración.",
  },
  {
    num: "04",
    title: "Lanzamiento",
    desc: "Despliegue estratégico, monitoreo y mejora continua tras salir a producción.",
  },
];

export default function Process() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealOnScroll(".reveal-head", { y: 26, duration: 0.9 });
      revealOnScroll(".step-row", { y: 30, stagger: 0.1 });

      // Línea del timeline dibujándose con el scroll
      gsap.to(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 75%",
          end: "bottom 75%",
          scrub: true,
        },
        scaleY: 1,
        ease: "none",
      });

      refreshTriggersWhenReady(container.current);
    },
    { scope: container },
  );

  return (
    <section id="process-wrapper" ref={container} className="py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <span className="reveal-head block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
          {"// Cómo trabajamos"}
        </span>
        <h2 className="reveal-head font-display text-4xl md:text-[46px] font-bold tracking-[-0.025em] leading-[1.06] mt-3.5">
          Un método, cuatro fases.
        </h2>

        <div className="timeline relative mt-[52px] border-t border-luxury-border">
          {/* Línea vertical animada */}
          <div className="absolute left-[59px] top-0 bottom-0 w-px hidden md:block bg-luxury-border">
            <div className="timeline-line absolute inset-0 bg-luxury-accent origin-top scale-y-0" />
          </div>

          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="step-row grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 md:gap-8 py-[30px] border-b border-luxury-border md:items-baseline"
            >
              <span className="font-display text-luxury-accent-2 text-[15px] font-semibold relative z-10">
                {step.num}
              </span>
              <h3 className="font-display text-2xl font-semibold">
                {step.title}
              </h3>
              <p className="text-luxury-slate text-[15px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
