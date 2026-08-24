"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatEmailBody } from "@/lib/utils";
import { revealOnScroll, refreshTriggersWhenReady } from "@/lib/animations";
import {
  contactSchema,
  type ContactErrors,
} from "@/lib/contact-schema";
import logo from "../../../public/chroxel_logo_v2.png";

// Correo de contacto: se toma de la variable de entorno si está definida,
// de lo contrario se usa el valor por defecto. Debe llevar el prefijo
// NEXT_PUBLIC_ porque el formulario corre en el navegador.
const CORREO_AGENCIA =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  "johan.manuel.alvarez.pinta@gmail.com";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const isHome = usePathname() === "/";
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    projectDetails: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Limpia el error del campo en cuanto el usuario lo corrige.
    setErrors((prev) => {
      if (!prev[id as keyof ContactErrors]) return prev;
      const next = { ...prev };
      delete next[id as keyof ContactErrors];
      return next;
    });
  };

  const handleEmail = () => {
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const { name, contactInfo, projectDetails } = result.data;
    const asunto = encodeURIComponent(`Nuevo Proyecto - ${name}`);
    const cuerpo = encodeURIComponent(
      formatEmailBody({ name, contact: contactInfo, details: projectDetails }),
    );
    window.location.href = `mailto:${CORREO_AGENCIA}?subject=${asunto}&body=${cuerpo}`;
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
            <form
              className="space-y-5"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleEmail();
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[11px] text-luxury-muted tracking-[0.06em]"
                >
                  NOMBRE O EMPRESA
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={`w-full h-[46px] mt-1.5 px-3.5 bg-luxury-bg border rounded-[10px] text-luxury-ink placeholder-luxury-muted text-sm focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-400 focus:border-red-500"
                      : "border-luxury-line focus:border-luxury-accent"
                  }`}
                />
                {errors.name && (
                  <p id="err-name" className="text-red-500 text-xs mt-1.5 leading-snug">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contactInfo"
                  className="font-mono text-[11px] text-luxury-muted tracking-[0.06em]"
                >
                  EMAIL O TELÉFONO
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="hola@acme.com"
                  aria-invalid={!!errors.contactInfo}
                  aria-describedby={errors.contactInfo ? "err-contact" : undefined}
                  className={`w-full h-[46px] mt-1.5 px-3.5 bg-luxury-bg border rounded-[10px] text-luxury-ink placeholder-luxury-muted text-sm focus:outline-none transition-colors ${
                    errors.contactInfo
                      ? "border-red-400 focus:border-red-500"
                      : "border-luxury-line focus:border-luxury-accent"
                  }`}
                />
                {errors.contactInfo && (
                  <p id="err-contact" className="text-red-500 text-xs mt-1.5 leading-snug">
                    {errors.contactInfo}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="projectDetails"
                  className="font-mono text-[11px] text-luxury-muted tracking-[0.06em]"
                >
                  TU PROYECTO
                </label>
                <textarea
                  id="projectDetails"
                  rows={3}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Necesitamos una plataforma para…"
                  aria-invalid={!!errors.projectDetails}
                  aria-describedby={
                    errors.projectDetails ? "err-details" : undefined
                  }
                  className={`w-full mt-1.5 px-3.5 py-3 bg-luxury-bg border rounded-[10px] text-luxury-ink placeholder-luxury-muted text-sm focus:outline-none transition-colors resize-none ${
                    errors.projectDetails
                      ? "border-red-400 focus:border-red-500"
                      : "border-luxury-line focus:border-luxury-accent"
                  }`}
                />
                <div className="flex justify-between items-start mt-1.5 gap-3">
                  {errors.projectDetails ? (
                    <p id="err-details" className="text-red-500 text-xs leading-snug">
                      {errors.projectDetails}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="font-mono text-[10.5px] text-luxury-muted shrink-0">
                    {formData.projectDetails.trim().length}/1000
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleEmail}
                  className="w-full inline-flex items-center justify-center gap-2 h-[50px] rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold text-sm hover:bg-luxury-accent-2 transition-all"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar por correo
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
