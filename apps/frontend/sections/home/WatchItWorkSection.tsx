import { AgentDemo } from "@/features/agent-demo/AgentDemo";

const CHIPS = [
  "Banking & Financial Services",
  "Insurance",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Logistics",
  "Agentic AI",
  "Enterprise RAG",
  "Document Intelligence",
];

export function WatchItWorkSection() {
  return (
    <section className="section" id="watch">
      <div className="container">
        <div className="section-head reveal">
          <div className="head-row">
            <div>
              <p className="klabel">01 / Proof before promises</p>
              <h2>
                Watch a governed agent <span className="grad">work.</span>
              </h2>
            </div>
            <p className="section-intro" style={{ maxWidth: "22em", marginTop: 0 }}>
              Three real scenarios, replayed live. Note the amber{" "}
              <b style={{ color: "var(--amber)" }}>GATE</b> — consequential actions always pause
              for a human.
            </p>
          </div>
        </div>

        <AgentDemo />

        <div className="chip-row reveal" aria-label="Where we work">
          {CHIPS.map((chip) => (
            <span className="chip" key={chip}>
              <i>✳</i>
              {chip}
            </span>
          ))}
        </div>

        <div className="stats reveal-stagger" aria-label="How we work">
          <div className="stat">
            <div className="stat-value">
              <span data-count="65">65</span>
              <span className="u">%</span>
            </div>
            <p className="stat-label">
              of repetitive enterprise work is automatable with today’s AI agents — our
              conservative planning baseline
            </p>
          </div>
          <div className="stat">
            <div className="stat-value">
              &lt;6<span className="u"> wks</span>
            </div>
            <p className="stat-label">from kickoff to your first agent working on real tasks</p>
          </div>
          <div className="stat">
            <div className="stat-value">
              <span data-count="100">100</span>
              <span className="u">%</span>
            </div>
            <p className="stat-label">of agent actions logged and reviewable — autonomy you can audit</p>
          </div>
          <div className="stat">
            <div className="stat-value">24<span className="u">/7</span></div>
            <p className="stat-label">your agents don’t sleep — and we monitor them so you don’t have to</p>
          </div>
        </div>
      </div>
    </section>
  );
}
