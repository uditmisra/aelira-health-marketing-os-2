# Weekly Performance Review

## Purpose
Produces the complete weekly performance picture: what happened across all channels last week, why it happened, what decisions need to be made, and the CMO-ready summary. Replaces the standing weekly performance meeting.

## Trigger
Monday morning, by 9:00 AM local time. Can be triggered manually or automated if data exports are scheduled. Prior week data window: Monday–Sunday.

## Agents Involved
1. `campaign-analytics-agent`
2. `performance-narrative-analyst`
3. `weekly-cmio-report-generator`

## Steps

**Step 1 — Data collection (Sunday night / Monday morning before 8:00 AM)**

Collect prior week performance exports from all active channels:
- **Google Ads:** impressions, clicks, CTR, CPC, conversions, CPA, Quality Scores, spend by campaign
- **Meta:** reach, frequency, CPM, CTR, CPC, CPL, conversions by ad set and creative
- **LinkedIn:** impressions, clicks, CTR, CPL, conversions, spend by campaign and creative
- **Email:** sends, opens, clicks, click-to-open rate, unsubscribes, conversions (if tracked)
- **Organic/SEO:** organic sessions, top landing pages, keyword ranking changes (if tracked)
- **CRM pipeline data:** MQLs created, SQLs created, pipeline created — attributed by channel if attribution model supports it

If any export is missing or delayed, note which channel is absent. The review proceeds with available data; missing channels are flagged in the output.

**Step 2 — Campaign Analytics Agent runs**

Input: all channel exports + prior week exports (for week-over-week) + 4-week rolling averages + KPI targets.

Output: executive dashboard table, funnel conversion rates, winners, losers, decisions-required list.

If a channel is missing, the dashboard includes that channel as "Data unavailable."

**Step 3 — Performance Narrative Analyst runs**

Input: campaign-analytics-agent output + prior week's narrative + any known external factors provided by the growth team lead (launches, competitor activity, seasonality).

Output: 3-paragraph narrative (one per material change) with hypothesis, confidence level, and recommended action per change.

**Step 4 — [GATE] Growth Marketing Lead Review**

Before the CMO report is generated, the growth marketing lead reviews:
- The decisions-required list — confirm each decision is accurately framed; add field context the data doesn't capture
- The narrative hypotheses — validate or correct against known campaign changes, sales feedback, or product events
- Add any external context not captured in the data

This gate exists because the data cannot capture everything. The growth team lead's context changes the narrative hypotheses — get it before the CMO sees the report.

Output of this gate: confirmed decisions list + annotated narrative context.

**Step 5 — Weekly CMO Report Generator runs**

Input: campaign-analytics-agent output + performance-narrative-analyst output + growth team lead annotations.

Output: 400-word CMO report (Status / What's working / What needs attention / Decisions needed / Market signals).

**Step 6 — Distribution**
- CMO report → CMO and/or Head of Marketing (email or Slack, by 10:00 AM Monday)
- Full channel dashboard + narrative + decisions list → growth marketing team
- Decisions-required list → decision log (running doc, appended weekly)

**Step 7 — Execute approved decisions from prior week**

Review the prior week's decisions log. For any decision approved during the prior week: confirm it was implemented. If not, note the blocker.

## Output
1. **CMO Report** — 400-word prose summary
2. **Channel Performance Dashboard** — executive table with all active channels, spend, leads, CPL, vs. prior week, vs. 4-week average, pacing status
3. **Performance Narrative** — 3-paragraph analysis of material changes with hypotheses and confidence levels
4. **Decisions Log Entry** — this week's decisions appended to the running log

## Human Decision Points
- **[GATE] Step 4** — Growth marketing lead reviews analytics output and narrative before CMO report is generated. Not optional — the narrative hypothesis can change materially with field context.
- **CMO Decision** — After receiving the report, the CMO makes or delegates the escalated decisions. Decisions are logged with outcome. The growth team executes.
- **Prior Week Decision Check** — Growth lead confirms last week's approved decisions were implemented. If not, the blocker is named and escalated.

## Notes
- Designed to run in 30 minutes of human time once the three agents have produced their outputs.
- The agents run on data; the human adds context. Do not skip the gate.
- If the full review cannot run (data missing from > 2 channels), produce a partial report and note what is missing. Do not skip the week.
