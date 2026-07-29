import Link from "next/link";

const INDUSTRIES = [
  { label: "Banking & Financial Services", href: "/industries/banking" },
  { label: "Insurance", href: "/industries/insurance" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Retail & E-commerce", href: "/industries/retail" },
  { label: "Logistics", href: "/industries/logistics" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-trust" aria-label="Engineering commitments">
          <span>Model-agnostic</span>
          <span>Least-privilege by default</span>
          <span>Full audit trail</span>
          <span>Human-gated autonomy</span>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" href="/" aria-label="Foxtheta home">
              <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
                <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="#B23A1A" strokeWidth="3" opacity=".4" />
                <circle cx="32" cy="32" r="16" fill="none" stroke="#F3F1EC" strokeWidth="5" />
                <line x1="18" y1="32" x2="46" y2="32" stroke="#B23A1A" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span>Foxtheta</span>
            </Link>
            <p>
              A global AI and intelligent automation partner — we design, build, and operate
              production AI systems for regulated and high-volume industries, from strategy
              through 24/7 operation.
            </p>
          </div>
          <div>
            <h4>Industries</h4>
            <ul>
              {INDUSTRIES.map((ind) => (
                <li key={ind.label}><Link href={ind.href}>{ind.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Technology</h4>
            <ul>
              <li><Link href="/technology#agentic">Agentic AI</Link></li>
              <li><Link href="/technology#rag">Enterprise RAG</Link></li>
              <li><Link href="/technology#copilots">AI Copilots</Link></li>
              <li><Link href="/technology#documents">Document Intelligence</Link></li>
              <li><Link href="/platform">Platform &amp; Trust</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/process">Process</Link></li>
              <li><Link href="/case-studies">Case studies</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms of service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Foxtheta · foxtheta.com</span>
          <span>hello@foxtheta.com · Offices &amp; delivery teams, worldwide</span>
        </div>
      </div>
    </footer>
  );
}
