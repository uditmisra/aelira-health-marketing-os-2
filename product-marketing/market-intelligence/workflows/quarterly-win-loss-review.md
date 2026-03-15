# Quarterly Win/Loss Review

## Purpose
Full win/loss synthesis across the prior quarter — messaging implications, ICP accuracy assessment, recommended updates to positioning, battlecards, and sales enablement. Runs in the first two weeks of each quarter.

## Trigger
First Monday of each new quarter. Covers deals closed in the prior quarter.

## Agents Involved
1. `field-feedback-synthesizer` (batch mode — pulls Gong summaries and rep notes from the quarter)
2. `win-loss-analyst`
3. `icp-refinement-agent` (if ICP deviations are flagged)
4. `battlecard-maintenance` (if competitive findings warrant updates)
5. `objection-handler` (if new objection patterns are confirmed)

## Steps

**Step 1 — Compile deal data (Week 1, Days 1–3)**

Human compiles from CRM:
- All deals closed Won in the prior quarter: company name, size, industry, deal size, sales cycle, competitor in deal, close date, primary win reason (as entered by rep — supplementary data)
- All deals closed Lost in the prior quarter: same fields + loss reason, which competitor won

Target: minimum 10 deals (wins + losses combined). If fewer than 10 deals closed in the quarter, note this — the analysis will be directional only.

Ideal mix: 60% wins, 40% losses (or as close as deal volume allows).

**Step 2 — Collect win/loss interview transcripts (Week 1, Days 1–5)**

Human (or PMM) collects: post-close buyer interviews, Gong recordings from win/loss calls, structured rep debrief notes.

Priority: buyer-direct interviews > rep-reported debriefs. Self-reported rep data has confirmation bias.

Minimum: 5 buyer-direct interviews from the deal batch. If fewer are available, note the gap.

**Step 3 — field-feedback-synthesizer runs in batch mode**

Input: all Gong summaries and rep debrief notes from the prior quarter.

Output: structured signal entries covering — new objections surfaced, competitor mentions and what they said, language prospects used to describe the problem, proof points that resonated vs. fell flat.

This runs before win-loss-analyst so the analyst has both interview data and field signal data.

**Step 4 — win-loss-analyst runs**

Input: deal batch + interview transcripts + field-feedback-synthesizer output + current messaging pillars + current ICP definition.

Output: quarterly win/loss report (win/loss rates by segment, win/loss reason patterns, messaging resonance, ICP accuracy assessment, top 3 recommended actions).

**Step 5 — [GATE] PMM + Sales Lead Joint Review**

Both PMM lead and Sales lead review the win/loss analyst output before any changes are made:

PMM lead reviews:
- Do messaging resonance findings match their intuition from customer conversations?
- Are the recommended actions scoped correctly (messaging fix vs. positioning change vs. product gap)?
- Are there findings that require a full repositioning assessment vs. incremental updates?

Sales lead reviews:
- Do win/loss reason patterns match what reps are experiencing in the field?
- Are there patterns the data missed (because not all deals are logged with complete notes)?
- Which recommended actions would have the biggest impact on deals in the next quarter?

**Output of this gate:** joint decision on which recommended actions to pursue, with owners and timelines.

**Step 6 — Route actions to agents**

Based on joint review decisions:
- New objection patterns confirmed → `objection-handler` update (add new objection cards)
- Competitor findings → `battlecard-maintenance` queue (update relevant cards)
- Messaging pillar invisible to market → queue for `message-testing-analyst` + consider `message-hierarchy-builder` review
- ICP deviation confirmed (3+ deals showing consistent pattern) → `icp-refinement-agent` input
- Multiple confirmed patterns suggesting structural positioning issue → flag for `repositioning-trigger` workflow

**Step 7 — Log findings**

Every quarterly review produces a signal log entry in `core/system-intelligence/signal-log/`:
- Date: [quarter being reviewed]
- Signal type: win-loss-quarterly
- Key findings: [3–5 bullet points from the report]
- Actions taken: [list with owners]
- Watch list items: [patterns that need more data before acting]

## Output
1. **Quarterly win/loss report** — from win-loss-analyst: win/loss rates, confirmed patterns, messaging resonance, ICP accuracy, top 3 actions
2. **Field signal summary** — from field-feedback-synthesizer: batch of competitive and messaging signals from the quarter
3. **Approved action list** — from the joint review gate: specific changes, owners, deadlines
4. **Signal log entry** — archived in `core/system-intelligence/signal-log/`
5. **Updated downstream materials** — battlecards, objection handler, ICP file (only after gate approval)

## Human Decision Points
- **[GATE] Step 5** — PMM + Sales lead joint review is mandatory before any system changes. The data informs; the humans decide.
- **Scope decision at the gate** — is this a messaging fix, a battlecard update, or does it signal a need for a full repositioning sprint? This decision determines the scale of downstream work.
- **Action prioritization** — if the report produces more than 3 recommended actions, the joint review must prioritize. Do not try to do everything at once.

## Notes
- The quarterly review is the most important feedback loop in the system. If it is skipped, the system's knowledge of the market stagnates and agents drift from reality.
- If win rate is declining and the quarterly review has been skipped for 2+ quarters, the first action is to run this review — not to run more campaigns.
- Budget 3 hours of human time for this workflow (1 hour data compilation, 1 hour interview collection, 1 hour joint review). The agents do the analysis; the humans supply the data and make the decisions.
