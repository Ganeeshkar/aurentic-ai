import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceGrid, ServiceItem } from "@/components/shared/ServiceGrid";
import { StepsGrid, StepItem } from "@/components/shared/StepsGrid";
import { Faq, FaqItem } from "@/components/shared/Faq";

export type Challenge = { title: string; body: string };
export type RoiMetric = { value: string; label: string };
export type UseCaseCard = { title: string; body: string; impact: string };

export type IndustryPageData = {
  crumb: string;
  title: React.ReactNode;
  lede: string;
  challenges: Challenge[];
  solutionsIntro: string;
  solutions: ServiceItem[];
  approach: StepItem[];
  features: string[];
  featuresIntro: string;
  roiMetrics: RoiMetric[];
  techChips: string[];
  useCases: UseCaseCard[];
  faqItems: FaqItem[];
  ctaTitle: React.ReactNode;
  ctaLede: string;
};

export function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const {
    crumb,
    title,
    lede,
    challenges,
    solutionsIntro,
    solutions,
    approach,
    features,
    featuresIntro,
    roiMetrics,
    techChips,
    useCases,
    faqItems,
    ctaTitle,
    ctaLede,
  } = data;

  return (
    <>
      <PageHero crumb={crumb} label={`Industries / ${crumb}`} title={title} lede={lede} />

      {/* 01 CHALLENGES */}
      <section className="section" id="challenges">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">01 / Business challenges</p>
            <h2>Where the workload actually <span className="grad">sits.</span></h2>
          </div>
          <div className="challenge-grid reveal-stagger">
            {challenges.map((c, i) => (
              <div className="challenge" key={c.title}>
                <span className="c-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{c.title}</b>
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 SOLUTIONS */}
      <section className="section section--panel" id="solutions">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">02 / AI solutions we provide</p>
            <h2>Systems built for the workflows above.</h2>
            <p className="section-intro">{solutionsIntro}</p>
          </div>
          <ServiceGrid items={solutions} />
        </div>
      </section>

      {/* 03 APPROACH */}
      <section className="section" id="approach">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">03 / Implementation approach</p>
            <h2>Proof before production, every <span className="grad">time.</span></h2>
          </div>
          <StepsGrid items={approach} />
        </div>
      </section>

      {/* 04 KEY FEATURES */}
      <section className="section section--panel" id="features">
        <div className="container split">
          <div className="reveal">
            <p className="klabel">04 / Key features</p>
            <h2>Governance is architecture, not a policy document.</h2>
            <p>{featuresIntro}</p>
          </div>
          <div className="reveal">
            <ul className="checklist">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 BENEFITS / ROI */}
      <section className="section" id="roi">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">05 / Business benefits &amp; expected ROI</p>
            <h2>Conservative targets, proven in shadow <span className="grad">mode.</span></h2>
            <p className="section-intro">
              Every figure below is a target we validate against your real data during shadow
              mode before a system goes live — not a marketing benchmark.
            </p>
          </div>
          <div className="roi-strip reveal-stagger">
            {roiMetrics.map((m) => (
              <div className="roi-card" key={m.label}>
                <b>{m.value}</b>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 TECHNOLOGY */}
      <section className="section section--panel" id="technology">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">06 / Technologies we use</p>
            <h2>Model-agnostic, cloud-flexible, audit-ready.</h2>
          </div>
          <div className="tech-row reveal">
            {techChips.map((t) => (
              <span className="tech-chip" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 07 USE CASES */}
      <section className="section" id="use-cases">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">07 / Example use cases</p>
            <h2>What the systems above look like in a real week.</h2>
            <p className="section-intro">
              Illustrative scenarios built from the parameters we actually design around — not a
              specific named client.
            </p>
          </div>
          <div className="uc-grid reveal-stagger">
            {useCases.map((uc) => (
              <article className="uc" key={uc.title}>
                <h3>{uc.title}</h3>
                <p>{uc.body}</p>
                <p className="uc-impact">▸ {uc.impact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 08 FAQ */}
      <section className="section section--panel" id="faq">
        <div className="container">
          <div className="section-head reveal">
            <p className="klabel">08 / Frequently asked questions</p>
            <h2>Asked before you <span className="grad">ask.</span></h2>
          </div>
          <Faq items={faqItems} />
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <h2 className="reveal">{ctaTitle}</h2>
          <p className="lede reveal">{ctaLede}</p>
          <div className="hero-actions reveal">
            <Link className="btn" href="/contact">
              Talk to an expert <span className="arr">→</span>
            </Link>
            <Link className="btn-ghost" href="/industries">
              See other industries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
