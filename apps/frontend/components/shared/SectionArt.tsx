/**
 * Ambient background artwork for home-page sections that otherwise have no
 * bespoke visual (WatchItWork, Services, PrincipleBand, FinalCta). Same
 * hand-authored inline-SVG approach as IndustryIllustrations.tsx: no raster
 * assets, no external requests, scales losslessly, themeable via the
 * existing --grad-warm / --grad-cool design tokens.
 *
 * Each piece is absolutely positioned by its wrapping `.section-art--*`
 * class (see globals.css), aria-hidden, and pointer-events:none so it never
 * competes with real content or interferes with layout/accessibility.
 */

/** Neural-network node mesh — agents / intelligence. Used behind WatchItWorkSection. */
export function NeuralMeshArt() {
  return (
    <svg viewBox="0 0 900 620" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="nm-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C9622F" />
          <stop offset="100%" stopColor="#8A2C12" />
        </linearGradient>
        <linearGradient id="nm-cool" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A4A96" />
          <stop offset="100%" stopColor="#1B2559" />
        </linearGradient>
        <radialGradient id="nm-glow" cx="65%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#B23A1A" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#B23A1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="620" cy="220" r="380" fill="url(#nm-glow)" />
      <g stroke="#D8DAE0" strokeWidth="1">
        <line x1="560" y1="120" x2="700" y2="70" />
        <line x1="560" y1="120" x2="790" y2="180" />
        <line x1="560" y1="120" x2="640" y2="260" />
        <line x1="640" y1="260" x2="790" y2="180" />
        <line x1="640" y1="260" x2="560" y2="380" />
        <line x1="640" y1="260" x2="800" y2="340" />
        <line x1="560" y1="380" x2="700" y2="470" />
        <line x1="800" y1="340" x2="700" y2="470" />
        <line x1="790" y1="180" x2="860" y2="300" />
        <line x1="860" y1="300" x2="800" y2="340" />
      </g>
      <circle cx="560" cy="120" r="6" fill="url(#nm-cool)" />
      <circle cx="700" cy="70" r="4" fill="#A9781F" />
      <circle cx="790" cy="180" r="7" fill="url(#nm-warm)" />
      <circle cx="640" cy="260" r="9" fill="#fff" stroke="url(#nm-warm)" strokeWidth="2" />
      <circle cx="800" cy="340" r="5" fill="url(#nm-cool)" />
      <circle cx="560" cy="380" r="6" fill="#A9781F" />
      <circle cx="700" cy="470" r="5" fill="url(#nm-warm)" />
      <circle cx="860" cy="300" r="4" fill="#A9781F" />
    </svg>
  );
}

/** Layered isometric cloud/automation stack — infrastructure + workflows. Used in ServicesSection. */
export function IsoLayersArt() {
  return (
    <svg viewBox="0 0 620 620" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="iso-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C9622F" />
          <stop offset="100%" stopColor="#8A2C12" />
        </linearGradient>
        <linearGradient id="iso-cool" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A4A96" />
          <stop offset="100%" stopColor="#1B2559" />
        </linearGradient>
        <radialGradient id="iso-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1B2559" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1B2559" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="310" cy="280" r="290" fill="url(#iso-glow)" />
      {/* three stacked "platform layer" slabs, offset for depth */}
      <g opacity="0.95">
        <path d="M150 380l160-70 160 70-160 70Z" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
        <path d="M150 340l160-70 160 70-160 70Z" fill="#F6F5F2" stroke="#E4E6EB" strokeWidth="1.5" />
        <path d="M150 300l160-70 160 70-160 70Z" fill="url(#iso-cool)" opacity="0.9" />
      </g>
      <circle cx="310" cy="230" r="10" fill="#fff" opacity="0.85" />
      <circle cx="230" cy="380" r="7" fill="url(#iso-warm)" />
      <circle cx="420" cy="420" r="5" fill="#A9781F" />
      <circle cx="470" cy="330" r="6" fill="url(#iso-cool)" />
      <path d="M230 380l0 40M420 420l0 30M470 330l0 35" stroke="#D8DAE0" strokeWidth="1" />
    </svg>
  );
}

/** Concentric orbit rings with flowing nodes — automation orbiting a governed core. Used in PrincipleBandSection. */
export function OrbitFlowArt() {
  return (
    <svg viewBox="0 0 900 500" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="of-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8A97A" />
          <stop offset="100%" stopColor="#C9622F" />
        </linearGradient>
      </defs>
      <ellipse cx="450" cy="250" rx="360" ry="140" stroke="#fff" strokeOpacity="0.16" strokeWidth="1" fill="none" />
      <ellipse cx="450" cy="250" rx="260" ry="100" stroke="#fff" strokeOpacity="0.14" strokeWidth="1" fill="none" strokeDasharray="2 8" />
      <ellipse cx="450" cy="250" rx="160" ry="62" stroke="#fff" strokeOpacity="0.16" strokeWidth="1" fill="none" />
      <circle cx="450" cy="250" r="10" fill="url(#of-warm)" />
      <circle cx="790" cy="250" r="5" fill="#E8A97A" />
      <circle cx="110" cy="250" r="4" fill="#E8A97A" opacity="0.8" />
      <circle cx="450" cy="150" r="4" fill="#fff" opacity="0.7" />
      <circle cx="450" cy="350" r="4" fill="#fff" opacity="0.5" />
      <circle cx="650" cy="188" r="3.5" fill="#E8A97A" opacity="0.7" />
      <circle cx="250" cy="312" r="3.5" fill="#E8A97A" opacity="0.6" />
    </svg>
  );
}

/** Soft data-pulse waves — data intelligence / momentum. Used in FinalCtaSection. */
export function DataPulseArt() {
  return (
    <svg viewBox="0 0 900 400" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="dp-warm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B23A1A" stopOpacity="0" />
          <stop offset="50%" stopColor="#B23A1A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A9781F" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="dp-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#B23A1A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#B23A1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="450" cy="200" r="380" fill="url(#dp-glow)" />
      <path d="M60 220c80 0 80-70 160-70s80 70 160 70 80-70 160-70 80 70 160 70 80-70 140-70" stroke="url(#dp-warm)" strokeWidth="2" fill="none" />
      <path d="M60 260c80 0 80-50 160-50s80 50 160 50 80-50 160-50 80 50 160 50 80-50 140-50" stroke="url(#dp-warm)" strokeWidth="1.4" opacity="0.6" fill="none" />
    </svg>
  );
}
