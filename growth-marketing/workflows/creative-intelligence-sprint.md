# Creative Intelligence Sprint

## Purpose
A quarterly creative research sprint that answers one question: given what competitors are running and what the market is responding to, what should our next creative batch test?

Where the ad-copy-generation workflow produces execution-ready creative from a brief, the creative-intelligence-sprint produces the briefs. It looks at the competitive ad landscape, identifies which narrative frames are claiming territory, finds the unclaimed angles, and generates 10–15 structured asset briefs that give the headline and copy agents a differentiated starting point.

Run this before a major campaign or quarterly when the creative library needs refreshing. The output feeds directly into ad-copy-generation.

## Trigger
- **Quarterly scheduled:** first week of each quarter, before Q's creative production begins
- **On-demand:** before a major campaign launch if competitive positioning context is stale (60+ days since last sprint)
- **Post-launch retro trigger:** if a post-launch retro reveals a competitor has repositioned significantly

## Agents involved
1. `competitive-creative-intelligence` — primary research agent; builds the competitive frame map and generates asset briefs
2. `creative-headline-agent` — converts the top-priority briefs into headline variants
3. `creative-copy-agent` — pairs copy to the approved headline variants
4. `asset-quality-gate` — scores the brief-derived creative batch before it reaches the human

## Required inputs before starting
- **Competitor list** — from `core/competitive/landscape-overview.md`; confirm it's current before starting
- **Populated ad archive** — `core/ad-library/competitor-ads/` must have recent data from Meta Ads Library, Google Transparency Center, and LinkedIn. If it's empty or stale (60+ days), populate it before running the analysis.
- **Our current creative index** — `core/ad-library/top-performers/_index.md` so the analysis knows what frames we're already running
- **Lookback window** — default 90 days; extend to 180 for a deeper trend read

## Steps

### Step 1 — Archive population check (Day 1)
Before running the competitive agent, verify the ad archive is populated:

Check `core/ad-library/competitor-ads/` for each competitor in scope:
- When was each competitor's folder last updated?
- Are there active ads logged (not just historical)?
- Does the archive cover all three platforms (Meta, Google, LinkedIn) for each competitor?

If the archive is stale or empty: **stop and populate first.** The competitive-creative-intelligence agent cannot generate reliable briefs without raw ad data. Use the instructions in the competitive-creative-intelligence agent to pull from:
- Meta Ads Library: ads.facebook.com/ads/library
- Google Transparency Center: adstransparency.google.com
- LinkedIn company pages: Ads tab on competitor profiles

Time to populate manually: 30–60 minutes for 3–5 competitors across all three platforms.

---

### Step 2 — Run competitive-creative-intelligence agent (Day 1–2)
Pass to `competitive-creative-intelligence`:
- Competitor list
- Platforms to audit
- Lookback window
- Our current top-performers index

The agent produces:
- Competitive frame map (which competitors are investing in which frames)
- Confirmed Performers list (ads running 90+ days = high-confidence converters)
- Opportunity landscape (overcrowded, unclaimed, language gap frames)
- 10–15 asset briefs

Expected output: full competitive intelligence report with briefs prioritized by opportunity type (unclaimed > overcrowded differentiation > language gap).

---

### [GATE 1] — Review competitive findings and brief set (Day 2–3)

Before generating any creative, review the competitive intelligence report with the relevant stakeholders (CMO, PMM lead, or growth lead depending on org).

Review focus:
1. **Frame map:** does this match what you're seeing in the market? Any blind spots?
2. **Confirmed Performers:** are these the ads you'd have guessed? Any surprises?
3. **Opportunity landscape:** do the unclaimed frames match where we have genuine proof to claim?
4. **Brief prioritization:** which 3–5 briefs are highest priority for this quarter's creative production?

**Gate question:** "Which of these briefs represent angles where we have the proof and differentiation to win — not just an unclaimed space, but an unclaimed space where we can be credible?"

Output from this gate:
- 3–5 briefs marked **Priority** — these go to creative production in this sprint
- Remaining briefs filed in `core/ad-library/` as future backlog
- Any competitor repositioning findings flagged to PMM lead for canvas/hierarchy review

**Note:** If the gate reveals a competitor has made a major positioning move that affects our own positioning, pause this sprint and flag to PMM. The positioning layer takes precedence over creative execution.

---

### Step 3 — Run creative-headline-agent on priority briefs (Day 3–4)
Pass to `creative-headline-agent`:
- The 3–5 priority asset briefs from Gate 1
- Campaign brief (or brief skeleton — at minimum: funnel stage, platforms, CTA direction)
- Instruction to use each brief as the competitive angle, not a template to copy

The agent generates headlines for each brief — frame type is already determined by the brief, so the agent generates 3 variants per brief per platform rather than a full 5-frame batch.

---

### Step 4 — Run creative-copy-agent (Day 4)
Pass to `creative-copy-agent`:
- Headline batch from Step 3
- The original asset briefs (so the copy agent has the competitive context)
- Campaign brief

Copy is generated paired to headline IDs, short and long variants per platform.

---

### Step 5 — Run asset-quality-gate (Day 4–5)
Pass full headline + copy batch to `asset-quality-gate` for scoring.

The quality gate applies the same scoring rubric as in the standard ad-copy-generation workflow. Brief-derived creative sometimes has a higher specificity score (because the brief anchors to a competitive observation) but can have lower on-message scores if the competitive angle drifts from the brand's actual pillars. The gate catches this.

---

### [GATE 2] — Final creative review (Day 5)
Human reviews the quality gate output:
- Approved batch: ready to go into the active creative library
- Conditional passes: accept or refine?
- Did-not-pass: review diagnosis — brief was too vague, competitive angle had no proof point, or agent missed the frame?

**Fast approve:** move to ad-copy-generation workflow for final upload prep and campaign setup.
**Refine:** send specific assets back with targeted feedback.
**Flag:** if multiple brief-derived assets failed on "on-message," the competitive briefs may have pulled creative too far from brand positioning. Escalate to PMM — the tension between competitive differentiation and brand coherence is a strategic decision, not a creative one.

---

### Step 6 — Close the sprint (Day 5)
1. File approved briefs and creative in `core/ad-library/` under the sprint date
2. File remaining (non-priority) briefs as backlog in `core/ad-library/competitive-briefs/`
3. Update competitor cards in `core/competitive/` if the intelligence run revealed outdated positioning
4. Log a signal entry: `core/system-intelligence/signal-log/[YYYY-MM-DD]-ad-performance-creative-intelligence-sprint.md`
5. Update `core/ad-library/top-performers/_index.md` with the new sprint's approved creative (performance data added after 2–3 weeks)

---

## Output (what the human receives at Gate 2)

```
CREATIVE INTELLIGENCE SPRINT — [Quarter] [Year]

━━━ COMPETITIVE LANDSCAPE ━━━
Competitors audited: [list]
Ads catalogued: [N]
Confirmed Performers (90+ days): [N]

Key finding: [1-2 sentences on the most important competitive insight]

━━━ APPROVED CREATIVE BATCH ━━━
Briefs executed: [N of N priority briefs]
Assets generated: [N headline-copy pairs]
Assets approved by quality gate: [N]
Pass rate: [N]%
Platforms: [list]

[Full approved creative organized by brief ID → platform → frame]

━━━ BACKLOG BRIEFS ━━━
[N] briefs filed for future quarters: [brief IDs and one-line summaries]

━━━ COMPETITOR FLAGS ━━━
[Any competitor cards updated or flagged for PMM review]

━━━ PROOF GAPS ━━━
[Claims in the approved creative that have no proof point in messaging-pillars.md]
→ Tasks: [customer intelligence sub-domain actions]

━━━ NEXT SPRINT ━━━
Recommended trigger: [date or event — usually next quarter unless a competitor repositioning warrants sooner]
```

## Human decision points
- **Archive check (Step 1):** human must populate the ad archive if it's stale — this cannot be automated without API access to ad platforms
- **Gate 1:** review competitive findings and select priority briefs — this is a strategic decision, not a mechanical one
- **Gate 2:** final creative review before ads enter production

## What this workflow is NOT
- Not a replacement for the ad-copy-generation workflow — it feeds it
- Not a competitor monitoring workflow (the pattern-analyst's weekly review handles ongoing competitive signals; this sprint is a deeper quarterly dive)
- Not a positioning review — if the competitive landscape reveals a positioning problem, that escalates to the PMM system's messaging-audit workflow
