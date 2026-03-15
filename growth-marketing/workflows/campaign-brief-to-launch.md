# Campaign Brief to Launch

## Purpose
Takes an approved campaign brief and produces everything needed to launch a paid campaign: channel structure, targeting, copy, creative variants, quality scoring, and a launch checklist. Minimum 5 business days from brief to live.

## Trigger
One of two conditions:
1. An approved campaign brief is received from PMM — typically after a product launch, positioning update, or new ICP segment prioritized
2. New budget is approved for a channel or a new channel is being added to the mix

The brief must be approved before this workflow begins. A draft brief is not a valid trigger.

## Required Brief Contents (checklist before starting)

Before any agent runs, confirm the brief contains:
- [ ] Campaign objective (what does success look like — MQLs, pipeline, revenue, brand reach?)
- [ ] ICP segment this campaign targets
- [ ] Channel(s) approved and budget per channel
- [ ] Messaging and positioning to use (reference `core/brand/messaging-pillars.md` or the PMM narrative output)
- [ ] Offer (what is being promoted — demo, trial, content, event, product feature?)
- [ ] Timeline (campaign flight dates)
- [ ] Any constraints (brand safety exclusions, audience exclusions, geographic limits)

If any of these is missing, return the brief with the missing items listed. Do not proceed without a complete brief.

## Agents Involved
1. `paid-search-agent` or `paid-social-agent` (channel-dependent)
2. `creative-headline-agent`
3. `creative-copy-agent`
4. `asset-quality-gate`
5. `distribution-optimizer` (optional — run if campaign is part of a broader budget reallocation)

## Steps

**Day 1 — Campaign structure design**

The channel specialist agent receives the approved brief and produces:
- Recommended campaign structure (campaigns, ad groups or ad sets, targeting)
- Keyword list with intent tier classification (paid search) or audience definitions (paid social)
- Budget allocation within channel
- Bid strategy recommendation
- Structural prerequisites: landing page requirements, conversion tracking confirmation, audience pixel health

**Day 2 — Creative development**

`creative-headline-agent` receives: the brief, campaign structure output, and ICP profile. Produces: 5+ headline variants per format. Variants must cover at least 3 different angles: problem-led, outcome-led, and proof-led.

`creative-copy-agent` receives: brief + headline variants. Produces: body copy for each format. Minimum 3 body copy variants per format.

**Day 3 — Quality gate**

`asset-quality-gate` scores every headline and copy variant on three criteria:
1. On-message per `core/brand/messaging-pillars.md`
2. ICP-relevant per `core/icp/primary-icp.md`
3. Specific not generic

Any asset that fails any criterion is revised once by the creative agent before human review. Assets that fail after one revision are flagged with the specific reason — do not present them as viable options.

**[GATE] Day 3–4 — Growth marketing lead review**

Growth marketing lead reviews:
- Campaign structure: does it match the brief's objective and constraints?
- Creative: review all assets that passed the quality gate. Approve minimum 3 variants per format for A/B testing from day one.
- Launch checklist: confirm all technical prerequisites are complete (conversion tracking live, landing page live, audience pixels healthy, UTM parameters confirmed)

Creative approval is the most common bottleneck. If review takes longer than 1 business day, the launch timeline extends. Flag early if creative round-trip is at risk.

**Day 5 — Launch**

Campaign goes live with approved structure and creative variants. Confirm: conversion tracking firing, UTM parameters passing correctly, budget caps set, negative audiences applied.

Send launch notification to growth team with: campaign name, channel, budget, objective, primary KPI, and 72-hour check-in date.

**72-Hour First Check — campaign-analytics-agent**

Three business days after launch, `campaign-analytics-agent` runs a health check:
- Is conversion tracking firing?
- Is spend pacing as expected?
- Is CTR in a normal range?
- Any early anomalies requiring immediate action?

This is a health check, not a full optimization review. First full optimization review runs at Day 14.

## 5-Day Timeline Summary

| Day | Activity | Owner |
|---|---|---|
| Day 1 | Channel structure design | Paid search/social agent |
| Day 2 | Creative development | Headline + copy agents |
| Day 3 | Quality gate scoring and revision | Asset quality gate |
| Day 3–4 | [GATE] Growth lead review and approval | Human |
| Day 5 | Campaign launch | Human + platform |
| Day 5 + 72 hrs | First performance health check | Campaign analytics agent |

## Output
1. **Campaign structure document** — campaigns, ad groups/sets, targeting, bid strategy, budget allocation
2. **Creative package** — minimum 3 approved headline variants + 3 body copy variants per format, all quality-gate scored
3. **Launch checklist** — technical prerequisites confirmed (conversion tracking, UTM, pixels, landing page, brand safety)
4. **72-hour health check report** — tracking, pacing, and early anomaly scan

## Human Decision Points
- **Brief completeness check** — growth lead confirms brief is complete before any agent runs
- **[GATE] Day 3–4** — growth lead approves campaign structure and creative before launch; this gate cannot be skipped
- **Post-72-hour check** — if the health check surfaces anomalies, growth lead decides: pause, adjust, or continue

## Notes
- The 5-day timeline is a minimum. If creative approval takes 2 days, the timeline extends to 6. Plan accordingly.
- Creative approval is the most common bottleneck. If multiple campaigns are launching in the same week, stagger briefs so creative reviews do not stack.
- Never launch without confirmed conversion tracking. A campaign without conversion tracking generates spend data but not optimization data — it cannot be improved.
