# Weekly System Review

## Purpose
A focused 30-minute Monday review that keeps the system sharp between deeper quarterly audits. Checks last week's signals, surfaces any confirmed patterns, proposes changes if warranted, and updates the health dashboard. The goal is not thoroughness — it is early detection. Catching a drift pattern at week 2 costs a change card. Catching it at week 8 costs a repositioning sprint.

## Trigger
Every Monday morning, before any marketing work for the week begins. The output informs what the team should adjust this week.

**Minimum signal volume to run a useful review:** 3 signal log entries from the past 7 days. If fewer than 3, run the review anyway — but the primary output will be a broken loop flag, not improvement proposals.

## Agents involved
1. `pattern-analyst` (in weekly mode — 7-day review window)
2. `system-updater` (only if confirmed patterns exist)

## Steps

### Step 1 — Signal inventory (5 minutes)

Open `core/system-intelligence/signal-log/`. Count entries from the past 7 days. Categorize by signal type.

Check each signal type:
- **`ad-performance`**: Was paid media performance data logged this week? If no → flag broken loop (growth marketing → signal log)
- **`win-loss`**: Were any deals logged? If no and deals closed → flag broken loop (CRM → signal log)
- **`human-rating`**: Did anyone rate an agent output? If no → note (optional but valuable)
- **`sales-feedback`**: Did any field feedback come in? If no → flag to check with sales team

Log the inventory at the top of this week's pattern analysis file.

---

### Step 2 — Run pattern-analyst (15 minutes)

Run `pattern-analyst` in weekly mode with the 7-day signal window.

The pattern analyst will:
- Sort signals into pattern categories
- Apply the 3-data-point threshold (signal vs. noise)
- Draft proposals for any confirmed patterns
- Add sub-threshold observations to the watch list

At this stage in a new deployment (first 4 weeks), it is normal to have mostly watch list items and no confirmed patterns. The system needs time to accumulate signal. This is expected — do not force proposals from insufficient data.

---

### Step 3 — Update health dashboard (5 minutes)

Update `core/system-intelligence/health-dashboard.md`:

For each agent that was run this week:
- Update "last run" date
- Update quality rating if a human-rating signal was logged
- Update status (🟢 Sharp / 🟡 Drifting / 🔴 Degraded) based on quality trend:
  - 🟢 Sharp: rated 4-5/5 consistently, or no quality concerns
  - 🟡 Drifting: rated 3/5 twice in the last 4 weeks, or a watch list item for this agent
  - 🔴 Degraded: rated below 3/5 in 2 of the last 3 runs, or a confirmed negative pattern

For `core/` files:
- Update "last updated" dates for any files that were touched this week
- Flag any file that has crossed the staleness threshold (60 days for competitive/, 90 days for others)

For feedback loops:
- Mark each loop as Active (fired this week) / Quiet (no signal this week, expected) / Broken (should have fired, didn't)

---

### Step 4 — Run system-updater if proposals exist (5 minutes setup, variable review time)

If the pattern-analyst produced confirmed proposals:
- Run `system-updater` to format change cards
- Present cards to human for [Approve / Reject / Modify]
- Apply approved changes
- Update changelog

If no confirmed proposals: note "No changes proposed this week" in the health dashboard and archive the pattern analysis file.

**Typical weekly outcome:** 0-2 proposals. More than 3 in a single week suggests either a large market event happened or the weekly reviews have been skipped. Both warrant a note.

---

### [GATE] — Human review of proposals

If proposals were generated:
- Review each change card (2 minutes each, maximum)
- Approve, reject, or modify
- Sign off on the health dashboard update

**Common fast-approve scenarios:**
- A watch list item now has its 3rd data point — straightforward approve
- A core/ file is flagged stale — approve the refresh task assignment

**Pause and think scenarios:**
- A proposal touches `core/brand/messaging-pillars.md` — this affects every agent. Loop in the PMM lead.
- A proposal would reverse a change made in the last 30 days — investigate the contradiction before approving.

---

### Step 5 — Archive and notify (2 minutes)

1. Save pattern analysis to `core/system-intelligence/patterns/patterns-[YYYY-MM-DD].md`
2. If any changes were applied: confirm commits are in the repo
3. If any broken loops were flagged: assign owner and due date for reconnecting the pipeline
4. If any agents are 🔴 Degraded: flag to the relevant system lead — do not leave degraded agents running without a fix plan

## Output (what the human receives)

```
WEEKLY SYSTEM REVIEW — [date]

SIGNAL INVENTORY: [N] entries logged this week
  Broken loops detected: [list or "none"]

HEALTH DASHBOARD: Updated
  Agents changed status: [list or "none"]
  Core/ files flagged stale: [list or "none"]

PROPOSALS: [N] confirmed / [N] watch list additions
  [If proposals exist: change cards presented below]

CHANGES APPLIED: [N]
  [List with commit hashes, or "none"]

NEXT REVIEW: [date]
```

## Human decision points
- Reviewing and deciding on each change card (Approve / Reject / Modify)
- Assigning ownership for broken loop reconnection
- Deciding whether a degraded agent needs emergency attention before next weekly cycle

## What this review is NOT
- Not a performance report (that is the weekly-performance-review in growth marketing)
- Not a positioning review (that is the messaging-audit in product marketing)
- Not a deep analysis of long-term trends (that is the quarterly-system-audit)

If anything surfaces that requires a deeper investigation, log it as a task and address it separately. Keep the weekly review to 30 minutes.
