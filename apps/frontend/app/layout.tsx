import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { ScrollReveal } from "@/features/scroll-reveal/ScrollReveal";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  // Required for relative OpenGraph/Twitter image URLs (e.g. "/assets/au-og.png")
  // to resolve to absolute URLs — without this, social platforms that
  // don't resolve relative image paths would show no preview at all.
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/assets/favicon.svg" },
  ...pageMetadata({
    title: "Foxtheta — Global AI Consulting & Enterprise Automation, by Industry",
    description:
      "Foxtheta designs and delivers AI and intelligent automation solutions for Banking, Insurance, Healthcare, Manufacturing, Retail, and Logistics — from strategy through production, with measurable ROI.",
    path: "/",
  }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFFFFF" />
        {/* Safety net: .reveal/.reveal-stagger start at opacity:0 and only
            become visible via JavaScript (IntersectionObserver, see
            features/scroll-reveal/ScrollReveal.tsx). That's true of the
            original static site too, but if JS is blocked or fails to run
            for any reason, every section using those classes — which is
            nearly the whole page below the hero — would stay invisible
            forever. This forces them visible whenever JS can't run at all. */}
        <noscript>
          <style>{`.reveal,.reveal-stagger>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="aurora" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
