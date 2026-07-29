import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy — Foxtheta",
  description: "What Foxtheta collects, why, how long we keep it, and how to request deletion — in plain language.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Privacy"
        label="Legal"
        title={<>Privacy <span className="grad">policy.</span></>}
        lede="We collect what's needed to reply to you and route your enquiry — nothing more, and never sold. Here's exactly what that means."
      />

      <section className="section">
        <div className="container">
          <div className="article">
            <p className="art-meta">
              <span>Effective: July 2026</span>
              <span>Scope: foxtheta.com and its contact form</span>
            </p>

            <h2>The short version</h2>
            <p>
              This site does not run advertising pixels, does not use third-party analytics or
              behavioral trackers, and does not set marketing or tracking cookies. It does have a
              contact form, and submitting it stores your details in our database so a real
              engineer can read and reply to your enquiry. That&rsquo;s the extent of what we
              collect: what you type into the form, and standard hosting logs.
            </p>

            <h2>What we collect and why</h2>
            <p>
              <b>If you submit the contact form:</b> your name, work email, company name, the
              topic you selected, your message, and — if you use them — company size, evaluation
              stage, and preferred data-residency region. This is sent to our backend (a FastAPI
              application) and stored in a PostgreSQL database so an engineer can follow up and so
              we have a record of what was asked. Your IP address is logged alongside the
              submission for spam and abuse prevention (rate-limited to 5 submissions per hour per
              source).
            </p>
            <p>
              <b>If you don&rsquo;t submit the form:</b> we collect nothing beyond standard hosting
              and server logs (IP address, user agent, pages requested) kept for security and
              capacity purposes under our hosting provider&rsquo;s retention policy. Browsing the
              site, using the ROI calculator, or watching the agent demo sends nothing to our
              servers — those run entirely in your browser.
            </p>
            <p>
              <b>Fonts:</b> typefaces load from Google Fonts, so your browser requests font files
              from Google&rsquo;s servers under{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google&rsquo;s privacy policy
              </a>
              . We plan to self-host fonts ahead of commercial launch to remove this dependency
              entirely.
            </p>

            <h2>How submissions are used</h2>
            <p>
              A contact-form submission triggers two automated emails: an internal notification to
              our sales inbox, and a confirmation to the address you provided acknowledging
              receipt. Your details are used only to route, evaluate, and respond to your
              enquiry — never sold, rented, or shared with third parties for marketing, and you are
              not added to any mailing list unless you separately opt in.
            </p>

            <h2>Data retention and deletion</h2>
            <p>
              We retain contact and lead records for as long as needed to respond to your enquiry
              and maintain a business record of the conversation — there is currently no automatic
              deletion schedule. If you want your data deleted, email{" "}
              <a href="mailto:hello@foxtheta.com">hello@foxtheta.com</a>{" "}
              and we will remove it from our database within 30 days, except where
              we&rsquo;re legally required to retain records for a longer period.
            </p>

            <h2>Security</h2>
            <p>
              Submissions travel over HTTPS. Database credentials and API access are scoped to the
              services that need them, following the same least-privilege principle we apply to
              the AI systems we build. We do not currently hold a third-party security
              certification (e.g. SOC 2) — if that&rsquo;s a requirement for your evaluation,{" "}
              <Link href="/platform">tell us on our Platform &amp; Trust page</Link>{" "}
              and we&rsquo;ll give you a straight answer on timeline and scope rather than an
              overstated claim.
            </p>

            <h2>Your rights</h2>
            <p>
              Under GDPR, CCPA, India&rsquo;s DPDP Act, and similar laws, you may request access
              to, correction of, or deletion of personal data we hold about you. Contact{" "}
              <a href="mailto:hello@foxtheta.com">hello@foxtheta.com</a>{" "}
              for any of these requests.
            </p>

            <h2>Changes</h2>
            <p>
              Material updates will be posted here with a new effective date. This policy will be
              reviewed by counsel and updated ahead of commercial launch, including to cover any
              analytics we choose to add — with consent, if we do.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
