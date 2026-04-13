"use client";

import Link from "next/link";

const NAV_LINKS = [
  { name: "INICIO", href: "#hero" },
  { name: "PROYECTOS", href: "#projects" },
  { name: "SERVICIOS", href: "#services" },
  { name: "MÉTODO", href: "#process-wrapper" },
  { name: "CONTACTO", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
      {/* Logo */}
      <Link
        href="#hero"
        className="font-display font-bold text-2xl tracking-widest text-white cursor-pointer hover:text-luxury-accent transition-colors"
      >
        CHROXEL
      </Link>

      {/* Menú de Navegación */}
      <div className="hidden md:flex space-x-8 text-sm font-display tracking-widest text-white/70">
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
    </nav>
  );
}
