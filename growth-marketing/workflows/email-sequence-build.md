# Email Sequence Build

## Purpose
Takes a goal and segment as input, returns a fully built email sequence: architecture, subject lines, and complete body copy for every email, ready to load into the email platform.

## Trigger
Human request: "Build an email sequence for [segment] to achieve [goal]."

## Agents involved
1. `email-strategist` — designs the sequence architecture (trigger, goal, email count, timing, CTA per email, exit conditions)
2. [GATE] Human approves architecture before copy is written
3. `email-copy-agent` — writes full copy for each email, one email at a time, sequentially (each email is written with the prior email as context)

## Steps

**Step 1 — Gather inputs**

Before starting, confirm you have:
- Sequence type: Nurture / Trial-Onboarding / Re-engagement / Expansion
- Segment definition: who receives this sequence (persona, lifecycle stage, entry trigger)
- Goal: what conversion event marks this sequence as working
- Existing sequences: are there sequences already running for this segment that could create a conflict?
- Email platform: is the platform time-based only, or does it support behavioral triggers?

If any of these are missing, ask. Do not proceed without them.

**Step 2 — Run `email-strategist`**

Pass all inputs to the `email-strategist`. The strategist produces:
- Full sequence architecture (trigger, segment, goal, email count, timing schedule)
- Detailed email plan: for each email — email number, timing, goal, core message theme, CTA, exit condition if triggered
- Suppression rules
- Success metric

**Step 3 — [GATE] Architecture approval**

Present the architecture to the human before writing any copy.

Human reviews:
- Does the sequence length feel right for this segment?
- Are the email goals sequenced correctly (does each email set up the next)?
- Are the suppression rules complete?
- Is the CTA at each step specific enough?

**Do not proceed to Step 4 until the architecture is approved. Copy revision after architecture change wastes a full step.**

**Step 4 — Run `email-copy-agent` for each email**

For each email in the approved architecture, run `email-copy-agent` sequentially (not in parallel — each email needs the prior email as context).

Pass to the copy agent for each email:
- Sequence name
- Email number
- Goal of this specific email (from the architecture)
- Recipient segment
- The prior email in the sequence (paste the full copy — context matters for continuity)
- Any proof points or customer quotes relevant to this email's goal (pull from `core/customer-voice/`)

**Step 5 — Assemble the complete sequence**

Compile all emails into a single deliverable, in sequence order, ready to load into the email platform.

**Step 6 — [GATE] Full sequence review**

Human reviews the complete sequence before it is loaded. Check:
- Continuity: does each email feel like the natural next step from the prior?
- Tone consistency: does the voice hold across all emails?
- CTA clarity: is the ask in each email specific and distinct?
- No duplicate CTAs across emails (unless intentional re-engagement)

## Output

**Complete Email Sequence: [Sequence Name] — [Segment]**

**Architecture summary:**
| Email # | Send timing | Goal | CTA | Exit condition |
|---|---|---|---|---|
| 1 | Day 0 | [goal] | [CTA] | [exit] |

**Full copy — Email 1:**
[Subject line A, Subject line B, preview text, body — formatted for direct platform import]

**Full copy — Email 2:**
[etc.]

---

[Repeat for all emails in the sequence]

**Suppression rules:** [who is excluded and when]
**Success metric:** [the conversion event that marks this sequence as working]

## Human decision points
- **Step 1:** Confirm inputs are complete before starting
- **Step 3 (GATE):** Architecture approval before copy is written
- **Step 6 (GATE):** Full sequence approval before loading into email platform
- Any email where the copy agent flags a missing prior email, a dual-CTA brief, or a missing suppression path
