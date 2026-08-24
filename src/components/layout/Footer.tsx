"use client";

import { useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";
import ContactForm from "@/components/contact/ContactForm";
import logo from "../../../public/chroxel_logo_v2.png";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const isHome = usePathname() === "/";

  useGSAP(
    () => {
      if (!isHome) return;

      revealOnScroll(".cta-el", { y: 28, duration: 0.9 });

      // El wordmark gigante se desplaza al hacer scroll (encima del bucle
      // continuo que corre por CSS en la capa interna).
      gsap.to(".wordmark-scroll", {
        scrollTrigger: {
          trigger: ".wordmark-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
        xPercent: -12,
        ease: "none",
      });

      refreshTriggersWhenReady(container.current);
    },
    { scope: container, dependencies: [isHome] },
  );

  return (
    <footer id="contact" ref={container} className="relative overflow-hidden">
      {/* CTA + formulario: solo en la página principal */}
      {isHome && (
      <div className="relative pt-[110px]">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] blur-[30px] anim-aurora pointer-events-none bg-[radial-gradient(circle,rgba(197,160,89,0.14),transparent_65%)]" />

        <div className="max-w-[1180px] mx-auto px-6 md:px-12 relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="cta-el block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
              {"// Tu próximo paso"}
            </span>
            <h2 className="cta-el font-display text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mt-4">
              ¿Construimos algo{" "}
              <span className="text-luxury-accent-2">extraordinario</span>?
            </h2>
            <p className="cta-el text-luxury-slate text-lg font-light leading-relaxed max-w-md mt-5">
              Cuéntanos tu proyecto. Respondemos en menos de 24 horas para
              agendar una sesión de descubrimiento.
            </p>
          </div>

          {/* Formulario */}
          <div className="cta-el bg-luxury-card border border-luxury-line rounded-[18px] p-8 shadow-[0_30px_60px_-40px_rgba(19,26,36,0.3)]">
            <ContactForm />
          </div>
        </div>

        {/* Wordmark: se mueve solo en bucle y además reacciona al scroll.
            Capa externa (wordmark-scroll) = desplazamiento por scroll (GSAP);
            capa interna (marquee-track) = bucle continuo por CSS. Anidadas
            para que las dos transformaciones no se pisen. */}
        <div className="wordmark-wrap marquee-mask mt-20 py-5 border-t border-luxury-border">
          <div className="wordmark-scroll w-full">
            <div className="marquee-track slow items-center">
              {[0, 1].map((dup) => (
                <span
                  key={dup}
                  aria-hidden={dup === 1}
                  className="font-display font-bold text-6xl md:text-[80px] tracking-[-0.03em] px-10 text-transparent whitespace-nowrap [-webkit-text-stroke:1px_rgba(197,160,89,0.4)]"
                >
                  CHROXEL · SOFTWARE A MEDIDA&nbsp;·&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Barra inferior */}
      <div className="bg-luxury-card border-t border-luxury-border">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-11 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="Chroxel"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="font-display font-bold text-[17px] tracking-[0.16em] text-luxury-ink">
              CHROXEL
            </span>
          </div>
          <span className="font-mono text-[11.5px] text-luxury-muted">
            © {new Date().getFullYear()} CHROXEL · Hecho con ingeniería y detalle
          </span>
        </div>
      </div>
    </footer>
  );
}
