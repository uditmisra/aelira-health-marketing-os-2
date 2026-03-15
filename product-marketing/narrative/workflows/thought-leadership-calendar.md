# Thought Leadership Calendar

## Purpose
Executes and maintains the quarterly thought leadership calendar — translating the strategy output of `thought-leadership-strategist` into a running production and review cadence. This workflow is ongoing: it does not complete, it cycles. Each month adds content to the category-building infrastructure; each quarter adjusts strategy based on what the market is responding to.

## Trigger

Initiate this workflow after `thought-leadership-strategist` has produced an approved 90-day plan. This workflow is the execution layer — it cannot operate without a strategy.

Re-initiate the quarterly planning cycle (Steps 4-5) 2-3 weeks before the end of each quarter, so the next quarter's plan is approved before the current quarter ends.

Do not initiate this workflow without an approved category narrative. Thought leadership without a narrative foundation is content marketing. If the category narrative does not exist, run `narrative-from-scratch` first.

## Agents Involved

| Step | Agent | Cadence |
|---|---|---|
| Monthly brief generation | `thought-leadership-strategist` | Monthly — beginning of each month |
| Narrative coherence review | This workflow (checklist) | Weekly — before each piece publishes |
| Quarterly performance review + plan adjustment | `thought-leadership-strategist` | Quarterly — 2-3 weeks before quarter end |

Human production is the core of this workflow. This OS does not auto-generate long-form thought leadership content. It briefs and reviews. The writing is done by a human — founder, executive, or writer working from the brief. The quality of the content is a function of the quality of the brief and the human's execution of it.

## Steps

---

### Step 1: Monthly — Generate next month's content briefs

**Timing:** First week of each month, for the coming month's production
**Agent:** `thought-leadership-strategist`
**Input:** The approved 90-day plan + prior month's performance data (see Step 4) + any new market developments that should influence content angles

The agent produces 3-4 content briefs for the coming month. Each brief specifies:

| Brief Element | Description |
|---|---|
| Topic title | Working title — the internal brief, not the published headline |
| Point of view | The specific claim the piece will make — one sentence |
| Key argument | The 3-5 supporting points that build the case |
| The counter-argument | What a reasonable person would push back on — the writer must address this |
| Target persona | Specific — from the ICP profile |
| Format | Blog post / LinkedIn essay / Newsletter section / Long-form report / etc. |
| Narrative connection | Which act of the category narrative this piece reinforces |
| Proof points or data | Specific examples, data, or customer outcomes the writer can draw on |
| Recommended length | Target word count |
| Distribution plan | Where this piece will be published and promoted |
| Production deadline | The date by which the draft must be complete for the review cycle |

The first brief of the month is the monthly pillar piece — the flagship content. It is produced first and sets the context for the derivative pieces that follow.

**Output:** 3-4 completed content briefs, ordered by production priority.

**Human decision point:** Marketing lead reviews and approves briefs before passing to writers. If any brief feels off-strategy or inconsistent with the narrative, flag and revise before production begins. Revising a brief takes 30 minutes. Revising a completed piece takes 3 hours.

---

### Step 2: Weekly — Content production

**Owner:** Human — founder, executive, or writer working from the brief
**Timing:** Ongoing throughout each month

This OS is not a content generation engine. Long-form thought leadership requires human judgment, genuine perspective, and authentic voice. The agent produces the brief; the human produces the content.

Production guidelines:
- The writer should read the category narrative before writing any piece. Every piece is an expression of that narrative — if the writer has not internalized the narrative, the piece will drift.
- The brief is a starting point, not a script. Writers should follow the point of view and argument structure, but write in their own voice.
- The monthly pillar piece requires the most investment — it anchors the month. Derivative pieces (LinkedIn posts, newsletter sections) can be extracted from the pillar after it is complete.
- The founder or a senior executive should author at least one piece per quarter. Thought leadership earns more authority when attributed to a named, credible individual rather than published as a company blog post.

**Output:** Draft content piece, attributed to a named author, ready for review.

---

### Step 3: Weekly — Narrative coherence review before publishing

**Timing:** Every piece reviewed before it publishes
**Owner:** Marketing lead (or whoever owns the narrative)

Every piece of thought leadership must pass the coherence review before publishing. This is not a copy edit — it is a narrative alignment check.

**Coherence review checklist (run for every piece):**

- [ ] Does this piece make a specific claim — a point of view that someone could disagree with? If it is only informational (a summary, a how-to with no position), it is content marketing, not thought leadership. Flag before publishing.
- [ ] Does the piece's core argument reinforce at least one act of the category narrative? Identify which act: world changed, problem bigger than realized, existing solutions fail, new way defined, or what becomes possible. If no connection can be drawn, the piece does not belong in the thought leadership calendar.
- [ ] Is the piece written in the company's brand voice? Check against `core/brand/voice-and-tone.md`. A piece that sounds like it was written by a different company undermines brand coherence.
- [ ] Does the piece contradict any other published thought leadership piece? Check the argument against recent posts. Contradictions erode authority faster than silence does.
- [ ] Is every factual claim in the piece substantiated? If the piece asserts a market trend, a buyer behavior, or a data point, there must be a source. Unsubstantiated claims in published thought leadership create liability.
- [ ] Does the piece mention the product inappropriately? Thought leadership should not be a product pitch. If the product is mentioned, it should be incidental — a reference, not a call to action. If the piece is primarily about the product, it belongs on the product blog, not in the thought leadership channel.
- [ ] Does the piece end with a clear point? Thought leadership that ends without a conclusion — that summarizes without concluding — leaves readers without the conviction it should have built.

**Pass:** The piece publishes on schedule.
**Fail:** The piece is returned to the writer with specific feedback. The reviewer notes which checklist item(s) failed and what the writer needs to change. A second review is required after revision.

**Output:** Published content piece or flagged revision request.

---

### Step 4: Monthly — Performance review

**Timing:** Last week of each month, reviewing the prior month's published content
**Owner:** Human — marketing lead, with input from sales team

Gather the following data for each piece published in the prior month:

| Metric | What It Tells You |
|---|---|
| Total views / reach | How many people saw this |
| Engagement rate (saves, shares, comments for social; time on page for blog) | Whether people found it valuable enough to engage beyond reading |
| Inbound leads or conversations traced to this piece | Whether it moved the pipeline |
| Sales team usage | Did sales reps reference this piece in conversations? Did buyers bring it up? |
| Qualitative feedback | What did people say in comments, DMs, or conversations? |

Not all metrics matter equally. Engagement and sales usage are stronger signals than raw views. A piece read by 200 people in the target ICP and referenced in 5 sales conversations is more valuable than a piece read by 20,000 general-audience readers who never enter the funnel.

**Performance patterns to look for:**

- **Topics that generated conversation** (comments, DMs, replies): these are contested topics — the piece took a position that resonated and provoked. Do more of these.
- **Topics that generated inbound**: if a piece attracted prospects who reached out after reading, the topic is at the intersection of category building and sales readiness. Prioritize related topics in the next quarter.
- **Topics that generated sales usage**: if the sales team is sharing a piece with prospects, it is earning trust in the evaluation stage. Consider turning it into a more formal asset (one-pager, email attachment version).
- **Topics that generated nothing**: if a piece was published, distributed, and produced no response — no engagement, no inbound, no conversation — examine why. Was the topic off-strategy? Was the point of view too weak? Was the distribution insufficient? Identify the cause before attributing it to the topic.

**Output:** Monthly performance summary — a table of pieces, metrics, and a brief narrative (3-5 sentences) stating what the data suggests for the next month's content strategy.

**Human decision point:** Marketing lead reviews performance data and adjusts the next month's briefs based on signals. If a topic significantly outperformed or underperformed, the `thought-leadership-strategist` agent should be informed at the quarterly review.

---

### Step 5: Quarterly — Plan adjustment

**Timing:** 2-3 weeks before the end of each quarter
**Agent:** `thought-leadership-strategist`
**Input:** The expiring 90-day plan + 3 months of performance summaries + any changes to category narrative or competitive landscape

The agent reviews what worked, what did not, and what the market has signaled about topic resonance. It then produces the next quarter's 90-day plan.

The quarterly review is not a full strategy rebuild. The category narrative and quarterly theme structure remain stable unless the `narrative-evolution` workflow has been run and the narrative has changed. What adjusts:
- Topics and angles, based on what resonated
- Format mix, based on what ICP engagement data shows
- Distribution emphasis, based on what channels performed
- New angles opened up by market developments (competitor moves, industry events, regulatory changes) that reinforce the category narrative

**Output:** Revised 90-day plan for the next quarter, with a brief retrospective note (2-3 paragraphs) explaining what changed from the prior quarter's plan and why.

**Human decision point:** Executive sponsor or marketing lead approves the next quarter's plan before production begins for the new quarter. This is a hard gate — content production for Q+1 should not begin without an approved plan, because producing content without a clear strategy produces content that drifts from the narrative.

---

## Output: Running Calendar Artifacts

This workflow produces a set of living documents that are updated throughout the year:

| Artifact | Updated | Owner |
|---|---|---|
| Monthly content briefs | First week of each month | `thought-leadership-strategist` |
| Published content log | Weekly — as pieces publish | Marketing operations |
| Monthly performance summary | Last week of each month | Marketing lead |
| Quarterly plan | Every quarter | `thought-leadership-strategist` + marketing lead |
| Narrative coherence review log | Weekly | Marketing lead |

The published content log is the ground truth: what was published, when, where, attributed to whom, and what it performed. It should be maintained as a running document — not a monthly summary, but a continuous log. It is the input for quarterly planning and for the `content-architecture-mapper` when it runs gap analysis against the narrative.

## Human Decision Points

| Decision Point | Cadence | Owner | What Happens If Skipped |
|---|---|---|---|
| Monthly brief approval | Monthly | Marketing lead | Briefs go to production unreviewed; off-strategy content gets produced |
| Content production | Weekly | Human writer | No content — the calendar halts. This OS does not auto-generate long-form content. |
| Pre-publish coherence review | Weekly | Marketing lead | Narrative-incoherent or unsubstantiated content publishes; damages authority |
| Monthly performance review | Monthly | Marketing lead | No feedback loop; next month's content is disconnected from market signals |
| Quarterly plan approval | Quarterly | Executive sponsor | Q+1 production begins without strategic alignment; content drifts |

## Failure Mode Warnings

**The calendar goes silent.** Content production requires consistent human energy. When the marketing team is under-resourced or distracted, the calendar slips. A consistent lower-frequency calendar (one pillar piece per month, two derivative pieces per week) is more valuable than an ambitious calendar that goes quiet for 6 weeks. If production capacity drops, reduce the plan's scope before abandoning it.

**The coherence review becomes a copy edit.** As the calendar matures, the narrative alignment check can drift toward proofreading. Resist this. The coherence check is a strategic gate, not an editorial one. If a piece is well-written but makes no specific claim and reinforces no part of the category narrative, it fails — regardless of how polished it is.

**Topics drift toward product features.** As sales cycles heat up and the product team launches features, pressure builds to write about what is new in the product. This is a legitimate need — but it belongs in product news, release notes, or sales enablement materials, not in the thought leadership calendar. Protect the thought leadership calendar from becoming a product marketing vehicle. The compounding authority of consistent category-building content is worth more than any individual product launch post.

**Quarterly plans become stale quarterly.** If the quarterly review produces a plan that is essentially identical to the prior quarter — same topics, same formats, same angles — the review did not incorporate the performance data. Every quarterly plan should show visible evolution: at least 2-3 topics or angles adjusted based on what the prior quarter's data showed.
