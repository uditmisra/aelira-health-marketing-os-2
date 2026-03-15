# KPI Framework — SpotDraft

> Last updated: 2026-03-12
> Every analytics agent reads this before generating any report or analysis.
> Update targets quarterly after board review.

## North star metric

**Marketing-sourced pipeline** — total value of SQLs with a marketing first-touch in any given quarter.

This is the right north star because:
1. SpotDraft's sales cycle is 4–8 weeks, so pipeline (not closed revenue) is the leading indicator of marketing effectiveness
2. It connects marketing directly to revenue, removing vanity metrics
3. It forces alignment between marketing and sales on what counts as an SQL

Secondary north star: **Marketing-influenced pipeline** (any deal where marketing touched the buyer at any point, not just first-touch).

---

## Growth Marketing KPIs

| Metric | Current target | Measurement cadence | Source | Notes |
|---|---|---|---|---|
| **Marketing-sourced pipeline** | $[X]M/quarter | Weekly | HubSpot | Primary north star |
| **MQL volume** | [X]/month | Weekly | HubSpot | MQL definition: demo request, pricing page + contact, or free trial signup |
| **MQL → SQL conversion rate** | [X]% | Monthly | HubSpot | Benchmark: 20–30% is healthy for PLG-assist motion; below 15% = ICP or qualification problem |
| **CAC (marketing)** | $[X] | Monthly | HubSpot + Paid channels | Marketing spend / new customers sourced by marketing |
| **CAC payback period** | < 18 months | Quarterly | Finance + HubSpot | Funded at Series B; payback < 12 months = healthy |
| **LinkedIn CPL** | < $120 | Weekly | LinkedIn Ads | Current benchmark for B2B SaaS legal tech; above $150 = audience or creative problem |
| **Google Ads CAC** | < $[X] | Weekly | Google Ads + HubSpot | Branded vs. non-branded split matters — track separately |
| **Organic traffic** | [X] sessions/month | Weekly | GA4 | Track branded vs. non-branded separately |
| **Non-branded organic traffic** | [X] sessions/month | Weekly | GA4 + Semrush | More meaningful than total organic; reflects SEO program health |
| **Demo requests** | [X]/month | Weekly | HubSpot | Primary conversion event; track by source |
| **Email reply rate (sequences)** | > 8% | Monthly | HubSpot | Below 5% = copy or targeting problem; above 12% = strong |
| **Email open rate (nurture)** | > 35% | Monthly | HubSpot | B2B SaaS benchmark |

### Channel benchmarks (update after each 30-day data window)

| Channel | CPL target | Conv. rate from click to demo | Notes |
|---|---|---|---|
| LinkedIn Ads | < $120 | 2–4% | Higher CPL acceptable given quality; track title/seniority breakdown |
| Google Ads (branded) | < $30 | 8–15% | Should be efficient; protect brand term |
| Google Ads (non-branded) | < $80 | 3–6% | Bottom-funnel: "CLM software," "contract management platform" |
| Organic (inbound) | $0 CPL | — | Track by content piece that drove conversion |
| Email (outbound) | < $40 per booked demo | 2–5% open → demo | Includes SDR cost |

---

## Product Marketing KPIs

| Metric | Current target | Measurement cadence | Source | Notes |
|---|---|---|---|---|
| **Overall win rate** | > [X]% | Monthly | HubSpot / Salesforce | Track by deal size tier (< $15K, $15–50K, > $50K) |
| **Win rate vs. Ironclad** | > [X]% | Monthly | HubSpot + Gong | Most common competitive deal; needs dedicated tracking |
| **Win rate vs. DocuSign CLM** | > [X]% | Monthly | HubSpot + Gong | Often status-quo-plus-upsell deals |
| **Average sales cycle** | < [X] days | Monthly | HubSpot | Track by segment: primary ICP vs. secondary |
| **Loss reason distribution** | [track] | Monthly | HubSpot (closed_lost_reason) | Top 3 reasons: pricing, competitor, no decision — each implies different fix |
| **Competitive displacement rate** | [X]% of pipeline | Monthly | HubSpot | % of deals where a competitor is named; rising = category heating up |
| **Battlecard usage** | > [X] views/month | Monthly | Sales enablement tool | Proxy for sales team engagement with PMM content |
| **Feature adoption — new launches** | [X]% of customer base in 90 days | Per launch | Product analytics | L1 launches: 30% adoption in 90 days is healthy |
| **Deal influence by content** | [X] deals/quarter | Quarterly | HubSpot attribution | Track which PMM assets are cited in won deals |

---

## Attribution model

**Model type:** First-touch + last-touch hybrid (W-shaped moving toward data-driven)

**Current state:** First-touch recorded in HubSpot `hs_analytics_source`. Last-touch recorded via UTM tracking on demo request form.

**Known gaps:**
- LinkedIn organic dark social is not captured
- Word-of-mouth referrals are undercounted (GC community is high-referral)
- Multi-touch attribution across a 6–8 week sales cycle requires HubSpot attribution reporting

**How agents should use this:** When reporting on "marketing's contribution to pipeline," use first-touch as the channel credit for sourcing. Use last-touch for conversion optimization analysis. Do not use either as definitive — present both where meaningful.

See `core/measurement/attribution-model.md` for full model documentation.

---

## Reporting cadence

| Report | Cadence | Audience | Agent |
|---|---|---|---|
| Channel performance dashboard | Weekly (Monday) | Marketing team | `campaign-analytics-agent` |
| Executive pipeline report | Weekly (Monday) | CEO, CMO, CRO | `weekly-cmio-report-generator` |
| Win/loss synthesis | Quarterly | Sales + Marketing leadership | `win-loss-analyst` |
| Competitive intelligence update | Weekly | Sales team | `competitive-monitor` |
| SEO rankings + organic report | Monthly | Marketing team | `seo-content-strategist` |
| Email performance by sequence | Monthly | Marketing team | `email-performance-analyst` |
| System intelligence review | Weekly | Marketing leadership | `pattern-analyst` |

See `core/measurement/reporting-cadence.md` for full schedule and output format specs.
