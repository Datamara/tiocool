"use client";

import { useEffect, useRef } from "react";

type RippleOptions = {
  resolution?: number;
  dropRadius?: number;
  perturbance?: number;
  interactive?: boolean;
  imageUrl?: string;
};

type RippleEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  options?: RippleOptions;
  autoDrops?: boolean;
  dropIntervalMs?: number;
};

let ripplesReady: Promise<JQueryStatic> | null = null;

function getRipplesJQuery() {
  if (!ripplesReady) {
    ripplesReady = (async () => {
      const module = await import("jquery");
      const jq = (
        "default" in module ? module.default : module
      ) as unknown as JQueryStatic;

      const win = window as unknown as {
        jQuery: JQueryStatic;
        $: JQueryStatic;
      };
      win.jQuery = jq;
      win.$ = jq;

      await import("jquery.ripples");

      if (typeof jq( document.body ).ripples !== "function") {
        throw new Error("jquery.ripples no se registró en jQuery");
      }

      return jq;
    })();
  }

  return ripplesReady;
}

function extractBackgroundUrl(backgroundImage?: string): string | null {
  if (!backgroundImage) return null;

  const match = /url\(["']?([^"')]+)["']?\)/.exec(backgroundImage);
  return match?.[1] ?? null;
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    image.src = src;
  });
}

export default function RippleEffect({
  className = "",
  style = {},
  options = {},
  autoDrops = true,
  dropIntervalMs = 1400,
}: RippleEffectProps) {
  const rippleRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const imageUrl =
    options.imageUrl ?? extractBackgroundUrl(style.backgroundImage);

  useEffect(() => {
    if (!rippleRef.current || !imageUrl) return;

    const imageSrc = imageUrl;

    let cancelled = false;
    let intervalId: number | null = null;
    let destroy = () => {};

    async function init() {
      const node = rippleRef.current;
      if (!node) return;

      try {
        await preloadImage(imageSrc);

        await new Promise<void>((resolve) => {
          if (node.getBoundingClientRect().width > 1) {
            resolve();
            return;
          }

          const observer = new ResizeObserver(() => {
            if (node.getBoundingClientRect().width > 1) {
              observer.disconnect();
              resolve();
            }
          });
          observer.observe(node);
        });

        if (cancelled) return;

        const jq = await getRipplesJQuery();
        if (cancelled || !rippleRef.current) return;

        const $el = jq(rippleRef.current) as JQueryRipplesInstance;

        $el.ripples({
          imageUrl: imageSrc,
          resolution: 512,
          dropRadius: 70,
          perturbance: 0.04,
          interactive: true,
          ...optionsRef.current,
        });

        $el.ripples("updateSize");

        if (cancelled) {
          $el.ripples("destroy");
          return;
        }

        const onResize = () => {
          try {
            $el.ripples("updateSize");
          } catch {
            // ignore
          }
        };

        window.addEventListener("resize", onResize);

        if (autoDrops) {
          intervalId = window.setInterval(() => {
            if (cancelled || !rippleRef.current) return;

            const { width, height } = rippleRef.current.getBoundingClientRect();
            if (!width || !height) return;

            $el.ripples(
              "drop",
              Math.random() * width,
              Math.random() * height,
              20 + Math.random() * 20,
              0.03 + Math.random() * 0.02,
            );
          }, dropIntervalMs);
        }

        destroy = () => {
          window.removeEventListener("resize", onResize);
          if (intervalId) window.clearInterval(intervalId);

          try {
            $el.ripples("destroy");
          } catch {
            // ignore
          }
        };
      } catch (error) {
        console.error("Ripple no disponible:", error);
      }
    }

    void init();

    return () => {
      cancelled = true;
      destroy();
    };
  }, [autoDrops, dropIntervalMs, imageUrl]);

  return (
    <div
      ref={rippleRef}
      className={`jquery-ripples-host pointer-events-auto absolute inset-0 ${className}`}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
