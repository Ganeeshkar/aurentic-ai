import { IndustryPageTemplate, IndustryPageData } from "@/components/shared/IndustryPageTemplate";
import { IllustrationLogistics } from "@/components/shared/IndustryIllustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Logistics AI Solutions — Shipment Exceptions & Supplier Documents — Foxtheta",
  description:
    "AI and intelligent automation for logistics and freight operators: shipment exception handling, supplier and customs document automation, and delivery-status resolution. Business challenges, solutions, ROI, and FAQs.",
  path: "/industries/logistics",
});

const DATA: IndustryPageData = {
  crumb: "Logistics",
  title: <>AI that catches a shipment exception before your customer <span className="grad">does.</span></>,
  lede: "A delayed shipment or a missing customs document is only a crisis if nobody notices until the customer calls. We engineer AI systems that watch every shipment and every document continuously, and act before it becomes a problem.",
  art: <IllustrationLogistics />,

  challenges: [
    {
      title: "Shipment exceptions are discovered by customers first",
      body: "Across multiple carriers and lanes, a delay or routing failure often reaches the customer's inbox before it reaches your operations team's dashboard.",
    },
    {
      title: "Customs and supplier paperwork blocks movement",
      body: "POs, ASNs, certificates, and customs paperwork arrive in every format and language imaginable, and chasing what's missing is reactive, manual work.",
    },
    {
      title: "Carrier and route decisions happen under time pressure",
      body: "Re-booking or re-routing a shipment mid-transit requires pulling data from multiple carrier systems fast enough to still matter — usually faster than a manual process allows.",
    },
    {
      title: "Delivery-status questions flood the support queue",
      body: "\"Where is my shipment\" is the highest-volume inbound query for most logistics operators, and it's almost entirely answerable from data already in your systems.",
    },
  ],

  solutionsIntro: "Each ships with permission scopes, human approval gates, and a complete action log — engineered for operations visibility, not just automation for its own sake.",
  solutions: [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M3 7h10v9H3z" />
          <path d="M13 11h4l4 3v2h-8z" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </svg>
      ),
      title: "Shipment exception handler",
      body: "Watches every shipment across carriers; when something slips, it re-books, re-routes, or escalates — and tells the customer before they ask.",
      bullets: ["Continuous multi-carrier monitoring", "Automated re-book / re-route", "Proactive customer notification"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
      title: "Supplier & customs document automation",
      body: "Processes POs, ASNs, certificates, and customs paperwork across formats and languages, and chases suppliers for what's missing before it blocks movement.",
      bullets: ["Multi-format, multi-language", "Automated supplier follow-up", "Zero shipments delayed by paperwork"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M6 8h12l-1 12H7z" />
          <path d="M9 8V6a3 3 0 016 0v2" />
        </svg>
      ),
      title: "Delivery-status resolution agent",
      body: "\"Where is my shipment?\" answered instantly and accurately, in your brand voice, across every channel and time zone you operate in.",
      bullets: ["Instant, accurate status answers", "Every channel, every time zone", "Most tickets never reach a human"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      ),
      title: "Carrier performance reporting",
      body: "Aggregates on-time performance, exception rates, and cost per lane across carriers into a live report, surfacing underperformance before it's a quarterly surprise.",
      bullets: ["Near-real-time carrier scorecards", "Lane-level cost visibility", "Underperformance flagged early"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h16M4 17h7" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="14" cy="17" r="2.5" />
        </svg>
      ),
      title: "Freight invoice audit agent",
      body: "Matches carrier invoices against contracted rates and actual shipment data, flagging overcharges for recovery instead of letting them pass through unnoticed.",
      bullets: ["Automated rate matching", "Overcharges flagged for recovery", "Full audit trail per invoice"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
        </svg>
      ),
      title: "Carrier & supplier communication automation",
      body: "Drafts and tracks carrier and supplier correspondence — booking confirmations, exception notices, corrective-action requests — queued for review before send.",
      bullets: ["Standard-language drafts", "Full correspondence tracking", "Drafted, never auto-sent"],
    },
  ],

  approach: [
    { marker: "01", window: "Week 0 · Free", title: "Discovery & architecture", body: "An engineer maps your exception-handling, documentation, or reporting workflow live on the call and gives you an honest read on feasibility, cost, and return." },
    { marker: "02", window: "Week 1–2 · Fixed price", title: "Signed specification", body: "We design the system, define exactly where humans approve and where AI acts, and agree success metrics in a fixed-price spec — signed before a line of code." },
    { marker: "03", window: "Week 3–6", title: "Shadow-mode validation", body: "The system runs on real shipments and documents in parallel while your operations team grades its output daily. It graduates to live work only when the scorecard clears the bar." },
    { marker: "04", window: "Ongoing", title: "Operate & govern", body: "We monitor accuracy nightly, tune for drift and cost, and report in plain English — or hand over documentation and runbooks so your team runs it independently." },
  ],

  featuresIntro: "These aren't settings you could accidentally turn off — they're how the system is built.",
  features: [
    "Re-routing or re-booking decisions above a defined cost threshold pause for one-click human approval by architecture, not by policy.",
    "Full action log: what ran, what it read, what it changed, and why, reviewable by your operations team at any time.",
    "Model-agnostic by design: models are benchmarked against your real shipment and document data, not chosen on launch-day headlines.",
    "Least-privilege credentials scoped to exactly the carrier and customs systems each agent needs — nothing broader.",
    "Nightly accuracy re-testing against benchmark cases, so drift is caught by us before it reaches a customer or a shipment.",
  ],

  roiMetrics: [
    { value: "0", label: "target shipments delayed by paperwork" },
    { value: "Under 6 hrs", label: "target exception resolution window, overnight" },
    { value: "80%", label: "target share of status tickets that never reach a human" },
  ],

  techChips: [
    "Python & TypeScript engineering",
    "Model-agnostic LLM orchestration",
    "Multi-carrier API integrations",
    "PostgreSQL & event-sourced audit logs",
    "Your cloud, containerized deployment",
    "TMS / WMS / customs-system integrations",
  ],

  useCases: [
    { title: "A delay is fixed before the customer notices", body: "A shipment slips its transit window; the exception handler re-routes it automatically and sends a proactive status update before the customer's tracking page even updates.", impact: "Shipment exception handler in action" },
    { title: "A customs certificate stops holding up a container", body: "A missing certificate is identified and chased from the supplier automatically, days before the shipment would otherwise sit at the port.", impact: "Supplier & customs document automation in action" },
    { title: "\"Where's my shipment\" stops reaching a human", body: "A delivery-status question is answered instantly and accurately across whichever channel the customer used to ask, day or night.", impact: "Delivery-status resolution in action" },
    { title: "An underperforming carrier is caught mid-quarter", body: "A lane's on-time performance drifts below threshold and shows up on the scorecard immediately, instead of at the next quarterly business review.", impact: "Carrier performance reporting in action" },
    { title: "An overcharge gets caught before it's paid", body: "A carrier invoice with a rate mismatch is flagged for recovery automatically instead of passing through accounts payable unnoticed.", impact: "Freight invoice audit in action" },
    { title: "A corrective-action request goes out the same day", body: "A recurring exception with one carrier drafts a standard corrective-action notice, ready for an operations manager's one-click review and send.", impact: "Carrier & supplier communication automation in action" },
  ],

  faqItems: [
    {
      question: "Can this integrate with our TMS, WMS, and carrier systems?",
      answer: "Yes — we connect to your transportation management system, warehouse management system, and carrier APIs through typed, tested, least-privilege connections. No migration off your systems of record is required to adopt an agent.",
    },
    {
      question: "Who approves a re-route or re-booking decision?",
      answer: "Decisions above a cost or complexity threshold you define always pause for human approval — that boundary lives in the system architecture, not in a setting that could be quietly changed. Routine, low-cost re-routes can run autonomously once proven in shadow mode, per your specification.",
    },
    {
      question: "How do you handle multi-language customs documentation?",
      answer: "Document extraction is language- and format-agnostic by design — POs, ASNs, and certificates in different languages are processed the same way, with every extraction logged against the source document for audit purposes.",
    },
    {
      question: "Which AI models do you use for shipment and document data?",
      answer: "We're model-agnostic by design: during the specification stage we benchmark candidate models against your actual shipment and document data for accuracy, speed, and cost, and select on evidence.",
    },
    {
      question: "How long until we see a working system?",
      answer: "Most engagements have an agent running in shadow mode — processing real shipments or documents in parallel, graded by your team — within three to six weeks of the signed specification. It only goes live once it clears the accuracy bar your team set.",
    },
  ],

  ctaTitle: <>Bring us the exception that&rsquo;s costing you the most <span className="grad">customer trust.</span></>,
  ctaLede: "A free 30-minute call with an engineer who understands logistics operations, not a generalist salesperson.",
};

export default function LogisticsIndustryPage() {
  return <IndustryPageTemplate data={DATA} />;
}
