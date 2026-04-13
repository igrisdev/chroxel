"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    num: "01",
    phase: "Fase de Inicio",
    title: "Descubrimiento",
    desc: "Inmersión total en tu visión para definir los cimientos de un proyecto extraordinario.",
  },
  {
    num: "02",
    phase: "Fase Creativa",
    title: "Conceptualización",
    desc: "Arquitectura de información y diseño visual que respira tu identidad de marca.",
  },
  {
    num: "03",
    phase: "Fase Técnica",
    title: "Ingeniería",
    desc: "Código limpio, eficiente y escalable construido con las tecnologías más avanzadas.",
  },
  {
    num: "04",
    phase: "Fase Final",
    title: "Lanzamiento",
    desc: "Pulido final y despliegue estratégico para asegurar un impacto inmediato en el mercado.",
  },
];

export default function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!trackRef.current || !wrapperRef.current) return;

        let scrollWidth = trackRef.current.scrollWidth - window.innerWidth;

        gsap.to(trackRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            scrub: 0.8,
            end: () => "+=" + scrollWidth,
          },
        });
      });
    },
    { scope: wrapperRef },
  );

  return (
    <section
      id="process-wrapper"
      ref={wrapperRef}
      className="relative bg-luxury-bg border-y border-luxury-border overflow-hidden"
    >
      <div
        id="process-track"
        ref={trackRef}
        className="flex flex-col md:flex-row md:w-[400vw] h-auto md:h-screen"
      >
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="panel w-full md:w-screen h-[60vh] md:h-full flex flex-col justify-center px-8 md:px-32 relative md:border-r border-luxury-border overflow-hidden"
          >
            <div className="absolute top-4 md:top-12 left-4 md:left-24 text-[12rem] md:text-[22rem] font-display font-bold text-luxury-accent opacity-[0.15] select-none z-0 leading-none pointer-events-none italic">
              {step.num}
            </div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-luxury-accent font-display font-bold tracking-widest mb-4 uppercase text-sm">
                {step.phase}
              </p>
              <h3 className="text-4xl md:text-6xl font-bold text-luxury-ink mb-8 tracking-tighter">
                {step.title}
              </h3>
              <p className="text-luxury-slate text-xl md:text-2xl leading-relaxed font-light italic">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
