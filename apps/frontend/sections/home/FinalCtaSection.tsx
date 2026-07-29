import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="cta-final">
      <div className="container">
        <p className="klabel klabel--bare reveal">Ready when you are</p>
        <h2 className="reveal">
          Let&rsquo;s find the system your industry can&rsquo;t afford to get <span className="grad">wrong.</span>
        </h2>
        <p className="lede reveal">
          A free 30-minute call with an engineer — not a salesperson. You&rsquo;ll leave knowing
          what to build first, what it costs, and what it returns.
        </p>
        <div className="hero-actions reveal">
          <Link className="btn" href="/contact">
            Talk to an expert <span className="arr">→</span>
          </Link>
          <Link className="btn-ghost" href="/industries">
            Browse industries first
          </Link>
        </div>
      </div>
    </section>
  );
}
