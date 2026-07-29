import Link from "next/link";
import { SplitHeading } from "@/components/shared/SplitHeading";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div>
          <p className="klabel">Global AI &amp; Intelligent Automation Partner</p>
          <SplitHeading as="h1">
            AI solutions built for the way <span className="grad">your</span> industry
            actually runs.
          </SplitHeading>
          <p className="lede">
            Foxtheta partners with banking, insurance, healthcare, manufacturing, retail, and
            logistics organizations to design, build, and operate AI and intelligent automation
            systems — from the first roadmap conversation to systems running unsupervised in
            production.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/industries">
              Explore your industry <span className="arr">→</span>
            </Link>
            <Link className="btn-ghost" href="/contact">
              Talk to an expert
            </Link>
          </div>
          <div className="trust-strip" aria-label="Engineering commitments">
            <span>Model-agnostic</span>
            <span>Least-privilege by default</span>
            <span>Full audit trail</span>
            <span>Human-gated autonomy</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 420 420" fill="none">
            <defs>
              <linearGradient id="hero-warm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C9622F" />
                <stop offset="100%" stopColor="#8A2C12" />
              </linearGradient>
              <linearGradient id="hero-cool" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3A4A96" />
                <stop offset="100%" stopColor="#1B2559" />
              </linearGradient>
              <radialGradient id="hero-glow" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#B23A1A" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#B23A1A" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="210" cy="210" r="205" fill="url(#hero-glow)" />
            <path
              d="M85 95c60-42 165-34 214 20 45 49 44 133-6 178-52 47-142 51-195 5-58-51-70-158-13-203Z"
              fill="#F6F5F2"
              opacity="0.9"
            />
            <circle cx="210" cy="210" r="190" stroke="#EEE9E1" strokeWidth="1.5" />
            <circle cx="210" cy="210" r="140" stroke="#EEE9E1" strokeWidth="1.5" />
            <g stroke="#CBCED6" strokeWidth="1.2">
              <line x1="210" y1="210" x2="120" y2="120" />
              <line x1="210" y1="210" x2="300" y2="130" />
              <line x1="210" y1="210" x2="315" y2="270" />
              <line x1="210" y1="210" x2="150" y2="310" />
              <line x1="210" y1="210" x2="95" y2="240" />
              <line x1="120" y1="120" x2="300" y2="130" />
              <line x1="300" y1="130" x2="315" y2="270" />
              <line x1="150" y1="310" x2="95" y2="240" />
            </g>

            {/* orchestration hub */}
            <circle cx="210" cy="210" r="30" fill="#fff" stroke="url(#hero-warm)" strokeWidth="2" />
            <circle cx="210" cy="210" r="17" fill="url(#hero-warm)" />

            {/* floating insight card */}
            <rect x="182" y="60" width="118" height="70" rx="12" fill="#fff" stroke="#E4E6EB" strokeWidth="1.5" transform="rotate(-4 241 95)" />
            <rect x="196" y="78" width="50" height="7" rx="3.5" fill="#E4E6EB" transform="rotate(-4 241 95)" />
            <path d="M196 108l16-14 14 10 20-22" stroke="url(#hero-warm)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-4 241 95)" />

            <circle cx="120" cy="120" r="9" fill="url(#hero-cool)" />
            <circle cx="300" cy="130" r="9" fill="url(#hero-cool)" />
            <circle cx="315" cy="270" r="9" fill="#A9781F" />
            <circle cx="150" cy="310" r="9" fill="#A9781F" />
            <circle cx="95" cy="240" r="9" fill="url(#hero-cool)" />
            <rect x="188" y="188" width="44" height="44" rx="10" fill="none" stroke="url(#hero-warm)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
