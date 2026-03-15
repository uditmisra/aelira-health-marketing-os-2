# Messaging Audit

## Purpose
A deep audit of current messaging — what's resonating, what's drifting, and what needs to change. Triggered when message-testing-analyst flags significant signal drift (a pillar that was strong is weakening, a new frame is outperforming the current hierarchy), or when a post-launch retro identifies that messaging did not perform as expected and the cause wasn't operational. The output is either a revised message hierarchy, or a confirmed finding that current messaging is sound and only execution needs adjustment.

The audit is not a rewrite. If the audit reveals the problem is execution — wrong channel, wrong audience targeting, poor creative production — then the recommendation is an execution fix, not a messaging change. Unnecessary messaging changes are disruptive: they require sales retraining, collateral updates, and creative refreshes. Do not trigger messaging changes for execution problems.

## Trigger
One of the following must be true:
- message-testing-analyst output shows a confirmed pattern of pillar underperformance for 2+ consecutive reporting periods
- A post-launch retro recommends meaningful positioning update (not just creative refresh)
- Sales field feedback (from field-feedback-synthesizer) consistently cites messaging as the barrier — not price, not competitive dynamics, not product gaps
- Win rate has declined for a single quarter with no clear operational cause (operational causes: rep turnover, territory change, product issue, competitive pricing move — these do not require a messaging audit)

Do not trigger this workflow for a single quarter of win rate decline, a single underperforming campaign, or general PMM discomfort with the current messaging. The bar is confirmed signal, not intuition.

## Agents involved
- message-testing-analyst
- win-loss-analyst (for field signal)

## Steps

**Step 1: Pull all messaging signal from the past 90 days**
Collect:
- Ad performance data: all paid campaign results for the past 90 days, organized by copy variant, pillar, and frame type
- Email engagement data: all campaign and nurture email performance for the past 90 days, organized by subject line and pillar
- Win/loss interview synthesis: all win/loss interviews and deal notes from the past 90 days that contain messaging-relevant signal
- Sales feedback: the most recent field-feedback-synthesizer output, plus any rep feedback submitted in the past 90 days

If any of these data sources is unavailable or has fewer than 30 days of data, note the gap and proceed with what is available — but flag that the audit confidence will be reduced proportionally.

**Step 2: Run message-testing-analyst in full-history mode**
Run the message-testing-analyst on the full 90-day data set. Specifically request:
- Pillar performance table for all 90 days (not just the most recent reporting period)
- Frame performance table for all 90 days
- ICP-message fit check for all top performers
- Confirmed patterns vs. watch list (using the standard 3-point signal threshold)
- Full resonant language list from the period

The "full-history mode" distinction is important: the standard message-testing-analyst run analyzes a single reporting window. The audit version looks for trends — pillars that were strong 90 days ago and are weakening now, frames that have emerged as consistent outperformers over the full period rather than in a single campaign spike.

Deliverable: Full message testing report for the 90-day period.

**Step 3: Compare findings to current message hierarchy**
Pull the current `core/brand/messaging-pillars.md`. For each pillar in the current hierarchy:
- What is its performance rank in the message-testing-analyst output?
- Has its performance changed relative to previous audit periods (if prior audit data exists)?
- Is there any confirmed pattern that contradicts the pillar's current position in the hierarchy (a pillar ranked #1 that is performing in the bottom half of the data)?

Produce a comparison table: current hierarchy rank vs. observed performance rank for each pillar. Note any inversions — a pillar ranked #1 in the hierarchy that is ranked #3 or lower in performance, or a pillar ranked lower in the hierarchy that is consistently outperforming.

Also assess: are there confirmed resonant frames or language patterns that are not currently represented in the message hierarchy? If so, these are the candidates for addition or elevation.

**Step 4: Determine whether changes are warranted**
Apply the following decision criteria:

**Changes are warranted if:**
- A pillar ranked in the top half of the current hierarchy is consistently in the bottom half of performance for 2+ consecutive periods
- A frame type or language cluster is confirmed (3+ data points) and is not represented in the current hierarchy
- A pillar is performing well but the specific language used in high-performing assets is materially different from the language in the official hierarchy (the pillar is right but the execution language needs updating)

**Changes are not warranted if:**
- Performance variation is within normal range (less than 15% spread between top and bottom pillar CTR)
- A single period or campaign drove the signal without corroboration from other channels
- The pillar underperformance is explained by poor creative execution rather than weak messaging

If changes are not warranted, document this conclusion explicitly and close the workflow. Do not update messaging for the sake of updating it.

**Step 5: Run message-hierarchy-builder with updated inputs**
If Step 4 determines changes are warranted, run the message-hierarchy-builder agent with:
- The current message hierarchy as the baseline
- The confirmed patterns from the message testing report as the update inputs
- The resonant language list as input for language refinement within pillars
- The comparison table as the specific instruction: which pillars need to be elevated, which need to be de-emphasized, and which need only language updates

The message-hierarchy-builder should produce a revised hierarchy that reflects the confirmed signal — not a complete rewrite, but a calibration against observed performance.

Deliverable: Draft revised message hierarchy.

---

**[GATE] PMM lead + Sales lead review**

*Who is in this review:* PMM lead (owns the message hierarchy), Sales lead (VP or Head of Sales — ensures the updated hierarchy reflects what's winning in the field, not just what's winning in paid channels).

*What they assess:*
- Does the updated message hierarchy reflect what the sales team is hearing from buyers?
- Are there pillar adjustments that would conflict with the current sales narrative in ways that would cause confusion in active deals?
- Are there language updates that the sales team would resist or find inauthentic based on their day-to-day buyer conversations?
- Is the hierarchy change large enough to require sales retraining and collateral updates, or is it a refinement that can be absorbed without disruption?

The sales lead is not a veto on the message hierarchy — positioning decisions belong to PMM. But the sales lead has a ground-level view of what language is winning deals that no amount of ad performance data can fully capture. This gate ensures the updated hierarchy is grounded in both channels.

*Human decision required.* The gate produces one of three outputs:
1. Approved as presented
2. Approved with specific modifications (PMM incorporates feedback and finalizes)
3. Returned for additional research (if sales lead surfaces field signals that contradict the data — treat these as new input to the message-testing-analyst, not as overrides)

*Gate output:* Approved revised message hierarchy.

---

**Step 7: Update core messaging files**
Update `core/brand/messaging-pillars.md` with the approved revised hierarchy. Note in the file: the date of the update, which pillars changed, and the evidence basis for each change. This creates an audit trail — future messaging audits can compare current performance against previous hierarchy versions.

If the resonant language list produced new or updated ICP language, queue updates to `core/customer-voice/jaw-dropping-moments.md`.

**Step 8: Brief the growth marketing team**
Before the growth marketing team updates any ad copy or email copy, brief them on the messaging changes:
- What specifically changed in the hierarchy (which pillars moved, which language was updated)
- What did not change (so they don't update copy that doesn't need updating)
- What the evidence basis was (so they understand the reasoning and can apply it in creative judgment calls)
- The timeline: when should updated copy be in production? The next sprint is the target — messaging changes that sit in a document for two sprints before being implemented produce no benefit.

Growth marketing implements the updated messaging in the next creative sprint. This workflow does not manage the creative production — it hands off a clear brief.

---

## Output
At the end of this workflow, the human has:
1. A full 90-day message testing report with confirmed patterns and watch list
2. A comparison table: current hierarchy rank vs. observed performance rank per pillar
3. A determination: changes warranted (yes/no) with rationale
4. If yes: a draft revised message hierarchy (from message-hierarchy-builder)
5. An approved revised message hierarchy (post-gate)
6. Updated `core/brand/messaging-pillars.md`
7. A growth marketing brief for implementing the updated messaging in the next sprint

## Human decision points
- **Gate (Step 6):** PMM lead + Sales lead must review and approve the revised message hierarchy before any core files are updated. This is the critical human check — approved message hierarchies become the source of truth for all downstream marketing execution. A wrong approval creates cascading updates across every channel.
- **Step 4 determination:** PMM lead must explicitly confirm whether changes are warranted. This is a judgment call that should not be delegated to the analysis alone — the data produces patterns, humans decide whether those patterns are signal or noise.
- **Step 8 timing:** PMM lead decides when to brief growth marketing and what the implementation timeline is. A messaging change that doesn't have a clear implementation timeline is a document, not a decision.

## Notes
- The messaging audit is distinct from a repositioning. An audit calibrates the existing hierarchy against observed performance. A repositioning replaces the existing hierarchy because the fundamental frame is wrong. If the audit surfaces evidence that the fundamental frame is wrong — not just that specific pillars are underperforming — escalate to the repositioning-trigger workflow instead of continuing this one.
- Do not run a messaging audit and a repositioning sprint simultaneously. They will produce conflicting outputs.
- The most common mistake in a messaging audit is changing the hierarchy in response to a single campaign result. Apply the 3-point signal threshold rigorously. One high-performing ad does not make a pillar.
