import Link from "next/link";

export const metadata = {
  title: "Page Not Found — Foxtheta",
  description: "Even our agents couldn't retrieve this one.",
};

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <p className="code">404</p>
        <p className="klabel" style={{ margin: ".5rem 0 1rem" }}>
          Page not found
        </p>
        <h1 style={{ fontSize: "clamp(1.7rem,4vw,2.5rem)", maxWidth: "20em" }}>
          Even our agents couldn’t retrieve this one — the page doesn’t exist.
        </h1>
        <div className="hero-actions" style={{ marginTop: "2.4rem" }}>
          <Link className="btn" href="/">
            Back to home <span className="arr">→</span>
          </Link>
          <Link className="btn-ghost" href="/industries">
            Explore industries
          </Link>
          <Link className="btn-ghost" href="/contact">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
