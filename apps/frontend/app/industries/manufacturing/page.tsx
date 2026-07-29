import { IndustryPageTemplate, IndustryPageData } from "@/components/shared/IndustryPageTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Manufacturing AI Solutions — Quality, Supplier Docs & Knowledge — Foxtheta",
  description:
    "AI and intelligent automation for manufacturers: quality-incident triage, supplier document automation, technical knowledge engines, and production reporting. Business challenges, solutions, ROI, and FAQs.",
  path: "/industries/manufacturing",
});

const DATA: IndustryPageData = {
  crumb: "Manufacturing",
  title: <>AI that turns decades of plant knowledge into an answer in <span className="grad">seconds.</span></>,
  lede: "Quality incidents, supplier paperwork, and troubleshooting knowledge all move at the speed of the person who happens to know where to look. We engineer AI systems that make that knowledge instantly available — and that never delay a line for a missing form.",

  challenges: [
    {
      title: "Quality incidents take too long to root-cause",
      body: "Correlating a defect report against batch history, supplier records, and sensor data is manual detective work that delays the fix while the line keeps running.",
    },
    {
      title: "Supplier paperwork blocks the line",
      body: "Purchase orders, ASNs, and certificates arrive in every format imaginable, and chasing suppliers for what's missing is a full-time job that only gets attention once it's already a problem.",
    },
    {
      title: "Institutional knowledge lives in people, not systems",
      body: "Decades of manuals, service tickets, and engineering notes hold the answer to most troubleshooting questions — but finding it depends on which senior engineer happens to be free.",
    },
    {
      title: "Production reporting lags the shop floor",
      body: "By the time downtime and output figures reach a manager's dashboard, the shift that caused the variance is already over.",
    },
  ],

  solutionsIntro: "Each ships with permission scopes, human approval gates, and a complete action log — engineered to survive a plant-floor audit, not just a demo.",
  solutions: [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 3.5 19 6v6c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Quality-incident triage",
      body: "Ingests defect reports and sensor anomalies, correlates against batch and supplier history, and routes prioritised incidents to the right engineer with context attached.",
      bullets: ["Automated batch correlation", "Prioritised routing", "Root-cause time cut sharply"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
      title: "Supplier document automation",
      body: "Processes POs, ASNs, certificates, and customs paperwork across formats and languages, and chases suppliers for what's missing before it blocks the line.",
      bullets: ["Multi-format, multi-language", "Automated supplier follow-up", "Zero shipments delayed by paperwork"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 19V5a2 2 0 012-2h13v18H6a2 2 0 01-2-2zm0 0a2 2 0 012-2h13" />
          <path d="M9 7h6M9 11h4" />
        </svg>
      ),
      title: "Technical knowledge engine",
      body: "Turns decades of manuals, service tickets, and engineering notes into a system that answers troubleshooting questions in seconds — with the source cited every time.",
      bullets: ["Cited answers, always", "Every engineer, not just seniors", "15+ hrs/engineer/month recovered"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      ),
      title: "Production & downtime reporting",
      body: "Aggregates shift, downtime, and output data into a live report the moment it happens, instead of a summary that arrives the next morning.",
      bullets: ["Near-real-time aggregation", "Downtime cause tagging", "No more day-after surprises"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h16M4 17h7" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="14" cy="17" r="2.5" />
        </svg>
      ),
      title: "Safety & compliance documentation",
      body: "Assembles and cross-checks safety and regulatory filings against the underlying incident and inspection records, flagging gaps before an audit finds them.",
      bullets: ["Gaps flagged before audit", "Cross-checked against source records", "Human sign-off, always"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
        </svg>
      ),
      title: "Supplier communication automation",
      body: "Drafts and tracks supplier correspondence — delivery confirmations, quality holds, corrective-action requests — in your standard language, queued for review before send.",
      bullets: ["Standard-language drafts", "Full correspondence tracking", "Drafted, never auto-sent"],
    },
  ],

  approach: [
    { marker: "01", window: "Week 0 · Free", title: "Discovery & architecture", body: "An engineer maps your quality, supplier, or knowledge workflow live on the call and gives you an honest read on feasibility, cost, and return." },
    { marker: "02", window: "Week 1–2 · Fixed price", title: "Signed specification", body: "We design the system, define exactly where humans approve and where AI acts, and agree success metrics in a fixed-price spec — signed before a line of code." },
    { marker: "03", window: "Week 3–6", title: "Shadow-mode validation", body: "The system runs on real incidents, documents, or queries in parallel while your engineers grade its output daily. It graduates to live work only when the scorecard clears the bar." },
    { marker: "04", window: "Ongoing", title: "Operate & govern", body: "We monitor accuracy nightly, tune for drift and cost, and report in plain English — or hand over documentation and runbooks so your team runs it independently." },
  ],

  featuresIntro: "These aren't settings you could accidentally turn off — they're how the system is built.",
  features: [
    "Every consequential action — a line stop, a supplier hold, a regulatory filing — pauses for one-click human approval by architecture, not by policy.",
    "Knowledge-engine answers are always cited back to the source manual, ticket, or note, so an engineer can verify the reasoning in seconds.",
    "Full action log: what ran, what it read, what it changed, and why, reviewable by your quality and compliance teams at any time.",
    "Model-agnostic by design: models are benchmarked against your real defect, document, and technical data, not chosen on launch-day headlines.",
    "Nightly accuracy re-testing against benchmark cases, so drift is caught by us before it reaches the line or an auditor.",
  ],

  roiMetrics: [
    { value: "−40%", label: "target reduction in quality-incident root-cause time" },
    { value: "15+ hrs", label: "recovered per engineer, per month, on troubleshooting" },
    { value: "0", label: "target shipments delayed by supplier paperwork" },
  ],

  techChips: [
    "Python & TypeScript engineering",
    "Model-agnostic LLM orchestration",
    "Vector & hybrid retrieval over technical archives",
    "PostgreSQL & event-sourced audit logs",
    "Your cloud, containerized deployment",
    "MES / ERP / supplier-portal integrations",
  ],

  useCases: [
    { title: "A defect gets root-caused before the shift ends", body: "A quality-incident report is automatically correlated against batch and supplier history, arriving at the right engineer's desk with context instead of a bare ticket.", impact: "Quality-incident triage in action" },
    { title: "A shipment doesn't wait on missing paperwork", body: "A supplier's certificate arrives in a non-standard format, gets extracted and matched automatically, and a follow-up request goes out before it can delay the line.", impact: "Supplier document automation in action" },
    { title: "A junior engineer troubleshoots like a 20-year veteran", body: "A question about an unfamiliar fault code returns a cited answer pulled from decades of service tickets and manuals in seconds, not a phone call to a senior colleague.", impact: "Technical knowledge engine in action" },
    { title: "Downtime is visible the moment it happens", body: "A line stoppage is tagged, aggregated, and visible on the production dashboard in near-real time instead of the next morning's report.", impact: "Production & downtime reporting in action" },
    { title: "A compliance gap is caught before the auditor arrives", body: "A safety filing is cross-checked against the underlying inspection records automatically, surfacing a missing signature weeks ahead of the audit date.", impact: "Safety & compliance documentation in action" },
    { title: "A quality hold is communicated the same day", body: "A corrective-action request drafts itself in the standard supplier-communication format, ready for a quality manager's one-click review and send.", impact: "Supplier communication automation in action" },
  ],

  faqItems: [
    {
      question: "Can this integrate with our MES and ERP systems?",
      answer: "Yes — we connect to your existing manufacturing execution system, ERP, and supplier portals through typed, tested, least-privilege connections. No migration off your systems of record is required to adopt an agent.",
    },
    {
      question: "How do you handle proprietary technical documentation?",
      answer: "Your manuals, tickets, and engineering notes stay inside the data boundary we agree with you in writing — never used to train public models. The knowledge engine indexes only what you grant it access to, and every answer cites the specific source document.",
    },
    {
      question: "Who is accountable if the AI misroutes a quality incident?",
      answer: "Triage and routing are recommendations with full supporting evidence attached — a quality engineer makes the call and the record shows exactly what informed it. Line stops and supplier holds require human approval by architecture, not by policy.",
    },
    {
      question: "Which AI models do you use for technical and defect data?",
      answer: "We're model-agnostic by design: during the specification stage we benchmark candidate models against your actual defect reports and technical documents for accuracy, speed, and cost, and select on evidence.",
    },
    {
      question: "How long until we see a working system?",
      answer: "Most engagements have an agent running in shadow mode — processing real incidents or documents in parallel, graded by your team — within three to six weeks of the signed specification. It only goes live once it clears the accuracy bar your team set.",
    },
  ],

  ctaTitle: <>Bring us the workflow that&rsquo;s slowing down your <span className="grad">line.</span></>,
  ctaLede: "A free 30-minute call with an engineer who understands plant-floor operations, not a generalist salesperson.",
};

export default function ManufacturingIndustryPage() {
  return <IndustryPageTemplate data={DATA} />;
}
