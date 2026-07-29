"use client";

import { useEffect, useRef } from "react";

/**
 * Ported from js/main.js's [data-split] word-by-word reveal. Splits the
 * text content into per-word spans (with a staggered transition delay)
 * and reveals them when the heading scrolls into view.
 */
export function SplitHeading({
  as: Tag = "h1",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = Array.from(el.childNodes);
    el.innerHTML = "";
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        (node.textContent ?? "").split(/\s+/).forEach((word) => {
          if (!word) return;
          const line = document.createElement("span");
          line.className = "wline";
          const inner = document.createElement("span");
          inner.textContent = word;
          line.appendChild(inner);
          el.appendChild(line);
          el.appendChild(document.createTextNode(" "));
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const line = document.createElement("span");
        line.className = "wline";
        const inner = document.createElement("span");
        inner.appendChild(node);
        line.appendChild(inner);
        el.appendChild(line);
        el.appendChild(document.createTextNode(" "));
      }
    });

    const spans = el.querySelectorAll<HTMLElement>(".wline>span");
    spans.forEach((s, i) => {
      s.style.transitionDelay = i * 0.055 + "s";
    });

    if (reduced) {
      el.classList.add("words-in");
      return;
    }
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("words-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    el.classList.add("words-in");
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
