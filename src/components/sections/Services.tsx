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
        viewBox="0 0 512 512"
        className="w-full h-full"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M492.263,19.713c-26.252-26.254-68.97-26.254-95.221,0L130.066,286.69c-3.441-0.338-6.928-0.515-10.457-0.515 c-53.501,0-98.808,40.039-105.386,93.134L0.128,493.073c-0.639,5.15,1.133,10.305,4.802,13.973 c3.757,3.757,8.963,5.43,13.974,4.803l113.763-14.096c53.096-6.577,93.136-51.883,93.136-105.386 c0-3.528-0.177-7.015-0.515-10.456l266.976-266.976C518.577,88.624,518.581,46.03,492.263,19.713z M128.528,464.344h-0.001 l-92.334,11.44l11.44-92.334c4.494-36.262,35.437-63.609,71.977-63.609c39.992,0,72.527,32.535,72.527,72.527 C192.137,428.908,164.791,459.85,128.528,464.344z M214.619,344.971c-10.294-20.551-27.061-37.317-47.612-47.612l28.368-28.368 l47.612,47.612L214.619,344.971z M468.46,91.131L266.792,292.797l-47.612-47.612L420.848,43.519 c13.156-13.156,34.453-13.158,47.611,0C481.615,56.676,481.618,77.973,468.46,91.131z"></path>
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
