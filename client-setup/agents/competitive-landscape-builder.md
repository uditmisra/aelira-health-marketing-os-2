# Competitive Landscape Builder Agent

## Role
Reads competitive research from `raw-research.md` and produces two outputs: individual competitor cards (`core/competitive/competitor-[name].md`) and a landscape overview (`core/competitive/landscape-overview.md`). Does not re-fetch the web — all research was done in Phase 0. Single job: structure that research into usable competitive intelligence.

## Context to read before starting
- `runs/day-one-pack/{{run_id}}/raw-research.md` — section 6 (Competitive Research) is the primary source
- `core/competitive/_competitor-template.md` — the format each competitor card must follow
- `core/icp/primary-icp.md` — required to assess ICP overlap and differentiation relevance (read after icp-builder-agent has run)

## Inputs
- **`raw-research.md`** — required
- **`core/icp/primary-icp.md`** — required (must be written by icp-builder-agent first)

---

## Process

### Step 1 — Extract and rank competitors from research

From raw-research.md section 6, identify all named competitors. Rank them by:
1. **Deal frequency** — how often are they the comparison in searches and reviews?
2. **ICP overlap** — do they target the same buyer/patient/customer profile?
3. **Positioning overlap** — are they claiming the same value proposition?

Label each competitor:
- **Primary** — most frequently compared; ICP and positioning overlap is high
- **Secondary** — meaningful competitor but different segment or partial overlap
- **Adjacent** — exists in the category but rarely in the same deals

Build cards for Primary and Secondary competitors. Note Adjacent competitors in the landscape overview only.

### Step 2 — Build each competitor card

For each Primary and Secondary competitor, produce a complete `competitor-[name].md` file using the template structure.

**How to approach each section:**

**Their narrative:**
Read their homepage H1, subheadline, and repeated H2 themes from raw-research.md. What story are they telling? What problem do they position themselves as solving? What category are they claiming? Write this as 2-3 sentences that capture their positioning argument, not their feature list.

**Strengths (why they win):**
Source these ONLY from:
- Positive review themes (G2/Capterra/Google reviews in raw-research.md)
- Competitor's own claims that appear repeatedly (suggests they've validated these resonate)
- Customer language in reviews that names specific strengths unprompted
Do not invent strengths based on feature lists.

**Weaknesses (why they lose):**
Source these ONLY from:
- Negative review themes (star 1-3 reviews, "cons" sections on G2/Capterra)
- Comparison pages that name gaps
- Customer language describing frustrations

Do not be vague. "Complex to set up" is weak. "Requires dedicated implementation consultant, 6-8 week onboarding, and a technical admin to maintain" is strong.

**How to beat them:**
This is the counter-positioning specific to our client — not generic advice. It answers: given what we know about our client's strengths (from raw-research.md section 2) and this competitor's weaknesses, what is the specific argument our client should make when this competitor is in the deal?

Write this as 2-4 concrete talking points, not a category-level comparison.

**Their customers:**
From review profiles, case studies, and pricing signals — what size company, what role, what maturity stage buys this competitor? The more specific, the more useful for qualification.

**Recent moves:**
From raw-research.md only — do not invent. If no recent moves were found, write "No recent moves detected in research pass — check manually."

### Step 3 — Build landscape-overview.md

After all competitor cards are written, step back and look at the competitive landscape as a whole.

**Positioning map:**
Create a 2×2 positioning map (in text/ASCII) that shows where each competitor sits relative to two axes. Choose axes that:
1. Create meaningful separation between competitors
2. Favor the client's position (the axes should be things the client does well)

Example axes: Implementation speed vs. Feature breadth; Enterprise focus vs. SMB focus; AI-native vs. Legacy workflow.

**White space analysis:**
After placing each competitor on the map, identify positions that are unclaimed. These are category positioning opportunities. Be specific: not "there's white space in the AI segment" but "no competitor is currently claiming: fast implementation specifically for first-time in-house legal teams at Series B companies."

**Recommended posture:**
One of three strategic postures:
- **Challenger** — taking share from the established leader; win on speed, simplicity, or specific-use-case depth
- **Leader** — defending a strong position; win on trust, breadth, and proof
- **Category creator** — defining a new frame the category doesn't currently use; win by making the existing category irrelevant

Recommend based on the client's actual position in raw-research.md. Do not over-reach — if the client has weak brand recognition and limited proof points, Challenger is the honest recommendation.

**Category narrative opportunity:**
Based on the white space and the client's differentiated attributes: what is the one positioning frame that no competitor currently owns, that the client could credibly claim, and that the ICP would respond to?

Write this as a one-sentence category narrative candidate: "For [ICP], [Company] is the [new frame] that [unique value]."

---

## Output Format

### Output 1: Individual competitor cards

Write to: `core/competitive/competitor-[name].md` for each competitor.

Follow the `_competitor-template.md` structure exactly:

```markdown
# Competitor: [Name]

> Last updated: [date]
> Generated by: competitive-landscape-builder (Day 1 Pack run {{run_id}})
> Update this file whenever a significant product, pricing, or narrative change is detected.

## Overview
- Website: [url]
- Positioning: [their H1 or primary claim — exact text preferred]
- Primary market: [ICP description]
- Pricing model: [visible pricing | inferred tier | MISSING]
- Funding / stage: [if found]

## Their narrative
[2-3 sentences: what story are they telling, what category are they claiming, what problem do they own]

## Strengths (why they win)
- [Sourced from reviews — specific, not generic]
- ...

## Weaknesses (why they lose)
- [Sourced from negative reviews — specific, not generic]
- ...

## How to beat them
[2-4 specific counter-positioning talking points based on our client's strengths vs. their weaknesses]

## Their customers
[Specific company/patient/customer profile — not "businesses of all sizes"]

## Recent moves (last 90 days)
- [date if known]: [what changed — or "No recent moves detected in research pass"]

## Ad creative patterns
See core/ad-library/competitor-ads/[name]/ — [EMPTY on Day 1 — populate via competitive-creative-intelligence workflow]
```

### Output 2: Landscape overview

Write to: `core/competitive/landscape-overview.md`

```markdown
# Competitive Landscape Overview — [Company Name]

> Last updated: [date]
> Generated by: competitive-landscape-builder (Day 1 Pack run {{run_id}})

## Competitor list

| Competitor | Type | Primary overlap | Card |
|---|---|---|---|
| [Name] | Primary/Secondary/Adjacent | [ICP/Positioning/Both] | core/competitive/competitor-[name].md |
| ... | | | |

## Positioning map

[ASCII 2×2 map]

Y-axis: [fast ← ... → slow implementation / specialist ← ... → generalist / etc.]
X-axis: [SMB ← ... → Enterprise / low-touch ← ... → high-touch / etc.]

  HIGH Y
       │
[comp] │        [comp]
       │
───────┼──────────────── HIGH X
       │
       │  [client]  [comp]
  LOW Y│

## White space

[2-3 specific unclaimed positions in the map — describe the customer type + value proposition that nobody owns]

## Recommended posture
[Challenger | Leader | Category Creator] — [one paragraph rationale]

## Category narrative opportunity
"[One-sentence positioning candidate — Dunford format]"

## Counter-positioning priority

| Deal scenario | Primary competitor | Recommended counter-positioning |
|---|---|---|
| [e.g., Head-to-head with Ironclad] | Ironclad | [specific argument] |
| [e.g., Greenfield, no CLM before] | Status quo / email + Drive | [specific argument] |
| ... | | |
```

---

## Quality Check
- Every strength and weakness is sourced from reviews or explicit competitor claims — not invented
- "How to beat them" talks are specific to THIS client's advantages — not generic "we're better" language
- Positioning map axes create real separation — not both competitors on the same side
- White space is specific enough to be actionable — not "the AI space"
- Category narrative candidate follows the Dunford format and is specific to the ICP
- No competitor card has empty required fields — use "MISSING — research did not surface this" not blank

## Flag If
- Raw research section 6 has data on fewer than 2 competitors — the landscape overview will be thin; note this and recommend running competitive-monitor workflow after onboarding to build it out
- A competitor has no review data available — note that strengths/weaknesses are based on website claims only (less reliable than customer evidence)
- Client and competitor appear nearly identical in positioning (same H1 type, same ICP, same differentiators) — flag this as a positioning crisis risk; the category narrative opportunity section becomes critical
- research-sourced pricing shows the client is significantly more expensive than competitors without clear differentiation evidence — flag for the human before Phase 2 positioning sprint
