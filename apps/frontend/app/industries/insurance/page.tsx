import { IndustryPageTemplate, IndustryPageData } from "@/components/shared/IndustryPageTemplate";
import { IllustrationInsurance } from "@/components/shared/IndustryIllustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insurance AI Solutions — Claims, Underwriting & Fraud Review — Foxtheta",
  description:
    "AI and intelligent automation for insurers: claims intake and triage, coverage verification, underwriting pre-screening, and fraud review. Business challenges, solutions, ROI, technology, and FAQs.",
  path: "/industries/insurance",
});

const DATA: IndustryPageData = {
  crumb: "Insurance",
  title: <>AI that reads a claim as carefully as your best <span className="grad">adjuster.</span></>,
  lede: "Claims, underwriting, and renewal operations run on documents — forms, photos, reports, policy wording — and on the accuracy of matching them to each other. We engineer AI systems for exactly that matching problem.",
  art: <IllustrationInsurance />,

  challenges: [
    {
      title: "Claims intake is a paperwork bottleneck",
      body: "Every claim arrives as a bundle of forms, photos, and reports that has to be read, extracted, and checked against the actual policy wording before an adjuster ever sees it.",
    },
    {
      title: "Underwriting waits on incomplete files",
      body: "Risk assessment can't start until every supporting document has been chased down, and most of that chasing is manual follow-up, not underwriting judgment.",
    },
    {
      title: "Fraud investigation starts from a ticket number",
      body: "Investigators open a flagged claim with no context and spend the first hours of every case reconstructing history and patterns that already exist somewhere in your systems.",
    },
    {
      title: "Renewal outreach is reactive, not proactive",
      body: "Policies lapse and retention conversations happen late because tracking renewal dates and coverage gaps at scale is a spreadsheet problem nobody owns end to end.",
    },
  ],

  solutionsIntro: "Each ships with permission scopes, human approval gates, and a complete action log — engineered for your regulatory review, not just your demo day.",
  solutions: [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 3.5 19 6v6c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Claims intake & triage agent",
      body: "Reads claim bundles — forms, photos, reports — extracts the facts, checks coverage against the actual policy wording, and routes to the right adjuster with a one-page brief.",
      bullets: ["Multi-document extraction", "Policy-wording cross-check", "Intake-to-adjuster in minutes"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
      title: "Coverage verification agent",
      body: "Cross-references claim details against policy terms, endorsements, and exclusions, and flags coverage questions for human review instead of guessing at ambiguous wording.",
      bullets: ["Citation-backed coverage checks", "Ambiguity flagged, not guessed", "Consistent across adjusters"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" />
        </svg>
      ),
      title: "Underwriting pre-screening",
      body: "Assembles applicant and risk files, verifies supporting documents, and computes exposure against policy — handing underwriters a complete pre-read, never an auto-decision.",
      bullets: ["Complete pre-read, not an auto-decision", "Policy-based exposure checks", "Faster time to quote"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h16M4 17h7" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="14" cy="17" r="2.5" />
        </svg>
      ),
      title: "Fraud-flag review queue",
      body: "Pre-investigates flagged claims: gathers history, patterns, and context so investigators start with a dossier instead of a ticket number.",
      bullets: ["Automated case dossiers", "Pattern & history correlation", "Investigation prep time cut sharply"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
        </svg>
      ),
      title: "Renewal & retention outreach",
      body: "Tracks renewal dates, drafts personalised renewal summaries with any coverage-gap notes, and queues them for agent review before send.",
      bullets: ["Zero missed renewal windows", "Coverage-gap notes included", "Drafted, never auto-sent"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
        </svg>
      ),
      title: "Claims status communication",
      body: "Keeps policyholders updated on claim status automatically, in your approved language, cutting the volume of \"where's my claim\" calls to your service team.",
      bullets: ["Status updates, drafted automatically", "Compliance-approved language", "Fewer inbound status calls"],
    },
  ],

  approach: [
    { marker: "01", window: "Week 0 · Free", title: "Discovery & architecture", body: "An engineer maps your claims, underwriting, or renewal workflow live on the call and gives you an honest read on feasibility, cost, and return." },
    { marker: "02", window: "Week 1–2 · Fixed price", title: "Signed specification", body: "We design the system, define exactly where humans approve and where AI acts, and agree success metrics in a fixed-price spec — signed before a line of code." },
    { marker: "03", window: "Week 3–6", title: "Shadow-mode validation", body: "The system runs on real claims and applications in parallel while your adjusters and underwriters grade its output daily. It graduates to live work only when the scorecard clears the bar." },
    { marker: "04", window: "Ongoing", title: "Operate & govern", body: "We monitor accuracy nightly, tune for drift and cost, and report in plain English — or hand over documentation and runbooks so your team runs it independently." },
  ],

  featuresIntro: "These aren't settings you could accidentally turn off — they're how the system is built.",
  features: [
    "Every consequential action — claim payout, coverage determination, policyholder-facing communication — pauses for one-click human approval by architecture, not by policy.",
    "Coverage and policy-wording answers are always cited back to the actual clause, so an adjuster can verify the reasoning in seconds.",
    "Full action log: what ran, what it read, what it changed, and why, reviewable by your compliance and audit teams at any time.",
    "Model-agnostic by design: models are benchmarked against your real claims and policy data, not chosen on launch-day headlines.",
    "Nightly accuracy re-testing against benchmark claims, so drift is caught by us before it reaches a policyholder or a regulator.",
  ],

  roiMetrics: [
    { value: "Minutes", label: "typical intake-to-adjuster time, down from days" },
    { value: "70%", label: "reduction in fraud-investigation prep time" },
    { value: "0", label: "target for missed policy renewal windows" },
  ],

  techChips: [
    "Python & TypeScript engineering",
    "Model-agnostic LLM orchestration",
    "Document & image extraction pipelines",
    "PostgreSQL & event-sourced audit logs",
    "Your cloud, containerized deployment",
    "Policy administration & claims system integrations",
  ],

  useCases: [
    { title: "A claim reaches an adjuster in minutes, not days", body: "A motor claim bundle — forms, photos, a police report — is read, checked against policy wording, and routed with a one-page brief before the customer's follow-up call arrives.", impact: "Claims intake & triage in action" },
    { title: "Coverage questions get a cited answer, not a guess", body: "An ambiguous exclusion clause is flagged with the exact policy language attached, so the adjuster makes the call with full context instead of re-reading the policy from scratch.", impact: "Coverage verification in action" },
    { title: "Underwriters quote faster with a complete file", body: "Application documents are verified and exposure computed against policy automatically, so underwriters spend their day on judgment, not document chasing.", impact: "Underwriting pre-screening in action" },
    { title: "A suspicious claim gets a dossier, not a ticket", body: "A flagged claim arrives with prior claim history, pattern matches, and context already assembled for the investigator.", impact: "Fraud-flag review in action" },
    { title: "Renewal season stops being a scramble", body: "Upcoming renewals are tracked automatically, with gap-aware summaries drafted for agent review weeks before a policy lapses.", impact: "Renewal & retention outreach in action" },
    { title: "\"Where's my claim\" calls drop", body: "Policyholders get automatic, accurate status updates in the company's voice, reducing inbound calls to the service team.", impact: "Claims status communication in action" },
  ],

  faqItems: [
    {
      question: "Can this integrate with our existing policy administration and claims systems?",
      answer: "Yes — we connect to your existing policy admin, claims, and document management systems through typed, tested, least-privilege connections. No migration off your systems of record is required to adopt an agent.",
    },
    {
      question: "How do you handle regulatory and audit requirements specific to insurance?",
      answer: "Data boundaries, retention, and access are agreed in writing before any code is built. Every coverage determination is logged with the policy clause it was based on, and every claims action is timestamped and attributable — the evidence trail a regulator or internal audit function expects.",
    },
    {
      question: "Who is accountable if the AI misreads a claim or policy clause?",
      answer: "Claim payout decisions and coverage determinations are architected to require human sign-off — the agent prepares a complete, cited case; it does not decide alone. Accountability for the decision stays exactly where it sits today.",
    },
    {
      question: "How do you keep coverage answers accurate as policy wording changes?",
      answer: "Retrieval is scoped to your current policy library and re-indexed as wording changes, and every answer is cited back to the specific clause rather than paraphrased from memory — so an adjuster can verify it in seconds.",
    },
    {
      question: "How long until we see a working system?",
      answer: "Most engagements have an agent running in shadow mode — processing real claims or applications in parallel, graded by your team — within three to six weeks of the signed specification. It only goes live once it clears the accuracy bar your team set.",
    },
  ],

  ctaTitle: <>Bring us the claims or underwriting queue that&rsquo;s under the most <span className="grad">pressure.</span></>,
  ctaLede: "A free 30-minute call with an engineer who works in insurance systems, not a generalist salesperson.",
};

export default function InsuranceIndustryPage() {
  return <IndustryPageTemplate data={DATA} />;
}
