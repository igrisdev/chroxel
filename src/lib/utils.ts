export interface ContactData {
  name: string;
  contact: string;
  details: string;
}

export const formatWhatsAppMessage = (data: ContactData): string => {
  return `¡Hola equipo de Chroxel!%0A%0ASoy *${data.name}*.%0AMi contacto alternativo es: ${data.contact}%0A%0AMe gustaría hablar sobre este proyecto:%0A${data.details}`;
};

export const formatEmailBody = (data: ContactData): string => {
  return `¡Hola equipo de Chroxel!\n\nSoy ${data.name}.\nMi contacto (Email/Tel) es: ${data.contact}\n\nDetalles del proyecto:\n${data.details}\n\nQuedo atento a su respuesta.`;
};
