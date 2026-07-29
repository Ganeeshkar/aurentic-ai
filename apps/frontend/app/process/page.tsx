import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Process — Discovery to Governed Operation — Foxtheta",
  description:
    "Free discovery call → fixed-price specification → shadow-mode validation → governed operation. Fixed prices, weekly demos, written guarantees.",
  path: "/process",
});

const TIMELINE = [
  {
    label: "Step 1 · Free · 30 minutes",
    title: "Discovery & architecture",
    body: "You talk, we map. Bring the workflow that’s costing your team capacity, the product idea, or the vague sense that “we should be using AI.” An engineer — never a salesperson — asks the questions that matter and gives you an honest first read on the spot.",
    chips: ["Honest feasibility read", "Rough cost & timeline"],
  },
  {
    label: "Step 2 · Fixed price · 1–2 weeks",
    title: "Signed specification",
    body: "We map the workflow end to end, design the system, define where humans approve and where AI acts, and write the success metrics into a spec. The spec locks the scope; the scope locks the price. Signed before a line of code.",
    chips: ["Signed spec", "Fixed price", "Success metrics", "Data & permission map"],
  },
  {
    label: "Step 3 · 3–6 weeks typical",
    title: "Shadow-mode validation",
    body: (
      <>
        Weekly demos you’re encouraged to interrupt. Then the part most vendors skip:{" "}
        <b style={{ color: "var(--bone)" }}>shadow mode</b> — your system does the real job in
        parallel while your team grades its output daily. It graduates to live work when the
        scorecard clears the bar you set in the specification. Not before.
      </>
    ),
    chips: ["Weekly demos", "Shadow-mode trial", "Graduation scorecard"],
  },
  {
    label: "Step 4 · Monthly · cancel with 30 days’ notice",
    title: "Operate & govern",
    body: "AI systems drift — models update, data shifts, volumes grow. We monitor around the clock, re-test accuracy nightly, tune costs, and send a one-page monthly report in plain English. Prefer independence? We hand over everything with training and runbooks instead.",
    chips: ["24/7 monitoring", "Nightly accuracy tests", "Monthly plain-English report", "Full handover option"],
  },
];

const GUARANTEES = [
  { title: "Fixed means fixed", body: "If we underestimate the work, the overrun is our cost. New scope is quoted and approved before we build it — never invoiced after." },
  { title: "30-day quality window", body: "Anything that doesn’t match the signed spec within 30 days of delivery, we fix free. Genuine defects within 3 months — same." },
  { title: "You own everything", body: "Code, prompts, integrations, documentation, dashboards. There is no proprietary lock-in layer. We’d rather be re-hired than un-fireable." },
  { title: "Bad news travels fastest", body: "If the evidence says an approach won’t work, you hear it the day we do — with what we’d try instead. Silence is the only failure we recognise." },
  { title: "Humans own consequences", body: "Actions that move money, delete data, or reach your customers pause for human approval. That’s architecture, not policy — the capability isn’t in the agent’s permissions." },
  { title: "Honest “no” included", body: "Expect a “not yet” or “not this way” on a good share of ideas — telling you early is the cheapest trust we’ll ever build." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        label="Process"
        title={<>A process built for people who’ve been burned by <span className="grad">agencies.</span></>}
        lede="Fixed prices agreed before work starts. Demos every week. Proof before production. And a written list of the things we won’t do. Here’s the whole playbook."
      />

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="reveal">
            <div className="timeline">
              {TIMELINE.map((item) => (
                <div className="tl-item" key={item.label}>
                  <p className="klabel">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="tl-out">
                    {item.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        <i>◆</i> {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ position: "sticky", top: 100 }}>
            <div className="split-media">
              <svg viewBox="0 0 500 500" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
                <rect width="500" height="500" fill="#F6F5F2" />
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={70 + i * 90} y={380 - i * 80} width="70" height={20 + i * 80} fill="#fff" stroke="#CBCED6" strokeWidth="1.2" />
                ))}
                <circle cx="105" cy="368" r="6" fill="#A9781F" />
                <circle cx="195" cy="288" r="6" fill="#1B2559" />
                <circle cx="285" cy="208" r="6" fill="#1B2559" />
                <circle cx="375" cy="128" r="8" fill="#B23A1A" />
              </svg>
            </div>
            <p className="calc-note" style={{ marginTop: ".9rem" }}>
              Each step bears the weight of the next — skip one and the whole climb gets risky.
              That’s why we never skip shadow mode.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--panel">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">The guarantees</p>
            <h2>
              In writing, or it doesn’t <span className="grad">count.</span>
            </h2>
          </div>
          <div className="svc-grid reveal-stagger">
            {GUARANTEES.map((g) => (
              <div className="svc" style={{ minHeight: "auto" }} key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">
            Step one is free and takes thirty <span className="grad">minutes.</span>
          </h2>
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
