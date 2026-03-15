# Signal Log — Format Guide

The signal log is the raw input to the pattern analyst. Every observation about what's working or not working gets logged here before it's analyzed.

**One file per signal entry.** Name format: `[YYYY-MM-DD]-[signal-type]-[agent-or-topic].md`

Examples:
- `2026-03-15-ad-performance-headline-agent.md`
- `2026-03-18-win-loss-competitive-positioning.md`
- `2026-03-20-human-rating-battlecard-generator.md`

---

## Signal entry template

Copy this template for every new entry:

```markdown
# Signal: [short description]

Date: [YYYY-MM-DD]
Signal type: [ad-performance / win-loss / human-rating / content-performance / ab-test / sales-feedback / launch-retro]
Source: [mcp / upload / manual]
Agent evaluated: [which agent produced the output being assessed — or "n/a" if system-level]
Workflow: [which workflow this came from]
ICP relevance: [which persona or segment this applies to]

## What happened
[Specific observation — not a summary. What did we see? What was different from expected?]

## Outcome data
[The measurement. Be specific: CTR%, win rate%, quality rating 1-5, conversion rate, time saved, etc.]

## Comparison baseline
[What was this compared to? Prior period, variant B, agent instructions, messaging pillar?]

## Direction
[Positive (something working better than expected) / Negative (something underperforming) / Neutral (informational)]

## Tags
[For pattern matching. Use consistent tags:]
[Pillar tags: pillar-1, pillar-2, pillar-3]
[Frame tags: problem-led, benefit-led, curiosity-led, social-proof-led]
[Persona tags: economic-buyer, technical-evaluator, business-buyer, end-user]
[Competitor tags: competitor-[name]]
[Channel tags: paid-search, paid-social, email, organic, sales-deck]
[Agent tags: headline-agent, copy-agent, battlecard-generator, etc.]

## Source
[Where this data came from — Meta Ads Manager, HubSpot CRM, Gong call recording, human review, A/B test platform]

## Recommended action (optional)
[If the observer has a hypothesis about what to change — the pattern analyst will validate or reject this]
```

---

## Signal types — what belongs where

| Type | Log when | Source |
|---|---|---|
| `ad-performance` | Weekly, after reviewing paid media performance. Log any result that deviates meaningfully (>10%) from baseline — up or down. | Ads platform data |
| `win-loss` | After every deal closes, won or lost. Log what messaging was used and whether it contributed to the outcome. | CRM + Gong |
| `human-rating` | Any time a PMM or growth team member rates an agent output. Rate 1-5. Always include the reason. | Direct assessment |
| `content-performance` | Monthly. Log organic content that significantly over- or underperformed traffic/pipeline expectations. | GA4 + attribution |
| `ab-test` | After every A/B test concludes with statistical significance. Log the winner, the margin, and the hypothesis it confirmed or refuted. | Email/landing page platform |
| `sales-feedback` | Weekly. Log specific field observations from sales — new objections, what's resonating, what's confusing. | Sales team, field-feedback-synthesizer |
| `launch-retro` | After every L1 launch retrospective. Log the full retro output as a signal entry. | Launch retro agent |

---

## Source field

Every signal entry must include a `source` field indicating how the data arrived:

| Source | Meaning |
|---|---|
| `mcp` | Data pulled live from an integration (HubSpot, Google Ads, Gong, LinkedIn Ads) via MCP during workflow execution |
| `upload` | Data from a file uploaded via the web app (CSV, PDF, XLSX, screenshot) — processed by `data-ingestion-agent` |
| `manual` | Data entered directly by a human (field observations, meeting notes, qualitative input) |

The pattern analyst treats all three sources identically when analyzing patterns. Source tracking enables loop health checks: if `mcp` entries disappear for a signal type, it suggests a broken integration before performance degrades.

---

## Logging discipline

**Log wins as much as losses.** The pattern analyst looks for emerging winners to encode, not just failures to fix. A headline that outperforms by 40% is as important as an agent that's degrading.

**Be specific.** "Performance was good" is not a signal entry. "CTR 4.2% vs. baseline 2.8% — problem-led headline vs. benefit-led, same ICP, same creative, same channel" is a signal entry.

**Log promptly.** Signal entries older than 30 days lose context. Log within 48 hours of observing.

**Don't wait for certainty.** Log the observation and let the pattern analyst determine whether it's signal or noise. One entry isn't a pattern — but it becomes one if three more follow it.
