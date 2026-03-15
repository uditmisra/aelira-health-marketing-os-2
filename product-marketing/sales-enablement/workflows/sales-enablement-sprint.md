# Sales Enablement Sprint Workflow

## Purpose
Rapid sales enablement update triggered by a product launch or a significant competitive move. The goal is to ensure reps have updated materials before they are in a live deal where those materials matter. Speed is the defining constraint — the standard quarterly refresh cadence is too slow for this trigger.

## Urgency Tiers

### Tier 1 — Product Launch (L1 or L2)
**Target:** All relevant sales enablement materials updated and distributed **before launch day** — not on launch day, not after.

If a rep is in an active deal when a launch goes live and asks a prospect "have you seen our new [capability]?" — that rep needs a current demo script, an updated battlecard (if the launch changes competitive position), and updated objection responses before the conversation happens.

Minimum lead time: 5 business days before launch day for materials to be reviewed, approved, and in reps' hands.

### Tier 2 — Significant Competitive Move
**Target:** Updated battlecard for the relevant competitor within **48 hours** of the move being confirmed.

A "significant competitive move" means: a competitor announces a major product launch, a funding round that changes their pricing power, a major customer win in our ICP segment, or a pricing change that affects how we compete on value.

Not every competitor press release triggers this. The trigger is: "Would a rep in an active deal against this competitor be at a disadvantage tomorrow with yesterday's battlecard?" If yes, this is Tier 2. If no, it can wait for the quarterly refresh.

---

## Trigger

### Tier 1 (Launch) trigger:
- L1 or L2 launch brief approved (see launch tier definitions)
- PMM confirms the launch changes something reps need to know, say, or show in deals

### Tier 2 (Competitive) trigger:
- competitive-monitor flags a major competitor move
- Sales lead reports reps are encountering new competitive positioning in active deals that the current battlecard doesn't address
- Win/loss data shows a sudden drop in win rate against a specific competitor without a clear prior explanation

---

## Agents Involved
1. [GATE] Scope confirmation with PMM and sales lead (this step is first — scope determines which agents run)
2. battlecard-generator or battlecard-maintenance (if competitive angle is involved)
3. objection-handler (new objections from the launch or competitive move)
4. demo-script-optimizer (if launch adds a new demo moment or changes the sequence)
5. pitch-deck-reviewer (if a new deck has been created for the launch)
6. roi-business-case-builder (if launch changes the ROI story — new proof points, new value drivers)
7. [GATE] Sales lead review (24-hour turnaround target for urgent sprints)

---

## Steps

### Step 0 — Receive Trigger and Assess Urgency

Identify whether this is Tier 1 (launch) or Tier 2 (competitive move). Set the timeline accordingly.

For Tier 1: what is the launch date? Count backward 5 business days. That is the deadline for all materials to be in sales' hands. If the gap is less than 5 business days, flag immediately — the materials may not be ready before launch, and sales leadership needs to know.

For Tier 2: what is the competitive move? When did it go live or become known? The 48-hour clock starts now.

---

### Step 1 — [GATE] Scope Confirmation

**This gate happens before any agent runs. Its purpose is to prevent both under-scoping (missing something reps need) and over-scoping (creating unnecessary work that slows down the critical materials).**

PMM lead and sales lead answer:

**1. Which materials need updating?**

| Material | Needs update? | Why / Why not |
|---|---|---|
| Battlecard(s) — which competitor(s)? | Yes / No | |
| Objection handler entries — which objections? | Yes / No | |
| Demo script | Yes / No | |
| Pitch deck | Yes / No | |
| ROI/business case | Yes / No | |
| Email sequences (if email-copy-agent is in scope) | Yes / No | |

**2. What is the critical path?**
Identify which materials are needed first (based on where deals are in the pipeline right now) and which can follow. For a product launch, the demo script update is often the critical path — reps need to show the new capability before the launch goes public. For a competitive move, the battlecard is the critical path.

**3. Which agents can run in parallel?**
Materials that do not depend on each other can be developed simultaneously. Battlecard updates and objection handler updates are typically independent — run them in parallel. Demo script updates depend on knowing what new capabilities exist, so they may need to wait for the battlecard if the launch changes competitive position.

PMM lead approves the scope and parallel workstreams before work begins.

---

### Step 2 — Run Agents in Parallel (Where Possible)

**For Tier 1 (Launch):**

**Parallel workstream A — Battlecard (if launch changes competitive position)**
- Identify which competitors are affected by the launch (does it close a gap they were exploiting? does it neutralize an attack line they use against us?)
- Run battlecard-maintenance for each affected competitor
- New attack lines the launch might generate from competitors are speculative at launch — mark as `[hypothesis — monitor for field confirmation]`

**Parallel workstream B — Objection handler**
- New objections are predictable at launch: "How is this different from [competitor's version of this feature]?" / "Is this GA or beta?" / "What does this cost?" / "We've been asking for this for 6 months — why did it take so long?"
- Run objection-handler for each anticipated objection
- Source from messaging pillars and launch brief for proof points — customer proof points may not exist yet; label new launch claims as `[launch claim — customer validation pending]`

**Parallel workstream C — Demo script**
- Run demo-script-optimizer with the launch context: what new capability is being added, where does it fit in the demo flow (is it a new jaw-dropping moment?), does it change the pillar sequence?
- If the launch adds a major new capability: assess whether it becomes the new opening demo moment (where it speaks directly to ICP pain) or whether it fits into the existing flow

**Parallel workstream D — ROI/business case (if launch adds a new value driver)**
- If the launch creates a new measurable outcome for customers, the ROI model may need updating
- If no new quantified outcomes exist at launch, defer this to post-launch once customer data is available; do not build an ROI model on theoretical launch claims

**For Tier 2 (Competitive move):**

**Primary workstream — Battlecard maintenance**
- Run battlecard-maintenance for the affected competitor
- The trigger type is `competitor-update`
- Apply the change type logic: pricing change → which sections? new feature → which sections? new positioning → full rewrite flag?

**Secondary workstream — Objection handler**
- The competitive move likely generates new attack lines from the competitor
- Run objection-handler for each new anticipated attack, sourced from field feedback if available or from the competitor's announcement language if not yet in deals

---

### Step 3 — Quality Check Before Review Gate

Before sending to sales lead review:
- Every updated material passes its own agent's quality check criteria
- Hypothesis-marked items are clearly labeled — reps should know which claims are proven and which are not yet field-validated
- No material has been updated for scope creep — only sections that the trigger affects have changed
- Change summaries are written for every updated material (so the sales lead can review summaries rather than reading full documents for materials with minor updates)

---

### Step 4 — [GATE] Sales Lead Review

**24-hour turnaround target for Tier 1 (launch) and Tier 2 (competitive).**

For Tier 1: if launch day is in 48 hours and this review hasn't started, escalate immediately. There is no path to pre-launch distribution if this gate slips.

Sales lead reviews:
- Updated battlecards (via change summaries for minor updates; full card for major updates or new cards)
- New objection handler entries (full entries — these are short enough to read fully)
- Demo script changes (focuses on: does the new capability fit naturally, or does it feel bolted on?)
- Any other materials in scope

Sales lead checks:
- [ ] Competitive intel is accurate based on what reps are seeing or what the competitive move actually says
- [ ] Objection responses are ones reps would use in a live call — not too stiff, not too clever
- [ ] Demo script change integrates the new capability in a way that feels natural in the flow
- [ ] Nothing in the updated materials will confuse reps or contradict what they've been saying in current deals

If the review gate is passed: proceed to Step 5.
If feedback requires changes: address feedback, return to sales lead for a 4-hour spot review (not a full re-review). Do not restart from Step 2.

---

### Step 5 — Publish and Brief the Sales Team

**Step 5.1 — Publish all updated materials** to the sales team's standard location.

**Step 5.2 — Send a sprint notification.** This is not a general update — it is an urgent, specific communication:

```
ENABLEMENT SPRINT UPDATE — [Launch name or Competitor] — [Date]

Why this matters now: [1 sentence — launch is live / competitor just moved]

What changed:
  - [Material]: [1 sentence on what changed and what reps need to know]
  - [Material]: [1 sentence on what changed]

What to use immediately:
  - [Specific material or talking point for reps in active deals]

Hypothesis-marked sections (need field validation):
  - [Any sections that are not yet proven and why]

Questions: tag [PMM] or [sales lead] in [channel].
```

**Step 5.3 — Brief reps with active deals impacted by the trigger.**
For Tier 1: AEs with deals that could close before the quarter ends — these reps need to know about the launch before they're in their next call.
For Tier 2: AEs with active competitive deals against the affected competitor — brief them directly.

Do this via direct message or a 15-minute standup call, not by hoping they read the Slack post.

---

### Step 6 — Log and Return to Cadence

**Step 6.1 — Log the sprint to `core/system-intelligence/signal-log/`:**
- Trigger type and date
- Materials updated
- Hypothesis-marked sections that need field validation
- Any materials that were out of scope and need to be picked up in the quarterly refresh

**Step 6.2 — Set field validation check-in.**
For any hypothesis-marked sections: set a 30-day reminder to check whether field feedback has confirmed or refuted the hypothesis. Run field-feedback-synthesizer at the 30-day mark to gather this signal.

**Step 6.3 — Return to quarterly refresh cadence.**
The sprint is not a substitute for the quarterly refresh — it addresses the urgent trigger. Remaining non-critical updates stay in the quarterly queue.

---

## Output
At the end of this workflow:
- All in-scope materials updated, reviewed, and distributed before launch day (Tier 1) or within 48 hours (Tier 2)
- Sales team notified with a specific, urgent changelog
- Active deal reps briefed directly
- Hypothesis-marked sections identified with a 30-day validation check-in scheduled
- Signal log entry

## Human Decision Points

| Decision | Who | When | Non-negotiable? |
|---|---|---|---|
| Confirm trigger tier (Tier 1 launch vs. Tier 2 competitive) | PMM lead | Step 0 | Yes |
| Approve scope of materials to update | PMM + sales lead | Step 1 gate | Yes |
| Determine critical path and parallel workstreams | PMM lead | Step 1 gate | Yes |
| Escalate if timeline is unachievable before launch or 48h deadline | PMM lead | Step 0–1 | Yes |
| Approve all updated materials for distribution | Sales lead | Step 4 gate | Yes |
| Decide which active-deal reps to brief directly | Sales lead | Step 5 | Yes |

## Flag If
- **Launch is in fewer than 5 business days and materials are not yet started** — flag immediately to PMM lead and sales leadership: "ENABLEMENT TIMELINE AT RISK — launch is [N] business days away and enablement sprint has not started. Materials will not be ready before launch day unless scope is reduced. Decision needed: which materials are critical path for launch day, and which can follow post-launch?"
- **Competitive move suggests competitor has fundamentally repositioned** — Tier 2 maintenance is insufficient; escalate to full battlecard rewrite (new-competitor-battlecard workflow logic applies) and flag to PMM lead
- **Sales lead is unavailable for the 24-hour review gate** — do not skip the gate; escalate to whoever has sales lead authority. Distributing unreviewed competitive materials to a sales team can cause active deal harm if the intel is wrong.
