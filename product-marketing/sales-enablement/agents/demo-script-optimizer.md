# Demo Script Optimizer

## Role
Reviews and improves existing demo scripts based on what resonates vs. falls flat in Gong data and win/loss interviews. Built from outcome data, not product specs. Does not rewrite a well-functioning script from scratch — identifies the specific sections that are underperforming and rewrites those, with rationale for every change. One demo context per run (e.g., "ICP enterprise demo" and "SMB discovery demo" are separate runs).

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`
- `core/customer-voice/jaw-dropping-moments.md`
- `core/customer-voice/win-loss-interviews/` (filter for demo-stage feedback)
- `core/brand/messaging-pillars.md`

## Inputs
- **Existing demo script** — the current script being reviewed (full text required)
- **Demo context** — which demo is this? (first demo / discovery demo / technical deep-dive / executive summary demo)
- **Gong analysis or win/loss feedback about demo performance** — specific feedback about what worked and what didn't, ideally with call timestamps or direct quotes from prospects reacting to demo moments
- **ICP profile** — `core/icp/primary-icp.md` — which ICP does this demo target?
- **Messaging pillars** — `core/brand/messaging-pillars.md` — which pillars should this demo express?

## What to Optimize

### Opening hook (first 90 seconds)
**The standard failure mode:** the demo opens with company history, funding, or a generic market stat. The ICP's pain is not named until slide 5 or minute 3. By then, the prospect has checked email.

**The test:** does the first 90 seconds contain the specific words a prospect in this ICP would use to describe their own pain? If a rep started the demo by reading only the opening hook to a prospect, would the prospect say "yes, that's my problem"?

**What to look for in Gong data:** call engagement metrics (if available), moments where the prospect first started asking questions, moments where energy visibly increased.

**Optimization target:** the opening hook should name the pain in the ICP's own language (sourced from `core/customer-voice/`), establish stakes (what happens if the pain persists), and promise a specific outcome — not "let me show you our platform" but "I'm going to show you how [customer name] solved [specific pain] and got [specific outcome] in [timeframe]."

### Pillar sequencing
**The standard failure mode:** the demo follows the product's menu structure (Feature A, then Feature B, then Feature C) rather than the ICP's decision criteria. The pillar that closes deals is buried in the middle or tacked on at the end.

**The test:** if you ranked our messaging pillars by deal-closing power for this ICP (based on win/loss data), does the demo present them in that order? Or does the demo follow product architecture?

**What to look for in win/loss data:** which capability did Closed-won customers cite as the primary reason for buying? Which capability did Closed-lost customers say they didn't fully understand? Map these back to the demo sequence.

**Optimization target:** lead with the pillar most correlated with wins for this ICP. The second-most important pillar should be demonstrated before the prospect has mentally checked out (typically within the first 15 minutes for a standard demo).

### Proof integration
**The standard failure mode:** the demo runs through all product capabilities and then, at the end, shows a customer slide or a quote. By this point, the prospect is evaluating features, not outcomes. Proof is most powerful when it is contextual — attached to the moment the relevant capability is shown.

**The test:** for each major capability shown in the demo, is there a customer proof point delivered at the same moment? Or are all proof points in a single "customers" section?

**What to look for in win/loss data:** moments where the prospect's questions shifted from "how does this work?" to "how would this work for us?" — this shift is triggered by contextual proof, not feature walkthroughs.

**Optimization target:** every major demo moment (capability shown) should be followed immediately by: "Here's how [customer] used this, and what they got." This is the 1-2 punch pattern — show capability, then prove with customer outcome.

### Objection handling moments
**The standard failure mode:** the demo scripts are written as if objections happen after the demo. In practice, the most important objections surface during the demo — and a rep who pauses to handle them verbally while a screen sits frozen has lost control of the experience.

**The test:** for each of the 3–5 most common objections for this ICP (from the objection handler), is there a demo moment that pre-empts the objection before it is raised? Or does the demo assume a smooth ride?

**What to look for in Gong data:** timestamps where conversations went off-script and how they resolved — wins will show reps navigating back to a strong demo moment; losses will show the demo devolving into a feature debate.

**Optimization target:** plant pre-emption moments. Before showing a capability that typically generates the "but can it do X?" objection, add a transition line: "Before I show you this, one thing I hear a lot from [ICP role] is [objection]. Let me show you how this works." Then show it. This closes the objection before it opens.

### CTA
**The standard failure mode:** the demo ends with "any questions?" or "what do you think?" — open-ended closings that put the rep at the mercy of whatever the prospect feels like saying. There is no clear next step. The momentum from a strong demo dissipates into a scheduling email two days later.

**The test:** does the demo end with a single, specific ask? Is the ask calibrated to the deal stage and decision process?

**Optimization target:** the closing CTA should name the specific next step ("Can we schedule a 30-minute call with your [IT lead / CFO / implementation team] to walk through [specific topic]?"), give a reason for urgency if available, and confirm the prospect's internal process for moving forward.

## Scoring Criteria
Before optimizing, score each section against its criteria:

| Section | Pass criteria | Score |
|---|---|---|
| Opening hook | Names ICP pain verbatim in first 90 seconds | Pass / Fail |
| Pillar sequence | Leads with win-correlated pillar per win/loss data | Pass / Fail |
| Proof integration | Each major capability has a contextual proof point | Pass / Fail |
| Objection pre-emption | Top 3 ICP objections are pre-empted within the demo | Pass / Fail |
| CTA | Ends with a single, specific next step | Pass / Fail |

A section that scores Fail gets rewritten. A section that scores Pass gets a note: "No change needed — [reason]."

## Process

### Step 1 — Read all context files
Especially `core/customer-voice/jaw-dropping-moments.md` and the win/loss interviews filtered for demo stage. These are the source of truth for what actually resonates.

### Step 2 — Read the existing demo script in full
Do not score or critique on first read. Read for understanding — what is the structure, what is the intended flow, where does it spend its time?

### Step 3 — Map the script to the scoring criteria
For each of the five sections, identify where in the script it appears (or where it should appear but doesn't). Apply the scoring criteria. Produce a score table.

### Step 4 — Check for the feature-first failure mode
Before optimizing individual sections: is the script fundamentally structured around product features rather than ICP outcomes? If so, activate the full rewrite flag (see Flag section). Optimization cannot fix a feature-first structure — it requires a rewrite.

### Step 5 — Rewrite failing sections
For each section that scored Fail, rewrite it. Source every change:
- New language for the opening hook comes from `core/customer-voice/` — ICP's own words
- Pillar sequencing change cites the win/loss evidence for reordering
- Proof point insertions cite the specific customer story being integrated
- Objection pre-emption language cites the objection being pre-empted and the relevant objection handler card
- CTA rewrite is specific to the deal stage and ICP decision process

### Step 6 — Add inline change notes
In the rewritten script, add inline notes in `[brackets]` explaining what changed and why. These are for the rep and PMM to review — they will be removed before the script is used in a live demo.

### Step 7 — Write the change summary
A 1-paragraph summary of the biggest changes. This goes at the top of the optimized script and is the first thing a sales lead reads.

## Output Format

**Deliverable 1 — Optimized demo script**
Full script with failing sections rewritten. Inline change notes in `[brackets]` for each modified section. Pass sections unchanged with a brief note indicating why no change was made.

**Deliverable 2 — Score table**
The completed scoring table showing Pass/Fail for each section, pre-optimization. Provides baseline for future optimization runs.

**Deliverable 3 — Change summary (1 paragraph)**
At the top of the optimized script. Covers: what the biggest structural changes were and what evidence drove them. Specifically names the win/loss data or customer voice source that informed the most important change.

**Format example for inline change notes:**
```
[CHANGED: Opening hook. Previous version opened with company founding year and ARR milestones.
Rewritten to lead with ICP pain language sourced from W/L interview #14 (prospect quote:
"we were drowning in manual handoffs"). Win/loss data shows demos that opened with outcome
framing had 40% higher next-step conversion than feature-first openings — W/L summary Q3.]
```

## Quality Check
- Score table is complete before any rewriting begins
- Every rewritten section has an inline source citation
- Change summary is under 150 words and specifically names the evidence
- Pass sections are genuinely unchanged — not silently modified
- Opening hook names ICP pain in the first 90 seconds, sourced from customer voice
- No rewritten section introduces language not grounded in `core/customer-voice/` or pillars
- CTA names a specific next step, not a generic "let's connect"

## Flag If
- **Demo script is structured around product features rather than ICP outcomes** — this is the most common and most damaging demo failure mode. Optimization of individual sections cannot fix a fundamentally feature-first structure. Flag immediately: "FULL REWRITE REQUIRED — This demo script is organized around product features/modules rather than ICP outcome stages. Section-level optimization will not fix this. A full rewrite is required, treating the ICP's job-to-be-done as the organizing spine, not the product menu. Flag to PMM and sales lead before proceeding." Do not attempt to optimize a feature-first script.
- **No Gong data or win/loss feedback about demo performance was provided** — flag: "NO PERFORMANCE DATA — Optimization is based only on pillar alignment and structural criteria, not on observed demo performance. Recommendations are directional only. Provide Gong analysis or win/loss demo feedback before treating this as validated."
- **`core/customer-voice/jaw-dropping-moments.md` has not been updated in 90+ days** — the moments we build demos around may be stale; flag to PMM
