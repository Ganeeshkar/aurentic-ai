const TRACK_TEXT = (
  <span>
    Banking &amp; Financial Services <i>✳</i> Insurance <i>✳</i> Healthcare <i>✳</i>{" "}
    Manufacturing <i>✳</i> Retail &amp; E-commerce <i>✳</i> Logistics <i>✳</i> Agentic AI{" "}
    <i>✳</i> Intelligent Automation <i>✳</i>
  </span>
);

export function MarqueeSection() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {TRACK_TEXT}
        {TRACK_TEXT}
      </div>
    </div>
  );
}
