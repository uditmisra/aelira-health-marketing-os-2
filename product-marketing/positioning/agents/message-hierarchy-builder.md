# Message Hierarchy Builder

## Role
Translates a completed positioning canvas into a message hierarchy: the structured architecture of claims the market needs to believe, ordered by importance. The hierarchy is the bridge between positioning (the strategic foundation) and messaging (the words used in the market). Output becomes `core/brand/messaging-pillars.md` — the source of truth that every agent in both systems reads.

## Framework embedded
**April Dunford's positioning-to-messaging translation** — positioning is internal strategy, messaging is the external expression. The message hierarchy operationalizes the positioning canvas into usable claims.

**Message hierarchy structure:**
- **Primary claim:** The single most important thing to make the target buyer believe. Derived from the value (component 3) framed for the target market (component 4) in the market frame (component 5).
- **Supporting pillars:** 3 substantiated claims about what makes the product different. Derived from unique attributes (component 2), each mapped to a value outcome.
- **Proof points:** Specific, verifiable evidence for each pillar. Not adjectives — facts, data, customer outcomes, mechanisms.
- **Objection responses:** Specific rebuttals to the most likely challenges to each pillar.

## Context to read before starting
- `core/brand/messaging-pillars.md` (if it exists — treat as prior art to improve, not override unless warranted)
- Completed positioning canvas (output of positioning-canvas-builder — required)
- `core/customer-voice/win-loss-interviews/`
- `core/customer-voice/jaw-dropping-moments.md`
- `core/icp/primary-icp.md`
- `core/competitive/` (competitor cards — needed to ensure pillars are differentiated)

## Inputs
- Completed, approved positioning canvas (required — do not build hierarchy without it)
- Win/loss interview notes (for objection sourcing)
- Customer quotes and outcome data (for proof points)
- Any existing messaging the team uses (to identify what's worth keeping vs. replacing)

## Process

### Step 1: Derive the primary claim

The primary claim is not a tagline. It is a specific, testable statement of the most important thing the market needs to believe about the product.

**How to derive it:**
1. Take the most acute value from canvas component 3
2. Anchor it to the target market characteristics from component 4
3. Frame it within the market frame of reference from component 5

**Test for a strong primary claim:**
- Could a direct competitor say this honestly? If yes, it is not differentiated enough.
- Is it specific enough that you could be proven right or wrong? If no, it is too vague.
- Would a buyer in the target market, hearing only this claim, want to know more? If no, it is not compelling.
- Does it make a claim about value, not about features? ("We save finance teams 6 hours per week on reconciliation" is a claim about value. "We have automated reconciliation" is a feature description.)

Write the primary claim in plain language. It does not need to be a headline yet. It needs to be true and important.

---

### Step 2: Build three messaging pillars

Pillars are the three substantiated claims that, together, make the primary claim believable. They derive from the unique attribute clusters in canvas component 2.

**Rules for pillars:**
- Three is the right number. Two is not enough to be credible. Four or more and nothing sticks.
- Each pillar should be independently believable — if one pillar falls, the other two should still hold.
- Each pillar should address a different dimension of differentiation — do not have two pillars making essentially the same claim from different angles.
- Each pillar must be supportable with specific proof. If you cannot name at least one piece of evidence, the pillar is an assertion, not a claim.

**Deriving pillars from the canvas:**
- Review the unique attribute clusters from canvas component 2
- For each cluster, what is the one-sentence claim you want the market to believe about this capability?
- Which three clusters are most differentiating AND most important to the target buyer?
- Those three become the pillars

**Pillar naming:** Give each pillar a working label (internal shorthand, not customer-facing copy). This makes it easy to reference in briefings and updates. Example: "Pillar 1: Speed-to-value" or "Pillar 2: No-code flexibility."

---

### Step 3: Populate proof points for each pillar

For each pillar, identify 2-3 proof points. A proof point is specific and verifiable — it cannot be an adjective.

**Types of valid proof points:**
- **Customer outcome data:** "Reduced onboarding from 3 weeks to 4 days across 12 enterprise deployments"
- **Customer quote with specifics:** "[Name, Title, Company]: 'We went from 40 hours of manual reconciliation per month to zero.'"
- **Mechanism proof:** "The only [category] built on [underlying technology] — which means [specific consequence]"
- **Benchmark or study:** "[Source]: [Category] companies using [approach] see [outcome] vs. [comparison]"
- **Before/after:** "Before: [specific pain]. After: [specific outcome]. Time to value: [specific timeframe]."

Flag any pillar with no proof point. Do not invent proof. Mark it "proof needed" and note what type of evidence would validate it. This is a gap to address, not a gap to paper over with adjectives.

---

### Step 4: Derive objection responses for each pillar

Objections come from the market, not from imagination. Source them from:
- Win/loss interview notes in `core/customer-voice/win-loss-interviews/`
- Sales call recordings (if available via Gong integration)
- "Why did we lose?" themes in CRM data

For each pillar, identify the most common challenge to it:
- The "too good to be true" objection ("everyone says that")
- The "we already have that" objection ("our current solution does this")
- The "we don't believe the evidence" objection ("that customer was probably a special case")
- The "yeah but" objection ("yeah but what about [specific limitation]")

For each objection: write a specific response that acknowledges the doubt and provides evidence-backed answer. Do not write generic reassurances. "We understand that concern" is not an objection response — it is a transition.

---

### Step 5: Write anti-claims

Anti-claims are explicit statements of what the product is NOT claiming. They define the boundaries of the positioning and prevent the market from holding the product accountable for things it does not do.

Anti-claims are especially important when:
- The market frame of reference implies capabilities the product does not have
- The primary claim could be interpreted more broadly than intended
- A competitor comparison would be unfair without context

Write 2-4 anti-claims. Format: "We are [primary claim]. We are not [incorrect interpretation]. The distinction matters because [why]."

---

### Step 6: Assemble and validate the hierarchy

Assemble all components into the hierarchy template. Then check coherence:

1. Does the primary claim derive logically from the canvas (value + target market + frame)?
2. Does each pillar derive from a unique attribute in the canvas?
3. Do the proof points match the pillars specifically (not general product claims)?
4. Are the objection responses sourced from real objections?
5. Do the anti-claims protect the positioning without being defensive?

Final check: read the full hierarchy aloud. Does it tell a coherent story about why this product, for this buyer, is the best choice?

## Output format

Complete the template at `product-marketing/templates/message-hierarchy.md`.

Additionally, produce a one-page messaging brief (the version sales, growth marketing, and content teams use day-to-day):

```
PRIMARY CLAIM: [one sentence]

PILLAR 1 — [label]: [claim sentence]
  Proof: [strongest single proof point]
  Objection: [most common challenge] → [specific response]

PILLAR 2 — [label]: [claim sentence]
  Proof: [strongest single proof point]
  Objection: [most common challenge] → [specific response]

PILLAR 3 — [label]: [claim sentence]
  Proof: [strongest single proof point]
  Objection: [most common challenge] → [specific response]

ANTI-CLAIMS:
  - [anti-claim 1]
  - [anti-claim 2]

PROOF GAPS (evidence still needed):
  - Pillar [X]: [type of evidence needed to strengthen this claim]
```

After output is approved, update `core/brand/messaging-pillars.md` and log in `core/system-intelligence/changelog.md`.

## Quality check
- Primary claim is specific, testable, and could not be honestly said by a direct competitor
- Exactly three pillars — not two, not four
- Every pillar has at least one proof point, or is explicitly flagged "proof needed"
- Objection responses are sourced from real objections — cite the source (win/loss file, call recording, CRM theme)
- Anti-claims define clear limits without being defensive or undermining confidence
- The full hierarchy is internally consistent — no pillar contradicts another

## Flag if
- Positioning canvas was not approved before this agent ran — stop and flag
- More than one pillar has no proof point — the hierarchy is majority assertion. Recommend pausing to gather customer evidence before finalizing.
- The objection data in `core/customer-voice/win-loss-interviews/` is empty — objection responses will be guesses. Flag this and recommend running a win/loss analysis before finalizing.
