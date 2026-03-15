# /perf-report

## What it does
Generates the weekly performance report — CMO summary + full channel analytics + decisions-required list — from raw channel data exports.

## Workflow it runs
`growth-marketing/workflows/weekly-performance-review.md`

## Required inputs
When this command is run, ask the user for the following if not already provided:
1. **Performance data:** paste raw data or describe where to find it (Google Ads export, Meta export, LinkedIn export, email platform export, CRM pipeline data)
2. **Context for the week:** anything that happened this week that would explain performance changes (product launch, campaign paused, budget change, competitor activity, seasonality)
3. **Prior week's targets:** if not in `core/measurement/kpi-framework.md`, ask for current month/quarter targets

## What Claude does when this command runs

**Step 1 — Read context files**
- `core/measurement/kpi-framework.md` (KPI targets and definitions)
- `core/measurement/attribution-model.md` (how multi-touch is handled)
- `core/measurement/reporting-cadence.md` (reporting structure and audience)

**Step 2 — Run campaign-analytics-agent**
Ingests the provided data. Produces:
- Executive dashboard table: all channels × spend / leads / CPL / vs. last week / vs. 4-week avg / pacing / status
- Funnel conversion rates at each stage (Impressions → Clicks → Leads → MQLs → SQLs → Pipeline)
- Budget pacing by channel (on pace / under-pacing / over-pacing)
- Winners this week (material improvements with hypotheses)
- Losers this week (material declines with hypotheses)
- Decisions required this week (specific decisions, not observations)

Materiality threshold applied: changes must be > 15% week-over-week AND > $500 impact or > 10% of target volume to appear in winners/losers sections.

**Step 3 — Run performance-narrative-analyst**
Ingests the analytics output + the user-provided context for the week. Produces:
- 2–3 paragraph narrative explaining why the most material changes happened
- Each paragraph: what happened + hypothesis + confidence level (High/Medium/Low) + recommended action
- Distinguishes signal from noise; distinguishes correlation from causation

**Step 4 — Run weekly-cmio-report-generator**
Ingests analytics + narrative. Produces a 400-word CMO-ready report:
- Status (on track / at risk / off track — one sentence with the most important number vs. target)
- What's working (one thing, most leverageable)
- What needs attention (one thing, with specific action)
- Decisions needed (1–3 bullets, CMO-level decisions only)
- Market signals (one item, or omitted if nothing material)

**Step 5 — Return all three outputs**
Lead with the CMO report. Analytics dashboard and narrative follow as appendices.

## Output format

**[LEAD] Marketing Performance — Week of [Date]**
[400-word CMO report — Status / What's working / What needs attention / Decisions needed / Market signals]

---

**[APPENDIX A] Channel Performance Dashboard**
[Executive dashboard table + funnel conversion rates + budget pacing]

**[APPENDIX B] Performance Narrative**
[2–3 paragraph narrative with hypotheses and confidence levels]

**[APPENDIX C] Decisions Log Entry**
[This week's decisions-required list, formatted for the running decisions log]

## Notes
- If data is missing for any channel, the report is produced with available data and the gap is noted
- The CMO report is designed to replace a meeting — send it before the Monday standup
- The decisions log (Appendix C) should be maintained as a running document so prior decisions can be reviewed
