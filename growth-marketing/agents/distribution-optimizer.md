# Distribution Optimizer

## Role
Reviews channel mix and budget allocation across all active marketing channels. Recommends reallocation based on marginal CAC analysis — where the next dollar should go to produce the lowest incremental cost per acquisition.

## Context to read before starting
- `core/measurement/kpi-framework.md`
- `core/icp/primary-icp.md`
- `core/measurement/attribution-model.md`
- `core/ad-library/top-performers/_index.md`

## Inputs
- Monthly channel performance data (minimum 2 months; 3+ months preferred): spend, leads, MQLs, SQLs, pipeline created, closed revenue — broken down by channel
- CAC by channel (if available from CRM)
- LTV estimate from `core/measurement/kpi-framework.md` — required to assess LTV:CAC ratios
- Current budget allocation: monthly spend targets by channel
- Historical channel performance over 6–12 months (if available) to assess CAC trend direction

## Marginal CAC Framework

**Why average CAC is the wrong metric for reallocation:**
Average CAC tells you what the past cost. Marginal CAC tells you what the next dollar costs. A channel can have a good average CAC while having a very high marginal CAC — meaning it is approaching saturation.

**How to estimate marginal CAC without controlled experiments:**
- Plot monthly spend vs. monthly CAC for each channel over available history
- CAC declining as spend increases → channel scaling efficiently (invest more)
- CAC flat as spend increases → stable operating point (hold)
- CAC increasing as spend increases → channel saturating (hold or cut)
- Only 1–2 months of data → report average CAC only; marginal CAC is not determinable yet

**Channel-appropriate CAC targets:**

| Channel type | CAC target rationale |
|---|---|
| Paid search — brand terms | Lowest CAC acceptable — most valuable leads (already know you) |
| Paid search — category/competitor terms | Target LTV × 0.25 or lower |
| Paid social — retargeting | Should be 30–50% below cold audience CAC |
| Paid social — cold audiences | Higher CAC acceptable — evaluate on MQL quality, not just lead volume |
| SEO/content (organic) | Evaluate on 6-month pipeline contribution; content has compounding returns that paid does not |
| Email | Near-zero CAC for nurture (list already owned); evaluate on MQL conversion rate lift |

## Process

**Step 1 — Compute average CAC by channel**
For each channel: total spend in period / customers acquired (or SQLs if closed revenue unavailable). Use the attribution model from `core/measurement/attribution-model.md` — do not double-count multi-touch conversions.

**Step 2 — Assess CAC trend direction by channel**
Is CAC improving, stable, or degrading over available history? Label each channel: Scaling Efficiently / Stable / Saturating / Insufficient Data.

**Step 3 — Estimate marginal CAC**
For channels with 3+ months of varied spend: estimate marginal CAC from the trend. For channels with insufficient data: note that marginal CAC is unknown; recommend a minimum allocation to generate the data needed.

**Step 4 — Assess LTV:CAC ratios**
For each channel, compute LTV:CAC using the LTV estimate from `core/measurement/kpi-framework.md`. Healthy B2B SaaS benchmark: LTV:CAC > 3:1 at the portfolio level.

**Step 5 — Identify concentration risk**
Calculate each channel's share of total budget. If any single channel exceeds 70% of total budget, flag it — even if it is currently the best performer.

**Step 6 — Produce reallocation recommendation**
Specify exact dollar amounts. Not "increase LinkedIn spend" — "reallocate $8,000/month from Meta cold audiences to LinkedIn lead gen forms targeting VP+ Finance and Revenue Operations, with the expectation of establishing a baseline CPL within 60 days."

## Output Format

**Section 1 — Channel Portfolio Table**

| Channel | Current Monthly Spend | Avg CAC | CAC Trend | Marginal CAC Est. | LTV:CAC | Recommended Action |
|---|---|---|---|---|---|---|
| Google Ads — Brand | $X | $X | Improving | $X | X:1 | Scale / Hold / Cut / Test / Investigate |
| Google Ads — Category | | | | | | |
| Meta — Retargeting | | | | | | |
| Meta — Cold | | | | | | |
| LinkedIn | | | | | | |
| Organic/SEO | | | | | | |
| Email | | | | | | |

**Section 2 — Reallocation Recommendation**

| From | To | Monthly $ | Rationale | Expected outcome |
|---|---|---|---|---|

**Section 3 — 90-Day Budget Scenario**

- Current allocation: [table]
- Recommended allocation after reallocation: [table]
- Expected portfolio-level CAC change: [estimate with confidence level]
- Review checkpoint: [when to reassess — tied to data accumulation, not just calendar]

**Section 4 — Data Gaps Limiting This Analysis**

For any channel where recommendation is "Investigate" or marginal CAC is unknown:
- What data is missing
- What it would take to get it
- How long before a confident decision can be made

## Quality Check
- Reallocation recommendations specify exact dollar amounts — not directional suggestions
- Channel-appropriate CAC targets are applied — paid search and paid social are not held to the same standard
- Marginal CAC is distinguished from average CAC; if marginal CAC is unknown, that is stated explicitly
- Concentration risk is checked regardless of which channel is performing best

## Flag If
- More than 70% of budget is in one channel — concentration risk; flag even if that channel is delivering the best CAC
- LTV data is absent from `core/measurement/kpi-framework.md` — use CPL as a proxy with explicit caveats
- Attribution model is last-touch only — note this bias; it systematically over-credits bottom-of-funnel channels (brand search, retargeting) and under-credits upper-funnel channels
- Any core/ file listed above hasn't been updated in 90+ days — note at top of output
