# Content Documentation

Why every page says what it says. This is the reasoning layer that a
`page.tsx` file itself can't carry — the file has the copy, this document
has the *why*.

> **Scope note:** the site currently covers six industries — Banking &
> Financial Services, Insurance, Healthcare, Manufacturing, Retail &
> E-commerce, and Logistics. **Education is not yet built** — if you're
> reading this while planning an Education page, see
> [Adding a 7th industry](#adding-a-7th-industry-or-any-new-page) below for
> the process, and [ROADMAP.md](ROADMAP.md) for it as a tracked future item.

## The core positioning decision

The site is built around one deliberate choice: **lead with industry, not
with technology.** The homepage headline is "AI solutions built for the way
*your* industry runs," and the primary navigation is Industries → Technology
→ About → Insights, in that order. This was not the starting point — earlier
in this project's history the site was organized capability-first
("Agentic AI," "Enterprise RAG," etc. as the primary nav), then briefly
function-first ("Finance Intelligence," "Sales Intelligence"). Both were
replaced with industry-first navigation deliberately, because:

- A banking CTO and a hospital administrator have almost nothing in common
  in *how they evaluate a vendor* — different regulators, different data
  sensitivity, different existing systems, different words for the same
  problem. A page that speaks to "AI agents" in the abstract has to speak to
  neither audience specifically, so it ends up speaking to no one
  persuasively.
- Industry-first lets each page open with the *reader's own problem*
  (reconciliation for finance, claims for insurance, patient intake for
  healthcare) instead of *our product category* — which is the difference
  between a page that gets read past the first paragraph and one that
  doesn't.

The trade-off, made consciously: six full pages is more to write and
maintain than one generic page, and each new industry is real content work,
not a config change (see [Adding a 7th industry](#adding-a-7th-industry-or-any-new-page)).
That cost was accepted because a generic page converts a specific buyer
worse than a specific page converts a generic buyer.

## Why each industry's content is genuinely different, not templated

All six industry pages share the same **structure** (8 sections, rendered
through `IndustryPageTemplate` — see [FRONTEND.md](FRONTEND.md)) but
deliberately do **not** share content, wording, or even which underlying
capability gets emphasized. The structure is the container; the content is
where the actual differentiation has to live, or the "industry-first"
premise above is just decoration.

| Industry | What's actually different about it, and why the page reflects that |
|---|---|
| **Banking & Financial Services** | The controlling constraint is **regulatory audit evidence** — every AI action needs a paper trail a regulator would accept. So this page leads with reconciliation and KYC (the highest-volume, most audit-sensitive workflows) and its FAQ is dominated by "how do you handle regulatory and audit requirements" and "who is accountable." The ROI numbers (90%+ touchless processing, 3× underwriter throughput) are the boldest on the site, because banking automation case studies in the wild genuinely do report numbers in that range for document-heavy workflows — this is the industry where the technology is most mature. |
| **Insurance** | The controlling constraint is **coverage accuracy** — a wrong answer about what a policy covers is a liability and a customer-trust event, not just an inefficiency. So this page's "Key Features" section leads with citation-backed coverage answers ("always cited back to the actual clause"), a feature no other industry page emphasizes as heavily, because no other industry's core product *is* a contract whose exact wording determines a payout. |
| **Healthcare** | The controlling constraint is **PHI and the clinical/administrative boundary**. This is the only industry page with an explicit, repeated architectural boundary statement: *AI handles administrative support, never clinical decisions.* That's not boilerplate caution — it's the single most important sentence on the page for a hospital compliance reviewer, and it's why the FAQ leads with "does the AI make clinical decisions" before anything about ROI. |
| **Manufacturing** | The controlling constraint is **tacit knowledge trapped in people**, not documents. The differentiating solution here is the technical knowledge engine (decades of manuals/tickets made queryable) — a capability that exists on other pages too, but only manufacturing's copy frames it as the headline story ("AI that turns decades of plant knowledge into an answer in seconds"), because that's the loss this industry actually feels most acutely (a senior engineer retiring with the knowledge still in their head, not a spreadsheet). |
| **Retail & E-commerce** | The controlling constraint is **volume and velocity**, not accuracy risk in the same sense as banking/healthcare. So this is the only page organized around "your storefront runs while your team sleeps" — overnight support, catalogue scale, delivery-status deflection. The ROI framing (median response time in minutes, not hours) reflects that retail's real cost is queue backlog, not compliance exposure. |
| **Logistics** | The controlling constraint is **being first to know**, not first to react. The headline — "AI that catches a shipment exception before your customer does" — and the emphasis on continuous monitoring (vs. batch/on-demand processing elsewhere) reflect that logistics failures are time-sensitive in a way document-processing failures in banking are not. |

**The test each page has to pass:** if you swapped two industries' body copy
but kept their headlines, would a reader from that industry notice
something was off? For all six pages today, yes — the challenges, feature
emphasis, and FAQ priorities are load-bearing, not decorative.

## What's on every industry page, and why (the 8-section structure)

| # | Section | Why it exists | What it has to do |
|---|---|---|---|
| 1 | Business Challenges | Opens with the reader's problem, not our product — earns the right to be read further. | Name 4 real, specific operational pains a person in that role actually has, in their own vocabulary. |
| 2 | AI Solutions We Provide | The actual offer. | 4–6 named systems, each with a one-line mechanism (not just a benefit claim) and 3 concrete bullets. |
| 3 | Implementation Approach | Answers "how would this actually happen" before the reader has to ask. | The same 4-step methodology on every page (Discovery → Signed Spec → Shadow-Mode Validation → Operate & Govern) — consistent on purpose, since *how we work* doesn't change by industry, only *what we build* does. See [Process](#the-process-page-why-the-same-4-steps-everywhere) below. |
| 4 | Key Features | Where governance claims become architecture claims. | Each bullet must describe something structurally true ("pauses for approval by architecture, not by policy"), never a vague promise. |
| 5 | Business Benefits & ROI | Makes the value concrete without lying about certainty. | 3 numeric targets, each explicitly labeled a target validated in shadow mode — never presented as an average across real clients (see [CONTENT_REVIEW.md](CONTENT_REVIEW.md) for why this framing matters). |
| 6 | Technologies We Use | For the technical stakeholder in the room who isn't the economic buyer. | Named, honest, model-agnostic — no unearned certification claims. |
| 7 | Example Use Cases | Concrete scenario vignettes, not a restatement of section 2. | Each use case must read as a specific week-in-the-life moment, not "Solution X, described again" (an earlier draft of Banking's page made this mistake and was rewritten — see [CONTENT_REVIEW.md](CONTENT_REVIEW.md)). |
| 8 | FAQ | Pre-empt the objection that would otherwise end the conversation on a sales call. | 5 questions, ordered by how early a skeptical buyer in *that specific industry* would actually ask them. |

## Why these services are included (and what problem each solves)

The site organizes capability into six disciplines (see `/technology` and
[FRONTEND.md](FRONTEND.md)) that recur across every industry page's
"Solutions" section under different names:

| Discipline | Business problem it solves | How it's delivered |
|---|---|---|
| **Agentic AI** | Work that requires *coordinating multiple steps and systems*, not just answering a question — e.g. triaging a claim requires reading, checking policy, and routing, not one lookup. | Multi-agent orchestration with explicit permission scopes; a human approval gate on any consequential action, enforced architecturally (not a checkbox that could be disabled). |
| **Enterprise RAG / Knowledge Intelligence** | Answers currently locked inside documents/tickets/manuals that only a specific senior person knows how to find. | Retrieval scoped to the client's own knowledge base, every answer cited back to source, engineered to say "not found" rather than fabricate. |
| **AI Copilots** | Staff spend time on drafting/summarizing work that's necessary but not the actual judgment call. | Embedded in the tool the team already uses (not a separate chat window), adoption measured, human reviews/approves the output. |
| **Document Intelligence** | High-volume unstructured documents (invoices, claims, certificates) that currently require manual reading and data entry. | Extraction + classification at volume, with exceptions routed to a person rather than silently dropped or guessed. |
| **Workflow & Communication Automation** | Multi-step processes that span systems no single piece of software owns end to end. | Deterministic automation where reliability is non-negotiable, AI judgment layered in only where nuance is genuinely required. |
| **AI Platform Engineering & LLMOps** | The unglamorous but essential work of keeping an AI system correct *after* launch, as models/data drift. | Nightly evaluation against benchmark tasks, cost/drift monitoring, a real handover path (documentation + training) so the client isn't locked in. |

## The Process page: why the same 4 steps everywhere

`Discovery & Architecture → Signed Specification → Shadow-Mode Validation →
Operate & Govern` is identical on every industry page's "Implementation
Approach" section and on `/process` itself. This consistency is deliberate,
not laziness: the *methodology* is industry-agnostic (it's a claim about how
this company works, full stop), while the *content that flows through the
methodology* is industry-specific. Repeating it verbatim also does real
work for a buyer comparing two industry pages side by side (a multi-division
enterprise evaluating both Banking and Insurance, say) — it signals "this is
one company with one discipline," not six different teams improvising.

The specific commitment worth understanding: **shadow-mode validation**
means the system runs on real work in parallel with the existing process,
graded by the client's own team, before it's allowed to act unsupervised.
This is the single most load-bearing trust claim on the entire site — it's
referenced in the homepage hero, every industry FAQ's "how long until we see
results," and two dedicated Insights articles
(`/insights/shadow-mode`, `/insights/hiring-agents`). If you're editing
copy anywhere on this site, do not weaken or contradict this claim — it's
the thing every other trust claim depends on being true.

## Expected customer journey

```
1. Arrival — usually one of two paths:
   (a) Search/referral lands directly on an industry page (highest intent)
   (b) Organic/social lands on Home or an Insights article (lower intent,
       needs routing)

2. Home (if that's the entry point)
   → hero states the positioning
   → live agent demo proves "governed autonomy" isn't just a slogan
   → industries grid routes the visitor to (3)

3. An industry page — the primary conversion surface
   → Challenges section: "yes, that's my problem" (qualifies the visitor)
   → Solutions + Features: "here's specifically what you'd get"
   → ROI: "here's roughly what it's worth" (self-serve, no email gate)
   → FAQ: clears the last objection
   → CTA: "Talk to an expert" → /contact

4. (Optional detour) /technology or /platform — for a technical or
   security stakeholder who was looped in before the deal can move, without
   forcing every visitor through that depth first

5. /case-studies — for a buyer who wants proof before a call, honestly
   labeled as representative patterns (see CONTENT_REVIEW.md)

6. /contact — company-size and evaluation-stage fields let the visitor
   self-qualify; an NDA option exists for a buyer who needs one before
   sharing workflow detail
```

Every industry page's final CTA is intentionally the same two options
("Talk to an expert" / "See other industries") rather than a single forced
path — a multi-division visitor (e.g. an insurer that's also a bank) should
be able to keep browsing, not be funneled to contact after one page.

## Target audience per page

| Page | Primary reader | What they need to leave with |
|---|---|---|
| Home | Anyone arriving without a pre-formed intent | A one-sentence understanding of the positioning + a clear next click |
| `/industries/*` | An operations/technology decision-maker *in that specific sector* | Confidence this company understands their specific constraints, not a generic AI pitch |
| `/technology` | A technical evaluator (engineering lead, architect) | Enough real detail to judge engineering seriousness, independent of any one industry |
| `/platform` | A security/compliance reviewer | Something they can forward internally without having to translate it themselves |
| `/case-studies` | A buyer late in evaluation, wanting third-party-shaped proof | Honest evidence, or an honest admission that named proof isn't available yet |
| `/about` | A buyer doing vendor/company diligence | Why this company should be trusted with something consequential |
| `/process` | A buyer who's interested but hasn't committed | A concrete, de-risked picture of what happens after they say yes |
| `/insights` | A researcher, or someone deciding whether this company understands the space before ever talking to sales | Genuine practitioner-level thinking, not marketing fluff |
| `/contact` | A visitor who has already decided to act | Confidence the process from here is fast, direct, and doesn't require restating everything they just read |

## Adding a 7th industry (or any new page)

1. Create `app/industries/<slug>/page.tsx`, following the pattern in an
   existing industry file (e.g. `app/industries/banking/page.tsx`) — export
   `metadata` via `pageMetadata()` and a `DATA` object typed as
   `IndustryPageData`, then render `<IndustryPageTemplate data={DATA} />`.
2. **Do not template the content.** Work through the reasoning in
   [Why each industry's content is genuinely different](#why-each-industrys-content-is-genuinely-different-not-templated)
   above first — identify that industry's actual controlling constraint
   before writing a single section. If you can't articulate what's
   different about this industry's *problem* (not just its name), the page
   isn't ready to write yet.
3. Add the new industry to: `app/industries/page.tsx` (index grid),
   `sections/home/ServicesSection.tsx` (home teaser), and
   `components/shared/SiteFooter.tsx` (footer Industries column).
4. Add the new route to `lib/site-config.ts`'s `PUBLIC_ROUTES` so it's
   included in `sitemap.xml`.
5. Add a matching icon to `components/shared/IndustryIcons.tsx` if one
   doesn't already fit.
6. Run through [CONTENT_REVIEW.md](CONTENT_REVIEW.md)'s per-section
   checklist before considering it done — vague/generic copy is the single
   most common failure mode when a page is added under time pressure.
