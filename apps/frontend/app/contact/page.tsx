import Link from "next/link";
import { ContactForm } from "@/features/contact-form/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact — Talk to Our Engineering Team — Foxtheta",
  description:
    "Start with your architecture, not a form. Tell us the AI system you need to build — an engineer replies directly, no queue, no BDR.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / Contact
          </p>
          <p className="klabel">Contact</p>
          <h1>
            Start with your architecture, not a <span className="grad">form.</span>
          </h1>
          <p className="lede">
            Tell us the system you need to build. An engineer replies directly — not a
            salesperson, not a queue. If you need this under NDA before sharing detail, say so
            below and we&rsquo;ll set it up.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="reveal">
            <ContactForm />
          </div>
          <aside className="reveal">
            <p className="klabel">What happens next</p>
            <div className="contact-fact" style={{ marginTop: "1.2rem" }}>
              <b>Within one business day</b>
              <span>An engineer replies — with questions, not a pitch deck.</span>
            </div>
            <div className="contact-fact">
              <b>The engineering call · 30 min · free</b>
              <span>Your workflow, mapped live. If AI isn&rsquo;t the answer yet, we say so on the call.</span>
            </div>
            <div className="contact-fact">
              <b>The written follow-up</b>
              <span>What we&rsquo;d build, what we wouldn&rsquo;t, rough numbers, and a recommended first step. Yours to keep either way.</span>
            </div>
            <p className="klabel" style={{ marginTop: "2.5rem" }}>
              Direct
            </p>
            <div className="contact-fact">
              <b>hello@foxtheta.com</b>
              <span>Every enquiry is read and answered by a senior engineer — no support queue in between.</span>
            </div>
            <div className="contact-fact">
              <b>Remote-first, worldwide</b>
              <span>Delivery teams working across IST · GST · CET · EST time zones.</span>
            </div>
            <div className="contact-fact">
              <b>Need it under NDA?</b>
              <span>Check the box in the form — we&rsquo;ll send one before asking for further workflow detail.</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
