import Link from "next/link";

export function UseCaseTeaserSection() {
  return (
    <section className="section section--panel">
      <div className="container">
        <div className="section-head reveal">
          <div className="head-row">
            <div>
              <p className="klabel">03 / How we build it</p>
              <h2>
                The technology behind every industry <span className="grad">solution.</span>
              </h2>
            </div>
            <Link className="text-link" href="/technology">
              Explore our technology <span className="arr">→</span>
            </Link>
          </div>
        </div>
        <div className="split">
          <div className="reveal">
            <p className="lede" style={{ maxWidth: "none", marginBottom: "1.6rem" }}>
              Every industry engagement draws on the same engineering foundation: agentic AI
              orchestration, enterprise retrieval, document intelligence, and copilots — governed
              by permission scopes, human approval gates, and a complete audit trail.
            </p>
            <ul className="checklist">
              <li>
                <b>Agentic AI:</b> multi-agent systems that plan, decide, and act across your
                applications.
              </li>
              <li>
                <b>Enterprise RAG:</b> retrieval over your proprietary knowledge, with citations
                and access controls.
              </li>
              <li>
                <b>Document Intelligence:</b> extraction and reasoning over unstructured documents
                at enterprise volume.
              </li>
            </ul>
            <Link className="btn" style={{ marginTop: "1.8rem" }} href="/technology">
              See the full technology stack <span className="arr">→</span>
            </Link>
          </div>
          <div className="split-media reveal">
            <svg viewBox="0 0 560 400" style={{ width: "100%", height: "auto" }} aria-hidden="true">
              <rect width="560" height="400" fill="#F6F5F2" />
              <g stroke="#CBCED6" strokeWidth="1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 50} x2="560" y2={i * 50} />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
                ))}
              </g>
              <circle cx="150" cy="150" r="10" fill="#B23A1A" />
              <circle cx="330" cy="110" r="7" fill="#1B2559" />
              <circle cx="420" cy="230" r="7" fill="#1B2559" />
              <circle cx="220" cy="280" r="7" fill="#A9781F" />
              <g stroke="#B23A1A" strokeWidth="1.4">
                <line x1="150" y1="150" x2="330" y2="110" />
                <line x1="150" y1="150" x2="220" y2="280" />
                <line x1="330" y1="110" x2="420" y2="230" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
