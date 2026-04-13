"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animación de entrada
      gsap.from(".hero-element", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "expo.out",
      });

      // Desvanecer la flecha al hacer scroll
      gsap.to(".hero-arrow", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "top -15%",
          scrub: true,
        },
        opacity: 0,
        scale: 0.8,
      });
    },
    { scope: container },
  ); // Scope limita GSAP a este componente

  return (
    <header
      id="hero"
      ref={container}
      className="h-screen flex flex-col items-center justify-center text-center px-4 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.06)_0%,transparent_70%)] -z-10"></div>

      <h1 className="hero-element font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 z-30 relative leading-tight text-luxury-ink">
        Elevamos tu <br />
        <span className="text-luxury-accent">Presencia Digital</span>
      </h1>
      <p className="hero-element text-luxury-slate text-xl md:text-2xl max-w-2xl mb-12 z-30 relative font-light">
        Diseño boutique, ingeniería robusta y atención absoluta al detalle.
      </p>

      <a
        href="#projects"
        className="hero-element hero-arrow animate-bounce mt-12 w-12 h-12 rounded-full border border-luxury-accent/30 flex items-center justify-center text-luxury-accent z-30 relative hover:bg-luxury-accent hover:text-white transition-colors cursor-pointer"
      >
        ↓
      </a>
    </header>
  );
}
