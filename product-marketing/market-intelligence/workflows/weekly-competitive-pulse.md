# Weekly Competitive Pulse

## Purpose
Produces a weekly signal-vs-noise summary of what changed across competitors. Only surfaces changes that require a response — not every small update. Takes 15 minutes of human time when the data is supplied.

## Trigger
Every Monday, run alongside the weekly performance review. Can also be triggered mid-week if a competitor event is flagged by the sales team or a field signal.

## Agents Involved
1. `competitive-monitor`

## Steps

**Step 1 — Collect signal inputs (Friday/Weekend or Monday morning)**

Human collects the following before running the agent:
- Competitor pricing page screenshots or notes (check each competitor's pricing page)
- Competitor homepage notes (any tagline or headline changes)
- Competitor changelog or product update announcements
- LinkedIn job posting changes (use LinkedIn Recruiter or manual check)
- Any new G2/Capterra reviews that surfaced this week
- Any press releases or funding news
- Any new competitor ad creative seen this week (Meta Ads Library, Google Transparency)
- Field feedback from sales (Slack messages, Gong notes, rep emails mentioning competitors)

If no inputs are available for a competitor, note "no new data" — do not skip them.

**Step 2 — competitive-monitor runs**

Input: all collected signal data + all competitor cards from `core/competitive/` + prior week's pulse report.

Output: weekly competitive pulse report (immediate flags / high priority / medium / low / no change + routing summary).

**Step 3 — [GATE] PMM Review**

PMM lead reviews the output:
- Confirm each immediate flag is genuinely urgent (not a false alarm)
- Add field context: have sales reps mentioned anything about these competitors this week that changes the interpretation?
- Decide whether any signal warrants escalation beyond the normal routing (e.g., a pricing change right before a major renewal cycle needs more than just a sales notification)

This gate is the human judgment layer. The agent classifies signals; the PMM decides whether the classification is correct and whether any signal warrants escalation.

**Step 4 — Distribute**

- Immediate flags → relevant stakeholders within the same business day (email or Slack)
  - Pricing changes → Sales lead + CS lead (deals in flight)
  - Positioning shifts → CMO + category-designer flag
- High priority → growth team weekly Slack summary
- Weekly pulse report archived in `core/competitive/pulse-archive/[YYYY-MM-DD].md`

**Step 5 — Trigger downstream actions**

Based on routing summary from competitive-monitor:
- Pricing changes → add to `battlecard-maintenance` queue (to update pricing section)
- Product releases → add to `battlecard-maintenance` queue
- New ad creative → add to `core/ad-library/competitive/` + add to `creative-intelligence-sprint` queue
- Competitor card updates → update `core/competitive/[name].md` before next week's pulse

## Output
1. **Weekly competitive pulse report** — immediate flags, prioritized by urgency, with specific routing
2. **Archived pulse** — filed in `core/competitive/pulse-archive/`
3. **Updated competitor cards** — any changes from this week's signals reflected in `core/competitive/`

## Human Decision Points
- **[GATE] Step 3** — PMM lead reviews and confirms classifications; decides on any escalations
- **Escalation decisions** — pricing change affecting active enterprise deals: notify sales lead directly, not via weekly summary
- **Category narrative shift** — if a competitor materially repositions, decision needed: does this change our positioning, our battlecard only, or require a full competitive response?

## Notes
- This workflow takes 15 minutes of human time when run consistently. If signal collection is skipped for 2+ weeks, the backlog takes significantly longer to clear.
- The pulse is only as good as the inputs. If the sales team isn't sharing competitive mentions, set up a Slack channel specifically for competitive flags and direct reps there.
- Escalation: category narrative shifts or funding events → escalate to CMO/CPO immediately, not in the weekly summary.
