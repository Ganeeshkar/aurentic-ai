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

/** Agents + RAG + knowledge-graph, combined — for the Technology page hero. */
export function IllustrationAgentsPlatform() {
  const id = "tech";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* retrieval document, left */}
      <rect x="110" y="190" width="90" height="118" rx="10" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" transform="rotate(-6 155 249)" />
      <rect x="124" y="212" width="50" height="6" rx="3" fill="#E4E6EB" transform="rotate(-6 155 249)" />
      <rect x="124" y="228" width="60" height="6" rx="3" fill="#E4E6EB" transform="rotate(-6 155 249)" />
      <rect x="124" y="244" width="40" height="6" rx="3" fill="#E4E6EB" transform="rotate(-6 155 249)" />
      {/* orchestration hub */}
      <circle cx="255" cy="235" r="34" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
      <circle cx="255" cy="235" r="17" fill={`url(#warm-${id})`} />
      <g stroke="#D8DAE0" strokeWidth="1.2">
        <line x1="255" y1="235" x2="330" y2="170" />
        <line x1="255" y1="235" x2="350" y2="255" />
        <line x1="255" y1="235" x2="320" y2="320" />
        <line x1="255" y1="235" x2="180" y2="180" />
      </g>
      {/* agent nodes orbiting */}
      {node(330, 170, 8, "#1B2559")}
      {node(350, 255, 7, "#A9781F")}
      {node(320, 320, 8, "#1B2559")}
      {node(180, 180, 6, "#B23A1A")}
      {/* analytics card, upper right */}
      <rect x="300" y="120" width="86" height="60" rx="8" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <path d="M312 162l14-20 12 10 20-24" stroke={`url(#cool-${id})`} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Layered architecture stack + shield + cloud — for the Platform & Trust page hero. */
export function IllustrationPlatformInfra() {
  const id = "infra";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* five architecture layers, stacked with depth */}
      <g>
        <rect x="150" y="290" width="180" height="30" rx="8" fill="#E4E6EB" />
        <rect x="158" y="258" width="164" height="30" rx="8" fill="#F0EEE9" />
        <rect x="166" y="226" width="148" height="30" rx="8" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
        <rect x="174" y="194" width="132" height="30" rx="8" fill={`url(#cool-${id})`} opacity="0.9" />
        <rect x="182" y="162" width="116" height="30" rx="8" fill={`url(#warm-${id})`} />
      </g>
      {/* security shield, right */}
      <path d="M355 175 385 188v34c0 26-13 44-30 50-17-6-30-24-30-50v-34Z" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
      <path d="M340 210l10 10 18-20" stroke={`url(#warm-${id})`} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* cloud, left */}
      <path d="M110 300a22 22 0 010-44 26 26 0 0150-10 20 20 0 0122 20 18 18 0 01-2 34z" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      {node(355, 320, 6, "#A9781F")}
      {node(120, 200, 5, "#B23A1A")}
      <path d="M355 314l-15-20" stroke="#D8DAE0" strokeWidth="1.2" />
    </svg>
  );
}

/** Article card + idea lightbulb + trend line — for the Insights page hero. */
export function IllustrationInsights() {
  const id = "insight";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* article card */}
      <rect x="140" y="150" width="170" height="200" rx="12" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <rect x="162" y="180" width="90" height="10" rx="5" fill="#E4E6EB" />
      <rect x="162" y="204" width="126" height="6" rx="3" fill="#E4E6EB" />
      <rect x="162" y="220" width="126" height="6" rx="3" fill="#E4E6EB" />
      <rect x="162" y="236" width="90" height="6" rx="3" fill="#E4E6EB" />
      <path d="M162 268l30-28 22 18 34-38 40 30" stroke={`url(#warm-${id})`} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="162" y="312" width="126" height="6" rx="3" fill="#E4E6EB" />
      <rect x="162" y="328" width="80" height="6" rx="3" fill="#E4E6EB" />
      {/* idea lightbulb badge */}
      <circle cx="335" cy="180" r="26" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2" />
      <path d="M335 166a14 14 0 00-6 26l1 6h10l1-6a14 14 0 00-6-26Z" fill="none" stroke={`url(#warm-${id})`} strokeWidth="2" strokeLinejoin="round" />
      <path d="M330 200h10" stroke={`url(#warm-${id})`} strokeWidth="2" strokeLinecap="round" />
      {node(110, 220, 6, "#1B2559")}
      {node(360, 300, 6, "#A9781F")}
      <path d="M132 230l25 15" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

/** Two connecting message threads — conversation-first, for the Contact page hero. */
export function IllustrationContact() {
  const id = "contact";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* incoming message */}
      <path d="M120 190h130a14 14 0 0114 14v66a14 14 0 01-14 14H190l-24 22v-22h-46a14 14 0 01-14-14v-66a14 14 0 0114-14Z" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <rect x="140" y="216" width="90" height="6" rx="3" fill="#E4E6EB" />
      <rect x="140" y="232" width="70" height="6" rx="3" fill="#E4E6EB" />
      {/* reply message, engineer's answer */}
      <path d="M230 260h130a14 14 0 0114 14v56a14 14 0 01-14 14H300l-1 20-26-20h-43a14 14 0 01-14-14v-56a14 14 0 0114-14Z" fill={`url(#warm-${id})`} />
      <rect x="252" y="284" width="90" height="6" rx="3" fill="rgba(255,255,255,.75)" />
      <rect x="252" y="300" width="60" height="6" rx="3" fill="rgba(255,255,255,.6)" />
      {node(120, 150, 6, "#1B2559")}
      {node(370, 190, 6, "#A9781F")}
      {node(340, 350, 5, "#B23A1A")}
      <path d="M140 160l20 30" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

/** Calipers measuring a signal against a baseline — engineering discipline, for the About page. */
export function IllustrationAbout() {
  const id = "about";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* measurement frame */}
      <rect x="130" y="160" width="220" height="170" rx="12" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      {/* baseline vs measured signal */}
      <path d="M152 292h176" stroke="#E4E6EB" strokeWidth="1.5" strokeDasharray="4 6" />
      <path
        d="M152 286l30-8 24 12 26-40 28 22 24-46 26 18"
        fill="none" stroke={`url(#warm-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* tick marks — the discipline of measurement */}
      <g stroke="#CBCED6" strokeWidth="1.4">
        <path d="M152 300v10M196 300v7M240 300v10M284 300v7M328 300v10" />
      </g>
      {/* theta mark — the brand's second half */}
      <ellipse cx="240" cy="196" rx="14" ry="18" fill="none" stroke="#1B2559" strokeWidth="2.2" />
      <path d="M228 196h24" stroke="#1B2559" strokeWidth="2.2" strokeLinecap="round" />
      {node(112, 200, 6, "#1B2559")}
      {node(372, 290, 6, "#A9781F")}
      {node(360, 170, 5, "#B23A1A")}
      <path d="M134 210l20 12" stroke="#CBCED6" strokeWidth="1.2" />
    </svg>
  );
}

/** Staged pipeline with a gate — proof before production, for the Process page. */
export function IllustrationProcess() {
  const id = "process";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* pipeline rail */}
      <path d="M110 240h260" stroke="#E4E6EB" strokeWidth="10" strokeLinecap="round" />
      {/* completed portion */}
      <path d="M110 240h150" stroke={`url(#warm-${id})`} strokeWidth="4" strokeLinecap="round" />
      {/* stage markers */}
      <circle cx="110" cy="240" r="14" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2.5" />
      <path d="M104 240l5 5 9-10" stroke={`url(#warm-${id})`} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="185" cy="240" r="14" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2.5" />
      <path d="M179 240l5 5 9-10" stroke={`url(#warm-${id})`} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* the human gate — amber, paused */}
      <circle cx="260" cy="240" r="20" fill="#fff" stroke="#A9781F" strokeWidth="2.5" />
      <rect x="254" y="232" width="4" height="16" rx="2" fill="#A9781F" />
      <rect x="262" y="232" width="4" height="16" rx="2" fill="#A9781F" />
      {/* pending stages */}
      <circle cx="335" cy="240" r="12" fill="#fff" stroke="#CBCED6" strokeWidth="2" />
      {/* spec card above, fixed price */}
      <rect x="150" y="130" width="120" height="66" rx="10" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      <rect x="166" y="150" width="56" height="7" rx="3.5" fill="#E4E6EB" />
      <rect x="166" y="166" width="80" height="6" rx="3" fill="#E4E6EB" />
      <path d="M260 214v-18" stroke="#CBCED6" strokeWidth="1.2" strokeDasharray="3 4" />
      {node(370, 180, 6, "#1B2559")}
      {node(120, 320, 5, "#B23A1A")}
    </svg>
  );
}

/** Shipped outcome card with verification seal — for the Case studies page. */
export function IllustrationCaseStudies() {
  const id = "cases";
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* stacked result cards, depth */}
      <rect x="164" y="200" width="180" height="130" rx="12" fill="#F0EEE9" transform="rotate(6 254 265)" />
      <rect x="140" y="170" width="200" height="140" rx="12" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
      {/* outcome metric */}
      <rect x="164" y="194" width="70" height="9" rx="4.5" fill="#E4E6EB" />
      <path d="M164 268l30-26 24 18 30-38 26 22" fill="none" stroke={`url(#warm-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="164" y="288" width="110" height="6" rx="3" fill="#E4E6EB" />
      {/* verification seal */}
      <circle cx="336" cy="180" r="26" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2.4" />
      <path d="M325 180l7 7 15-16" stroke={`url(#warm-${id})`} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* in-production indicator */}
      <circle cx="176" cy="330" r="5" fill="#1B2559" />
      <rect x="190" y="325" width="60" height="9" rx="4.5" fill="#E4E6EB" />
      {node(110, 230, 6, "#A9781F")}
      {node(372, 300, 5, "#B23A1A")}
    </svg>
  );
}

/** Six sector facets around a shared engineering core — for the Industries index page. */
export function IllustrationIndustries() {
  const id = "inds";
  const facets: [number, number, string][] = [
    [240, 148, "#1B2559"],
    [318, 194, "#A9781F"],
    [318, 286, "#B23A1A"],
    [240, 332, "#1B2559"],
    [162, 286, "#A9781F"],
    [162, 194, "#B23A1A"],
  ];
  return (
    <svg viewBox="0 0 480 480" aria-hidden="true">
      {defs(id)}
      {bg(id)}
      {/* spokes from the shared core */}
      <g stroke="#D8DAE0" strokeWidth="1.2">
        {facets.map(([x, y], i) => (
          <line key={i} x1="240" y1="240" x2={x} y2={y} />
        ))}
      </g>
      {/* six sector tiles */}
      {facets.map(([x, y, color], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 18} width="44" height="36" rx="9" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="6" fill={color} />
        </g>
      ))}
      {/* shared engineering core */}
      <circle cx="240" cy="240" r="34" fill="#fff" stroke={`url(#warm-${id})`} strokeWidth="2.4" />
      <circle cx="240" cy="240" r="16" fill={`url(#warm-${id})`} />
    </svg>
  );
}
