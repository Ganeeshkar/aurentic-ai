import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceGrid, ServiceItem } from "@/components/shared/ServiceGrid";
import { IllustrationAgentsPlatform } from "@/components/shared/IndustryIllustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Technology — Agentic AI, Enterprise RAG, Copilots & Platform Engineering — Foxtheta",
  description:
    "The engineering disciplines behind every Foxtheta industry solution: agentic AI, enterprise RAG, AI copilots, document intelligence, workflow automation, and AI platform engineering.",
  path: "/technology",
});

const DISCIPLINES: (ServiceItem & { id: string })[] = [
  {
    id: "agentic",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <path d="M6 7l4 3m4 0l4-3M6 17l4-3m4 0l4 3" />
      </svg>
    ),
    title: "Agentic AI",
    body: "Multi-agent systems that plan, coordinate, and act across your applications — with explicit permission scopes and escalation paths designed in from the first sprint.",
    bullets: ["Multi-agent orchestration", "Human-in-the-loop gates", "Full audit trail"],
  },
  {
    id: "rag",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 19V5a2 2 0 012-2h13v18H6a2 2 0 01-2-2zm0 0a2 2 0 012-2h13" />
        <path d="M9 7h6M9 11h4" />
      </svg>
    ),
    title: "Enterprise RAG",
    body: "Your documents, tickets, and internal wikis become a retrieval system that answers with citations, respects existing access controls, and is engineered to say “not found” instead of guessing.",
    bullets: ["Cited answers, always", "Permission-aware retrieval", "Accuracy tested nightly"],
  },
  {
    id: "copilots",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M7 9l2.5 2.5L14 7" />
      </svg>
    ),
    title: "AI Copilots",
    body: "Assistants embedded inside the tools your teams already use — drafting, summarising, and recommending next actions in-workflow, not in a side chat window nobody opens twice.",
    bullets: ["In-workflow, not a side chat", "Adoption measured weekly", "Your data, your context"],
  },
  {
    id: "documents",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
    title: "Document Intelligence",
    body: "Extraction, classification, and reasoning over unstructured documents at enterprise volume and accuracy, with exceptions routed to a person, not silently dropped.",
    bullets: ["Enterprise-volume throughput", "Exception routing by design", "Format & language agnostic"],
  },
  {
    id: "automation",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 7h10M4 12h16M4 17h7" />
        <circle cx="18" cy="7" r="2.5" />
        <circle cx="14" cy="17" r="2.5" />
      </svg>
    ),
    title: "Workflow & Communication Automation",
    body: "End-to-end automation from trigger to done, across your systems of record — deterministic where reliability is non-negotiable, AI judgment where nuance is required.",
    bullets: ["Process mapping first", "Exception handling built in", "Works with your existing stack"],
  },
  {
    id: "platform-engineering",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    title: "AI Platform Engineering & LLMOps",
    body: "The evaluation pipelines, observability, cost controls, and model-lifecycle tooling that keep systems reliable long after go-live.",
    bullets: ["Nightly evaluation replays", "Drift & cost monitoring", "Least-privilege integrations"],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        crumb="Technology"
        label="Technology"
        title={<>The engineering underneath every industry <span className="grad">solution.</span></>}
        lede="Every industry practice draws on the same six disciplines. Model-agnostic, permission-scoped, and logged end to end — this is what our engineers actually build, not a slide of buzzwords."
        art={<IllustrationAgentsPlatform />}
      />

      <section className="section" id="disciplines">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">01 / Six disciplines, one accountable team</p>
            <h2>What we build, regardless of industry.</h2>
          </div>
          <ServiceGrid items={DISCIPLINES} />
        </div>
      </section>

      <section className="section section--panel">
        <div className="container split">
          <div className="reveal">
            <p className="klabel">02 / Trust &amp; governance</p>
            <h2>Reviewed by your security team, not just ours.</h2>
            <p>
              Architecture diagrams, permission maps, and data-flow documentation ship with every
              engagement — formatted for the person who has to sign off on it, not for a sales
              deck.
            </p>
            <Link className="btn" style={{ marginTop: "1rem" }} href="/platform">
              See the full architecture &amp; trust brief <span className="arr">→</span>
            </Link>
          </div>
          <div className="reveal">
            <ul className="checklist">
              <li><b>Model-agnostic.</b> Benchmarked per task, swappable, no single-vendor lock-in.</li>
              <li><b>Least-privilege by default.</b> Every credential scoped to exactly what it needs.</li>
              <li><b>Human-gated autonomy.</b> Consequential actions pause for one-click approval, by architecture.</li>
              <li><b>Nightly evaluation.</b> Every production system is re-tested against benchmark tasks overnight.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">
            See how this applies to your <span className="grad">industry.</span>
          </h2>
          <div className="hero-actions reveal" style={{ marginTop: "2rem" }}>
            <Link className="btn" href="/industries">
              Explore industries <span className="arr">→</span>
            </Link>
            <Link className="btn-ghost" href="/contact">
              Talk to an expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
