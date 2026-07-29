import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";
import {
  IconBanking,
  IconInsurance,
  IconHealthcare,
  IconManufacturing,
  IconRetail,
  IconLogistics,
} from "@/components/shared/IndustryIcons";
import { IllustrationIndustries } from "@/components/shared/IndustryIllustrations";

export const metadata = pageMetadata({
  title: "Industries — AI & Intelligent Automation by Sector — Foxtheta",
  description:
    "How Foxtheta applies agentic AI, enterprise RAG, and intelligent automation to Banking, Insurance, Healthcare, Manufacturing, Retail, and Logistics — business challenges, solutions, and ROI.",
  path: "/industries",
});

const INDUSTRIES = [
  {
    slug: "banking",
    icon: <IconBanking />,
    title: "Banking & Financial Services",
    body: "Reconciliation, KYC, underwriting, and fraud review engineered for regulatory-grade accuracy and full auditability.",
  },
  {
    slug: "insurance",
    icon: <IconInsurance />,
    title: "Insurance",
    body: "Claims intake, coverage checks, fraud-flag review, and renewal operations with a complete audit trail.",
  },
  {
    slug: "healthcare",
    icon: <IconHealthcare />,
    title: "Healthcare",
    body: "Patient intake, scheduling, and prior-authorization paperwork with PHI boundaries designed in from day one.",
  },
  {
    slug: "manufacturing",
    icon: <IconManufacturing />,
    title: "Manufacturing",
    body: "Quality-incident triage, supplier documents, and technical knowledge engines at production scale.",
  },
  {
    slug: "retail",
    icon: <IconRetail />,
    title: "Retail & E-commerce",
    body: "Catalogue content operations, returns screening, and overnight support desks that run around the clock.",
  },
  {
    slug: "logistics",
    icon: <IconLogistics />,
    title: "Logistics",
    body: "Shipment exception handling and delivery-status resolution across every carrier and channel.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumb="Industries"
        label="Industries"
        title={<>AI solutions engineered for how your <span className="grad">industry</span> actually runs.</>}
        lede="We don't sell one AI product and reshape your business around it. Each industry practice starts from the regulatory constraints, data realities, and operating rhythm of that sector — then applies the same disciplined engineering underneath."
        art={<IllustrationIndustries />}
      />

      <section className="section">
        <div className="container">
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
          <p className="section-intro reveal" style={{ marginTop: "2rem" }}>
            Don&rsquo;t see your sector, or work across several of them?{" "}
            <Link href="/contact" className="text-link">
              Tell us what you&rsquo;re trying to solve <span className="arr">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">
            Found your industry? Let&rsquo;s scope <span className="grad">it.</span>
          </h2>
          <p className="lede reveal">
            A free engineering call turns an industry page into a plan with a price and a date.
          </p>
          <div className="hero-actions reveal">
            <Link className="btn" href="/contact">
              Talk to an expert <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
