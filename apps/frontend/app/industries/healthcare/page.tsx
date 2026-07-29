import { IndustryPageTemplate, IndustryPageData } from "@/components/shared/IndustryPageTemplate";
import { IllustrationHealthcare } from "@/components/shared/IndustryIllustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Healthcare AI Solutions — Intake, Prior Auth & Care Coordination — Foxtheta",
  description:
    "AI and intelligent automation for healthcare providers: patient intake and scheduling, prior authorization, eligibility verification, and care coordination — with PHI boundaries designed in from day one.",
  path: "/industries/healthcare",
});

const DATA: IndustryPageData = {
  crumb: "Healthcare",
  title: <>AI that handles the paperwork, so your clinicians can handle the <span className="grad">patient.</span></>,
  lede: "Intake, prior authorization, and eligibility verification consume clinical and front-desk time that should belong to patients. We engineer AI systems for that administrative load, with PHI boundaries designed in from day one — never for the clinical decision itself.",
  art: <IllustrationHealthcare />,

  challenges: [
    {
      title: "Front-desk intake absorbs staff time",
      body: "Collecting intake forms, verifying insurance, and scheduling or rescheduling appointments is high-volume, repetitive work that pulls front-desk staff away from patients physically in front of them.",
    },
    {
      title: "Prior authorization delays care",
      body: "Assembling a prior-auth request from clinical notes and payer requirements, then tracking its status, is slow manual work — and every day it takes is a day of delayed treatment.",
    },
    {
      title: "Eligibility surprises patients and billing alike",
      body: "Insurance eligibility often isn't verified until the visit is already underway, creating billing disputes and patient frustration that a earlier check would have caught.",
    },
    {
      title: "Documentation competes with time in the room",
      body: "Clinicians spend a significant share of every encounter on documentation instead of the patient — and after-hours charting is one of the leading drivers of clinician burnout.",
    },
  ],

  solutionsIntro: "Every system is built around a hard boundary: administrative support only. Clinical judgment and diagnosis stay with licensed clinicians, always — the AI prepares information, it never makes a clinical decision.",
  solutions: [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      ),
      title: "Patient intake & scheduling",
      body: "Collects intake forms, verifies insurance eligibility, books and reschedules appointments, and sends prep instructions — with PHI boundaries designed in from day one.",
      bullets: ["Automated eligibility checks", "Two-way scheduling & reminders", "PHI-scoped access by design"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
      title: "Prior-authorization paperwork",
      body: "Assembles prior-auth requests from clinical notes and payer requirements, tracks status, and escalates stalls — clinicians approve, the agent does the paperwork.",
      bullets: ["Payer-requirement mapping", "Status tracking & escalation", "Clinician sign-off, always"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h16M4 17h7" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="14" cy="17" r="2.5" />
        </svg>
      ),
      title: "Insurance eligibility verification",
      body: "Checks coverage and benefits before the visit, flagging gaps to the front desk and the patient early instead of at the billing stage.",
      bullets: ["Pre-visit verification", "Early gap notification", "Fewer billing disputes"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 3.5 19 6v6c0 5-3 8.5-7 9.5-4-1-7-4.5-7-9.5V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Clinical documentation support",
      body: "Drafts structured visit summaries and note scaffolding from the encounter for the clinician to review, edit, and sign — never submitted without clinician review.",
      bullets: ["Draft only, clinician-reviewed", "Structured note scaffolding", "Reduces after-hours charting"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
        </svg>
      ),
      title: "Care coordination & follow-up",
      body: "Sends approved follow-up instructions, medication reminders, and appointment prep in the patient's preferred channel, queued for clinical review before send.",
      bullets: ["Drafted, never auto-sent", "Multi-channel patient outreach", "Reduces no-show rate"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M4 19V5a2 2 0 012-2h13v18H6a2 2 0 01-2-2zm0 0a2 2 0 012-2h13" />
          <path d="M9 7h6M9 11h4" />
        </svg>
      ),
      title: "Policy & benefits knowledge engine",
      body: "Answers staff questions about payer policy and internal procedure from a cited knowledge base, so front-desk and billing staff aren't relying on tribal knowledge.",
      bullets: ["Cited answers, always", "Staff-facing, not patient-facing", "Reduces escalations to billing leads"],
    },
  ],

  approach: [
    { marker: "01", window: "Week 0 · Free", title: "Discovery & architecture", body: "An engineer maps your intake, prior-auth, or scheduling workflow live on the call and gives you an honest read on feasibility, cost, and return — including where PHI boundaries need to sit." },
    { marker: "02", window: "Week 1–2 · Fixed price", title: "Signed specification", body: "We design the system, define exactly where clinicians and staff approve and where AI acts, and agree success metrics in a fixed-price spec — signed before a line of code." },
    { marker: "03", window: "Week 3–6", title: "Shadow-mode validation", body: "The system runs on real intake and authorization workflows in parallel while your staff grades its output daily. It graduates to live work only when the scorecard clears the bar." },
    { marker: "04", window: "Ongoing", title: "Operate & govern", body: "We monitor accuracy nightly, tune for drift and cost, and report in plain English — or hand over documentation and runbooks so your team runs it independently." },
  ],

  featuresIntro: "These aren't settings you could accidentally turn off — they're how the system is built.",
  features: [
    "PHI access is scoped per agent to exactly the fields and records it needs — nothing broader — and every access is logged.",
    "Clinical documentation is always draft-only: a licensed clinician reviews, edits, and signs before anything enters the record.",
    "Full action log: what ran, what it read, what it changed, and why, reviewable by your compliance and privacy officers at any time.",
    "Model-agnostic by design: models are benchmarked against your real intake and documentation data, not chosen on launch-day headlines.",
    "Nightly accuracy re-testing against benchmark cases, so drift is caught by us before it reaches a patient or a chart.",
  ],

  roiMetrics: [
    { value: "−30%", label: "target reduction in patient no-shows" },
    { value: "−50%", label: "target front-desk administrative hours" },
    { value: "−60%", label: "target reduction in prior-auth turnaround time" },
  ],

  techChips: [
    "Python & TypeScript engineering",
    "Model-agnostic LLM orchestration",
    "PHI-aware access controls",
    "PostgreSQL & event-sourced audit logs",
    "Your cloud, containerized deployment",
    "EHR / EMR & payer-system integrations",
  ],

  useCases: [
    { title: "Intake finishes before the patient sits down", body: "Forms, insurance verification, and scheduling confirmations are handled before arrival, so front-desk staff greet the patient instead of processing paperwork.", impact: "Patient intake & scheduling in action" },
    { title: "A prior-auth request tracks itself", body: "A request is assembled from the clinical note and payer requirements automatically, with status tracked and stalls escalated before treatment is delayed.", impact: "Prior-authorization paperwork in action" },
    { title: "Coverage gaps surface a week early", body: "An eligibility check ahead of the visit flags a lapsed benefit, giving the patient and billing team time to resolve it before it becomes a dispute.", impact: "Eligibility verification in action" },
    { title: "A visit summary is ready for clinician sign-off", body: "A structured draft summary is waiting at the end of the encounter, cutting after-hours charting to a review-and-sign task.", impact: "Clinical documentation support in action" },
    { title: "Follow-up care doesn't rely on memory", body: "Approved discharge instructions and medication reminders go out automatically in the patient's preferred channel, reducing avoidable no-shows.", impact: "Care coordination in action" },
    { title: "Front-desk staff stop escalating policy questions", body: "A payer-policy question gets a cited answer from the knowledge engine instead of a call to the billing lead.", impact: "Policy & benefits knowledge engine in action" },
  ],

  faqItems: [
    {
      question: "How do you handle PHI and HIPAA compliance?",
      answer: "Data boundaries, access scopes, and retention are agreed in writing before any code is built, with each agent's PHI access limited to exactly the fields it needs for its task. We sign a Business Associate Agreement as part of any engagement that touches PHI, and every access is logged for your compliance team.",
    },
    {
      question: "Does the AI make clinical decisions?",
      answer: "No, and this is a hard architectural boundary, not a policy preference. Our systems handle administrative and documentation support — intake, scheduling, prior-auth paperwork, draft note scaffolding. Diagnosis, treatment decisions, and anything clinical remain with licensed clinicians, who review and sign off on any AI-drafted content before it becomes part of the record.",
    },
    {
      question: "Can this integrate with our EHR/EMR system?",
      answer: "Yes — we integrate with common EHR/EMR platforms and payer systems through typed, tested, least-privilege connections agreed with your IT and compliance teams. No migration off your system of record is required.",
    },
    {
      question: "Who is accountable if the AI drafts something inaccurate?",
      answer: "Every clinical or patient-facing draft requires human review before it's used or sent. The agent's job is to prepare an accurate, complete draft; the accountability for what's finalized and acted on stays with the reviewing clinician or staff member, exactly as it does today.",
    },
    {
      question: "How long until we see a working system?",
      answer: "Most engagements have an agent running in shadow mode — processing real intake or authorization workflows in parallel, graded by your team — within three to six weeks of the signed specification. It only goes live once it clears the accuracy bar your team set.",
    },
  ],

  ctaTitle: <>Bring us the administrative workload that&rsquo;s taking time from <span className="grad">patients.</span></>,
  ctaLede: "A free 30-minute call with an engineer who understands healthcare operations and PHI boundaries, not a generalist salesperson.",
};

export default function HealthcareIndustryPage() {
  return <IndustryPageTemplate data={DATA} />;
}
