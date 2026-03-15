# /creative-sprint

## What it does
Runs a competitive creative intelligence sprint — analyzes competitor ad creative, extracts frames and language patterns, and produces 10–15 asset briefs for the next creative cycle based on competitive gaps.

## Workflow it runs
`growth-marketing/workflows/creative-intelligence-sprint.md`

## Required inputs
When this command is run, ask the user for the following if not already provided:
1. **Competitors to analyze:** list by name (agent pulls their cards from `core/competitive/`)
2. **Time window:** how far back to analyze competitor creative (default: last 90 days)
3. **Channel focus:** All channels / Google only / Meta only / LinkedIn only
4. **Any creative briefs or constraints:** (optional) e.g., "we're running a product launch next month" or "avoid comparison-led frames for now"

## What Claude does when this command runs

**Step 1 — Read context files**
- All competitor cards from `core/competitive/[name].md` (one per competitor in the list)
- `core/competitive/landscape-overview.md`
- `core/ad-library/top-performers/_index.md` (own top performers for baseline)
- `core/icp/primary-icp.md`
- `core/brand/messaging-pillars.md`

**Step 2 — Run competitive-creative-intelligence**

For each competitor:
- **Longevity analysis:** which ads have been running the longest? (Long-running ads = high conversion confidence — the competitor wouldn't keep paying for ads that don't convert)
- **Frame extraction:** what frame type is each ad using? (Problem-led / Benefit-led / Curiosity-led / Social proof-led / Comparison-led)
- **Language harvest:** what specific words, phrases, and claims appear repeatedly?
- **Unclaimed frames:** which frame types are competitors NOT using? These are open lanes.
- **Message gaps:** which of our messaging pillars are competitors not addressing? These are defensible positions.

Output per competitor:
| Ad | Estimated run duration | Frame type | Key message | Proof type | Notable language |
|---|---|---|---|---|---|

**Step 3 — Synthesize competitive patterns**
Across all competitors:
- Which frames are saturated in this category (everyone is using them)?
- Which frames are unclaimed (nobody is using them)?
- What language patterns repeat across competitors (category conventions)?
- What language patterns does our ICP use (from `core/customer-voice/jaw-dropping-moments.md`) that competitors are NOT using?

**Step 4 — Run creative-headline-agent + creative-copy-agent**
Uses the competitive gap analysis to produce 10–15 asset briefs — specific creative concepts with:
- Frame type
- Headline
- Body copy
- Rationale: why this angle, what competitive gap it fills
- Recommended channel

**Step 5 — Run asset-quality-gate**
Scores all briefs. Only passing briefs are presented. Failing briefs are revised once; excluded if still failing.

## Output format

**Competitive Creative Intelligence Report — [Date]**

**Competitive landscape summary:**
[2-3 sentences: what frames dominate this category, what's unclaimed, what language patterns repeat]

**Per-competitor creative analysis:**
[Table per competitor: ad / run duration / frame / key message / notable language]

**Unclaimed creative opportunities:**
[List of specific angles nobody in the category is using, with rationale]

---

**Asset Brief Batch — [Channel] — [Date]**

| # | Frame type | Headline | Body copy | Channel | Rationale |
|---|---|---|---|---|---|
| 1 | Problem-led | [headline] | [copy] | Meta | [why this gap, what competitive insight informed it] |

## Notes
- Asset briefs are ready to turn into finished creative — give to your designer/creative team with the brief
- The competitive archive should be updated after every sprint: add new competitor ads seen to `core/ad-library/competitive/`
- Run this sprint before every major creative refresh cycle (quarterly at minimum)
