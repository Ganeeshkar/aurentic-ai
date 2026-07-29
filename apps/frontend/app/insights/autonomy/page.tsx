import Link from "next/link";
import { ArticleLayout } from "@/components/shared/ArticleLayout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The Autonomy Dial: How Much Should Your AI Agent Be Allowed to Do? — Foxtheta",
  description:
    "Read-only, draft-only, gated actions, supervised autonomy: the four levels of agent trust and the evidence that unlocks each one.",
  path: "/insights/autonomy",
});

export default function AutonomyArticle() {
  return (
    <ArticleLayout
      crumbLabel="The autonomy dial"
      kicker="Engineering · 8 min read"
      title="The autonomy dial: how much should your AI agent be allowed to do?"
      date="June 2026"
    >
      <p>
        The autonomy debate is usually framed as a binary — “human in the loop” versus “fully
        autonomous” — which is like framing driving as “parked” versus “Formula 1.” Real
        operational autonomy is a dial with notches, and the craft is knowing what evidence
        justifies each turn. Here are the four notches we use on every Foxtheta deployment, and
        the graduation criteria between them.
      </p>

      <h2>Notch 1 — Read-only</h2>
      <p>
        The agent observes and reports: summarizes the queue, flags anomalies, drafts a morning
        brief about what it <em>would</em> do. No writes anywhere. This notch looks timid and is
        anything but — it’s where you discover whether the agent even understands your domain, at
        zero risk. Most failed agent projects would have failed cheaply here instead of
        expensively later.
      </p>
      <p>
        <b>Graduate when:</b> two weeks of its reports match reality — the anomalies were real,
        the classifications agree with your team, and nobody caught it confidently making things
        up.
      </p>

      <h2>Notch 2 — Draft-only</h2>
      <p>
        The agent produces the work — replies, records, reconciliations — but a human sends
        everything. The key discipline is grading: every draft accepted, edited, or rejected is a
        data point. Track the accept-as-is rate <em>by category</em>; it tells you precisely which
        slices of the job the agent has mastered, instead of an overall average that hides the
        dangerous 10%.
      </p>
      <p>
        <b>Graduate when:</b> accept-as-is exceeds your bar (we like 90%+) in a category,
        sustained for weeks, with the misses analyzed and guard-railed — and graduate per
        category, not wholesale.
      </p>

      <p className="pull">
        Turn the dial per category, not per agent. “Trustworthy at address changes” and
        “trustworthy at <i>refunds</i>” are different licenses.
      </p>

      <h2>Notch 3 — Gated actions</h2>
      <p>
        The agent acts autonomously on its proven categories, while consequential actions — money,
        deletions, external sends above thresholds — pause at a human gate. Two design rules
        decide whether this notch works. First, the gate must be fast: one click, full context
        attached, seconds not minutes — or humans will rubber-stamp without reading and you’ve
        built a compliance fiction. Second, the truly irreversible actions shouldn’t be gated at
        all — they should be architecturally impossible, living outside the agent’s permissions
        entirely. A gate can be clicked carelessly; an absent capability cannot.
      </p>
      <p>
        <b>Graduate when:</b> months of gate decisions show near-total approval rates on a
        category — at which point the gate itself has become the evidence that it’s no longer
        needed there.
      </p>

      <h2>Notch 4 — Supervised autonomy</h2>
      <p>
        The agent runs its domain end to end; humans supervise through the action log, sampling
        audits, and drift alarms rather than per-action approvals. Note the word:{" "}
        <em>supervised</em>. Even at the top of the dial, three structures stay forever — the
        complete action log, nightly re-tests against benchmark tasks, and a kill switch that
        degrades gracefully back to the manual process. Autonomy without those isn’t maturity;
        it’s abandonment with extra steps.
      </p>

      <h2>The dial turns both ways</h2>
      <p>
        The least-discussed feature of a good autonomy system is the down-shift. Model update
        regressed the benchmarks? Notch down to gated until the numbers recover. Unusual volume
        from an unfamiliar pattern? Notch down automatically. Teams resist this because it feels
        like failure — it’s the opposite. A dial that only turns clockwise isn’t a control system;
        it’s a countdown. The businesses that will run serious agent fleets in five years are
        building the ratchet-down reflex today, while the stakes are still small.
      </p>

      <p>
        <em>
          Every Foxtheta agent starts at notch one and earns its way up — that’s the shadow-mode
          process in our{" "}
          <Link href="/process" style={{ color: "var(--fire)", textDecoration: "underline" }}>
            playbook
          </Link>
          . Wondering where your workflow’s dial should sit?{" "}
          <Link href="/contact" style={{ color: "var(--fire)", textDecoration: "underline" }}>
            Ask us on a free call.
          </Link>
        </em>
      </p>
    </ArticleLayout>
  );
}
