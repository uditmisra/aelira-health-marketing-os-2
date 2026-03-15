# ICP Quarterly Review

## Purpose
Runs at the start of each quarter to answer one question: are we winning the customers we're trying to win? Compares last quarter's closed deals against the current ICP definition across five dimensions. Produces either a refined ICP with specific evidence-backed attribute updates, a confirmed-stable ICP with a clean bill of health, or a flag for a deeper customer discovery sprint if drift is significant.

This is not a strategy review. It is a data hygiene discipline. ICP definitions drift over time as the market evolves, the product adds capabilities, and the sales team finds new pockets of fit. The quarterly review catches drift before it compounds into a messaging problem.

---

## Trigger

- **Quarterly cadence:** runs in the first week of each quarter (Q1: first week of January; Q2: first week of April; Q3: first week of July; Q4: first week of October)
- **Prerequisite:** prior quarter's win/loss data must be compiled before the review begins. The Customer Intelligence owner should confirm data availability before scheduling the review.
- **Accelerated trigger:** if win rate drops more than 10 points in a single month, do not wait for the quarterly cadence — run the review immediately.

---

## Agents involved

1. **icp-refinement-agent** — primary agent; runs drift detection across five dimensions and produces the quarterly ICP health report
2. **win-loss-analyst** (from market-intelligence sub-domain) — compiles and structures the win/loss data that icp-refinement-agent consumes; if win-loss-analyst is not available, PMM compiles the data manually
3. **persona-builder** — runs only if icp-refinement-agent produces attribute updates; updates the persona profile to align with revised ICP

---

## Steps

### Step 1: Compile win/loss data (Days 1-2)

**Who:** win-loss-analyst agent (automated) or PMM (manual)

Pull from CRM for the prior quarter:
- All closed-won deals: company size, industry, champion role, buying trigger, deal size, sales cycle
- All closed-lost deals: same fields + stated loss reason
- Any win/loss interview synthesis completed during the quarter
- Any ICP drift signals flagged during weekly reviews (these are hypotheses to test)

The win-loss-analyst or PMM structures this into the deal dataset format expected by icp-refinement-agent (see that agent's process for the required fields).

**Quality check before proceeding:** if fewer than 5 won deals are available, note the volume limitation. The icp-refinement-agent will treat all findings as directional. Do not postpone the review — a directional review is still more valuable than no review.

---

### Step 2: Run icp-refinement-agent

**Who:** agent (automated, triggered by PMM)

icp-refinement-agent receives:
- Current `core/icp/primary-icp.md`
- Compiled win/loss dataset from Step 1
- Interview synthesis files from the quarter (if available)
- Any flagged signals from weekly reviews

Agent runs drift detection across all five dimensions (company size, industry vertical, buying trigger, champion persona, primary pain) and produces:
- A dimension-by-dimension findings report
- Proposed ICP attribute updates (if any dimension meets the 3+ deal threshold)
- A signals-to-watch list (patterns that appeared but didn't meet the threshold)
- An overall recommendation: ICP stable / ICP updated / Discovery sprint required

---

### [GATE] PMM review of agent findings (Day 3-4)

**Human decision required.**

PMM reviews the icp-refinement-agent output and evaluates:

1. **Do the proposed changes make sense?** Data can confirm a pattern, but PMM judgment is required to assess whether a pattern reflects a real ICP shift or an unusual quarter (e.g., one large enterprise deal skewing the company size distribution).

2. **Are there patterns the data missed?** CRM data is incomplete by nature. PMM may have qualitative context — conversations with sales, anecdotal signals from CS — that adds texture to what the data shows.

3. **Is the recommendation appropriate?** If icp-refinement-agent recommends a discovery sprint, PMM decides whether to initiate the customer-discovery-sprint workflow.

**Possible PMM decisions at this gate:**

| Situation | PMM decision |
|-----------|-------------|
| Proposed ICP updates are well-evidenced and make sense | Approve updates; proceed to Step 3 |
| Proposed updates are technically supported but feel off | Request additional evidence or defer; document reasoning |
| ICP is confirmed stable (no-change finding) | Confirm no change; log the finding; skip to Step 5 |
| Discovery sprint is recommended | Initiate customer-discovery-sprint workflow; pause this quarterly review pending sprint output |
| Data is insufficient (fewer than 5 deals) | Treat as directional; note in the health report; increase data collection effort next quarter |

PMM documents the gate decision and rationale in the sprint log.

---

### Step 3: Update ICP and persona files (Day 4-5)

**Who:** PMM executes updates; agents produce the updated file drafts

If PMM approved ICP attribute updates at the gate:

1. icp-refinement-agent writes the updated `core/icp/primary-icp.md` (full file, not a diff) with the change log appended
2. Persona-builder reads the updated ICP and updates the persona profile in `core/icp/primary-icp.md` for any attributes that the ICP update affects — ensuring the persona definition stays consistent with the ICP definition

PMM reviews both updated files before committing them to the core/ directory.

---

### Step 4: Distribute the ICP health report (Day 5)

**Who:** PMM

The quarterly ICP health report produced by icp-refinement-agent is distributed to relevant stakeholders:

- **Sales:** any ICP attribute changes that affect target account criteria or discovery questions
- **Demand gen:** any changes that affect audience targeting or ad copy
- **CS:** any changes that affect customer health definitions or expansion criteria
- **PMM team:** full health report

If the finding is "ICP stable — no changes," distribute the confirmation. A stable ICP is a useful signal for the team — it means current targeting and messaging are grounded.

---

### Step 5: Log findings in signal log (Day 5)

**Who:** PMM

Log the following in `core/signal-log.md`:

- Date of review
- Overall finding (stable / updated / sprint triggered)
- Which attributes were updated and from what evidence (if applicable)
- Signals-to-watch for next quarter
- Win/loss data volume used (number of deals analyzed)

---

## Output

| Output | Location | Owner |
|--------|----------|-------|
| Quarterly ICP health report | Distributed by PMM; archived in `core/signal-log.md` | icp-refinement-agent produces; PMM distributes |
| Updated `core/icp/primary-icp.md` (if changes) | `core/icp/primary-icp.md` | icp-refinement-agent drafts; PMM commits |
| Updated persona file (if ICP changed) | `core/icp/primary-icp.md` | persona-builder drafts; PMM commits |
| No-change confirmation (if ICP stable) | `core/signal-log.md` | PMM logs |
| Discovery sprint initiation (if flagged) | customer-discovery-sprint.md | PMM initiates |

---

## Human Decision Points

| Decision | Owner | When |
|---------|-------|------|
| Confirm data availability and initiate review | PMM | Day 0 (first week of quarter) |
| Compile win/loss data (if win-loss-analyst unavailable) | PMM | Day 1-2 |
| Gate review: approve/reject/escalate agent findings | PMM | Day 3-4 |
| Decide whether to initiate discovery sprint (if flagged) | PMM | Day 3-4 gate |
| Review and commit updated core/ files | PMM | Day 4-5 |
| Distribute ICP health report | PMM | Day 5 |

---

## What to do when the review reveals the ICP hasn't been right

If the quarterly review consistently produces "no change" findings while win rate is declining, the issue is not ICP drift — it is ICP accuracy. The ICP may have been wrong to begin with, or the product has evolved beyond what the original ICP was built for. In this case:

1. Do not continue quarterly reviews of an inaccurate ICP — they will keep producing "no change" findings
2. Initiate a customer-discovery-sprint immediately
3. Treat the sprint output as a first-principles ICP rebuild, not a refinement
