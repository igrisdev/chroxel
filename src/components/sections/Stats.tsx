"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { countUpOnScroll } from "@/lib/animations";

const STATS = [
  { to: 40, dec: 0, suffix: "+", label: "PROYECTOS" },
  { to: 99, dec: 0, suffix: "%", label: "UPTIME" },
  { to: 4.9, dec: 1, suffix: "", label: "SATISFACCIÓN" },
  { text: "24/7", label: "SOPORTE" },
];

export default function Stats() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      countUpOnScroll(".count");
    },
    { scope: container },
  );

  return (
    <section
      id="stats"
      ref={container}
      className="bg-luxury-accent text-[#181206] relative overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-[76px] grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label}>
            {"text" in s ? (
              <div className="font-display text-4xl md:text-[52px] font-bold tracking-[-0.03em]">
                {s.text}
              </div>
            ) : (
              <div
                className="count font-display text-4xl md:text-[52px] font-bold tracking-[-0.03em]"
                data-to={s.to}
                data-dec={s.dec}
                data-suffix={s.suffix}
              >
                {s.to!.toFixed(s.dec)}
                {s.suffix}
              </div>
            )}
            <div className="font-mono text-xs opacity-70 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
