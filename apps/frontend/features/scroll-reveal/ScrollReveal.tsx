"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ported from js/main.js's reveal + counter IntersectionObservers.
 * Scans the whole rendered DOM for `.reveal`, `.reveal-stagger`, and
 * `[data-count]` elements — mirrors the original vanilla-JS behavior
 * exactly rather than requiring every section to wire up its own observer.
 *
 * This component lives in the root layout, outside {children}, so App
 * Router keeps it mounted across client-side <Link> navigations — it
 * never remounts on its own. Without `pathname` in the effect's deps,
 * the effect ran exactly once on the very first page load, and every
 * subsequent client-side navigation's .reveal elements were never handed
 * to an observer at all: they'd sit at opacity:0 forever (the CSS
 * default) until a full page refresh remounted everything fresh. Keying
 * the effect on pathname makes it re-scan and re-observe on every route
 * change, matching what a full navigation would have done anyway.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = document.querySelectorAll(".reveal, .reveal-stagger");
    let cleanupIo: (() => void) | undefined;
    if ("IntersectionObserver" in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      targets.forEach((t) => io.observe(t));
      cleanupIo = () => io.disconnect();
    } else {
      targets.forEach((t) => t.classList.add("is-visible"));
    }

    function animateCount(el: Element) {
      const raw = el.getAttribute("data-count") ?? "0";
      const suffix = el.getAttribute("data-suffix") ?? "";
      const target = parseFloat(raw);
      const decimals = (raw.split(".")[1] ?? "").length;
      const dur = 1300;
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const counters = document.querySelectorAll("[data-count]");
    let cleanupCio: (() => void) | undefined;
    if ("IntersectionObserver" in window && !reduced) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => cio.observe(c));
      cleanupCio = () => cio.disconnect();
    } else {
      counters.forEach((c) => {
        c.textContent = (c.getAttribute("data-count") ?? "") + (c.getAttribute("data-suffix") ?? "");
      });
    }

    return () => {
      cleanupIo?.();
      cleanupCio?.();
    };
  }, [pathname]);

  return null;
}
