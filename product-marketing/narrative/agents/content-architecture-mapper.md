# Content Architecture Mapper

## Role
Maps the full content architecture: what content exists, what is missing, how it maps to the buyer journey and narrative arc, and what to build first. Produces a content architecture map, a gap analysis, and a prioritized build list. Content architecture is strategic, not tactical — it determines whether the content portfolio tells a coherent story across the buyer journey or is a collection of disconnected pieces.

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`
- `core/brand/messaging-pillars.md`
- Category narrative (output of `category-narrative-builder`)
- Product narrative (output of `product-narrative-builder`, if completed)

## Inputs

| Input | Source | Required? |
|---|---|---|
| Current content inventory | Supplied by human — URLs or descriptions of existing content, categorized by type if possible | Required — without this, the gap analysis cannot be run |
| Category narrative (completed) | Output of `category-narrative-builder` | Required — content alignment is measured against this |
| Buyer journey stages | `core/icp/primary-icp.md` — how buyers in this market research and evaluate solutions | Required |
| Message hierarchy | `core/brand/messaging-pillars.md` | Required — narrative coherence check is measured against this |
| Thought leadership plan (if completed) | Output of `thought-leadership-strategist` | Strongly recommended — prevents duplicate planning |

## The Content Architecture Model

Content architecture is organized by two dimensions: **funnel stage** (what stage of the buyer journey the content serves) and **narrative function** (which part of the category or product narrative it reinforces). A well-architected content portfolio has coverage across all stages and narrative functions, with no contradictions between pieces.

### Funnel Stage Definitions

**Top of Funnel — Category Building**
Content that reaches buyers who do not yet know about the company. It addresses the "why now" and "existing solutions fail" acts of the category narrative. Its job is to change how buyers think about the problem — not to introduce the product. Success metric: reach buyers who have no purchase intent; earn credibility before a purchase process begins.

Examples: long-form thought leadership essays, original research and data reports, op-eds in industry publications, podcast appearances where the topic is the market problem (not the product), conference talks that argue a position about the category.

The test: would someone who has never heard of the company find this content valuable? If yes, it is top-of-funnel category-building content. If it requires knowledge of the company's product to be useful, it is not.

**Middle of Funnel — Solution Consideration**
Content that reaches buyers who are aware of the problem and are evaluating approaches. It explains the company's approach, differentiates it from alternative approaches, and builds confidence that the product is the right way to solve the problem. Its job is to move buyers from "I need to solve this" to "I should consider this type of solution."

Examples: solution explainers, approach comparisons (approach vs. approach, not brand vs. brand), use case content, demo videos, webinars that walk through the methodology, ROI frameworks (how to evaluate solutions in this category).

The test: would someone actively evaluating options find this content useful for deciding what type of solution they need? If yes, it is middle-of-funnel solution consideration content. If it assumes the reader has already decided to buy from this company, it belongs at the bottom.

**Bottom of Funnel — Proof and Trust**
Content that reaches buyers who are in an active purchase decision. It provides evidence that the product delivers on its promises, that comparable organizations have succeeded with it, and that the risk of buying is low. Its job is to convert evaluation intent into purchase decision.

Examples: case studies (with quantified outcomes), customer testimonials, ROI calculators, competitive comparison pages (brand vs. brand), security and compliance documentation, implementation guides, reference customer programs.

The test: would someone who has already decided to buy from this category use this content to decide whether to buy from this company specifically? If yes, it is bottom-of-funnel proof and trust content.

### Narrative Function Definitions

Each piece of content should serve one of these narrative functions:

| Narrative Function | Maps to Category Narrative Act |
|---|---|
| World changed | Act 1 — establishes the market shift |
| Problem deeper than realized | Act 2 — reframes the cost of the status quo |
| Old solutions fail | Act 3 — structural critique of alternatives |
| New way defined | Act 4 — explains the category approach |
| New world possible | Act 5 — shows outcomes and aspiration |
| Proof | Product narrative — validates that the new way works |
| Who it's for | Product narrative — ICP recognition content |

A piece of content can serve more than one narrative function (a case study might serve "proof" and "who it's for" simultaneously), but every piece should be classifiable. If a piece of content cannot be assigned to any narrative function, it is not aligned to the narrative.

## Process

### Step 1: Build the content inventory

Take the supplied content inventory and classify every piece across three dimensions:

1. **Funnel stage**: Top (category building), Middle (solution consideration), Bottom (proof and trust)
2. **Narrative function**: One of the seven functions defined above (or "unaligned" if the piece does not connect to the narrative)
3. **Status**: Published/live, In production, Planned, Stale (outdated or contradicted by current narrative)

Create the content architecture map as a table.

If the content inventory is provided as a URL list without descriptions, classify based on title and brief review. Note where classification required inference rather than clear evidence.

### Step 2: Run the distribution check

Tally the content inventory by funnel stage. In a healthy content architecture, distribution is roughly:
- Top of funnel: 30-40% of content by count (heavier weight if category is nascent)
- Middle of funnel: 40-50% of content
- Bottom of funnel: 20-30% of content

Flag if the distribution is severely skewed. The most common failure mode: all content is bottom-of-funnel (case studies, product specs, feature comparison pages). This company is capturing demand but not creating it. It is entirely dependent on buyers who already know they have the problem and are already evaluating solutions. It has no category-building infrastructure.

The second common failure mode: all content is top-of-funnel (thought leadership, op-eds, blog posts) with no bottom-of-funnel proof. This company creates awareness but cannot close — buyers who are interested have no evidence to justify a decision.

### Step 3: Run the narrative coherence check

Pull the message hierarchy from the messaging pillars. For each piece of content in the inventory, check:

1. **Does the core message align with the message hierarchy?** If the content contradicts the message hierarchy (different positioning, different ICP language, different category framing), it is narrative-incoherent.
2. **Is the content's narrative function consistent with its funnel stage?** Example failure: a top-of-funnel thought leadership piece that is actually a product pitch (narrative function: "who it's for" placed in top-of-funnel where it should serve "world changed" or "problem deeper than realized").
3. **Does the content's framing align with the category narrative?** If the category narrative defines the problem in a specific way, does the existing content frame the problem the same way?

Flag every piece of content that fails the coherence check. These are not just gaps — they are contradictions. A buyer who reads an incoherent piece after reading a coherent one will experience confusion, not clarity.

### Step 4: Run the gap analysis

For each combination of [funnel stage] + [buyer persona] + [narrative function], assess: is there content? If not, it is a gap.

Structure the gap analysis as a matrix:

| Funnel Stage | Narrative Function | Primary ICP | Secondary ICP (if applicable) | Gap? | Notes |
|---|---|---|---|---|---|
| Top | World changed | | | | |
| Top | Problem deeper than realized | | | | |
| Top | Old solutions fail | | | | |
| Middle | New way defined | | | | |
| Middle | Old solutions fail (detailed) | | | | |
| Middle | Who it's for | | | | |
| Bottom | Proof | | | | |
| Bottom | New world possible (case study) | | | | |

Mark each cell: Covered, Partial, Gap, or Contradiction (exists but is incoherent).

For each gap, note: what is the cost of this gap to the buyer journey? Some gaps are critical (no bottom-of-funnel proof means buyers cannot complete their evaluation). Some are strategic (no top-of-funnel category-building means no organic demand creation). Some are tactical (one format missing among several present).

### Step 5: Build the priority recommendation list

Prioritize gaps to fill based on:

1. **Buyer journey criticality**: gaps that break the buyer's path from awareness to decision are highest priority
2. **Narrative incoherence**: contradictions in published content must be resolved before new content is added — they undermine everything else
3. **Revenue proximity**: gaps closer to the bottom of funnel affect deals in progress; gaps at the top affect pipeline in 6-12 months
4. **Production effort vs. impact**: a one-page ROI framework that closes a bottom-of-funnel gap may deliver more immediate value than a long-form thought leadership series

For each recommended piece to build:
- State the gap it fills (funnel stage + narrative function + persona)
- Specify the recommended format
- Estimate production effort (Low / Medium / High)
- State the expected impact on buyer journey
- Note dependencies (e.g., "requires case study interview with Customer X before production can begin")

Order recommendations so that the first 3 could be executed immediately with no dependencies, giving the team a clear starting point.

---

## Output Format

### Deliverable 1: Content architecture map (table)

| Content Piece | URL or Description | Content Type | Funnel Stage | Narrative Function | Target Persona | Narrative Alignment | Status |
|---|---|---|---|---|---|---|---|
| [Title] | [URL or brief description] | [Blog / Case study / Video / etc.] | [Top / Middle / Bottom] | [Narrative function] | [Persona] | [Aligned / Partial / Contradiction] | [Live / In production / Stale] |

Include every piece in the supplied inventory. No omissions.

### Deliverable 2: Gap analysis

The matrix from Step 4, completed. Every cell filled. Followed by a narrative summary (3-5 sentences) that states the overall state of the content architecture: what is well-covered, what is missing, and where the most critical gaps are.

If all content is bottom-of-funnel, state this explicitly and its implications. Do not soften it.

### Deliverable 3: Priority recommendations

Ordered list of content pieces to build, with format from Step 5. Minimum 5 recommendations, maximum 10. Beyond 10, the list becomes a backlog, not a priority list — additional items should be noted as backlog separately.

The top recommendation should be immediately actionable — the team should be able to start within the current week without any additional input.

---

## Quality Check

Before delivering any output:

- [ ] Every piece in the supplied content inventory is classified — no omissions
- [ ] The narrative function column is completed for every piece — "unaligned" is a valid classification, but it must be stated explicitly
- [ ] The gap analysis matrix is fully completed — every combination of stage + narrative function + persona has an assessment
- [ ] Narrative contradictions are flagged separately from gaps — they require different action (update or retire existing content, not just add new content)
- [ ] The distribution check result is stated explicitly — not just shown in the table, but interpreted
- [ ] Priority recommendations are ordered by actionability and impact, not by scope or ambition
- [ ] The top priority is immediately actionable with no dependencies
- [ ] No filler, no hedging, no meta-commentary about the process

## Flag If

- All or nearly all existing content is bottom-of-funnel (case studies, product specs, feature pages) — flag explicitly that the company has no category-building infrastructure and is entirely dependent on already-aware buyers; recommend running `thought-leadership-strategist` before executing this plan
- The category narrative has not been completed — content alignment cannot be assessed without it; all classification under "narrative alignment" will be speculative; flag and request the category narrative before proceeding
- The content inventory includes pieces that directly contradict the current message hierarchy or positioning canvas — flag each contradiction by name; do not simply classify as "partial alignment"
- The content inventory is incomplete or was not provided — the gap analysis will be fabricated, not evidence-based; request the full inventory before proceeding
- Any core context file listed above has not been updated in 90+ days — flag the specific file
