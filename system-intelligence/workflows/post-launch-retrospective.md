# Post-Launch Retrospective

## Purpose
The deepest learning event in the system. Runs 2 weeks after every L1 launch — enough time for initial performance data to stabilize, not so long that the team has moved on. A product launch is the highest-signal event in marketing: it tests positioning, messaging, creative, distribution, and sales enablement simultaneously with real market feedback. The retro captures all of that and turns it into system improvements.

This is not a post-mortem. It is a learning harvest. The question is not "what went wrong" — it is "what did the market just teach us, and how do we encode it?"

## Trigger
Automatically triggered 14 days after every L1 launch date. Scheduled when the L1 launch brief is approved.

If a launch was classified as L2 or L3, this workflow does not run — use the weekly system review to capture smaller launch learnings.

## Agents involved
1. `launch-retro-agent` (PMM system — primary data collector)
2. `message-testing-analyst` (PMM positioning sub-domain — interprets messaging signal)
3. `pattern-analyst` (system intelligence — in launch-retro mode, full launch window)
4. `system-updater` (system intelligence — formats and applies approved changes)

## Required inputs before starting
- Launch brief (the approved L1 brief from `product-marketing/templates/launch-brief-l1.md`)
- Launch performance data: channel metrics (paid CTR/CVR, email open/click, organic traffic, social engagement) from the 14 days post-launch
- Sales feedback: what reps heard from prospects who engaged with launch content (from field-feedback-synthesizer or direct input)
- Win/loss data: any deals that closed in the launch window and cited the launch or product feature
- Press/analyst coverage: what was written about the launch and how it was framed

## Steps

### Step 1 — Launch retro agent: collect and structure launch signal (Day 14)

Run `launch-retro-agent` from the PMM system to produce the raw launch performance picture:

The agent answers:
- **Goal vs. actual:** For each success metric in the launch brief, what was the target and what was the result?
- **What performed:** Which content, channel, or message drove the most engagement, pipeline, or coverage?
- **What didn't perform:** What fell flat — and is there a hypothesis for why?
- **Market reception:** How did the market describe the launch? (Press framing, analyst commentary, social conversation) Does it match how we positioned it?
- **Sales reaction:** What did prospects say when sales used launch messaging? Which objections surfaced that the launch content didn't address?
- **Tier validation:** Was L1 the right tier? Did the launch generate the level of response a major launch should?

---

### Step 2 — Message-testing-analyst: interpret the positioning signal (Day 14-15)

Run `message-testing-analyst` from the PMM positioning sub-domain with the launch retro output as primary input.

This agent answers the positioning-layer questions:
- **Which pillar landed:** Did buyers respond to Pillar 1, 2, or 3 most strongly? (Indicated by which content performed, which objections came up, what press quoted)
- **Which pillar didn't land:** Was any pillar ignored or challenged frequently? What does that say about how well we've proven it?
- **Frame resonance:** Did buyers put the product in the intended market frame of reference? Or did they re-frame it (which may be a signal that our frame isn't right, or that a segment we didn't anticipate is responding)
- **Language gap:** What language did buyers, press, and analysts use to describe the product? Does it match our messaging? Divergence here is highly actionable.
- **Canvas update needed?** Based on launch signal, does any component of the positioning canvas need refinement?

---

### Step 3 — Pattern-analyst: system-level learning (Day 15)

Run `pattern-analyst` in launch-retro mode — reviewing the full launch window (typically 6-8 weeks from launch brief to 2-week post-launch mark).

In launch-retro mode, the pattern analyst extends its scope beyond the weekly 7-day window:
- Reviews all signal log entries from the launch window
- Looks specifically for patterns that span multiple signal types (ad + sales-feedback + win-loss all pointing the same direction is a strong signal)
- Evaluates: did the agents used during this launch produce high-quality output? Which ones were rated highly vs. flagged?
- Compares: how did actual launch messaging (what was shipped) vs. intended messaging (what the hierarchy said) compare? Drift between these is an agent quality signal.

Additionally in launch-retro mode, the pattern-analyst asks two extra questions:
1. **What did this launch confirm?** (Patterns we suspected that are now validated — worth encoding as stronger instructions)
2. **What did this launch reveal?** (Things we didn't know before the launch — new segments responding, new objections surfacing, unexpected proof points)

---

### [GATE 1] — Human review of launch findings (Day 15-16)

Before generating proposals, present the combined findings from Steps 1-3 to the PMM lead and relevant stakeholders for review.

Structure of the review:
- 3-5 biggest learnings from the launch (what the market taught us)
- 1-3 positioning implications (does the canvas or hierarchy need updating)
- Agent quality observations (which agents performed, which need work)
- Proposed changes to propose to the system

**Gate question:** "Based on what this launch taught us, are we looking at minor message refinements, a meaningful positioning update, or a full repositioning? The answer determines the scope of what we encode."

- Minor refinements → proceed to system-updater
- Meaningful positioning update → run `messaging-audit` workflow first, then return to system-updater
- Full repositioning → trigger a new `new-positioning-sprint` — do not try to encode a full reposition through the system-updater patch mechanism

---

### Step 4 — System-updater: format and apply approved changes (Day 16-17)

Run `system-updater` with the pattern-analyst output from this retro.

Change cards from a post-launch retro tend to be more substantive than weekly review cards. Common changes triggered by launches:
- Updating a messaging pillar's proof points (launch produced new customer evidence)
- Adding a new objection + response to an agent (objection surfaced repeatedly during launch)
- Encoding a new language pattern into the headline-agent or copy-agent (buyers described it differently than expected)
- Updating a competitor card (a competitor responded to the launch)
- Adding a jaw-dropping moment to `core/customer-voice/jaw-dropping-moments.md` (launch event produced a new one)

Apply approved changes, commit with rationale, update changelog.

---

### Step 5 — Close the loop (Day 17)

1. Update `core/system-intelligence/health-dashboard.md` with launch retro findings
2. Save full retro to `core/system-intelligence/patterns/retro-[launch-name]-[date].md`
3. Log a `launch-retro` signal entry in `core/system-intelligence/signal-log/`
4. If the launch revealed a new segment responding: add to watch list for ICP quarterly review
5. If the launch confirmed a proof point: promote from "proof needed" to validated in the message hierarchy
6. If tier classification was wrong (L1 that should have been L2, or vice versa): update the launch-tier-classifier instructions with the new calibration data

## Output (what the PMM lead receives)

```
POST-LAUNCH RETROSPECTIVE — [launch name] — [date]

GOALS VS. ACTUALS
  [table of each success metric: target vs. result vs. status]

TOP 3 LEARNINGS
  1. [Most important thing the market taught us]
  2. [Second learning]
  3. [Third learning]

POSITIONING IMPLICATIONS
  Canvas update needed: [Yes / No / Watch]
  Hierarchy update needed: [Yes — [pillar] / No]
  Language gap: [What buyers said vs. what we said]

AGENT PERFORMANCE
  [N] agents used during launch
  High quality: [list]
  Needs improvement: [list]

SYSTEM CHANGES APPLIED: [N]
  [List with commit hashes]

WATCH LIST ADDITIONS: [N]
  [Items to track before next quarterly audit]

NEXT ACTIONS
  [Any follow-on workflows triggered: messaging-audit, icp-quarterly-review, etc.]
```

## Human decision points
- Gate 1: reviewing launch findings before proposals are generated — determines scope
- Reviewing and approving each system change card
- Deciding if a launch revealed something requiring a full positioning sprint (not just patches)
