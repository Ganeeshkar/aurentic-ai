"use client";

import { FormEvent, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/api/v1";

const TOPICS = [
  "Agentic AI — take over a workflow",
  "Enterprise RAG / knowledge system",
  "AI copilot for my team or product",
  "Document intelligence",
  "Workflow & communication automation",
  "AI governance, security, or LLMOps",
  "Not sure yet — need an architecture review",
];

const COMPANY_SIZES = [
  "1–50 employees",
  "51–500 employees",
  "501–5,000 employees",
  "5,000+ employees",
];

const STAGES = [
  "Evaluating for a specific initiative",
  "Exploring — no defined project yet",
];

type SubmitState = { tone: "idle" | "sending" | "ok" | "error"; message: string };

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState(COMPANY_SIZES[1]);
  const [stage, setStage] = useState(STAGES[0]);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [nda, setNda] = useState(false);
  const [residency, setResidency] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — never shown to real visitors
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitState>({ tone: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName.trim() || !workEmail.trim() || !message.trim()) {
      setStatus({ tone: "error", message: "Please fill in your name, email, and message." });
      return;
    }
    if (message.trim().length < 10) {
      setStatus({
        tone: "error",
        message: "Tell us a little more about the work — a sentence or two is enough.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ tone: "sending", message: "Sending…" });

    // The backend contact schema mirrors the original 1:1 form; the added
    // enterprise-intake qualifiers (size, stage, NDA, residency) are folded
    // into the message body rather than requiring a schema change to add
    // new fields the routing logic doesn't act on yet.
    const qualifiers = [
      `Company size: ${companySize}`,
      `Stage: ${stage}`,
      nda ? "Requests NDA before further detail" : null,
      residency.trim() ? `Preferred data residency: ${residency.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    const payload = {
      full_name: fullName.trim(),
      work_email: workEmail.trim(),
      company_name: companyName.trim() || null,
      topic,
      message: `${qualifiers}\n\n${message.trim()}`,
      source: "discovery_call",
      website,
      // Real Cloudflare Turnstile verification plugs in here once a site
      // key is configured — see apps/backend/app/services/spam_protection.py.
      turnstile_token: "not-configured",
    };

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 202) {
        setStatus({ tone: "ok", message: "Thanks — an engineer will reply within one business day." });
        setFullName("");
        setWorkEmail("");
        setCompanyName("");
        setCompanySize(COMPANY_SIZES[1]);
        setStage(STAGES[0]);
        setTopic(TOPICS[0]);
        setNda(false);
        setResidency("");
        setMessage("");
        return;
      }
      if (response.status === 422) {
        throw new Error("Please double-check the form — one of the fields didn't validate.");
      }
      if (response.status === 429) {
        throw new Error("Too many submissions — please try again in a little while.");
      }
      throw new Error("Something went wrong on our end.");
    } catch (err) {
      // Network/API failure fallback: don't lose the enquiry — open a
      // pre-filled email as a last resort, same principle as the old
      // static-site flow, but only reached if the API is unreachable.
      const reason = err instanceof Error ? err.message : "Something went wrong.";
      setStatus({ tone: "error", message: `${reason} Opening your email app as a backup.` });
      const bodyText = `Name: ${fullName}\nEmail: ${workEmail}\nCompany: ${companyName}\n${qualifiers}\nInterest: ${topic}\n\n${message}`;
      window.location.href =
        "mailto:hello@foxtheta.com?subject=" +
        encodeURIComponent("Enterprise inquiry — " + (companyName || fullName)) +
        "&body=" +
        encodeURIComponent(bodyText);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="field" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            autoComplete="organization"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="company-size">Company size</label>
          <select id="company-size" name="company-size" value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
            {COMPANY_SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="topic">What are you evaluating?</label>
          <select id="topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="stage">Where are you in the process?</label>
          <select id="stage" name="stage" value={stage} onChange={(e) => setStage(e.target.value)}>
            {STAGES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="residency">Preferred data residency / region (optional)</label>
        <input
          type="text"
          id="residency"
          name="residency"
          placeholder="e.g. EU-only, US, India, no preference"
          value={residency}
          onChange={(e) => setResidency(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="message">Tell us about the work</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="What does the process look like today? Who does it? What does slow or wrong cost you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="field checkbox">
        <input
          type="checkbox"
          id="nda"
          name="nda"
          checked={nda}
          onChange={(e) => setNda(e.target.checked)}
        />
        <label htmlFor="nda" style={{ marginBottom: 0, textTransform: "none", fontFamily: "var(--body)", fontSize: ".88rem", letterSpacing: 0 }}>
          I&rsquo;d like to sign an NDA before sharing internal workflow detail
        </label>
      </div>

      <button type="submit" className="btn" disabled={submitting}>
        Request an engineering call <span className="arr">→</span>
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status.message}
      </p>
      <p className="form-note">
        We reply within one business day. No mailing lists, no spam — see our{" "}
        <a href="/privacy">privacy policy</a>.
      </p>
    </form>
  );
}
