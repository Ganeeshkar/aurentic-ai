export function WhySection() {
  return (
    <section className="section section-glow section-glow--cool">
      <div className="container split">
        <div className="split-media reveal">
          <svg viewBox="0 0 560 420" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
            <rect width="560" height="420" fill="#F6F5F2" />
            <rect x="60" y="60" width="440" height="300" rx="10" fill="none" stroke="#CBCED6" strokeWidth="1.2" />
            <rect x="90" y="100" width="150" height="18" rx="4" fill="#E7E2D9" />
            <rect x="90" y="132" width="220" height="10" rx="3" fill="#E7E2D9" />
            <rect x="90" y="152" width="180" height="10" rx="3" fill="#E7E2D9" />
            <circle cx="430" cy="150" r="40" fill="none" stroke="#B23A1A" strokeWidth="1.6" />
            <path d="M412 150l13 13 25-27" stroke="#B23A1A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="90" y="220" width="380" height="1" fill="#CBCED6" />
            <rect x="90" y="250" width="120" height="10" rx="3" fill="#E7E2D9" />
            <rect x="90" y="270" width="300" height="10" rx="3" fill="#E7E2D9" />
            <rect x="90" y="290" width="260" height="10" rx="3" fill="#E7E2D9" />
            <circle cx="140" cy="330" r="5" fill="#A9781F" />
            <circle cx="165" cy="330" r="5" fill="#1B2559" />
            <circle cx="190" cy="330" r="5" fill="#B23A1A" />
          </svg>
        </div>
        <div className="reveal">
          <p className="klabel">06 / Why Foxtheta</p>
          <h2>Engineering discipline, not AI hype.</h2>
          <p>
            Our name is our promise: <b style={{ color: "var(--fire)" }}>fox</b>-sharp about what
            AI can really do, <b style={{ color: "var(--fire)" }}>theta</b>-disciplined about
            proving it before it runs unsupervised. That plays out in four commitments most
            vendors won’t put in writing:
          </p>
          <ul className="checklist">
            <li>
              <b>Fixed price means fixed.</b> The spec is signed before we build. Our estimation
              mistakes are our cost, not yours.
            </li>
            <li>
              <b>Humans stay in charge.</b> Money, deletions, and customer-facing sends pause for
              one-click human approval — always.
            </li>
            <li>
              <b>Everything is measured.</b> Agents graduate on scorecards, not demos, and get
              re-tested every night in production.
            </li>
            <li>
              <b>You own it all.</b> Code, prompts, integrations, documentation. No lock-in, no
              hostage fees.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
