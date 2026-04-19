"use client";

import { useState } from "react";
import Link from "next/link";
import { formatWhatsAppMessage, formatEmailBody } from "@/lib/utils";

export default function Footer() {
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

  const handleWhatsApp = () => {
    if (!formData.name || !formData.contactInfo || !formData.projectDetails) {
      alert("Por favor, completa todos los campos para poder contactarte.");
      return;
    }

    // Reemplaza con el número real de tu agencia
    const numeroAgencia = "3178784022";
    const mensaje = formatWhatsAppMessage({
      name: formData.name,
      contact: formData.contactInfo,
      details: formData.projectDetails,
    });

    window.open(`https://wa.me/${numeroAgencia}?text=${mensaje}`, "_blank");
  };

  const handleEmail = () => {
    if (!formData.name || !formData.contactInfo || !formData.projectDetails) {
      alert("Por favor, completa todos los campos para poder contactarte.");
      return;
    }

    // Reemplaza con el correo de tu agencia
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

  return (
    <footer
      id="contact"
      className="py-24 bg-luxury-ink text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-start border-b border-white/10 pb-20 gap-16">
        {/* Textos Izquierda */}
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <p className="text-luxury-accent font-display tracking-[0.3em] text-sm font-bold uppercase mb-6">
            Tu Próximo Paso
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
            Transformemos tu <br />
            <span className="text-luxury-accent italic font-normal">
              visión
            </span>{" "}
            en realidad.
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto lg:mx-0">
            Déjanos tus datos y cuéntanos brevemente sobre tu proyecto. Nos
            pondremos en contacto contigo a la brevedad para agendar una sesión
            de descubrimiento.
          </p>
        </div>

        {/* Formulario Derecha */}
        <div className="w-full lg:w-1/2 bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          <form
            id="contactForm"
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu Nombre o Empresa"
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/50 focus:outline-none focus:border-luxury-accent transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Email o Teléfono"
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/50 focus:outline-none focus:border-luxury-accent transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                id="projectDetails"
                rows={3}
                value={formData.projectDetails}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/50 focus:outline-none focus:border-luxury-accent transition-colors resize-none"
                required
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Botón WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-display font-bold tracking-widest text-xs rounded-full hover:bg-[#1ebd5a] transition-all shadow-lg hover:shadow-[#25D366]/30"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.195 1.605 6.015L.175 23.825l5.932-1.554C7.881 23.308 9.924 23.85 12.031 23.85c6.646 0 12.03-5.385 12.03-12.03S18.676 0 12.031 0zm0 21.848c-1.802 0-3.568-.485-5.116-1.404l-.367-.218-3.805.998.998-3.708-.239-.38A9.972 9.972 0 012.003 12.03c0-5.541 4.51-10.052 10.051-10.052s10.051 4.51 10.051 10.052-4.51 10.028-10.074 10.028zm5.516-7.513c-.302-.151-1.787-.882-2.064-.983-.277-.101-.479-.151-.68.151-.202.302-.78 1.008-.956 1.21-.176.202-.353.227-.655.076-1.552-.772-2.73-1.41-3.766-2.923-.202-.302.202-.277.504-.882.101-.202.05-.378-.025-.53-.076-.151-.68-1.638-.932-2.243-.252-.605-.504-.53-.68-.53h-.58c-.202 0-.53.076-.807.378-.277.302-1.058 1.033-1.058 2.52 0 1.487 1.083 2.923 1.234 3.125.151.202 2.141 3.276 5.188 4.586 1.838.78 2.645.831 3.526.705.882-.126 2.064-.882 2.367-1.713.302-.831.302-1.537.202-1.713-.101-.176-.302-.277-.605-.428z" />
                </svg>
                WHATSAPP
              </button>
              {/* Botón Correo */}
              <button
                type="button"
                onClick={handleEmail}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-luxury-accent text-white font-display font-bold tracking-widest text-xs rounded-full hover:bg-white hover:text-luxury-ink transition-all shadow-lg hover:shadow-luxury-accent/30"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                CORREO
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="font-display font-bold text-2xl tracking-widest text-white mb-6 md:mb-0">
          <div className="size-10">
            <img src="/chroxel_logo_v2.png" alt="logo chroxel" />
          </div>
        </div>
        <div className="flex space-x-8 text-sm font-display tracking-widest text-white/50 mb-6 md:mb-0">
          {/* <Link href="#" className="hover:text-luxury-accent transition-colors">
            LINKEDIN
          </Link>
          <Link href="#" className="hover:text-luxury-accent transition-colors">
            INSTAGRAM
          </Link>
          <Link href="#" className="hover:text-luxury-accent transition-colors">
            BEHANCE
          </Link> */}
        </div>
        <p className="text-white/30 text-xs tracking-widest uppercase font-bold">
          © {new Date().getFullYear()} Chroxel
        </p>
      </div>
    </footer>
  );
}
