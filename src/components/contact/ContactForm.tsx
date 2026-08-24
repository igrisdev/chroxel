"use client";

import { useState } from "react";
import { formatEmailBody } from "@/lib/utils";
import { contactSchema, type ContactErrors } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

const CORREO_AGENCIA = siteConfig.email;

interface ContactFormProps {
  /** Se llama tras abrir el cliente de correo (p. ej. para cerrar el modal). */
  onSent?: () => void;
}

export default function ContactForm({ onSent }: ContactFormProps) {
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
    onSent?.();
  };

  return (
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
          aria-describedby={errors.projectDetails ? "err-details" : undefined}
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
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 h-[50px] rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold text-sm hover:bg-luxury-accent-2 transition-all"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Enviar por correo
        </button>
      </div>
    </form>
  );
}
