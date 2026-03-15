# Quarterly System Audit

## Purpose
The full system health review. Runs once per quarter to catch everything the weekly reviews might have missed and to assess the system's compound value over the period. Where the weekly review asks "what changed this week," the quarterly audit asks "is the system as a whole getting better?"

The quarterly audit answers three questions:
1. **Are the agents sharper than they were 90 days ago?** (Compounding — the system should improve)
2. **Is `core/` still accurate?** (Freshness — the foundation decays without maintenance)
3. **Are the feedback loops actually running?** (Connectivity — a loop that doesn't fire doesn't improve anything)

## Trigger
First Monday of each new quarter (January, April, July, October). Schedule this as a recurring calendar commitment — it should not be skipped.

If an L1 launch occurred in the last 2 weeks of the quarter, delay the audit by 2 weeks to allow the post-launch retro to complete first. Run the audit after retro changes are applied.

## Agents involved
1. `pattern-analyst` (in full-history mode — entire quarter's signal log)
2. `system-updater` (formats and applies approved changes)
3. `message-testing-analyst` (PMM system — quarterly messaging performance review)
4. `competitive-monitor` (PMM system — quarterly competitive landscape check)

## Required inputs before starting
- Full signal log from the past 90 days
- All prior pattern files from the quarter (from `core/system-intelligence/patterns/`)
- Current `core/system-intelligence/health-dashboard.md`
- Current `core/system-intelligence/changelog.md` (to see what was changed this quarter and measure outcomes)
- Quarterly performance data: win rate trend, key channel metrics, content performance

## Steps

### Part 1: System health assessment

---

#### Step 1A — Agent quality audit

Pull all human-rating signal entries from the quarter. For each agent that was rated:
- Calculate average quality score over the quarter
- Calculate trend: improving, stable, or declining?
- Note: did any changes applied this quarter improve the rated agents? (Measure outcome of prior changes)

For agents with zero ratings this quarter: flag as "unmonitored" — not necessarily bad, but blind spots.

Produce an agent quality summary:

| Agent | Q ratings | Avg score | Trend | Changes applied | Outcome measured |
|---|---|---|---|---|---|
| [agent] | [N] | [X/5] | ↑/→/↓ | [Y/N] | [outcome or "not yet"] |

---

#### Step 1B — Core/ freshness audit

For every file in `core/`:
- Check last-modified date against staleness thresholds
- For any file flagged: assess whether the domain it covers has changed significantly

Staleness thresholds (from CLAUDE.md conventions):
- `core/competitive/` competitor cards: flag at 60 days, critical at 90 days
- `core/brand/messaging-pillars.md`: flag at 90 days, critical at 180 days
- `core/icp/primary-icp.md`: flag at 90 days if win rate is declining
- `core/customer-voice/`: flag if no new entries in 90 days
- `core/ad-library/top-performers/`: flag if no new entries in 60 days

Produce a freshness table:

| File | Last updated | Days since update | Status | Action needed |
|---|---|---|---|---|
| core/brand/messaging-pillars.md | [ ] | [ ] | 🟢/🟡/🔴 | [ ] |
| core/icp/primary-icp.md | [ ] | [ ] | 🟢/🟡/🔴 | [ ] |
| core/competitive/[each card] | [ ] | [ ] | 🟢/🟡/🔴 | [ ] |
| ... | | | | |

---

#### Step 1C — Feedback loop activity audit

For each cross-system feedback loop, assess whether it fired this quarter:

| Loop | Expected frequency | Times fired | Status | Reason if broken |
|---|---|---|---|---|
| Ad performance → signal log | Weekly | [ ] | 🟢/🟡/🔴 | [ ] |
| Win/loss → core/customer-voice/ | Per deal | [ ] | 🟢/🟡/🔴 | [ ] |
| Field feedback → signal log | Weekly | [ ] | 🟢/🟡/🔴 | [ ] |
| Launch retro → system changes | Per L1 | [ ] | 🟢/🟡/🔴 | [ ] |
| Ad signal → message-testing | Monthly | [ ] | 🟢/🟡/🔴 | [ ] |
| Competitive moves → PMM | Weekly | [ ] | 🟢/🟡/🔴 | [ ] |

Any loop in 🔴 status is a compounding deficit — every week it was broken, the system was not learning from that signal. Reconnecting it is higher priority than most improvement proposals.

---

### Part 2: Pattern analysis (full quarter)

Run `pattern-analyst` in full-history mode with the entire quarter's signal log.

In quarterly mode, the pattern analyst specifically looks for:

**Drift patterns:** An agent whose quality was declining week-over-week but never crossed the 3-data-point threshold in a single weekly review — spread across the quarter, the drift becomes visible.

**Systematic gaps:** A category of evidence that's been flagged as "proof needed" across 5+ outputs this quarter — systematic customer evidence gap that should become a customer intelligence sprint.

**Successful changes:** For each change applied this quarter, did the outcome materialize? (The changelog records expected outcomes — this is where we verify them.) Changes whose outcomes didn't materialize are themselves a signal about the pattern analyst's accuracy.

**Positioning-market alignment:** A quarterly read on whether the master positioning (canvas + hierarchy) is still producing output that converts. The message-testing-analyst runs a quarterly read on this.

**ICP drift:** Are the best customers this quarter still matching the ICP definition in `core/`? A quarterly comparison of recent wins vs. ICP profile sometimes reveals that the real ICP has shifted.

---

### [GATE 1] — Quarterly health review with leadership (allow 45-60 minutes)

Present the health assessment from Part 1 before generating proposals. This is not a quick change card review — it is a strategic conversation about system health.

Structure:
1. Agent quality summary — which agents are improving, which are degrading
2. Core/ freshness — what's stale and what it's affecting
3. Feedback loop health — which loops are broken and what they're costing
4. Compound value assessment — is the system measurably better than it was 90 days ago?

**Gate question:** "Looking at this quarter's system health, are we compounding or degrading? And what are the 1-3 highest-leverage investments to make in the system next quarter?"

This gate often produces a quarterly prioritization decision: which sub-domains to invest in next quarter, which workflows to build out, whether a positioning review is warranted.

---

### Part 3: Competitive landscape refresh

Run `competitive-monitor` (PMM system) for a quarterly competitive check.

Beyond the weekly competitive pulse (which flags specific changes), the quarterly competitive review asks:
- Has the competitive landscape shifted significantly this quarter? (New entrants, exits, major repositioning)
- Has any competitor's category claim changed in a way that affects our positioning?
- Do the competitor cards in `core/competitive/` still accurately reflect reality?

Update all competitor cards that are stale. Flag any that indicate a positioning review may be warranted.

---

### Part 4: System-updater — format and apply changes

Run `system-updater` with the full proposal list from the pattern analyst's quarterly analysis.

Quarterly audits typically produce more proposals than weekly reviews. Group them by:
- **Core/ updates** (freshness — update stale files): typically fast to approve
- **Agent instruction updates** (encode learnings): requires review of evidence
- **Feedback loop reconnections** (operational fixes): assign owners
- **Strategic recommendations** (things requiring human decision beyond a file edit): flag separately, don't try to encode as a change card

**[GATE 2] — Full proposal review**

Review all change cards. Priority order:
1. Broken feedback loops (operational — highest leverage to fix)
2. Core/ staleness (foundational — agents depend on accurate core/)
3. Agent quality improvements (encoding learnings)
4. Emerging winners (encoding what's working)

Apply approved changes.

---

### Part 5: Changelog review and system calibration

Review all changes applied this quarter:
- Which expected outcomes materialized?
- Which didn't? (This is feedback on the pattern analyst's proposal quality)
- What does the overall trajectory look like? Is the average agent quality score higher than at the start of the quarter?

Write a quarterly system summary in `core/system-intelligence/patterns/quarterly-[YYYY-QN].md`:
- System health score (aggregate of agent quality, core/ freshness, loop activity)
- Top 3 improvements made this quarter
- Top 3 gaps identified for next quarter
- Compound value assessment: yes the system is improving / flat / degrading

---

### Step — Update health dashboard

Do a full refresh of `core/system-intelligence/health-dashboard.md` with quarterly data:
- Reset all agent status indicators based on quarterly trend (not just last week's snapshot)
- Update core/ freshness table
- Update loop activity table
- Log next quarterly audit date

## Output (what the human receives)

```
QUARTERLY SYSTEM AUDIT — Q[N] [YEAR]

━━━ SYSTEM HEALTH SCORE ━━━
Agent quality (avg): [ /5 ] vs. last quarter: [ /5 ]  [↑ improving / → flat / ↓ degrading]
Core/ files current: [ N/total ]
Feedback loops active: [ N/total ]
Overall: 🟢 Compounding / 🟡 Flat / 🔴 Degrading

━━━ AGENT QUALITY ━━━
Improving this quarter: [list]
Degrading this quarter: [list]
Unmonitored (no ratings): [list]

━━━ CORE/ FRESHNESS ━━━
Stale files: [list]
Critical (90+ days): [list]

━━━ FEEDBACK LOOPS ━━━
Broken loops: [list with impact assessment]

━━━ PATTERN ANALYST FINDINGS ━━━
Confirmed patterns (3+): [N]
Watch list additions: [N]

━━━ CHANGES APPLIED ━━━
Total this audit: [N]
Commit hashes: [list]

━━━ STRATEGIC RECOMMENDATIONS ━━━
[1-3 highest-leverage investments for next quarter]

━━━ NEXT QUARTERLY AUDIT ━━━
[Date]
```

## Human decision points
- Gate 1: Health review — strategic conversation about system trajectory and quarterly priorities
- Gate 2: Change card review — approve/reject/modify each proposal
- Deciding if system health indicates a positioning review (messaging-audit workflow) or customer discovery sprint is warranted
- Assigning owners for broken feedback loop reconnections
