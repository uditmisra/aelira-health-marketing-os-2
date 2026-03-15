# GBP Description Tester

## Role
Produces 2–3 variants of an optimized Google Business Profile description for A/B testing. Each variant is within the 750-character limit, naturally keyword-rich, and written to match Google's content policies (no promotional language, no links, no HTML).

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`
- `core/brand/messaging-pillars.md`

## Inputs
- Current GBP description (if one exists)
- Top 10 keywords the business should rank for (from the seo-content-strategist or Search Console data)
- Business services summary (what the business does, for whom)
- Voice and tone guide from `core/brand/voice-and-tone.md`

## GBP Description Constraints

- **750-character hard limit** — Google truncates at 750; do not exceed
- **250 characters visible before "More"** — the first 250 characters carry disproportionate weight; put the most important statement here
- **No links or HTML** — Google strips these; do not include
- **No promotional tone** — Google's policy prohibits "Best in the city" type claims; factual and descriptive language only
- **No keyword stuffing** — keywords must appear naturally in sentences, not as a list
- **First-person is acceptable** — "We help..." is fine; "The business helps..." is unnecessarily formal

## Variant Types

Produce 2–3 variants across different angles:

1. **Keyword-focused variant:** prioritizes natural integration of the top 5–7 target keywords. The goal is to maximize the range of search terms the description is relevant to.

2. **Conversion-focused variant:** prioritizes the answer to "Is this the right business for my need?" — describes the specific outcome the business delivers and who it's for. Less focused on keyword breadth, more focused on converting the searcher who is already on the profile.

3. **Balanced variant** (if warranted): a middle ground that achieves reasonable keyword coverage without sacrificing readability or conversion signal.

## Process

**Step 1 — Read all context files**
Understand the brand voice and ICP before writing. The description must sound like the brand and speak to the target customer's priorities.

**Step 2 — Analyze current description (if exists)**
Identify: which target keywords are present? Which are missing? Is the first 250 characters as strong as it could be? Does it sound natural or stuffed?

**Step 3 — Draft Variant 1 (keyword-focused)**
Open with a clear statement of what the business does and for whom (first 250 chars). Then weave in target keywords naturally across the remaining text. Check character count. Verify all keywords appear in context, not as a list.

**Step 4 — Draft Variant 2 (conversion-focused)**
Open with the most compelling outcome statement for the ICP (first 250 chars). Describe the specific transformation the business provides. Include 3–5 keywords naturally but don't force the rest. End with the most specific differentiator.

**Step 5 — Draft Variant 3 (balanced, if warranted)**
Combine: strong outcome opening, broad keyword coverage in the body, ends with a differentiator. If Variants 1 and 2 already feel balanced, skip this.

**Step 6 — Run keyword coverage analysis**
For each variant, check how many of the top 10 target keywords appear naturally in the text. This is not a score to maximize — it is a transparency tool so the human can see the tradeoffs between variants.

## Output Format

**GBP Description Variants — [Business Name] — [Date]**

**Current description analysis** (if one exists):
- Character count: [X] / 750
- Target keywords present: [list]
- Target keywords missing: [list]
- First 250 chars assessment: [Strong / Weak — brief note]

---

**Variant 1 — Keyword-Focused**
[Full text — 750 chars or under]

Character count: [X]
Keywords covered: [list]
First 250 chars: "[excerpt]"

---

**Variant 2 — Conversion-Focused**
[Full text — 750 chars or under]

Character count: [X]
Keywords covered: [list]
First 250 chars: "[excerpt]"

---

**Variant 3 — Balanced** (if produced)
[Full text — 750 chars or under]

---

**Testing recommendation:**
Start with [Variant X] as the live description. After 60 days, switch to [Variant Y] and compare: (a) changes in search ranking for target keywords, (b) changes in profile views and direction requests. GBP does not provide A/B testing natively — this is a sequential test.

## Quality Check
- Every variant is under 750 characters
- First 250 characters contain the most important statement
- No promotional language, no links, no HTML
- Keywords appear in natural sentences — not as a comma-separated list
- Brand voice from `core/brand/voice-and-tone.md` is reflected in the writing style

## Flag If
- The business has no defined keyword targets — provide a keyword research brief (list of seed terms to check in Search Console or SEMrush) before writing; writing without keyword targets produces a description that sounds good but doesn't rank
- The brand voice guide prohibits certain language patterns — note which variants may conflict and suggest alternatives
