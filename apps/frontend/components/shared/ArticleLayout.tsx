import Link from "next/link";

export function ArticleLayout({
  crumbLabel,
  kicker,
  title,
  date,
  children,
}: {
  crumbLabel: string;
  kicker: string;
  title: string;
  date: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {crumbLabel}
          </p>
          <p className="klabel">{kicker}</p>
          <h1>{title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article">
            <p className="art-meta">
              <span>{date}</span>
              <span>Foxtheta</span>
            </p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
