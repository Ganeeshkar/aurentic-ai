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
            <circle cx="210" cy="210" r="17" fill="#B23A1A" />
            <circle cx="120" cy="120" r="9" fill="#1B2559" />
            <circle cx="300" cy="130" r="9" fill="#1B2559" />
            <circle cx="315" cy="270" r="9" fill="#A9781F" />
            <circle cx="150" cy="310" r="9" fill="#A9781F" />
            <circle cx="95" cy="240" r="9" fill="#1B2559" />
            <rect x="188" y="188" width="44" height="44" rx="10" fill="none" stroke="#B23A1A" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
