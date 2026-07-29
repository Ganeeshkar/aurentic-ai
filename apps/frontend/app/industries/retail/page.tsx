import { IndustryPageTemplate, IndustryPageData } from "@/components/shared/IndustryPageTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Retail & E-commerce AI Solutions — Support, Catalogue & Returns — Foxtheta",
  description:
    "AI and intelligent automation for retail and e-commerce: overnight support desks, catalogue content operations, returns screening, and delivery-status resolution. Business challenges, solutions, ROI, and FAQs.",
  path: "/industries/retail",
});

const DATA: IndustryPageData = {
  crumb: "Retail & E-commerce",
  title: <>AI that keeps your storefront running while your team <span className="grad">sleeps.</span></>,
  lede: "Support tickets, catalogue updates, and returns don't stop at close of business, and neither do your customers. We engineer AI systems that keep pace with retail's around-the-clock volume, with refunds and account changes always routed to a human.",

  challenges: [
    {
      title: "Catalogue content doesn't scale with SKU growth",
      body: "Writing and updating product titles, descriptions, and attributes at catalogue scale is repetitive work that becomes the bottleneck on every new-product launch.",
    },
    {
      title: "Support queues pile up overnight",
      body: "Tickets filed outside business hours sit unanswered until the next morning, and by then the customer has often already left a review about it.",
    },
    {
      title: "Returns and refunds leak margin",
      body: "Every return request needs a policy check, and doing that manually at volume means either slow processing or inconsistent, margin-eroding approvals.",
    },
    {
      title: "\"Where is my order\" floods the queue",
      body: "Delivery-status questions are the single largest category of inbound tickets at most retailers, and they're almost entirely answerable from data you already have.",
    },
  ],

  solutionsIntro: "Each ships with permission scopes, human approval gates, and a complete action log — so refunds, account changes, and brand voice all stay under your control.",
  solutions: [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      ),
      title: "Overnight support desk",
      body: "An agent crew that clears the overnight queue: resolves the routine, drafts the complex, gates refunds behind human approval, and briefs your team each morning.",
      bullets: ["Routine tickets resolved overnight", "Refunds always human-approved", "Morning brief, not a black box"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M6 8h12l-1 12H7z" />
          <path d="M9 8V6a3 3 0 016 0v2" />
        </svg>
      ),
      title: "Catalogue content operations",
      body: "Generates and updates product titles, descriptions, and attributes at catalogue scale — brand-voice-locked, channel-formatted, human-reviewed by exception.",
      bullets: ["Brand-voice-locked generation", "Channel-specific formatting", "New-SKU time-to-live cut sharply"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h16M4 17h7" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="14" cy="17" r="2.5" />
        </svg>
      ),
      title: "Returns & refunds screening",
      body: "Validates return requests against policy and history, auto-approves the clear cases, and routes edge cases with a recommendation — money always moves on a human click.",
      bullets: ["Policy-consistent decisions", "Edge cases routed with context", "Refund cycle cut sharply"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M3 7h10v9H3z" />
          <path d="M13 11h4l4 3v2h-8z" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </svg>
      ),
      title: "Delivery-status resolution agent",
      body: "\"Where is my order?\" answered instantly and accurately, in your brand voice, across every channel and time zone you sell in.",
      bullets: ["Instant, accurate status answers", "Every channel, every time zone", "Most tickets never reach a human"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
        </svg>
      ),
      title: "Personalized marketing content",
      body: "Drafts on-brand campaign copy, product recommendations, and lifecycle emails from your templates and past performance, queued for marketing review before send.",
      bullets: ["On-brand, on-template drafts", "Performance-informed suggestions", "Drafted, never auto-sent"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
        </svg>
      ),
      title: "Inventory & demand reporting",
      body: "Aggregates sales velocity, stock levels, and demand signals into a live report, surfacing stockout and overstock risk before it hits the storefront.",
      bullets: ["Near-real-time visibility", "Stockout risk flagged early", "One view across channels"],
    },
  ],

  approach: [
    { marker: "01", window: "Week 0 · Free", title: "Discovery & architecture", body: "An engineer maps your support, catalogue, or returns workflow live on the call and gives you an honest read on feasibility, cost, and return." },
    { marker: "02", window: "Week 1–2 · Fixed price", title: "Signed specification", body: "We design the system, define exactly where humans approve and where AI acts, and agree success metrics in a fixed-price spec — signed before a line of code." },
    { marker: "03", window: "Week 3–6", title: "Shadow-mode validation", body: "The system runs on real tickets, listings, or returns in parallel while your team grades its output daily. It graduates to live work only when the scorecard clears the bar." },
    { marker: "04", window: "Ongoing", title: "Operate & govern", body: "We monitor accuracy nightly, tune for drift and cost, and report in plain English — or hand over documentation and runbooks so your team runs it independently." },
  ],

  featuresIntro: "These aren't settings you could accidentally turn off — they're how the system is built.",
  features: [
    "Every consequential action — refunds, account changes, customer-facing sends above a threshold — pauses for one-click human approval by architecture, not by policy.",
    "Brand voice and tone are locked to your style guide and reviewed on a sample basis, not left to model discretion.",
    "Full action log: what ran, what it read, what it changed, and why, reviewable by your operations team at any time.",
    "Model-agnostic by design: models are benchmarked against your real tickets and catalogue data, not chosen on launch-day headlines.",
    "Nightly accuracy re-testing against benchmark cases, so drift is caught by us before it reaches a customer or a review.",
  ],

  roiMetrics: [
    { value: "9 hrs → 4 min", label: "target median first-response time, overnight" },
    { value: "80%", label: "target share of status tickets that never reach a human" },
    { value: "−75%", label: "target new-SKU time-to-live" },
  ],

  techChips: [
    "Python & TypeScript engineering",
    "Model-agnostic LLM orchestration",
    "Vector & hybrid retrieval",
    "PostgreSQL & event-sourced audit logs",
    "Your cloud, containerized deployment",
    "Helpdesk / OMS / e-commerce platform integrations",
  ],

  useCases: [
    { title: "The overnight queue is empty by morning", body: "Routine support tickets filed after hours are resolved directly, complex ones are drafted for a quick morning review, and refunds wait for a human click regardless of volume.", impact: "Overnight support desk in action" },
    { title: "A thousand new SKUs go live in a day, not a week", body: "Product titles, descriptions, and attributes generate in the brand's locked voice, with a merchandiser reviewing by exception instead of writing every listing.", impact: "Catalogue content operations in action" },
    { title: "Clear-cut returns settle themselves", body: "A straightforward return is validated against policy and history and approved automatically; an unusual pattern is routed to a specialist with a recommendation attached.", impact: "Returns & refunds screening in action" },
    { title: "\"Where's my order\" stops reaching a human", body: "A delivery-status question is answered instantly and accurately in the brand's voice, across whichever channel the customer used to ask.", impact: "Delivery-status resolution in action" },
    { title: "A campaign draft is ready before the brief meeting ends", body: "Lifecycle email copy and product recommendations draft themselves from past performance, ready for the marketing team's review and send.", impact: "Personalized marketing content in action" },
    { title: "A stockout risk is caught a week early", body: "Demand and inventory signals across channels surface a fast-moving SKU's stockout risk before it actually runs out.", impact: "Inventory & demand reporting in action" },
  ],

  faqItems: [
    {
      question: "Can this integrate with our helpdesk and e-commerce platform?",
      answer: "Yes — we connect to your existing helpdesk, order management system, and e-commerce platform through typed, tested, least-privilege connections. No migration off your systems of record is required to adopt an agent.",
    },
    {
      question: "How do you keep responses on-brand?",
      answer: "Brand voice and tone are locked to your style guide during the specification stage, and a sample of every agent's output is reviewed on a regular cadence — this isn't left to model discretion or a one-time prompt.",
    },
    {
      question: "Who approves refunds and account changes?",
      answer: "A human, always. Refunds and account-affecting actions are architected to require one-click approval regardless of how confident the agent is or how small the amount — that boundary lives in the system design, not in a policy someone could forget to enable.",
    },
    {
      question: "Which AI models do you use for customer-facing content?",
      answer: "We're model-agnostic by design: during the specification stage we benchmark candidate models against your actual tickets and catalogue data for accuracy, brand-voice fit, and cost, and select on evidence.",
    },
    {
      question: "How long until we see a working system?",
      answer: "Most engagements have an agent running in shadow mode — processing real tickets or listings in parallel, graded by your team — within three to six weeks of the signed specification. It only goes live once it clears the accuracy bar your team set.",
    },
  ],

  ctaTitle: <>Bring us the queue that&rsquo;s growing faster than your <span className="grad">team.</span></>,
  ctaLede: "A free 30-minute call with an engineer who understands retail operations, not a generalist salesperson.",
};

export default function RetailIndustryPage() {
  return <IndustryPageTemplate data={DATA} />;
}
