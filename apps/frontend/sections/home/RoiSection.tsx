import { RoiCalculator } from "@/features/roi-calculator/RoiCalculator";

export function RoiSection() {
  return (
    <section className="section section-glow section-glow--warm" id="roi">
      <div className="container">
        <div className="section-head reveal">
          <p className="klabel">04 / Do the math</p>
          <h2>
            What is manual work costing <span className="grad">you?</span>
          </h2>
          <p className="section-intro">
            Drag the sliders. The math is deliberately conservative — we assume agents take on 65%
            of repetitive work, not all of it, and the estimate is a planning input, not a quote.
          </p>
        </div>
        <RoiCalculator />
      </div>
    </section>
  );
}
