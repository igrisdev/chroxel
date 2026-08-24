"use client";

import { useEffect } from "react";
import ContactForm from "./ContactForm";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function ContactModal({
  open,
  onClose,
  title = "Hablemos de tu proyecto",
  description = "Cuéntanos qué necesitas. Respondemos en menos de 24 horas.",
}: ContactModalProps) {
  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Fondo */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-luxury-ink/40 backdrop-blur-sm animate-[fadeIn_.2s_ease]"
      />

      {/* Tarjeta */}
      <div className="relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto bg-luxury-card border border-luxury-line rounded-[18px] p-7 md:p-8 shadow-[0_30px_60px_-30px_rgba(19,26,36,0.4)] animate-[modalIn_.25s_cubic-bezier(.2,.7,.2,1)]">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-9 h-9 rounded-[10px] flex items-center justify-center text-luxury-muted hover:text-luxury-ink hover:bg-luxury-bg border border-transparent hover:border-luxury-line transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <span className="block font-mono text-xs tracking-[0.14em] uppercase text-luxury-accent-2">
          {"// Tu próximo paso"}
        </span>
        <h2 className="font-display text-2xl md:text-[28px] font-bold tracking-[-0.02em] mt-2">
          {title}
        </h2>
        <p className="text-luxury-slate text-sm leading-relaxed mt-2 mb-6">
          {description}
        </p>

        <ContactForm onSent={onClose} />
      </div>
    </div>
  );
}
