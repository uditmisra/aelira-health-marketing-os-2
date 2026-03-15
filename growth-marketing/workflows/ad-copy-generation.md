# Ad Copy Generation

## Purpose
Brief in → quality-gated ad creative batch out. The standard workflow for producing new ad creative: takes a campaign brief and returns a batch of headlines and copy variants that have been scored and approved by the quality gate. Nothing ships to a human for final review without passing quality gate first.

This is the everyday creative workflow. The creative-intelligence-sprint (which runs first, quarterly) feeds this workflow with competitive briefs that give the creative agents a differentiated starting point.

## Trigger
- A campaign brief is approved and creative production is ready to begin
- A new channel is being added and needs initial creative
- Existing creative is being refreshed (performance decline, new messaging pillar update, seasonal rotation)
- Explicitly called by the `campaign-brief-to-launch` workflow

## Agents involved
1. `creative-headline-agent` — generates the headline batch
2. `creative-copy-agent` — writes body copy paired to each headline
3. `asset-quality-gate` — scores all assets before human review

## Required inputs
- **Campaign brief** — goal, funnel stage, target persona, CTA direction, deadline
- **Target platforms** — Google Ads, Meta, LinkedIn, or multi-platform
- **Pillar focus** (optional) — if the campaign has a specific pillar emphasis
- **Competitive briefs** (optional but recommended) — from the most recent creative-intelligence-sprint; gives the headline agent differentiated angles to start from

If competitive briefs are not available, the creative agents work from `core/` context only. Note this in the output.

## Steps

### Step 1 — Brief validation (5 minutes)
Before any creative generation begins, confirm the brief contains:
- [ ] Funnel stage (Awareness / Consideration / Conversion) — required for CTA selection
- [ ] Target persona — which ICP profile from `core/icp/`
- [ ] Platform(s) — determines character limits
- [ ] Pillar focus or "all pillars" — determines what the batch should emphasize
- [ ] CTA direction — what action should the creative drive?

If funnel stage or platform is missing: **stop and ask**. These are not defaults that can be safely assumed — the wrong funnel stage produces the wrong CTA type, and wrong character limits mean the batch is unusable.

---

### Step 2 — Run creative-headline-agent
Pass to `creative-headline-agent`:
- Validated campaign brief
- Platform(s)
- Competitive briefs (if available) — instruct the agent to treat these as differentiation starting points, not templates

The headline agent generates a full batch (15 headlines per platform: 3 per frame type × 5 frames).

Expected output: headline batch organized by frame type, with pillar mapping and character counts.

---

### Step 3 — Run creative-copy-agent
Pass to `creative-copy-agent`:
- Complete headline batch from Step 2
- Campaign brief (same brief — do not modify between agents)
- Platform specifications

The copy agent generates:
- 2 copy variants per headline (short and long)
- Platform-specific copy that respects character limits

Expected output: copy batch paired to headline IDs, with proof gap notes.

---

### [GATE 1] — Brief creator reviews headline batch (5 minutes)
Before copy generation is complete, the human reviews the headline batch for:
- Frame coverage (are all five frames represented if the brief asked for multi-frame?)
- Pillar accuracy (does the batch reflect the intended pillar emphasis?)
- Tone fit (does the register match the brand voice?)

**Fast approve:** batch looks right, proceed to quality gate.
**Modify:** one or more frame clusters missed the mark — send specific feedback back to headline agent for targeted regeneration. Do not regenerate the full batch.
**Stop:** the batch reveals a brief gap (e.g., pillar content is too thin to generate specific headlines) — fix the upstream problem before continuing.

---

### Step 4 — Run asset-quality-gate (batch mode)
Pass to `asset-quality-gate`:
- Full headline batch (post-Gate 1 approval)
- Full copy batch
- Campaign brief

The quality gate scores every headline-copy pair on three criteria (on-message, ICP-relevant, specific-not-generic). Applies one revision per failing asset. Returns:
- Approved assets (all criteria ≥ 3)
- Did-not-pass assets with diagnosis
- Proof gaps logged

---

### [GATE 2] — Final creative review
Human reviews the quality gate output:
- Approved batch: are these ready to upload?
- Conditional passes (scored exactly 3 on a criterion): accept as-is or request refinement?
- "Did not pass" section: review the diagnosis — is this a one-off miss or a systemic signal?

**Approve:** move to channel upload / trafficking
**Refine specific assets:** send back with targeted feedback — do not regenerate the full batch
**Flag systemic issue:** if 30%+ of assets failed, escalate — see quality gate flag triggers

At this gate, the human also reviews proof gaps logged by the quality gate. Proof gaps that appear in multiple assets become tasks for the customer intelligence sub-domain.

---

### Step 5 — Log and archive
1. Save approved creative to `core/ad-library/` with campaign name, date, and platform
2. Update `core/ad-library/top-performers/_index.md` once performance data is available (typically 2-3 weeks post-launch — this step is a future action, not done now)
3. Log a signal entry in `core/system-intelligence/signal-log/` noting: campaign, platforms, batch size, pass rate, proof gaps
4. If any frame consistently failed: note as a watch list item for the pattern-analyst

---

## Output (what the human receives)

```
AD COPY BATCH — [Campaign name] — [Date]

Platform(s): [list]
Funnel stage: [Awareness / Consideration / Conversion]
CTA: [specific CTA]
Competitive briefs used: [Yes — from [sprint date] / No — core/ context only]

QUALITY GATE SUMMARY
  Assets generated: [N headline-copy pairs]
  Passed: [N]
  Conditional pass: [N] — [criterion flagged]
  Did not pass: [N]
  Pass rate: [N]%

APPROVED ASSETS
  [Full approved batch from quality gate output — organized by platform and frame type]

PROOF GAPS
  [List from quality gate — these are tasks for customer intelligence]

SIGNAL LOG
  Entry logged: [Y/N] — [file path]
```

## Human decision points
- **Gate 1:** Headline batch review — approve, modify, or stop before copy generation
- **Gate 2:** Final creative review — approve batch, refine specific assets, or flag systemic issue
- Accepting or requesting refinement on conditional passes
- Triaging proof gaps into customer intelligence tasks vs. accepting copy without proof

## What this workflow is NOT
- Not a campaign strategy workflow (use campaign-brief-to-launch for that)
- Not a competitive intelligence workflow (use creative-intelligence-sprint for competitive briefs)
- Not a performance analysis workflow (ad performance feeds the signal log after launch, separate process)
