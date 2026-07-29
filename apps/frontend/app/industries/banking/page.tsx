import { IndustryPageTemplate, IndustryPageData } from "@/components/shared/IndustryPageTemplate";
import { IllustrationBanking } from "@/components/shared/IndustryIllustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Banking & Financial Services AI Solutions — Foxtheta",
  description:
    "AI and intelligent automation for banks and financial institutions: reconciliation, KYC, loan pre-screening, and fraud review. Business challenges, solutions, ROI, technology, and FAQs.",
  path: "/industries/banking",
});

const DATA: IndustryPageData = {
  crumb: "Banking & Financial Services",
  title: <>AI built for the accuracy and audit standards banking <span className="grad">demands.</span></>,
  lede: "Reconciliation, onboarding, underwriting, and fraud review are high-volume, high-scrutiny workflows where a wrong answer is expensive and an unreviewable one is worse. We engineer AI systems for exactly that bar.",
  art: <IllustrationBanking />,

  challenges: [
    {
      title: "Reconciliation eats the close cycle",
      body: "Finance teams spend days each month manually matching transactions across bank feeds, ledgers, and payment gateways — work that scales linearly with headcount, not with better tools.",
    },
    {
      title: "Onboarding is a document bottleneck",
      body: "KYC and account-opening paperwork is high-volume, high-scrutiny, and slow: every document has to be extracted, validated, and cross-checked before compliance will sign off.",
    },
    {
      title: "Underwriters read before they decide",
      body: "The judgment call — approve, decline, refer — is a small part of the job. Most of an underwriter's day is assembling and verifying the file that judgment depends on.",
    },
    {
      title: "Fraud review starts from zero",
      body: "Investigators open a flagged transaction with a ticket number and no context, and spend the first hour of every case rebuilding history that already exists somewhere in your systems.",
    },
  ],

  solutionsIntro: "Each ships with permission scopes, human approval gates, and a complete action log — engineered for your compliance review, not just your demo day.",
  solutions: [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h16M4 17h7" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="14" cy="17" r="2.5" />
        </svg>
      ),
      title: "Reconciliation agent",
      body: "Matches transactions across bank feeds, ledgers, and payment gateways nightly, and surfaces only true exceptions with the evidence attached — not a spreadsheet of everything.",
      bullets: ["Nightly automated matching", "Exceptions only, with evidence", "Full audit trail per match"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
      title: "KYC document processing",
      body: "Extracts, validates, and cross-checks onboarding documents, flagging mismatches for compliance review with every check logged for the auditor.",
      bullets: ["Multi-format document extraction", "Compliance-ready audit logs", "Onboarding in hours, not weeks"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" />
        </svg>
      ),
      title: "Loan application pre-screening",
      body: "Assembles applicant files, verifies documents, and computes ratios against policy — handing underwriters a complete pre-read. Every decision to approve or decline stays with a human.",
      bullets: ["Complete pre-read, not an auto-decision", "Policy-based ratio checks", "3× underwriter throughput target"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 3.5 19 6v6c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Fraud & risk review queue",
      body: "Pre-investigates flagged transactions: gathers history, patterns, and context so investigators start with a dossier instead of a ticket number.",
      bullets: ["Automated case dossiers", "Pattern & history correlation", "Investigation prep time cut sharply"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
        </svg>
      ),
      title: "Invoice-to-pay agent",
      body: "Reads every incoming invoice, three-way matches it against POs and goods receipts, and preps the payment run for one-click approval.",
      bullets: ["Automated three-way matching", "Discrepancies chased automatically", "90%+ touchless target"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
        </svg>
      ),
      title: "Customer communication automation",
      body: "Drafts renewal, statement, and policy-change communications in your compliance-approved language, queued for review before send.",
      bullets: ["Compliance-locked language", "Drafted, never auto-sent", "Every send logged"],
    },
  ],

  approach: [
    { marker: "01", window: "Week 0 · Free", title: "Discovery & architecture", body: "An engineer maps your reconciliation, onboarding, or underwriting workflow live on the call and gives you an honest read on feasibility, cost, and return." },
    { marker: "02", window: "Week 1–2 · Fixed price", title: "Signed specification", body: "We design the system, define exactly where humans approve and where AI acts, and agree success metrics in a fixed-price spec — signed before a line of code." },
    { marker: "03", window: "Week 3–6", title: "Shadow-mode validation", body: "The system runs on real transactions and documents in parallel while your team grades its output daily. It graduates to live work only when the scorecard clears the bar." },
    { marker: "04", window: "Ongoing", title: "Operate & govern", body: "We monitor accuracy nightly, tune for drift and cost, and report in plain English — or hand over documentation and runbooks so your team runs it independently." },
  ],

  featuresIntro: "These aren't settings you could accidentally turn off — they're how the system is built.",
  features: [
    "Every consequential action — payment movement, account changes, customer-facing communication — pauses for one-click human approval by architecture, not by policy.",
    "Full action log: what ran, what it read, what it changed, and why, reviewable by your compliance team at any time.",
    "Model-agnostic by design: models are benchmarked against your real transaction and document data, not chosen on launch-day headlines.",
    "Least-privilege credentials scoped to exactly the systems and actions each agent needs — nothing broader.",
    "Nightly accuracy re-testing against benchmark cases, so drift is caught by us before it reaches a customer or an auditor.",
  ],

  roiMetrics: [
    { value: "90%+", label: "touchless invoice and payment reconciliation processing" },
    { value: "3×", label: "underwriter throughput on loan application pre-screening" },
    { value: "4–6 days", label: "cut from a typical month-end close cycle" },
  ],

  techChips: [
    "Python & TypeScript engineering",
    "Model-agnostic LLM orchestration",
    "Vector & hybrid retrieval",
    "PostgreSQL & event-sourced audit logs",
    "Your cloud, containerized deployment",
    "Core banking / CRM / ERP integrations",
  ],

  useCases: [
    { title: "Month-end close, four days shorter", body: "A mid-size bank's finance team stops manually chasing bank-feed mismatches; the reconciliation agent surfaces six true exceptions instead of six hundred candidates.", impact: "Reconciliation agent in action" },
    { title: "KYC backlog cleared in a week, not a quarter", body: "A digital-onboarding queue that had grown past 3,000 unresolved files gets triaged automatically, with compliance reviewing flagged mismatches only.", impact: "KYC document processing in action" },
    { title: "Underwriters start their day with a pre-read", body: "Instead of assembling applicant files by hand, underwriters open a complete, verified pre-read every morning and spend their time on the judgment call.", impact: "Loan pre-screening in action" },
    { title: "A fraud alert investigated in minutes", body: "A flagged card transaction arrives with a dossier already attached — transaction history, pattern matches, prior flags — instead of a bare ticket number.", impact: "Fraud & risk review in action" },
    { title: "The invoice backlog stops growing", body: "Incoming supplier invoices are matched against purchase orders automatically; only genuine discrepancies reach an accounts-payable analyst.", impact: "Invoice-to-pay agent in action" },
    { title: "Renewal notices go out on time, every time", body: "Policy and account renewal communications draft themselves in compliance-approved language, queued for a one-click send instead of a missed deadline.", impact: "Customer communication automation in action" },
  ],

  faqItems: [
    {
      question: "Can this run alongside our core banking system without a rip-and-replace?",
      answer: "Yes — this is the default, not the exception. We integrate with your existing core banking platform, ledgers, and document stores through typed, tested, least-privilege connections. Nothing about adopting an AI agent requires migrating your system of record.",
    },
    {
      question: "How do you handle regulatory and audit requirements?",
      answer: "Data boundaries, retention, and access are agreed in writing before any code is built. Every agent action is logged with a timestamp, the data it touched, and the outcome — the same evidence trail a regulator or internal auditor would expect from a human process.",
    },
    {
      question: "Who is accountable if an agent gets something wrong?",
      answer: "Money movement, account changes, and customer communication are architected to require human approval — the agent cannot take the consequential action alone. Accountability for the decision stays exactly where it sits today; the agent's job is to prepare a complete, accurate case for that decision.",
    },
    {
      question: "Which AI models do you use for financial data?",
      answer: "We're model-agnostic by design: during the specification stage we benchmark candidate models against your actual documents and transactions for accuracy, speed, cost, and data-residency requirements, and select on evidence — not on which vendor has the most recent headline.",
    },
    {
      question: "How long until we see a working system?",
      answer: "Most engagements have an agent running in shadow mode — processing real transactions in parallel, graded by your team — within three to six weeks of the signed specification. It only goes live once it clears the accuracy bar your team set.",
    },
  ],

  ctaTitle: <>Bring us the workflow that&rsquo;s costing your team the <span className="grad">most.</span></>,
  ctaLede: "A free 30-minute call with an engineer who works in banking systems, not a generalist salesperson.",
};

export default function BankingIndustryPage() {
  return <IndustryPageTemplate data={DATA} />;
}
