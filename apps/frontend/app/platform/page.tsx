import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { IllustrationPlatformInfra } from "@/components/shared/IndustryIllustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Platform & Trust — Architecture, Governance, Security, LLMOps — Foxtheta",
  description:
    "The engineering under every system we ship: model-agnostic architecture, data boundaries, human approval gates, and the LLMOps discipline that keeps AI systems reliable after go-live.",
  path: "/platform",
});

const LAYERS = [
  {
    name: "Interface",
    body: "Copilots, chat surfaces, and dashboards your teams actually use — embedded in existing tools wherever possible, rather than one more tab to check.",
  },
  {
    name: "Orchestration",
    body: (
      <>
        Agent coordination, permission scopes, and human approval gates. Consequential actions —
        money movement, deletions, customer-facing sends — <b>pause for one-click human approval
        by architecture</b>, not by policy that a future config change could quietly remove.
      </>
    ),
  },
  {
    name: "Model",
    body: "Benchmarked per task against your real workflows, not launch-day headlines. Swappable by design — no single-vendor lock-in, and the scorecard picks the stack.",
  },
  {
    name: "Data",
    body: "Least-privilege access agreed in writing before any code: what each agent can read, retention windows, and deletion. Your data is never used to train public models.",
  },
  {
    name: "Infrastructure",
    body: "Containerized, deployed to your cloud where possible, integrated with your existing identity and access management — not a parallel system your security team has to learn.",
  },
];

const GOVERNANCE = [
  { title: "Autonomy is earned, not granted", body: "Systems gain permissions the way new employees do — by building a track record in shadow mode under supervision. There is no single switch that grants full autonomy." },
  { title: "Every action is logged", body: "What ran, what it read, what it changed, and why — reviewable by your team at any time, not reconstructed after an incident." },
  { title: "Consequential actions pause for a human", body: "Money movement, data deletion, and customer-facing communication require one-click approval. That boundary lives in the system architecture, not in a prompt instruction." },
  { title: "Reviewed by your team, not just ours", body: "Every engagement includes a permission map and data-flow diagram your security and compliance reviewers can interrogate directly." },
];

const SECURITY = [
  { title: "Least-privilege by default", body: "Every credential an agent holds is scoped to exactly the systems and actions it needs — nothing broader, granted for convenience." },
  { title: "Data never trains public models", body: "Your documents, tickets, and conversations stay inside the boundary we agree with you in writing. No exceptions, no fine print." },
  { title: "Idempotent, retry-safe integrations", body: "Connections to your CRM, ERP, and helpdesk are typed, tested, and safe to retry — a failed run doesn't mean a duplicated action." },
  { title: "Incident-ready by design", body: "Anything that can be rolled back, is. When something does go wrong, the audit trail tells you what happened before your customer does." },
];

const LLMOPS = [
  { title: "Nightly accuracy re-testing", body: "Every production system is re-run against benchmark tasks overnight — drift is caught by us, not by your customers." },
  { title: "Drift & cost telemetry", body: "Model updates, data shifts, and volume growth all change system behavior over time. We monitor for it continuously, not at the next contract renewal." },
  { title: "Plain-English reporting", body: "Monthly reviews written for the business owner accountable for the outcome, not just the engineer who built it." },
  { title: "Full handover option", body: "Documentation, runbooks, and training so the capability stays with your team whether we keep operating it or not." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        crumb="Platform & Trust"
        label="Platform & Trust"
        title={<>The engineering under every system we <span className="grad">ship.</span></>}
        lede="Model-agnostic by design. Reviewed by your security team, not just ours. This is the architecture, governance, and operational discipline that makes autonomy something you can actually grant."
        art={<IllustrationPlatformInfra />}
      />

      <section className="section" id="architecture">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">01 / Architecture</p>
            <h2>
              Five layers, reviewed independently by your <span className="grad">team.</span>
            </h2>
            <p className="section-intro">
              Nothing here is a black box. Every engagement ships with a diagram of exactly how
              these layers connect for your specific system.
            </p>
          </div>
          <div className="layer-stack reveal">
            {LAYERS.map((layer) => (
              <div className="layer" key={layer.name}>
                <span className="l-name">{layer.name}</span>
                <p>{layer.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--panel" id="governance">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">02 / AI Governance</p>
            <h2>
              Autonomy you can <span className="grad">audit.</span>
            </h2>
          </div>
          <div className="svc-grid reveal-stagger" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {GOVERNANCE.map((g) => (
              <div className="svc" style={{ minHeight: "auto" }} key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="security">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">03 / AI Security</p>
            <h2>
              Built to pass your review, not just <span className="grad">ours.</span>
            </h2>
          </div>
          <div className="svc-grid reveal-stagger" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {SECURITY.map((s) => (
              <div className="svc" style={{ minHeight: "auto" }} key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--panel" id="llmops">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">04 / LLMOps & Observability</p>
            <h2>
              Reliability doesn&rsquo;t end at <span className="grad">go-live.</span>
            </h2>
          </div>
          <div className="svc-grid reveal-stagger" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {LLMOPS.map((l) => (
              <div className="svc" style={{ minHeight: "auto" }} key={l.title}>
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">
            Send this page to your security <span className="grad">reviewer.</span>
          </h2>
          <p className="lede reveal">
            We&rsquo;ll follow up with a written architecture brief formatted for procurement and
            security review — not a slide deck.
          </p>
          <div className="hero-actions reveal">
            <Link className="btn" href="/contact">
              Request the architecture brief <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
