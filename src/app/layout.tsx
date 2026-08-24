import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Chroxel - Agencia de Desarrollo Premium",
  description:
    "Diseño boutique, ingeniería robusta y atención absoluta al detalle.",
  icons: {
    // v1 es la versión en alta resolución: el navegador la reescala a 16/32/180px
    // sin perder nitidez, mientras que v2 se usa a tamaño real en la interfaz.
    icon: "/chroxel_logo_v1.png",
    apple: "/chroxel_logo_v1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} selection:bg-luxury-accent selection:text-white`}
      >
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
