import Link from "next/link";
import { StepsGrid } from "@/components/shared/StepsGrid";

const STEPS = [
  {
    marker: "01",
    window: "Week 0 · Free",
    title: "Discovery & architecture",
    body: "Thirty minutes with an engineer. Bring the workflow that eats your team’s capacity — we’ll tell you honestly what AI can and can’t do for it.",
  },
  {
    marker: "02",
    window: "Week 1–2 · Fixed price",
    title: "Signed specification",
    body: "We map the workflow, design the system, set the human approval gates, and agree success metrics — all in a fixed-price spec you sign before we build.",
  },
  {
    marker: "03",
    window: "Week 3–6",
    title: "Shadow-mode validation",
    body: "Your system runs on real work in parallel while your team grades its output. It graduates to live work when the scorecard says so — not when the demo looks good.",
  },
  {
    marker: "04",
    window: "Ongoing",
    title: "Operate & govern",
    body: "We monitor, test, and tune your systems around the clock — or train your team to run them. Then we find the next workflow worth automating.",
  },
];

export function ProcessTeaserSection() {
  return (
    <section className="section section--panel">
      <div className="container">
        <div className="section-head reveal">
          <div className="head-row">
            <div>
              <p className="klabel">05 / How it works</p>
              <h2>
                From discovery to always-on, in four <span className="grad">steps.</span>
              </h2>
            </div>
            <Link className="text-link" href="/process">
              Full process <span className="arr">→</span>
            </Link>
          </div>
        </div>
        <StepsGrid items={STEPS} />
      </div>
    </section>
  );
}
