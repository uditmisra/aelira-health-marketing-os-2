# Quarterly Enablement Refresh Workflow

## Purpose
Every quarter, all sales enablement materials are audited against the quarter's deal data. Materials that were wrong, missing, or unused are identified and updated. This workflow is oriented toward loss analysis: start with deals that were lost, not won. Won deals confirm what is working; lost deals reveal what is broken.

## Trigger
- **Primary:** Scheduled — runs within the first 2 weeks of each new quarter (Q2 starts in April, Q3 in July, Q4 in October, Q1 in January)
- **Secondary:** Sales lead requests an out-of-cycle refresh (e.g., after a difficult quarter, after a significant competitive loss, or before a major push period)

## Pre-work: Set the Quarter's Context
Before running any agents, establish the quarter's performance context:
- Win rate vs. prior quarter (overall and by competitor)
- Top 3 reasons for Closed-lost in the quarter (from CRM + sales lead input)
- Any new competitors or new competitor behaviors that emerged in the quarter
- Any product launches that went live in the quarter that may have changed competitive position

This context determines prioritization in Step 2 below.

## Agents Involved
1. field-feedback-synthesizer (batch mode — full quarter of field signal)
2. battlecard-maintenance (all cards in the system)
3. objection-handler (identify gaps and new entries needed)
4. demo-script-optimizer (review against quarter's demo performance)
5. [GATE] PMM reviews update priority list before any rewriting begins
6. [GATE] Sales lead reviews final updated materials before distribution

---

## Steps

### Step 1 — Run Field Feedback Synthesizer in Batch Mode

**What this step does:** Processes the full quarter's raw field feedback — Gong summaries, debrief notes, Slack threads, win/loss interview transcripts — into structured signal entries. This is the data layer that all subsequent steps draw from.

**Inputs:**
- All Gong call summaries from the quarter (filter for: prospect calls, demo calls, proposal calls, closed-lost calls)
- All rep debrief notes from the quarter
- Any sales-to-PMM feedback Slack threads
- All win/loss interview transcripts completed in the quarter

**What to produce:**
- Structured signal entries per `core/system-intelligence/signal-log/` format
- A batch summary: how many entries processed, new objection patterns detected, new competitor mentions, language patterns extracted, proof points that fell flat

**Time allocation:** 1–2 days depending on volume.

---

### Step 2 — Prioritize What to Update (Loss-First Framework)

**This is the most important step for ensuring the refresh has leverage.**

Before running any update agents, produce a prioritized update list by applying the following prioritization logic:

**Priority 1 — Materials that appeared in Closed-lost deals**
Identify which battlecards, objection handler entries, or demo scripts were in use during deals that were lost this quarter. Start here. A battlecard that was used and the deal was still lost is evidence the card needs updating. A demo script associated with multiple losses this quarter needs review.

**Priority 2 — Materials that cover competitors with increased deal frequency**
If a competitor appeared in more deals this quarter than last, their battlecard is being used more and should be verified for accuracy. Check battlecard age against the competitor's recent activity.

**Priority 3 — Materials that are 90+ days old without an update**
Standard staleness threshold. Even if no specific loss is tied to them, materials this old should be reviewed for accuracy.

**Priority 4 — Materials that reps reported as missing or unhelpful**
Any sales lead or rep feedback indicating a specific material was not useful or that a needed material doesn't exist.

**Priority 5 — Materials for biggest-deal segments**
Large deals warrant prioritized enablement. Review materials for enterprise or strategic segments even if no specific loss triggered this.

**Do not start with wins.** Won deals are not evidence that a material needs updating — they are evidence it is working. Save the retrospective on wins for a separate exercise if useful.

---

### [GATE] PMM Reviews Prioritization List

**Before any rewriting begins, PMM lead reviews and approves the prioritized update list.**

PMM checks:
- [ ] Prioritization logic is correct — losses are genuinely driving the top priorities
- [ ] Scope is realistic for the available refresh window (typically 1.5–2 weeks for a full refresh)
- [ ] Any priority items that require a full rewrite (not just maintenance) are identified — these need more time and may require descoping lower-priority items
- [ ] Strategic priorities for the coming quarter are reflected (e.g., if we're pushing hard on a new segment next quarter, their materials move up the priority list)

PMM approves a final priority list with time estimates per item. No update work begins without this approval.

---

### Step 3 — Run Battlecard Maintenance on Priority Cards

For each battlecard on the priority list (in priority order):

**Step 3.1 — Run battlecard-maintenance**
Pass: existing card, new competitive intel from the quarter (signal entries relevant to this competitor), trigger type (quarterly review + any specific trigger).

**Step 3.2 — Flag cards that need a full rewrite vs. maintenance**
Battlecard-maintenance will flag if a competitor has fundamentally repositioned. For any such flags, escalate to PMM for a dedicated battlecard-generator run rather than a maintenance pass.

**Step 3.3 — Complete change summaries**
Each updated card gets a change summary per the battlecard-maintenance output format. These summaries feed the sales team notification in Step 6.

---

### Step 4 — Update Objection Handler for New Objections

**Step 4.1 — Identify new objection patterns from the batch synthesis**
From Step 1's batch summary, extract all signal entries tagged as `new-objection` with recurrence status `confirmed pattern`. These are the objections that need new handler entries.

**Step 4.2 — Identify existing handler entries that need updating**
Any objection handler entry that was used in a deal that was lost — particularly if the rep or win/loss data indicates the response didn't land — needs a review. The existing response may be weak, outdated, or missing a strong proof point.

**Step 4.3 — Run objection-handler for each new or updated entry**
One card per objection. Source every new entry from the quarter's win/loss data where possible.

---

### Step 5 — Run Demo Script Optimizer

**Step 5.1 — Assess demo performance for the quarter**
Before running the optimizer, establish: did demo-stage conversion improve, hold steady, or decline this quarter? Are there specific deal types or ICP segments where demo performance was notably worse? This context focuses the optimizer on where the script is underperforming.

**Step 5.2 — Run demo-script-optimizer**
Pass: current demo script, Gong analysis from the quarter (demo-stage calls), win/loss feedback about demo performance, ICP profile, messaging pillars.

**Step 5.3 — Prioritize by impact**
If the optimizer identifies both a full rewrite needed (feature-first failure mode flag) and section-level optimizations, address the full rewrite in this refresh cycle. Section-level optimizations for a functioning script can be batched.

---

### Step 6 — [GATE] Sales Lead Review of Updated Materials

**No updated materials go to the sales team without sales lead review.**

The sales lead reviews:
- All updated battlecards (via change summaries — the sales lead does not need to read the full cards if the change summaries are clear)
- Any new objection handler entries
- The updated demo script (in full)

Sales lead checks:
- [ ] Battlecard changes match what reps are seeing in the field — the competitive intel is accurate
- [ ] New objection responses are ones reps would actually use — not too formal, not too clever
- [ ] Demo script changes improve the flow reps experience in live deals
- [ ] Nothing has been removed that reps rely on (even if it's not strategically optimal, removing tools without warning creates friction)

Sales lead approves or returns with feedback. Target: 48-hour turnaround for this review.

---

### Step 7 — Publish Updates and Notify Sales Team

**Step 7.1 — Publish all updated materials** to the sales team's standard enablement location (Slack, enablement platform, Notion, etc.).

**Step 7.2 — Send a quarterly enablement update notification.** This is not a long document — it is a 5-bullet changelog:
```
QUARTERLY ENABLEMENT UPDATE — [Quarter] [Year]

Battlecard updates:
  - [Competitor]: [1-sentence description of what changed and why]
  - [Competitor]: [1-sentence description of what changed and why]

New objection handler entries:
  - "[Objection pattern]" — [deal stage, brief note on sourcing]

Demo script: [1 sentence on biggest change]

Full details in [link to enablement location].

Questions? Tag [PMM contact] or [Sales lead] in [channel].
```

**Step 7.3 — Offer an optional 15-minute live walkthrough** of significant changes for reps who want it. Not mandatory — but available within the first week of the new quarter.

---

### Step 8 — Log Workflow Completion and Set Next Cycle

**Step 8.1 — Log to `core/system-intelligence/signal-log/`:**
- Date of refresh
- Materials updated (list)
- Key signals that drove the updates
- Any materials flagged as needing a full rewrite that were deferred (and target date)

**Step 8.2 — Set the next quarterly refresh date** and add to the calendar. Do not let it slip — materials degrade faster than a quarterly cycle if the market is moving.

---

## Output
At the end of this workflow:
- All priority battlecards updated with change summaries
- Objection handler up to date with the quarter's confirmed-pattern objections
- Demo script updated or flagged for full rewrite
- Sales team notified with a specific, scannable changelog
- Signal log entry noting what changed and what was deferred
- Next refresh date on the calendar

## Human Decision Points

| Decision | Who | When | Non-negotiable? |
|---|---|---|---|
| Approve prioritization list before any rewriting begins | PMM lead | After Step 2 | Yes |
| Determine scope and time allocation for the refresh | PMM lead | After Step 2 | Yes |
| Approve updated battlecards for accuracy | PMM lead | After Step 3 | Yes |
| Confirm updated materials match field reality | Sales lead | Step 6 gate | Yes |
| Approve demo script changes | Sales lead | Step 6 gate | Yes |
| Decide whether a full rewrite is needed vs. maintenance for any card | PMM lead | As flagged | Yes |

## Flag If
- **Win rate has declined materially QoQ (>5 points)** without a clear diagnosis from the win/loss data — a materials refresh is not sufficient if the positioning itself is the problem; flag to PMM lead and escalate to a positioning review before updating materials that will reinforce flawed positioning
- **A significant portion of lost deals cite a reason not covered in any current enablement material** — gap analysis flag: "COVERAGE GAP — [N] lost deals cited [reason] as a factor, but no enablement material addresses this. This is a net-new material need, not a refresh."
- **Sales lead cannot complete the review within 48 hours** — escalate; delayed sales review means delayed distribution means reps go another period without updated materials
