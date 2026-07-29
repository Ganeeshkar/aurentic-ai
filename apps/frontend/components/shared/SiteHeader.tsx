"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/industries", label: "Industries" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="logo" href="/" aria-label="Foxtheta home" onClick={() => setOpen(false)}>
          <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
            <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="#B23A1A" strokeWidth="3" opacity=".35" />
            <circle cx="32" cy="32" r="16" fill="none" stroke="#14151C" strokeWidth="5" />
            <line x1="18" y1="32" x2="46" y2="32" stroke="#B23A1A" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <span>Foxtheta</span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav${open ? " open" : ""}`} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || pathname?.startsWith(link.href + "/") ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link className="btn btn--sm" href="/contact" onClick={() => setOpen(false)}>
            Talk to an Expert <span className="arr">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
