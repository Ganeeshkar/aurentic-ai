import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Case Studies — Foxtheta",
  description:
    "How Foxtheta's engagements are structured — challenge, architecture, governance model, and outcome — with honest labeling of what's a live client story and what's a representative pattern.",
  path: "/case-studies",
});

const PATTERNS = [
  {
    label: "Representative engagement pattern",
    title: "Finance operations, reconciliation and invoice matching",
    challenge: "A finance team spent the majority of every close cycle manually matching transactions across bank feeds, ledgers, and payment gateways, with three-way invoice matching handled by a rotating group of analysts.",
    architecture: "A reconciliation agent runs nightly matching cycles and surfaces only true exceptions with evidence attached; an invoice-to-pay agent reads incoming invoices, matches them against POs and goods receipts, and preps payment runs for one-click approval.",
    governance: "Payment approval stays with a named human approver at every run. Every match, exception, and override is logged for the audit trail.",
    metrics: [
      { value: "90%+", label: "touchless invoice processing target" },
      { value: "4 days", label: "cut from a typical monthly close cycle" },
    ],
  },
  {
    label: "Representative engagement pattern",
    title: "Customer experience, overnight support coverage",
    challenge: "Support tickets filed outside business hours sat unanswered until the next morning, with median first response measured in hours, not minutes.",
    architecture: "An agent crew triages the overnight queue: resolving routine requests directly, drafting responses to complex ones for morning review, and gating refunds behind human approval regardless of ticket volume.",
    governance: "Refunds and account changes always route to a human approver. The team receives a structured brief each morning, not a black-box summary.",
    metrics: [
      { value: "9 hrs → 4 min", label: "target median first response" },
      { value: "100%", label: "refund actions human-approved" },
    ],
  },
  {
    label: "Representative engagement pattern",
    title: "Supply chain, shipment exceptions and supplier paperwork",
    challenge: "Shipment exceptions were discovered by customers before the operations team, and supplier paperwork — POs, ASNs, certificates — regularly blocked production lines waiting on manual chasing.",
    architecture: "A shipment exception handler watches every shipment across carriers and re-books, re-routes, or escalates automatically. A supplier document agent processes paperwork across formats and languages and chases suppliers for what's missing.",
    governance: "Re-routing decisions above a defined cost threshold require operations sign-off. All supplier communications are logged and reviewable.",
    metrics: [
      { value: "0", label: "target shipments delayed by paperwork" },
      { value: "Under 6 hrs", label: "target exception resolution window, overnight" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        crumb="Case studies"
        label="Case studies"
        title={<>Systems in production, not pitches in a <span className="grad">deck.</span></>}
        lede="Anonymized where clients require it. Verifiable where they don't. Every case study below follows the same structure: the challenge, the architecture, the governance model, and the outcome we engineered toward."
      />

      <section className="section">
        <div className="container">
          <div className="notice reveal">
            We label our proof honestly. The patterns below are <b style={{ color: "var(--bone)" }}>representative
            engagements</b> — composites built from the parameters we actually design around, not
            a specific named client. As live engagements clear the confidentiality bar our clients
            set, this page will carry named, verifiable case studies in their place. We'd rather
            show you an honest pattern than a borrowed logo.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            {PATTERNS.map((p) => (
              <article className="case-card reveal" key={p.title}>
                <span className="c-label">{p.label}</span>
                <h3>{p.title}</h3>
                <div className="case-metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <b>{m.value}</b>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
                <p className="c-desc"><b style={{ color: "var(--bone)" }}>Challenge — </b>{p.challenge}</p>
                <p className="c-desc"><b style={{ color: "var(--bone)" }}>Architecture — </b>{p.architecture}</p>
                <p className="c-desc"><b style={{ color: "var(--bone)" }}>Governance — </b>{p.governance}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--panel">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">Ask our clients yourself</p>
            <h2>
              We&rsquo;d rather set up a reference call than write our own <span className="grad">praise.</span>
            </h2>
            <p className="section-intro">
              Once you&rsquo;re a qualified prospect in an active conversation, we&rsquo;ll connect
              you directly with a current client for an unscripted reference call — no marketing
              quote required.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">
            Let&rsquo;s make yours the next real case <span className="grad">study.</span>
          </h2>
          <div className="hero-actions reveal" style={{ marginTop: "2rem" }}>
            <Link className="btn" href="/contact">
              Talk to an expert <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
