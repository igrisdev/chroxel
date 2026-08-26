"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../../public/chroxel_logo_v2.png";

const NAV_LINKS = [
  { name: "Servicios", href: "/#services" },
  { name: "Proyectos", href: "/#projects" },
  { name: "Método", href: "/#process-wrapper" },
  // { name: "Stack", href: "/#stats" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          isScrolled && !isOpen
            ? "bg-luxury-bg/82 backdrop-blur-md border-b border-luxury-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 h-[78px] flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 relative z-[110]"
          >
            <Image
              src={logo}
              alt="Chroxel"
              width={30}
              height={30}
              priority
              className="w-[30px] h-[30px] object-contain"
            />
            <span className="font-display font-bold text-[19px] tracking-[0.16em] text-luxury-ink">
              CHROXEL
            </span>
          </Link>

          {isHome && (
            <>
              <div className="hidden md:flex items-center gap-8 relative z-[110]">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-display text-sm font-medium text-luxury-slate hover:text-luxury-ink transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  className="inline-flex items-center h-[42px] px-5 rounded-[10px] bg-luxury-accent text-[#151107] font-display font-semibold text-sm hover:bg-luxury-accent-2 transition-colors"
                >
                  Iniciar proyecto
                </Link>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative z-[110] w-8 h-6 flex items-center justify-center focus:outline-none"
                aria-label="Abrir menú"
              >
                <span
                  className={`absolute h-[2px] w-full bg-luxury-ink transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45" : "-translate-y-[10px]"
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-full bg-luxury-ink transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-[2px] w-full bg-luxury-ink transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45" : "translate-y-[10px]"
                  }`}
                />
              </button>
            </>
          )}
        </div>
      </nav>

      {isHome && (
        <div
          className="fixed inset-0 bg-luxury-bg z-[90] flex flex-col items-center justify-center transition-all duration-700 ease-in-out md:hidden"
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
                className="text-3xl font-display font-medium tracking-[0.1em] text-luxury-ink hover:text-luxury-accent-2 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex items-center h-[50px] px-7 rounded-[11px] bg-luxury-accent text-[#151107] font-display font-semibold"
            >
              Iniciar proyecto
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
