import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About — Enterprise AI Engineering — Foxtheta",
  description:
    "Foxtheta: fox-sharp about what AI can actually do, theta-disciplined about proving it. AI earns autonomy the way people do — by proving it, under supervision, before you hand it the keys.",
  path: "/about",
});

const PRINCIPLES = [
  { title: "Evidence over enthusiasm", body: "Models are chosen on benchmarks against your actual tasks, not on launch-day headlines. The scorecard picks the stack." },
  { title: "Reliability over novelty", body: "The highest compliment an AI system can earn is that nobody talks about it anymore — it just runs. We optimise for that, not for the demo." },
  { title: "Autonomy is earned", body: "Agents gain permissions the way new employees do: by building a track record under supervision. There’s no “trust mode” switch." },
  { title: "Plain language in every report", body: "Specs, reports, and monthly reviews are written for the person accountable for the outcome, not for other engineers. Jargon is a tax we don’t charge." },
  { title: "Senior engineers only", body: "Every engagement is staffed by people who have shipped and operated production systems. No bench, no juniors learning on your invoice." },
  { title: "Handover beats lock-in", body: "Every project ends with your team more capable. Dependency is a bug in a business model, not a feature." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        label="About"
        title={<>Engineering discipline, not AI <span className="grad">hype.</span></>}
        lede={
          <>
            Foxtheta — named for two traits we insist on in every engagement: a fox&rsquo;s sharp
            read on what AI can actually do, and theta-grade discipline in proving it. AI earns
            autonomy the way people do: by proving it, under supervision, before you hand it the
            keys. That belief is the whole company.
          </>
        }
      />

      <section className="section">
        <div className="container split">
          <div className="split-media reveal">
            <svg viewBox="0 0 560 420" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
              <rect width="560" height="420" fill="#F6F5F2" />
              <circle cx="180" cy="210" r="90" fill="none" stroke="#1B2559" strokeWidth="1.4" />
              <circle cx="180" cy="210" r="55" fill="none" stroke="#B23A1A" strokeWidth="1.4" />
              <circle cx="180" cy="210" r="10" fill="#B23A1A" />
              <path d="M300 210h190" stroke="#CBCED6" strokeWidth="1.2" />
              <circle cx="360" cy="210" r="6" fill="#A9781F" />
              <circle cx="430" cy="210" r="6" fill="#1B2559" />
              <circle cx="490" cy="210" r="6" fill="#B23A1A" />
            </svg>
          </div>
          <div className="reveal">
            <p className="klabel">Why we exist</p>
            <h2>Enterprise AI has a trust problem. We&rsquo;re the fix.</h2>
            <p>
              Every enterprise buyer has now sat through the demo that impressed the room — and
              heard about the deployment that failed an audit somewhere else. The gap between
              those two moments isn&rsquo;t the model. It&rsquo;s engineering discipline:
              permission scopes, human gates, testing, monitoring.
            </p>
            <p>
              Foxtheta was founded to treat that discipline as the product, not an afterthought
              bolted onto a proof of concept. We&rsquo;d rather tell a prospective client
              &ldquo;not yet&rdquo; on a bad idea than bill them for it — in a market full of
              hype, being the honest vendor is the most defensible strategy there is.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--panel">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">Operating principles</p>
            <h2>
              Six rules we run <span className="grad">on.</span>
            </h2>
          </div>
          <div className="svc-grid reveal-stagger">
            {PRINCIPLES.map((p) => (
              <div className="svc" style={{ minHeight: "auto" }} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">Who we serve</p>
            <h2>
              Built for teams that can&rsquo;t afford to guess <span className="grad">wrong.</span>
            </h2>
          </div>
          <div className="split">
            <div className="reveal">
              <ul className="checklist">
                <li>
                  <b>Enterprise teams piloting their first production AI system</b> — a single
                  workflow, engineered properly, with the governance evidence that unlocks the
                  next one.
                </li>
                <li>
                  <b>Platform teams scaling agentic AI past one workflow</b> — organizations that
                  have already proven a pilot and need the LLMOps and governance layer to run
                  more systems without more risk.
                </li>
                <li>
                  <b>Regulated and high-volume operators</b> — financial services, healthcare,
                  manufacturing, logistics, and retail teams where accuracy and auditability are
                  not optional.
                </li>
              </ul>
            </div>
            <div className="reveal">
              <div className="stats" style={{ gridTemplateColumns: "1fr 1fr", margin: 0 }}>
                <div className="stat">
                  <div className="stat-value">6</div>
                  <p className="stat-label">engineering disciplines, one accountable team — see Technology</p>
                </div>
                <div className="stat">
                  <div className="stat-value">6</div>
                  <p className="stat-label">industries with a dedicated delivery practice</p>
                </div>
                <div className="stat">
                  <div className="stat-value">
                    <span data-count="30" data-suffix="d">30d</span>
                  </div>
                  <p className="stat-label">notice to end any ongoing engagement — we earn renewals monthly</p>
                </div>
                <div className="stat">
                  <div className="stat-value">100%</div>
                  <p className="stat-label">of agent actions logged and reviewable by your team, always</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="principle-band section--panel">
        <div className="container">
          <p className="klabel klabel--bare reveal">The founding bet</p>
          <blockquote className="reveal">
            &ldquo;Every enterprise will run on agentic AI within the decade. The winners will be
            the ones who proved it with <span className="grad">one workflow, engineered right.</span>&rdquo;
          </blockquote>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">Let&rsquo;s find your one workflow.</h2>
          <div className="hero-actions reveal" style={{ marginTop: "2rem" }}>
            <Link className="btn" href="/contact">
              Talk to an expert <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
