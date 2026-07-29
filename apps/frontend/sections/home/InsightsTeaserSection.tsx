import Link from "next/link";

export function InsightsTeaserSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="head-row">
            <div>
              <p className="klabel">07 / Insights</p>
              <h2>Thinking that ships.</h2>
            </div>
            <Link className="text-link" href="/insights">
              All insights <span className="arr">→</span>
            </Link>
          </div>
        </div>
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
        </div>
      </div>
    </section>
  );
}
