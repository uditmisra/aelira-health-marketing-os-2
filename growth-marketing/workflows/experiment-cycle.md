# Experiment Cycle

## Purpose
Runs a structured marketing experiment — testing a new message, audience, channel, offer, or creative approach. Ensures experiments are defined before they run (not rationalized after), success criteria are set in advance, and learnings are retained in the system's memory regardless of outcome.

## Trigger
One of the following:
1. The `performance-narrative-analyst` or `campaign-analytics-agent` identifies a hypothesis worth testing
2. A human on the growth team proposes an experiment
3. The `system-intelligence` layer flags a pattern suggesting a new approach
4. A PMM messaging update warrants a market test before full deployment

An experiment requires an approved hypothesis before any work begins. "Let's try LinkedIn" is not a hypothesis. "We believe LinkedIn Lead Gen Forms will produce lower CPL than website clicks for VP-level targets because the friction reduction outweighs the lower intent signal" is a hypothesis.

## Agents Involved
1. `performance-narrative-analyst` (hypothesis formulation and result interpretation)
2. `creative-headline-agent` + `creative-copy-agent` (test asset production)
3. `asset-quality-gate` (quality scoring)
4. `campaign-analytics-agent` (results measurement)
5. System intelligence signal log (learning documentation)

## Experiment Hypothesis Structure

Every experiment must have a hypothesis in this exact format before it proceeds:

> "We believe [specific change] will [improve / reduce] [specific metric] for [specific audience segment] because [specific reason grounded in data or a testable assumption]. We will know this hypothesis is confirmed if [specific metric] improves by at least [X%] after [minimum sample size] within [maximum time window]."

**Valid hypothesis examples:**
- "We believe problem-led headlines ('Still forecasting in spreadsheets?') will produce higher CTR than outcome-led headlines ('Hit your number every quarter') for our mid-market ICP because they have lower category awareness and problem language resonates before solution language does. We will know this is confirmed if CTR is at least 15% higher on the problem-led variant after 2,000 impressions on each."
- "We believe LinkedIn Lead Gen Forms will produce lower CPL than website clicks for VP-level targets because friction reduction outweighs lower intent signal. Confirmed if CPL drops at least 20% at minimum 50 conversions on each."

**Invalid hypothesis examples:**
- "Let's test a new headline" — no hypothesis, no success criteria
- "We think LinkedIn might work better" — not falsifiable, no metric, no reason

## Minimum Sample Size Rule

Do not read results before reaching the minimum sample size. Reading results early produces false signals.

- **Primary:** 100 conversions on each variant
- **Secondary (if 100 conversions not achievable):** 4 weeks of data with statistical significance at 90% confidence

If after 4 weeks neither variant has reached 50 conversions, the experiment is underpowered. Document the finding (insufficient volume to test this hypothesis on this channel/audience) and archive. Either increase budget or select a different test environment.

## Steps

**Step 1 — Hypothesis formulation**
`performance-narrative-analyst` drafts the hypothesis using the structure above, or the human submits a hypothesis in that format. Include: what is being tested, expected direction of change, specific metric, minimum sample size, maximum time window.

**Step 2 — Test design**
Specify:
- Control: what is currently running (or the baseline)
- Variant: the single change being tested — one variable only
- Channel and campaign where the test will run
- Budget: equal split between control and variant
- Duration: maximum time window, with an early-stop condition if one variant is > 50% worse on the primary metric after 2 weeks

**[GATE] Step 3 — Human approval before launch**
Growth marketing lead reviews:
- Is the hypothesis valid? (Specific, falsifiable, grounded in a reason?)
- Is the test design clean? (Single variable, equal budget split, valid success criteria?)
- Is the budget appropriate? (Enough to reach minimum sample size in the time window?)
- Is this the highest-leverage experiment to run right now?

If any answer is no, return to Step 1 with specific feedback. Do not proceed without approval.

**Step 4 — Asset production**
`creative-headline-agent` and `creative-copy-agent` produce the test variant assets. `asset-quality-gate` scores all assets. Only assets that pass are approved for the experiment. Failing assets are revised once; if still failing, escalate with the specific reason.

**Step 5 — Launch**
Test goes live. Confirm: equal budget split, conversion tracking firing for both variants, UTM parameters differentiated, start date logged.

**Step 6 — Monitor**
`campaign-analytics-agent` monitors the experiment weekly. It does not call results until the minimum sample size is reached. It flags: (a) early-stop conditions, (b) technical issues, (c) sample size projections (is the test on track to reach minimum sample in the time window?).

**Step 7 — Read results**
Once minimum sample size is reached, `performance-narrative-analyst` interprets results:
- Did the variant beat the control on the primary metric?
- By how much (absolute and relative)?
- Was the difference statistically significant?
- Does the result confirm or deny the hypothesis?
- What does this tell us about the ICP, the channel, or the message?

**[GATE] Step 8 — Human approval before applying**
Growth marketing lead reviews the interpretation before any changes are applied to live campaigns. The analyst proposes; the human decides.

- Confirmed: apply the winning variant as the new control
- Denied (insufficient evidence, confounds in data): archive and document; do not apply
- Inconclusive: document what was learned — even "this audience is too small to test on this channel" is information

**Step 9 — Document finding in signal log**

Every experiment — confirmed, denied, or inconclusive — gets a log entry in `core/system-intelligence/signal-log/`. Format:

```
Experiment: [name/ID]
Date: [date range]
Hypothesis: [full hypothesis text]
Variant tested: [what changed]
Result: [Confirmed / Denied / Inconclusive]
Primary metric change: [+/-X% vs. control, significance level]
Sample size: [conversions on each variant]
Interpretation: [one paragraph]
Applied: [Yes / No / Partial]
Next experiment: [what this result suggests testing next]
```

Do not skip this step for failed experiments. Failed experiments prevent the team from re-running the same test 6 months later.

## Output
1. **Experiment brief** — hypothesis, test design, success criteria, budget, timeline
2. **Test assets** — creative variants, quality-gate scored and approved
3. **Weekly monitoring reports** — from campaign-analytics-agent during the test window
4. **Results interpretation** — from performance-narrative-analyst after minimum sample size reached
5. **Signal log entry** — permanent record in `core/system-intelligence/signal-log/`

## Human Decision Points
- **[GATE] Step 3** — Growth lead approves hypothesis and test design before any assets are produced or budget committed
- **[GATE] Step 8** — Growth lead approves result interpretation before winning variant is applied to live campaigns
- **Underpowered experiment** — if after 4 weeks the test has not reached minimum sample size, human decides: extend with more budget, archive, or accept inconclusive result

## Notes
- One variable at a time. Testing headline AND audience simultaneously makes it impossible to know what drove the result.
- The signal log is the system's memory. An experiment not logged did not happen. The next person to run this workflow will not know what was already tested.
- "No result" is a valid result if documented. "We could not detect a difference at our volume" tells you either the difference is too small to matter or that you need more volume to detect it.
