"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatWhatsAppMessage, formatEmailBody } from "@/lib/utils";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";
import logo from "../../../public/chroxel_logo_v2.png";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const isHome = usePathname() === "/";
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    projectDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    if (!formData.name || !formData.contactInfo || !formData.projectDetails) {
      alert("Por favor, completa todos los campos para poder contactarte.");
      return false;
    }
    return true;
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const numeroAgencia = "3178784022";
    const mensaje = formatWhatsAppMessage({
      name: formData.name,
      contact: formData.contactInfo,
      details: formData.projectDetails,
    });
    window.open(`https://wa.me/${numeroAgencia}?text=${mensaje}`, "_blank");
  };

  const handleEmail = () => {
    if (!validate()) return;
    const correoAgencia = "johan.manuel.alvarez.pinta@gmail.com";
    const asunto = encodeURIComponent(`Nuevo Proyecto - ${formData.name}`);
    const cuerpo = encodeURIComponent(
      formatEmailBody({
        name: formData.name,
        contact: formData.contactInfo,
        details: formData.projectDetails,
      }),
    );
    window.location.href = `mailto:${correoAgencia}?subject=${asunto}&body=${cuerpo}`;
  };

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
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-mono text-[11px] text-luxury-muted tracking-[0.06em]">
                  NOMBRE O EMPRESA
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="w-full h-[46px] mt-1.5 px-3.5 bg-luxury-bg border border-luxury-line rounded-[10px] text-luxury-ink placeholder-luxury-muted text-sm focus:outline-none focus:border-luxury-accent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[11px] text-luxury-muted tracking-[0.06em]">
                  EMAIL O TELÉFONO
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="hola@acme.com"
                  className="w-full h-[46px] mt-1.5 px-3.5 bg-luxury-bg border border-luxury-line rounded-[10px] text-luxury-ink placeholder-luxury-muted text-sm focus:outline-none focus:border-luxury-accent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[11px] text-luxury-muted tracking-[0.06em]">
                  TU PROYECTO
                </label>
                <textarea
                  id="projectDetails"
                  rows={3}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Necesitamos una plataforma para…"
                  className="w-full mt-1.5 px-3.5 py-3 bg-luxury-bg border border-luxury-line rounded-[10px] text-luxury-ink placeholder-luxury-muted text-sm focus:outline-none focus:border-luxury-accent transition-colors resize-none"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-[50px] rounded-[11px] bg-[#1FA855] text-white font-display font-semibold text-sm hover:bg-[#1a9149] transition-all"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6-1.6c1.8 1 3.8 1.5 6 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0zm5.5 14.3c-.3.9-1.5 1.6-2.4 1.7-.9.1-1.7.5-3.5-.7-3-1.3-5-4.4-5.2-4.6-.2-.2-1.3-1.6-1.3-3.1 0-1.5.8-2.2 1.1-2.5.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l.9 2.2c.1.2.1.4 0 .5l-.5.9c-.2.2-.4.4-.2.8.8 1.5 2 2.1 3 2.6.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.6-.1l2.2 1c.2.1.4.2.4.5z" />
                  </svg>
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-[50px] rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold text-sm hover:bg-luxury-accent-2 transition-all"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Correo
                </button>
              </div>
            </form>
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
