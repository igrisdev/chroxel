"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "INICIO", href: "#hero" },
  { name: "PROYECTOS", href: "#projects" },
  { name: "SERVICIOS", href: "#services" },
  { name: "MÉTODO", href: "#process-wrapper" },
  { name: "CONTACTO", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Verificamos si estamos en la ruta principal
  const isHome = pathname === "/";

  // Efecto para detectar el scroll y aplicar el backdrop sutil
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para bloquear el scroll de la página cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* HEADER PRINCIPAL (Se mantiene arriba del menú móvil) */}
      <nav
        className={`fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center transition-all duration-300 
        ${!isOpen ? "mix-blend-difference" : ""} 
        ${isScrolled && !isOpen ? "bg-black/10 backdrop-blur-md" : "bg-transparent"}
        `}
      >
        {/* LOGO (Enlace a Inicio, si es Home solo quita el menú móvil) */}
        <Link
          href="/"
          onClick={() => (setIsHome ? setIsOpen(false) : null)}
          className="font-display font-bold text-2xl tracking-widest text-white cursor-pointer hover:text-luxury-accent transition-colors relative z-[110]"
        >
          CHROXEL
        </Link>

        {/* SOLO SE MUESTRAN LOS ENLACES Y EL BOTÓN MÓVIL SI ESTAMOS EN INICIO "/" */}
        {isHome && (
          <>
            {/* MENÚ ESCRITORIO */}
            <div className="hidden md:flex space-x-8 text-sm font-display tracking-widest text-white/70 relative z-[110]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-luxury-accent transition-colors uppercase"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* BOTÓN HAMBURGUESA (MÓVIL) CON ANIMACIÓN DE X PERFECTA */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-[110] p-2 focus:outline-none flex flex-col justify-between w-8 h-6"
              aria-label="Abrir menú"
            >
              <span
                className={`h-[2px] w-full bg-white transition-all duration-300 ease-in-out origin-center ${
                  isOpen ? "rotate-45 translate-y-[11px]" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-white transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-white transition-all duration-300 ease-in-out origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[11px]" : ""
                }`}
              />
            </button>
          </>
        )}
      </nav>

      {/* MENÚ MÓVIL FULLSCREEN CON ANIMACIÓN DE CÍRCULO (SOLO EN INICIO) */}
      {isHome && (
        <div
          className={`fixed inset-0 bg-[#0f141e] z-[90] flex flex-col items-center justify-center transition-all duration-700 ease-in-out md:hidden`}
          style={{
            clipPath: isOpen
              ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
              : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          }}
        >
          <div className="flex flex-col items-center space-y-8 text-center mt-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-light tracking-[0.2em] text-white hover:text-luxury-accent transition-colors uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
