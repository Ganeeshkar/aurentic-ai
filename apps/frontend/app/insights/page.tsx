import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights — Foxtheta",
  description: "Practical writing on AI agents, automation, and the engineering that makes them trustworthy.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumb="Insights"
        label="Insights"
        title={<>Thinking that <span className="grad">ships.</span></>}
        lede="Practical writing on AI agents, automation, and the engineering that makes them trustworthy — useful on a Tuesday, not just interesting on LinkedIn."
      />

      <section className="section">
        <div className="container">
          <div className="insight-list reveal">
            <article className="insight-row">
              <span className="idate">Jul 2026</span>
              <div>
                <h3>
                  <Link className="row-link" href="/insights/hiring-agents">
                    Hiring your first AI agent: treat it like a hire, not a tool
                  </Link>
                </h3>
                <p>
                  Define the role, interview it on your real work, give it a probation period,
                  assign it a manager. The framework that separates agents that work from software
                  that disappoints.
                </p>
              </div>
            </article>
            <article className="insight-row">
              <span className="idate">Jun 2026</span>
              <div>
                <h3>
                  <Link className="row-link" href="/insights/autonomy">
                    The autonomy dial: how much should your AI agent be allowed to do?
                  </Link>
                </h3>
                <p>
                  Read-only → draft-only → gated actions → supervised autonomy. The four levels of
                  agent trust, and the evidence that should unlock each one.
                </p>
              </div>
            </article>
            <article className="insight-row">
              <span className="idate">Aug 2026</span>
              <div>
                <h3>
                  <Link className="row-link" href="/insights/shadow-mode">
                    Shadow mode: the two weeks that decide everything
                  </Link>
                </h3>
                <p>
                  How a graded parallel trial builds real trust in an agent — and why skipping it
                  is the most expensive shortcut in AI adoption.
                </p>
              </div>
            </article>
            <article className="insight-row">
              <span className="idate">Aug 2026</span>
              <div>
                <h3>
                  <Link className="row-link" href="/insights/real-cost-of-an-ai-feature">
                    The real cost of an AI feature
                  </Link>
                </h3>
                <p>
                  Tokens are the visible line item. Latency budgets, evaluation, and fallback
                  paths are the invisible ones. A cost model founders and operators can actually
                  use.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">
            The best way to read our thinking is to put it to <span className="grad">work.</span>
          </h2>
          <div className="hero-actions reveal" style={{ marginTop: "2rem" }}>
            <Link className="btn" href="/contact">
              Bring us a problem <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
