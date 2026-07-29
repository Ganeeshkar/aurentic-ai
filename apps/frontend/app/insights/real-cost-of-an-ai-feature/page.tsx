import Link from "next/link";
import { ArticleLayout } from "@/components/shared/ArticleLayout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The Real Cost of an AI Feature — Foxtheta",
  description:
    "Tokens are the visible line item. Latency budgets, evaluation, and fallback paths are the invisible ones. A cost model founders and operators can actually use.",
  path: "/insights/real-cost-of-an-ai-feature",
});

export default function RealCostArticle() {
  return (
    <ArticleLayout
      crumbLabel="The real cost of an AI feature"
      kicker="Strategy · 8 min read"
      title="The real cost of an AI feature"
      date="August 2026"
    >
      <p>
        Ask a team what their AI feature costs and you'll usually get a token price — cents per
        thousand tokens, multiplied by expected volume. That number is real, and it is also a
        small fraction of what the feature actually costs to run responsibly. The rest of the cost
        is invisible on a vendor's pricing page because it isn't the vendor's job to tell you about
        it. It's the engineering discipline around the model call, and it's usually where budgets
        quietly blow past their estimate.
      </p>

      <h2>The line item everyone sees</h2>
      <p>
        Token cost is easy to model and easy to defend in a budget meeting, which is exactly why
        it dominates the conversation. It's a real cost and it matters at scale — but treating it
        as <em>the</em> cost of an AI feature is like costing a restaurant by the price of the
        ingredients and ignoring the kitchen, the staff, and the health inspector.
      </p>

      <h2>The costs that don't show up on the invoice</h2>
      <p>
        <b>Latency budgets.</b> A model call that takes four seconds instead of 400 milliseconds
        changes your product's architecture — you now need loading states, timeout handling, and
        possibly a faster (more expensive) model for the interactive path, with the cheaper model
        reserved for background work. That's an engineering cost, not a token cost, and it's
        usually bigger.
      </p>
      <p>
        <b>Evaluation infrastructure.</b> Knowing whether a change to a prompt, a model version, or
        a retrieval index made things better or worse requires a benchmark suite you maintain and
        re-run — ideally nightly, always before any change ships. Building and maintaining that
        suite is real, ongoing engineering time that has nothing to do with token price.
      </p>
      <p>
        <b>Fallback paths.</b> Models fail, time out, and occasionally return nonsense. A feature
        that only has a happy path isn't finished — it's a demo with the error handling not yet
        written. Building the fallback (retry, degrade to a simpler response, or route to a human)
        is a cost every serious AI feature carries and every unserious one skips, right up until
        the day it fails in front of a customer.
      </p>
      <p>
        <b>Human review time.</b> If any output is customer-facing or consequential, someone is
        reviewing a sample of it on an ongoing basis — not once at launch, but continuously,
        because models and data both drift. That's a real, recurring headcount cost that a token
        price will never surface.
      </p>

      <p className="pull">
        The token price is what the model costs to run once. The real cost is what it takes to
        keep it right, <i>every time</i>, after the demo is over.
      </p>

      <h2>A cost model you can actually use</h2>
      <p>
        Rather than a single number, budget an AI feature in four buckets: (1) inference — the
        token cost, straightforward to estimate from expected volume; (2) engineering — the
        latency handling, fallback paths, and integration work, roughly comparable to building any
        new product surface; (3) evaluation — the benchmark suite and its maintenance, ongoing, not
        one-time; (4) review — the human-in-the-loop time for anything consequential, scaled to
        volume and risk. Teams that only budget bucket one are the ones who come back six months
        later asking why the feature is &ldquo;more expensive than expected&rdquo; — it isn't; it
        was always this expensive, the invoice just didn't include the other three buckets.
      </p>

      <h2>Why this matters most at the proposal stage</h2>
      <p>
        The vendors quoting only inference cost aren't lying, exactly — they're answering the
        question you asked instead of the question you meant. A serious partner will walk you
        through all four buckets before you sign anything, including the ones that make the number
        bigger. If a proposal's entire cost section is a token-price calculation, that's worth
        asking about directly, before the budget is fixed and the invisible costs show up as scope
        creep.
      </p>

      <p>
        <em>
          Every Foxtheta specification prices all four buckets up front, in writing, before a line
          of code is built — see how in our{" "}
          <Link href="/process" style={{ color: "var(--fire)", textDecoration: "underline" }}>
            process
          </Link>
          . Want a real number for your feature?{" "}
          <Link href="/contact" style={{ color: "var(--fire)", textDecoration: "underline" }}>
            Ask us on a free call.
          </Link>
        </em>
      </p>
    </ArticleLayout>
  );
}
