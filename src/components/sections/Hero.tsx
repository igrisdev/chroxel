"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH = [
  "Next.js", "TypeScript", "React", "Node.js", "PostgreSQL",
  "AWS", "Prisma", "Tailwind", "GSAP", "Docker",
];

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-el", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
      });

      // Parallax suave del aurora
      gsap.to(".hero-aurora", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 20,
        ease: "none",
      });
    },
    { scope: container },
  );

  return (
    <header
      id="hero"
      ref={container}
      className="relative min-h-[760px] flex flex-col justify-center pt-[78px] overflow-hidden border-b border-luxury-border"
    >
      {/* Aurora animada */}
      <div className="hero-aurora absolute -top-[30%] -right-[10%] w-[720px] h-[720px] anim-aurora pointer-events-none -z-10 blur-[20px] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.22),transparent_62%)]" />
      <div className="hero-aurora absolute -bottom-[40%] -left-[15%] w-[640px] h-[640px] anim-aurora-rev pointer-events-none -z-10 blur-[20px] bg-[radial-gradient(circle_at_center,rgba(90,120,180,0.14),transparent_62%)]" />
      <div className="grid-grain absolute inset-0 opacity-50 -z-10 [mask-image:radial-gradient(circle_at_60%_40%,#000,transparent_78%)] [-webkit-mask-image:radial-gradient(circle_at_60%_40%,#000,transparent_78%)]" />

      <div className="max-w-[1180px] w-full mx-auto px-6 md:px-12 pt-10 pb-14 relative">
        <div className="hero-el inline-flex items-center gap-2.5 h-8 px-3.5 rounded-full bg-luxury-accent/12 border border-luxury-accent/30">
          <span className="w-[7px] h-[7px] rounded-full bg-luxury-accent-2 anim-pulse-dot" />
          <span className="font-mono text-[11.5px] tracking-[0.08em] text-luxury-accent-2">
            AGENDA ABIERTA · Q3 2026
          </span>
        </div>

        <h1 className="hero-el font-display text-5xl md:text-7xl font-bold tracking-[-0.035em] leading-[1.02] mt-6 max-w-4xl">
          Ingeniería de software
          <br className="hidden md:block" />{" "}
          que tu negocio <span className="text-shine">siente</span>.
        </h1>

        <p className="hero-el text-luxury-slate text-lg md:text-xl font-light leading-relaxed max-w-xl mt-6">
          Plataformas, sistemas internos y productos digitales diseñados y
          construidos por un equipo que se obsesiona con el detalle y el
          rendimiento.
        </p>

        <div className="hero-el flex flex-wrap gap-3 mt-9">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-[50px] px-6 rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold text-[15px] hover:bg-luxury-accent-2 hover:-translate-y-0.5 transition-all"
          >
            Agenda una consultoría
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center h-[50px] px-6 rounded-[11px] bg-transparent text-luxury-ink border border-luxury-line font-display font-semibold text-[15px] hover:border-luxury-accent transition-all"
          >
            Ver proyectos
          </a>
        </div>
      </div>

      {/* Marquee de stack */}
      <div className="max-w-[1180px] w-full mx-auto px-6 md:px-12 relative">
        <div className="marquee-mask border-y border-luxury-border py-[18px]">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex gap-3.5 pr-3.5"
                aria-hidden={dup === 1}
              >
                {TECH.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
