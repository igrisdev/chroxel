"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

/**
 * Anima la entrada de sus hijos directos al hacer scroll.
 *
 * Permite mantener la cabecera de una sección en el servidor (se renderiza al
 * instante y Google la lee) y añadirle la animación sólo en el cliente.
 */
export default function Reveal({
  children,
  className = "",
  y = 26,
  duration = 0.9,
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const children = Array.from(
        ref.current?.children ?? [],
      ) as HTMLElement[];
      revealOnScroll(children, { y, duration, stagger });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
