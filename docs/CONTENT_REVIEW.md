# Content Quality Review

An honest, page-by-page quality assessment as of the current build (post
rebrand, post 6-industry build-out, post the copy/accuracy fixes documented
in this project's history). Ratings are out of 10. This is a living
document — re-score a page whenever its content changes materially.

## Scoring rubric

| Score | Meaning |
|---|---|
| 9–10 | Enterprise-grade: specific, mechanism-backed claims; no generic filler; would survive a skeptical buyer's scrutiny line by line. |
| 7–8 | Strong and shippable; one or two specific gaps noted below, not a systemic problem. |
| 5–6 | Functional but generic in places, or missing something a serious buyer would expect. |
| ≤4 | Not shippable as-is. (Nothing on the site currently scores this low — noted for scale.) |

## Overall site score: **8.3 / 10**

Up from an earlier full-site review (7/10) — the two things that review
flagged as most serious, a factually inaccurate Privacy Policy and only 1
of 6 industries built, are both resolved. What's left holding the score
below 9 is consistent across pages: no real named case studies yet, and no
named leadership — both honest gaps, not content-quality problems, but both
visible to a careful buyer.

## Page-by-page

### Home — **9/10**
**Why:** Opens with a specific, falsifiable claim ("AI solutions built for
the way *your* industry runs") rather than an adjective ("innovative,"
"cutting-edge"). The live agent demo is the single best trust-building
element on the site — it *shows* the human-approval-gate claim instead of
asserting it. The ROI calculator is self-serve (no email-gate friction) and
appropriately hedged ("planning estimates, not a quote").
**Weak spot:** the final CTA band is strong copy but visually identical to
every other page's CTA — home's CTA is the one place on the site that could
justify being more distinctive, since it's the highest-traffic exit point.
**Recommendation:** none urgent; if revisited, A/B the CTA copy specifically
against industry-page CTAs.

### `/industries` (index) — **8/10**
**Why:** Clean, honest, all six cards now link to full live pages — no
"coming soon" placeholders left. Card copy is genuinely differentiated per
industry (not six copies of one sentence with the noun swapped).
**Weak spot:** the grid gives all six industries equal visual weight; if one
or two are commercially the priority right now, the page doesn't say so.
**Recommendation:** consider a "most requested" or featured-industry
treatment if/when there's real usage data to justify it — not before.

### `/industries/banking` — **9/10**
**Why:** The flagship page and it reads like one — FAQ specifically
addresses core-banking integration, regulatory evidence, and accountability
in that order, matching how a real banking technology buyer actually
raises objections. Use-case vignettes are genuinely distinct from the
Solutions section (an earlier draft repeated itself here; it was rewritten
— see [CONTENT.md](CONTENT.md)).
**Weak spot:** the 3× underwriter throughput claim is the single boldest
number on the entire site — everywhere else stays in the 30–90% range. It's
labeled a target, but it's the one figure most likely to get pushed back on
in a real sales conversation.
**Recommendation:** either find a defensible range to soften it to (e.g.
"2–3×") or be ready to explain the specific assumption behind it on a call.

### `/industries/insurance` — **8.5/10**
**Why:** Correctly identifies coverage-wording accuracy as the industry's
real trust constraint, not just "claims are slow." The citation-backed
coverage-answer feature is specific to this page for a real reason (see
[CONTENT.md](CONTENT.md)).
**Weak spot:** slightly thinner FAQ than Banking's — regulatory language is
present but less specific to insurance-specific regimes than Banking's is
to banking regulation.
**Recommendation:** low priority; the page is strong as-is.

### `/industries/healthcare` — **9/10**
**Why:** The best-executed trust boundary on the site — "AI handles
administrative support, never clinical decisions" is stated plainly,
repeated in the FAQ, and never soft-pedaled for a stronger sales pitch.
This is exactly the restraint a hospital compliance reviewer is looking
for, and most AI vendors in this space overclaim here.
**Weak spot:** no explicit mention of a signed BAA (Business Associate
Agreement) process anywhere outside the FAQ answer — a HIPAA-sensitive
buyer may look for this more prominently.
**Recommendation:** consider surfacing "BAA available" as a small trust
marker near the top of the page, not just buried in FAQ copy.

### `/industries/manufacturing` — **8/10**
**Why:** Good, specific framing of tacit knowledge loss as the real
problem, not just "manual processes are slow." Technical knowledge engine
correctly gets the headline position.
**Weak spot:** of the six industry pages, this one's "Business Challenges"
section reads slightly more generic than the others — the four challenges
are real but could each be sharper/more specific to a named workflow.
**Recommendation:** revisit challenge copy with a specific plant-floor
scenario in mind for each of the four, the way Banking's "reconciliation
eats the close cycle" is specific rather than "processes are inefficient."

### `/industries/retail` — **8/10**
**Why:** Correctly identifies volume/velocity (not accuracy risk) as the
industry's real constraint — a meaningfully different frame from Banking or
Healthcare, which is exactly the point of industry-first content (see
[CONTENT.md](CONTENT.md)).
**Weak spot:** "overnight support desk" and "delivery-status resolution"
slightly overlap in scope with Logistics' page — a multi-channel retailer
that also runs its own logistics might read both pages and notice the
repetition.
**Recommendation:** acceptable overlap (the two industries genuinely do
share this problem), but if it becomes noticeable in practice, consider a
cross-link ("also see Logistics") rather than forcing artificial
differentiation.

### `/industries/logistics` — **8/10**
**Why:** "Catches an exception before your customer does" is a sharp,
specific frame that correctly centers proactive monitoring over reactive
processing — the actual difference logistics buyers care about.
**Weak spot:** same overlap note as Retail, above.
**Recommendation:** none independent of the Retail note.

### `/technology` — **8/10**
**Why:** Explains all six disciplines without buzzword-stuffing — each has
a one-line mechanism, not just a category name. "Governance is architecture,
not a policy document" is a genuinely strong, ownable line.
**Weak spot:** this page has no industry framing at all (correctly — that's
its job), which means it's the least "sticky" page on the site; a visitor
who lands here without already having read an industry page may not have
enough context to know why any of this matters to them specifically.
**Recommendation:** consider a light "see how this applies to your
industry" prompt higher on the page, not just in the closing CTA.

### `/platform` — **8/10**
**Why:** The five-layer architecture diagram (Interface → Orchestration →
Model → Data → Infrastructure) is genuinely useful content, not filler —
it's the kind of page a security reviewer can actually forward internally.
**Weak spot:** no mention of specific compliance certifications (SOC 2,
ISO 27001) — correctly honest (the company doesn't hold these yet, per the
Privacy Policy's own admission), but the page doesn't proactively address
"do you have X certification" the way it could.
**Recommendation:** add a short, honest section: certifications not yet
held, and the plan/timeline if there is one. Silence on this reads worse
to a security team than an honest "not yet, here's our timeline."

### `/case-studies` — **7/10**
**Why:** The single most ethically well-handled page on the site — every
entry is explicitly labeled "representative engagement pattern," with a
clear notice explaining why (no fabricated logos or invented client
quotes). This is the right call for a company at this stage, and it's
rated relatively well *because* of that honesty, not despite it.
**Weak spot:** it's still, fundamentally, a page without real proof. No
amount of honest labeling changes that a buyer scanning for third-party
validation won't find any yet.
**Recommendation:** the single highest-leverage content addition available
to this site (see [ROADMAP.md](ROADMAP.md)) is converting the first 1–2
real client engagements into named, quote-carrying case studies the moment
confidentiality allows it. Everything else on this page is already as good
as it can be without that.

### `/about` — **8/10**
**Why:** The "Foxtheta" naming rationale (fox-sharp judgment + theta-grade
discipline) reads as an intentional brand decision, not a placeholder — see
[CONTENT.md](CONTENT.md) for how this replaced the prior "authentic +
agentic" wordplay after the rebrand. The six operating principles are
specific and falsifiable ("no bench, no juniors learning on your invoice"),
not generic values-page filler.
**Weak spot:** no named leadership, no team photos, no founding story
beyond the naming rationale. A company this deliberately honest elsewhere
(see Case Studies above) is conspicuous by not naming who's actually behind
it.
**Recommendation:** add real leadership names/LinkedIn links the moment
that information can be shared — this is content that shouldn't be
fabricated to fill the gap, only added when true. See [ROADMAP.md](ROADMAP.md).

### `/process` — **8/10**
**Why:** Concrete and de-risking — "shadow mode" is explained with enough
specificity (real work, in parallel, graded daily) that a skeptical buyer
can picture exactly what it means, not just trust the phrase.
**Weak spot:** the guarantees section ("30-day quality window," "fixed
means fixed") is strong but appears only here — a visitor who converts
directly from an industry page's CTA without visiting `/process` never sees
these commitments.
**Recommendation:** consider surfacing 1–2 of the strongest guarantees
(e.g. "fixed price, signed before we build") directly on industry pages'
"Implementation Approach" section, not just on `/process`.

### `/insights` (index + 4 articles) — **7/10**
**Why:** The actual writing is the strongest prose on the site —
"a demo is a résumé, shadow mode is the probation period" and similar lines
demonstrate real practitioner thinking, not marketing-team AI-content-mill
output. Two newer articles (`/insights/shadow-mode`,
`/insights/real-cost-of-an-ai-feature`) were added specifically to reinforce
the site's two most load-bearing trust claims (see [CONTENT.md](CONTENT.md)).
**Weak spot:** four articles is thin for SEO authority-building at scale —
this is a volume problem, not a quality problem.
**Recommendation:** the fastest content-marketing lever available on this
site is simply writing more, in the same voice, at a regular cadence — see
[ROADMAP.md](ROADMAP.md).

### `/contact` — **8/10**
**Why:** The company-size and evaluation-stage fields let a visitor
self-qualify without friction, and the NDA checkbox is a small but real
signal that this company understands enterprise buying processes.
**Weak spot:** no visible response-time commitment beyond "within one
business day" in the form's fine print — could be more prominent given
it's a genuine differentiator (direct engineer reply, no BDR queue).
**Recommendation:** low priority; consider testing the response-time
commitment as a more visible trust marker near the form itself.

### `/privacy` — **9/10**
**Why:** Now fully accurate to the real system (FastAPI + PostgreSQL,
actual data retention/deletion process, actual email flow) — this page was
previously the single biggest credibility risk on the site (falsely
claiming "no backend database" while one existed) and is now the most
factually rigorous legal page most sites of this size publish.
**Weak spot:** honestly states "we do not currently hold a third-party
security certification" — correct and appropriately transparent, but
worth resolving via `/platform`'s recommended certification-status section
(see above) so the same information doesn't need restating in two places.
**Recommendation:** none content-wise; keep this page in sync any time the
backend's actual data handling changes — it is the one page on the site
where drift from reality is a real liability, not just a quality issue.

### `/terms` — **7/10**
**Why:** Appropriately hedged, plain-language, and honest that it needs a
real counsel review before commercial launch — which is the correct
posture for a pre-launch company's terms page.
**Weak spot:** generic by necessity (most terms pages are), and explicitly
labeled as not-yet-lawyer-reviewed.
**Recommendation:** get real legal review before this site handles paying
customers — this is a compliance item, not a copywriting one.

## Cross-cutting recommendations, ranked by leverage

1. **Real case studies** — the single highest-impact content addition
   available. Nothing else on this list moves the needle as much as
   converting even one real engagement into a named, verifiable case study.
2. **Named leadership on `/about`** — second-highest leverage; costs
   nothing but a decision to share real names.
3. **Certification-status transparency on `/platform`** — low effort, closes
   a gap a security reviewer will otherwise notice as an absence.
4. **More `/insights` volume** — compounds over time; the writing quality
   bar is already set correctly, it just needs more entries.
5. **Soften or defend the Banking 3× claim** — small, specific fix.
6. **Sharpen Manufacturing's Business Challenges copy** — small, specific fix.

None of these are urgent in the sense of "broken" — they're the difference
between a strong site (where it is today) and a site with zero remaining
soft spots for a determined skeptic to find.
