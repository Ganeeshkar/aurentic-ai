/**
 * One large, distinctive hero illustration per industry — not the small
 * nav-icon glyphs in IndustryIcons.tsx. Each shares a visual grammar
 * (soft organic background blobs + a gradient-filled centerpiece + orbiting
 * "systems" accent nodes, matching the home hero's network motif) so the
 * six read as one family, while the centerpiece itself is unique to that
 * industry's actual subject matter — never a generic icon blown up large.
 *
 * All hand-authored inline SVG: no external images, no icon library, no
 * raster assets to optimize or lazy-load.
 */

const defs = (id: string) => (
  <defs>
    <linearGradient id={`warm-${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#C9622F" />
      <stop offset="100%" stopColor="#8A2C12" />
    </linearGradient>
    <linearGradient id={`cool-${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#3A4A96" />
      <stop offset="100%" stopColor="#1B2559" />
    </linearGradient>
    <radialGradient id={`glow-${id}`} cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#B23A1A" stopOpacity="0.16" />
      <stop offset="100%" stopColor="#B23A1A" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const bg = (id: string) => (
  <>
    <circle cx="240" cy="240" r="230" fill={`url(#glow-${id})`} />
    <path
      d="M105 90c55-38 145-30 190 18 40 43 40 118-4 158-46 42-128 46-176 4-52-46-62-140-10-180Z"
      fill="#F6F5F2"
      opacity="0.9"
    />
    <circle cx="240" cy="240" r="188" fill="none" stroke="#E4E6EB" strokeWidth="1" />
    <circle cx="240" cy="240" r="150" fill="none" stroke="#E4E6EB" strokeWidth="1" />
  </>
);

const node = (cx: number, cy: number, r: number, fill: string) => (
  <circle cx={cx} cy={cy} r={r} fill={fill} />
);

export function IllustrationBanking() {
  const id = "bank";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* vault dial */}
      <circle cx="240" cy="240" r="92" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <circle cx="240" cy="240" r="92" fill="none" stroke={`url(#warm-${id})`} strokeWidth="2.5" strokeDasharray="4 10" strokeLinecap="round" />
      {/* ascending ledger bars — reconciliation / audit trail */}
      <rect x="185" y="255" width="20" height="40" rx="3" fill="#E4E6EB" />
      <rect x="213" y="230" width="20" height="65" rx="3" fill={`url(#warm-${id})`} />
      <rect x="241" y="205" width="20" height="90" rx="3" fill="#1B2559" />
      <rect x="269" y="245" width="20" height="50" rx="3" fill="#E4E6EB" />
      {/* checkmark badge */}
      <circle cx="292" cy="188" r="20" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
      <path d="M283 188l6 6 12-13" stroke={`url(#warm-${id})`} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* orbiting audit nodes */}
      {node(120, 150, 6, "#1B2559")}
      {node(360, 300, 6, "#A9781F")}
      {node(100, 330, 5, "#B23A1A")}
      <path d="M150 165l40 45" stroke="#CBCED6" strokeWidth="1.2" />
      <path d="M340 290l-40-25" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

export function IllustrationInsurance() {
  const id = "ins";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* policy document, offset behind the shield */}
      <rect x="170" y="160" width="110" height="140" rx="10" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" transform="rotate(-8 225 230)" />
      <rect x="188" y="185" width="60" height="8" rx="4" fill="#E4E6EB" transform="rotate(-8 225 230)" />
      <rect x="188" y="205" width="74" height="6" rx="3" fill="#E4E6EB" transform="rotate(-8 225 230)" />
      <rect x="188" y="220" width="74" height="6" rx="3" fill="#E4E6EB" transform="rotate(-8 225 230)" />
      {/* shield */}
      <path
        d="M240 130 305 156v66c0 54-27 92-65 104-38-12-65-50-65-104v-66Z"
        fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2.5"
      />
      <path d="M240 130 305 156v66c0 54-27 92-65 104V130Z" fill={`url(#warm-${id})`} opacity="0.08" />
      <path d="M212 232l20 20 36-40" stroke={`url(#warm-${id})`} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* coverage citation nodes */}
      {node(346, 200, 6, "#1B2559")}
      {node(130, 280, 6, "#A9781F")}
      {node(360, 320, 5, "#B23A1A")}
      <path d="M320 190l-15 10" stroke="#CBCED6" strokeWidth="1.2" />
      <path d="M180 270l30 15" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

export function IllustrationHealthcare() {
  const id = "health";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* patient record card */}
      <rect x="140" y="150" width="200" height="180" rx="16" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <circle cx="178" cy="188" r="14" fill={`url(#cool-${id})`} opacity="0.85" />
      <rect x="202" y="180" width="90" height="8" rx="4" fill="#E4E6EB" />
      <rect x="202" y="196" width="60" height="6" rx="3" fill="#E4E6EB" />
      {/* pulse line */}
      <path
        d="M158 250h30l12-30 16 60 14-45 10 25h82"
        fill="none" stroke={`url(#warm-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      <rect x="158" y="278" width="164" height="6" rx="3" fill="#E4E6EB" />
      <rect x="158" y="294" width="120" height="6" rx="3" fill="#E4E6EB" />
      {/* care cross badge */}
      <circle cx="330" cy="170" r="22" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
      <path d="M330 160v20M320 170h20" stroke={`url(#warm-${id})`} strokeWidth="3" strokeLinecap="round" />
      {node(110, 210, 6, "#1B2559")}
      {node(370, 300, 6, "#A9781F")}
      <path d="M132 220l25 15" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

export function IllustrationManufacturing() {
  const id = "mfg";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* interlocking gears */}
      <g transform="translate(196 210)">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <rect key={i} x="-6" y="-56" width="12" height="18" rx="2" fill={`url(#warm-${id})`} transform={`rotate(${angle})`} />
          );
        })}
        <circle r="42" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
        <circle r="12" fill={`url(#warm-${id})`} />
      </g>
      <g transform="translate(300 290)">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 360) / 6;
          return (
            <rect key={i} x="-5" y="-38" width="10" height="14" rx="2" fill="#1B2559" transform={`rotate(${angle})`} />
          );
        })}
        <circle r="28" fill="#fff" stroke="#1B2559" strokeWidth="2" />
        <circle r="8" fill="#1B2559" />
      </g>
      {/* knowledge-engine document behind */}
      <rect x="130" y="290" width="80" height="100" rx="8" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" transform="rotate(-6 170 340)" />
      <rect x="142" y="308" width="50" height="5" rx="2.5" fill="#E4E6EB" transform="rotate(-6 170 340)" />
      <rect x="142" y="320" width="40" height="5" rx="2.5" fill="#E4E6EB" transform="rotate(-6 170 340)" />
      {node(360, 160, 6, "#A9781F")}
      {node(120, 180, 5, "#B23A1A")}
    </svg>
  );
}

export function IllustrationRetail() {
  const id = "retail";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* storefront */}
      <rect x="150" y="210" width="180" height="110" rx="6" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <path d="M140 210l20-40h160l20 40Z" fill={`url(#warm-${id})`} opacity="0.9" />
      <rect x="150" y="210" width="180" height="10" fill="#fff" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={150 + i * 30} y="210" width="15" height="10" fill={`url(#warm-${id})`} opacity={i % 2 ? 0.4 : 0.9} />
      ))}
      <rect x="220" y="255" width="40" height="65" rx="4" fill="#1B2559" opacity="0.9" />
      <circle cx="248" cy="288" r="2.5" fill="#fff" />
      <rect x="165" y="240" width="35" height="35" rx="4" fill="#F6F5F2" stroke="#E4E6EB" />
      <rect x="280" y="240" width="35" height="35" rx="4" fill="#F6F5F2" stroke="#E4E6EB" />
      {/* overnight ring — 24/7 desk */}
      <circle cx="350" cy="180" r="26" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
      <path d="M350 166v14l10 6" stroke={`url(#warm-${id})`} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {node(120, 250, 6, "#A9781F")}
      {node(370, 320, 5, "#B23A1A")}
      <path d="M145 260l25 5" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

export function IllustrationLogistics() {
  const id = "log";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* winding route with waypoints */}
      <path
        d="M120 320c40 20 60-30 100-30s50 50 90 40 40-70 80-70"
        fill="none" stroke="#E4E6EB" strokeWidth="10" strokeLinecap="round"
      />
      <path
        d="M120 320c40 20 60-30 100-30s50 50 90 40 40-70 80-70"
        fill="none" stroke={`url(#warm-${id})`} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 14"
      />
      {node(120, 320, 9, "#1B2559")}
      {node(220, 290, 8, "#A9781F")}
      {node(310, 330, 8, "#B23A1A")}
      {/* destination pin */}
      <path d="M390 190c0 22-20 40-20 40s-20-18-20-40a20 20 0 0140 0Z" fill={`url(#warm-${id})`} />
      <circle cx="370" cy="190" r="7" fill="#fff" />
      {/* shipment box */}
      <rect x="150" y="180" width="60" height="50" rx="6" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <path d="M150 195h60M180 180v50" stroke="#E4E6EB" strokeWidth="1.5" />
      {node(150, 150, 5, "#B23A1A")}
    </svg>
  );
}
