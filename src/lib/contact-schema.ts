import { z } from "zod";

// Acepta correo O teléfono en un mismo campo: al menos 7 dígitos para un
// teléfono válido (con o sin +, espacios o guiones), o un email bien formado.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s().-]{7,}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre o el de tu empresa (mínimo 2 caracteres).")
    .max(80, "El nombre es demasiado largo (máximo 80 caracteres)."),
  contactInfo: z
    .string()
    .trim()
    .min(1, "Necesitamos un correo o teléfono para responderte.")
    .refine(
      (value) => emailRegex.test(value) || phoneRegex.test(value),
      "Ingresa un correo válido (nombre@dominio.com) o un teléfono de al menos 7 dígitos.",
    ),
  projectDetails: z
    .string()
    .trim()
    .min(15, "Cuéntanos un poco más sobre tu proyecto (mínimo 15 caracteres).")
    .max(1000, "El mensaje es muy largo (máximo 1000 caracteres)."),
});

export type ContactForm = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactForm, string>>;
