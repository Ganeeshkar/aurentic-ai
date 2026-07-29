import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service — Foxtheta",
  description: "The rules for using this website, in plain language.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Terms"
        label="Legal"
        title={<>Terms of <span className="grad">service.</span></>}
        lede="The rules for using this website, in plain language."
      />

      <section className="section">
        <div className="container">
          <div className="article">
            <p className="art-meta">
              <span>Effective: July 2026</span>
              <span>Scope: this website</span>
            </p>

            <h2>1. What this site is</h2>
            <p>
              This website presents Foxtheta’s services, methodology, and use-case library
              ahead of commercial launch. Illustrative scenarios (including the interactive agent
              demo and calculator estimates) demonstrate how our systems work; they do not
              describe specific past client engagements. Client work is governed by individually
              signed agreements, not by this page.
            </p>

            <h2>2. Acceptable use</h2>
            <p>
              Browse, link, and share freely. Don’t attempt to disrupt the hosting, misrepresent
              the content, or scrape it into spam machinery.
            </p>

            <h2>3. Intellectual property</h2>
            <p>
              The writing, design system, code, and generated artwork on this site belong to
              Foxtheta’s founders. Typefaces are used under their respective licenses.
            </p>

            <h2>4. No advice</h2>
            <p>
              Articles and service pages describe general engineering practice, not advice for
              your specific situation. The ROI calculator produces planning estimates, not quotes
              or guarantees. Your real numbers come from an actual conversation.
            </p>

            <h2>5. No warranties · limited liability</h2>
            <p>
              The site is provided “as is.” To the maximum extent permitted by law, Foxtheta
              and its creators are not liable for indirect or consequential damages arising from
              use of this website.
            </p>

            <h2>6. Changes</h2>
            <p>Updates are posted here with a new effective date.</p>
          </div>
        </div>
      </section>
    </>
  );
}
