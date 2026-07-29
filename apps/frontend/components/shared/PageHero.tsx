import Link from "next/link";

export function PageHero({
  crumb,
  label,
  title,
  lede,
  art,
}: {
  crumb: string;
  label: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  art?: React.ReactNode;
}) {
  return (
    <section className={art ? "page-hero page-hero--art" : "page-hero"}>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / {crumb}
          </p>
          <p className="klabel">{label}</p>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
        </div>
        {art ? <div className="page-hero-art" aria-hidden="true">{art}</div> : null}
      </div>
    </section>
  );
}
