export interface ContactData {
  name: string;
  contact: string;
  details: string;
}

export const formatEmailBody = (data: ContactData): string => {
  return `¡Hola equipo de Chroxel!\n\nSoy ${data.name}.\nMi contacto (Email/Tel) es: ${data.contact}\n\nDetalles del proyecto:\n${data.details}\n\nQuedo atento a su respuesta.`;
};
