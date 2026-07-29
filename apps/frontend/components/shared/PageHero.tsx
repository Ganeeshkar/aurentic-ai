import Link from "next/link";

export function PageHero({
  crumb,
  label,
  title,
  lede,
}: {
  crumb: string;
  label: string;
  title: React.ReactNode;
  lede: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="breadcrumb">
          <Link href="/">Home</Link> / {crumb}
        </p>
        <p className="klabel">{label}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </section>
  );
}
