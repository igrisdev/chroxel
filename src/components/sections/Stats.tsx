"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { countUpOnScroll } from "@/lib/animations";
import type { IStats } from "@/app/api/stats/route";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export default function Stats() {
  const container = useRef<HTMLElement>(null);
  const [stats, setStats] = useState<IStats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: IStats | null) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const items: StatItem[] = stats
    ? [
        { value: stats.projects, suffix: "+", label: "PROYECTOS ENTREGADOS" },
        { value: stats.clients, suffix: "+", label: "CLIENTES" },
        { value: stats.technologies, suffix: "+", label: "TECNOLOGÍAS" },
        { value: stats.years, suffix: "+", label: "AÑOS DE TRAYECTORIA" },
      ]
    : [];

  useGSAP(
    () => {
      if (items.length === 0) return;
      countUpOnScroll(".count");
    },
    { scope: container, dependencies: [stats] },
  );

  return (
    <section
      id="stats"
      ref={container}
      className="bg-luxury-accent text-[#181206] relative overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-[76px] grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((s) => (
          <div key={s.label}>
            <div
              className="count font-display text-4xl md:text-[52px] font-bold tracking-[-0.03em]"
              data-to={s.value}
              data-dec="0"
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </div>
            <div className="font-mono text-xs opacity-70 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
