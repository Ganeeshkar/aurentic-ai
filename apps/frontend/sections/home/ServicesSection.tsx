import Link from "next/link";
import {
  IconBanking,
  IconInsurance,
  IconHealthcare,
  IconManufacturing,
  IconRetail,
  IconLogistics,
} from "@/components/shared/IndustryIcons";

const INDUSTRIES = [
  {
    slug: "banking",
    icon: <IconBanking />,
    title: "Banking & Financial Services",
    body: "Reconciliation, KYC, underwriting, and fraud review engineered for regulatory-grade accuracy.",
  },
  {
    slug: "insurance",
    icon: <IconInsurance />,
    title: "Insurance",
    body: "Claims intake, coverage checks, and renewal operations with a complete audit trail.",
  },
  {
    slug: "healthcare",
    icon: <IconHealthcare />,
    title: "Healthcare",
    body: "Patient intake, scheduling, and prior-authorization paperwork with PHI boundaries by design.",
  },
  {
    slug: "manufacturing",
    icon: <IconManufacturing />,
    title: "Manufacturing",
    body: "Quality-incident triage, supplier documents, and technical knowledge at production scale.",
  },
  {
    slug: "retail",
    icon: <IconRetail />,
    title: "Retail & E-commerce",
    body: "Catalogue operations, returns, and support desks that run around the clock.",
  },
  {
    slug: "logistics",
    icon: <IconLogistics />,
    title: "Logistics",
    body: "Shipment exceptions and delivery-status resolution across every carrier and channel.",
  },
];

export function ServicesSection() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="section-head reveal">
          <div className="head-row">
            <div>
              <p className="klabel">02 / Where we work</p>
              <h2>
                Six industries. One accountable delivery <span className="grad">team.</span>
              </h2>
            </div>
            <Link className="text-link" href="/industries">
              All industries <span className="arr">→</span>
            </Link>
          </div>
        </div>
        <div className="ind-grid reveal-stagger">
          {INDUSTRIES.map((ind) => (
            <Link className="ind-card is-live" href={`/industries/${ind.slug}`} key={ind.slug}>
              <span className="i-tag i-tag--live">Full profile</span>
              <span className="i-ico">{ind.icon}</span>
              <h3>{ind.title}</h3>
              <p>{ind.body}</p>
              <span className="i-cta">View industry page <span className="arr">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
