import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  /** Fracción del alto del viewport a partir de la cual se dispara la entrada. */
  triggerRatio?: number;
  /**
   * Elemento dentro del cual buscar cuando `targets` es un selector.
   *
   * Sin esto, un selector como ".reveal-head" recorre TODO el documento y una
   * sección acabaría animando (y ocultando) los elementos de las demás, porque
   * varias secciones comparten los mismos nombres de clase.
   */
  root?: HTMLElement | null;
}

/** Resuelve los elementos a animar, limitándolos a `root` si se indica. */
function resolveTargets(
  targets: gsap.DOMTarget,
  root?: HTMLElement | null,
): HTMLElement[] {
  if (typeof targets === "string" && root) {
    return Array.from(root.querySelectorAll<HTMLElement>(targets));
  }
  return gsap.utils.toArray<HTMLElement>(targets);
}

/**
 * Observa elementos y devuelve una función de limpieza.
 *
 * Usamos IntersectionObserver en lugar de ScrollTrigger para *disparar* las
 * entradas: ScrollTrigger.batch se salta los elementos cuando el scroll da un
 * salto grande (anclas, recarga a media página, scroll rápido) y esos elementos
 * se quedan invisibles de forma permanente. El observer, en cambio, evalúa el
 * estado real de intersección, así que siempre acaba disparando. La animación
 * en sí la sigue haciendo GSAP.
 */
function observe(
  elements: HTMLElement[],
  onVisible: (el: HTMLElement, groupIndex: number) => void,
  triggerRatio: number,
) {
  if (elements.length === 0) return;

  let pending = [...elements];
  let queued = false;

  const check = () => {
    queued = false;
    if (pending.length === 0) return;

    // `top` por debajo del límite cubre los dos casos que importan: el elemento
    // acaba de asomar por abajo, o el scroll ya lo dejó por encima del viewport
    // (saltos de ancla, recarga a media página, scroll muy rápido). Comparar la
    // posición real es lo único que no se pierde ninguno de los dos.
    const limit = window.innerHeight * triggerRatio;
    const visible = pending.filter((el) => el.getBoundingClientRect().top < limit);
    if (visible.length === 0) return;

    pending = pending.filter((el) => !visible.includes(el));
    visible.forEach(onVisible);

    if (pending.length === 0) teardown();
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    const run = () => {
      if (queued) check();
    };
    // rAF se detiene mientras la pestaña está en segundo plano, así que el
    // temporizador actúa de red de seguridad: si no, una pestaña abierta de
    // fondo se quedaría con todo el contenido en opacity 0.
    requestAnimationFrame(run);
    setTimeout(run, 200);
  };

  const teardown = () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    document.removeEventListener("visibilitychange", schedule);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  schedule();

  return teardown;
}

/** Revela elementos con un desplazamiento suave al entrar en el viewport. */
export function revealOnScroll(
  targets: gsap.DOMTarget,
  {
    y = 40,
    duration = 0.8,
    stagger = 0.12,
    triggerRatio = 0.9,
    root,
  }: RevealOptions = {},
) {
  const elements = resolveTargets(targets, root);
  if (elements.length === 0) return;

  gsap.set(elements, { opacity: 0, y });

  observe(
    elements,
    (el, groupIndex) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay: groupIndex * stagger,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    triggerRatio,
  );
}

/** Anima un número de 0 al valor indicado cuando entra en pantalla. */
export function countUpOnScroll(targets: gsap.DOMTarget) {
  const elements = gsap.utils.toArray<HTMLElement>(targets);
  if (elements.length === 0) return;

  observe(
    elements,
    (el) => {
      const to = parseFloat(el.dataset.to || "0");
      const decimals = parseInt(el.dataset.dec || "0", 10);
      const suffix = el.dataset.suffix || "";
      const value = { v: 0 };

      gsap.to(value, {
        v: to,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = value.v.toFixed(decimals) + suffix;
        },
      });
    },
    0.85,
  );
}

/**
 * Recalcula las posiciones de los ScrollTrigger con scrub (parallax, línea del
 * método) una vez que fuentes e imágenes fijan la altura definitiva del layout.
 */
export function refreshTriggersWhenReady(root?: HTMLElement | null) {
  const refresh = () => ScrollTrigger.refresh();

  requestAnimationFrame(refresh);
  document.fonts?.ready.then(refresh).catch(() => {});

  const scope: ParentNode = root ?? document;
  Array.from(scope.querySelectorAll("img"))
    .filter((img) => !img.complete)
    .forEach((img) => {
      img.addEventListener("load", refresh, { once: true });
      img.addEventListener("error", refresh, { once: true });
    });
}
