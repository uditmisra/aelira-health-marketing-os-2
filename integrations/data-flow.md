# Cross-System Data Flow Specifications

## Purpose

This document defines exactly what data flows between the two systems, through `core/`, and back again. Every arrow in the cross-system integration diagram from `CLAUDE.md` is specified here: what field, what format, what triggers the write, and what reads it next.

This is the contract between systems. When an agent writes to `core/`, it follows the format defined here. When an agent reads from `core/`, it finds the field it needs in a predictable place.

---

## The Core Layer as a Message Bus

`core/` is not a database. It is a collection of structured Markdown files that act as the shared memory between all agents. Agents do not call each other directly — they communicate through `core/`. One agent writes; another reads on its next run.

```
Agent A (PMM)              core/                     Agent B (Growth)
    │                        │                              │
    │── writes positioning ──►│                              │
    │                        │◄── reads messaging pillars ──│
    │                        │                              │
    │◄── reads win/loss ──────│                              │
    │                        │──── writes signal log ───────►│
```

---

## Flow 1: Positioning → Ad Creative

**Trigger:** `new-positioning-sprint` workflow completes and human approves positioning canvas.

**What gets written:**
- `core/brand/messaging-pillars.md` — primary claim, 3 supporting pillars, proof points per pillar
- `core/brand/voice-and-tone.md` — tone direction, what to avoid, reference vocabulary

**Written by:** `message-hierarchy-builder` (PMM)

**Format written to `messaging-pillars.md`:**
```markdown
## Primary claim
[One sentence: what we do, for whom, that competitors cannot credibly say]

## Pillar 1: [Name]
- Claim: [one sentence]
- Proof points:
  - [specific, quantified]
  - [specific, quantified]
- In ads: [how this translates to ad copy framing — problem / benefit / proof]

## Pillar 2: [Name]
[same structure]

## Pillar 3: [Name]
[same structure]
```

**Read by:** `creative-headline-agent`, `creative-copy-agent`, `asset-quality-gate`, `email-copy-agent`, `paid-search-agent`, `paid-social-agent`

**Effect:** All creative agents adopt updated positioning on next run. No manual re-briefing needed.

---

## Flow 2: Ad Performance → Messaging Validation

**Trigger:** `weekly-performance-review` workflow completes with statistically significant data (min 1,000 impressions per variant, 2+ weeks).

**What gets written:**
- `core/system-intelligence/signal-log/[YYYY-MM-DD]-ad-performance.md`

**Written by:** `campaign-analytics-agent` (Growth)

**Format:**
```markdown
# Signal: Ad Performance — [date]
Source: [Google Ads / Meta / LinkedIn]
Date range: [start] to [end]
Sample size: [impressions]

## What performed above benchmark
- Frame: [problem-led / benefit-led / social proof / etc.]
- Specific headline or copy element: [exact text]
- CTR: [X%] vs. benchmark [Y%]
- CPL: [$X] vs. benchmark [$Y]

## What underperformed
- Frame: [type]
- Element: [text]
- CTR/CPL delta: [X]

## Hypothesis
[One sentence: why this frame worked / didn't work for this ICP]

## Implication for messaging
[Specific: which pillar does this validate or challenge?]
```

**Read by:** `message-testing-analyst` (PMM), `pattern-analyst` (System Intelligence)

**Effect:** `message-testing-analyst` reads signal log weekly, proposes updates to `messaging-pillars.md` when a frame consistently outperforms or underperforms.

---

## Flow 3: Win/Loss Analysis → Creative + Messaging

**Trigger:** `quarterly-win-loss-review` workflow completes.

**What gets written:**
- `core/customer-voice/win-loss-interviews/[YYYY-Q#]-synthesis.md`

**Written by:** `win-loss-analyst` (PMM)

**Format:**
```markdown
# Win/Loss Synthesis — [Quarter]
Source: [N] deals — [X] won, [Y] lost
CRM pull date: [date]
Gong calls reviewed: [N]

## Why we win (themes, ranked by frequency)
1. [Theme] — appeared in [X]% of won deals
   - Representative quote: "[exact customer language]"
2. [Theme]
3. [Theme]

## Why we lose (themes, ranked by frequency)
1. [Theme] — appeared in [X]% of lost deals
   - Competitor most often displacing us: [name]
   - Representative objection: "[exact language]"
2. [Theme]
3. [Theme]

## Competitor patterns
| Competitor | Times in deal | Win rate vs. them | Primary reason they won |
|---|---|---|---|

## Messaging implications
- Validate: [which current messaging pillar does the data support?]
- Challenge: [which pillar is not resonating in field?]
- New signal: [any language or frame that appeared in won deals not in current messaging?]

## ICP implications
- Winning profile: [company type, size, trigger that correlates with closed-won]
- Losing profile: [what deals we shouldn't be taking]
```

**Read by:** `creative-headline-agent`, `creative-copy-agent`, `battlecard-generator`, `message-testing-analyst`, `icp-refinement-agent`

**Effect:** Creative agents adopt winning language from closed deals. Battlecard is updated with current competitor patterns. ICP is sharpened against actual revenue data.

---

## Flow 4: Customer Interviews → Copy Language

**Trigger:** `customer-discovery-sprint` workflow completes (5+ interviews synthesized).

**What gets written:**
- `core/customer-voice/interview-transcripts/[YYYY-MM-DD]-[customer-name].md` (individual)
- `core/customer-voice/jaw-dropping-moments.md` (appended)

**Written by:** `interview-synthesizer` (PMM)

**Format for `jaw-dropping-moments.md` append:**
```markdown
## [Date] — [Customer Name], [Title] at [Company]
Context: [what they were describing]
Quote: "[exact words]"
Why it matters: [what this reveals about how they think about the problem]
Use in: [ad copy / email / sales deck / website hero]
```

**Read by:** `creative-copy-agent`, `creative-headline-agent`, `email-copy-agent`, `persona-builder`

**Effect:** Copy agents are instructed to prefer language from `jaw-dropping-moments.md` over generic descriptions. This is the highest-fidelity signal for what language resonates with buyers.

---

## Flow 5: Competitive Monitor → Battlecard + Ad Creative

**Trigger:** `weekly-competitive-pulse` workflow detects a significant change (new feature, pricing shift, narrative change, major hire).

**What gets written:**
- `core/competitive/competitor-[name].md` — updated "Recent moves" section

**Written by:** `competitive-monitor` (PMM)

**Format for the "Recent moves" update:**
```markdown
## Recent moves (last 90 days)
- [YYYY-MM-DD]: [What changed] — Source: [URL or Gong mention]
  - Significance: [High / Medium / Low]
  - Implication: [How this changes how we should talk about them]
```

**Read by:** `battlecard-generator`, `battlecard-maintenance`, `competitive-creative-intelligence`, `paid-social-agent`

**Effect:** Battlecard maintenance agent detects the update and flags the card for refresh. Competitive creative intelligence agent picks up new competitor ad patterns for counter-creative generation.

---

## Flow 6: Launch Narrative → Campaign Brief

**Trigger:** L1 or L2 launch narrative approved by human.

**What gets written:**
- `product-marketing/launches/[launch-name]/narrative.md`

**Written by:** `launch-orchestrator` (PMM)

**Format:**
```markdown
# Launch Narrative — [Feature/Product Name]

## The hook
[One sentence that opens every piece of content for this launch]

## The problem we're solving (customer language)
[2-3 sentences using words from customer interviews, not product specs]

## Why now
[What changed in the market or in the product that makes this the right moment]

## The proof
[2-3 specific, quantifiable outcomes — not features]

## Competitive angle
[How this launch changes our position vs. [primary competitor]]

## Tone for this launch
[Any tone direction specific to this launch — different from baseline voice?]

## What NOT to say
[Specific phrases, claims, or frames to avoid for this launch]
```

**Read by:** `campaign-brief-to-launch` (Growth), `creative-headline-agent`, `email-copy-agent`

**Effect:** Growth campaign inherits the narrative. Ad copy and email sequences for the launch period draw from `narrative.md` first, overriding generic `messaging-pillars.md` for launch-specific content.

---

## Flow 7: Field Feedback → Objection Handler + Positioning

**Trigger:** Sales rep submits structured feedback via `field-feedback-synthesizer` intake (can be triggered weekly or ad hoc).

**What gets written:**
- `core/customer-voice/win-loss-interviews/field-notes-[YYYY-MM].md` (accumulated monthly)

**Written by:** `field-feedback-synthesizer` (PMM)

**Format:**
```markdown
# Field Notes — [Month Year]
Submissions: [N] from [N] reps
Deals referenced: [N won], [N lost], [N still open]

## New objections (not in current battlecards)
1. "[Exact objection language]"
   - Context: [deal stage, company size, competitor present]
   - Frequency: [N times this month]
   - Current response used by reps: [what they say now]
   - Suggested response: [if synthesizer has signal]

## Competitor moves mentioned in field
- [Competitor]: [what reps are hearing]

## Pricing signals
- [Any comments on pricing, packaging, comparison to competitor pricing]

## Language that's landing
- "[Exact phrase]" — [context where it worked]
```

**Read by:** `objection-handler`, `battlecard-maintenance`, `message-testing-analyst`, `pricing-page-reviewer`

---

## Flow 8: System Intelligence → Agent Updates

**Trigger:** `weekly-system-review` or `quarterly-system-audit` identifies a degrading agent or improvement opportunity.

**What gets written:**
- `core/system-intelligence/proposals/proposal-[YYYY-MM-DD]-[agent-name].md`

**Written by:** `pattern-analyst`, `system-updater`

**Format:**
```markdown
# Proposal: [Agent Name] — [Date]
Status: PENDING APPROVAL

## What was observed
[Specific: which outputs, what data, over what time period]

## The problem
[Why this is degrading output quality — with evidence]

## Proposed change
File: [path/to/agent.md]
Section: [which section]
Change: [exact before/after — not a description, the actual text]

## Expected improvement
[What should change in outputs if this is applied]

## Risk
[Any downside or unintended consequences]
```

**After human approval:** `system-updater` edits the agent file, appends to `core/system-intelligence/changelog.md`.

**Read by:** Human (for approval). Then the updated agent file is read by all downstream workflows that use it.

---

## Data Freshness Rules

Every agent that reads from `core/` checks the update date. These are the staleness thresholds:

| File | Stale after | What happens when stale |
|---|---|---|
| `core/competitive/competitor-[name].md` | 90 days | Agent flags: "Competitor card may be outdated — data from [date]" |
| `core/customer-voice/jaw-dropping-moments.md` | 180 days | Agent flags: "Customer voice data is [N] days old — recommend new discovery sprint" |
| `core/icp/primary-icp.md` | 180 days | Agent flags: "ICP last updated [date] — validate against recent closed-won cohort" |
| `core/brand/messaging-pillars.md` | 90 days | Agent flags: "Messaging pillars are [N] days old — confirm still current" |
| Win/loss synthesis | 90 days | `win-loss-analyst` flags before next run |
| Signal log entries | No expiry | Accumulate; `pattern-analyst` uses trailing 90-day window |

Agents do not refuse to run when data is stale. They flag it at the top of their output, then proceed with what they have. The flag is the human's prompt to update `core/`.

---

## Write Discipline

When any agent writes to `core/`, it follows these rules:

1. **Never overwrite** — append to logs and synthesis files. Replace only when the entire document is being refreshed (e.g., new positioning sprint).
2. **Always timestamp** — every write includes a date in the file or in the section header.
3. **Source everything** — where did this data come from? CRM pull date, Gong call IDs, interview dates.
4. **Log the write** — append one line to `core/system-intelligence/changelog.md`: `[date] [agent] updated [file] — [why]`

The changelog is the audit trail. If something breaks downstream, it can be traced to the write that caused it.
