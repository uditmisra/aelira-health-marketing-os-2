# New Positioning Sprint

## Purpose
Build complete, evidence-backed positioning from scratch — or fully replace existing positioning that has stopped working. Produces: a category strategy, a positioning canvas, a message hierarchy, and audience-specific variants. These outputs become the foundation of `core/brand/messaging-pillars.md` and inform every downstream agent in both the Growth Marketing and Product Marketing systems.

Use this workflow when:
- Building positioning for the first time (new product, new company)
- The product has evolved significantly past its original positioning
- Win rates are declining without a clear product or competitive explanation
- The company is entering a new market or segment
- Messaging feels inconsistent across channels and teams

## Frameworks embedded
- **April Dunford's Obviously Awesome** — the primary framework throughout
- **Play Bigger** — category design strategy (Step 1)

## Required inputs before starting
Before running any agent, collect:

1. **Product description** — what the product does, mechanically, in plain language (not marketing copy)
2. **Best customer list** — 5-10 companies/people who love the product most. "Love" = highest NPS, most expansion revenue, most referrals, or "these are the customers we wish we could clone." This list is the most important input to the whole sprint.
3. **Competitive landscape** — confirm `core/competitive/` is populated. At minimum, one card per primary competitor.
4. **Customer evidence** — whatever exists in `core/customer-voice/`. Empty is OK — flag it and proceed with caveats. More is always better.
5. **Existing positioning** (optional) — current website homepage, pitch deck, or any existing positioning document. Treated as a hypothesis to improve, not a constraint.
6. **Why now** (optional) — any context on timing: new funding, upcoming launch, entering a new market, competitive pressure. This informs the category strategy.

## Agents involved (in order)
1. `category-designer`
2. **[GATE 1]** Human approves category strategy
3. `positioning-canvas-builder`
4. **[GATE 2]** Human validates canvas — this is the most important gate in the workflow
5. `message-hierarchy-builder`
6. **[GATE 3]** Human reviews message hierarchy and proof gaps
7. `audience-variant-generator`
8. **[GATE 4]** Human approves full package before core/ is updated

## Steps

### Step 1 — Category strategy (category-designer)

**Run:** `category-designer` with all required inputs.

**What it produces:**
- Recommended category path (existing market / new category / resegmentation)
- Category name or description
- Rationale and "why now" narrative
- Primary risk
- Brief description of paths considered and rejected

**Timeframe:** This agent should run as a focused session. If the competitive landscape in `core/` is thin, populate it first.

---

### [GATE 1] — Category strategy approval

**Human decision required.** Do not proceed to the canvas without this.

The human should:
- Confirm or challenge the recommended category path
- Validate that the category description feels right from their market knowledge
- Adjust the "why now" narrative if the timing argument needs refinement
- Confirm the primary risk is understood and accepted

If rejected: return to `category-designer` with specific feedback. Common reasons for rejection:
- The category doesn't feel right for the go-to-market motion (e.g., new category creation requires more resources than available)
- The "why now" argument is too weak
- The competitive analysis missed a key player

**Gate question:** "If we describe ourselves as [category], does that make our value immediately obvious to the right buyer, and do we have the ability to win in this category?"

---

### Step 2 — Positioning canvas (positioning-canvas-builder)

**Run:** `positioning-canvas-builder` with the approved category strategy as input plus all context from `core/`.

**What it produces:**
- Completed positioning canvas (5 components: competitive alternatives, unique attributes, value, target market characteristics, market frame of reference)
- Evidence summary (where each component is sourced from)
- Evidence gaps (components that need more customer data to strengthen)

**Important:** This agent must work through the 5 components in order. The chain must hold: each component logically derives from the previous one. If the agent flags that customer interview data is thin, note the gap but proceed — the canvas will be marked as "hypothesis-grade" until customer evidence validates or refines it.

---

### [GATE 2] — Canvas validation

**This is the most important gate in the system.** Everything downstream — messaging, launches, ad creative, sales enablement, narrative — derives from this canvas. A wrong canvas that passes here propagates wrong positioning everywhere.

The human should scrutinize each component:

**Competitive alternatives:**
- Are these actually what customers would use? (Not what the PMM team thinks they'd use)
- Is "do nothing" or status quo included?
- Is the primary alternative cluster correctly identified?

**Unique attributes:**
- Would a direct competitor honestly say any of these? (If yes, it's not unique)
- Are these capabilities, not just features?

**Value:**
- Is this a specific business outcome, not a feature description?
- Does the "so what?" chain actually terminate at a real impact?
- Is at least one value claim supported by hard evidence?

**Target market characteristics:**
- Is this specific enough to exclude wrong-fit buyers?
- Do the best customers actually match these characteristics?

**Market frame of reference:**
- If a target buyer heard only this frame of reference, would they immediately understand why they need to care?
- Does this frame cause the right competitive comparisons?

**Gate question:** "If someone built their entire company narrative, sales process, and marketing program around this canvas — would it work?"

If partial: approve with specific revision requests. It is normal for one component to be refined while others are locked. Do not delay the whole sprint for minor refinements.

---

### Step 3 — Message hierarchy (message-hierarchy-builder)

**Run:** `message-hierarchy-builder` with the approved canvas as input.

**What it produces:**
- Primary claim
- Three messaging pillars with proof points and objection responses
- Anti-claims
- Messaging brief (one-page summary for daily use)
- Proof gaps (claims that need evidence)

---

### [GATE 3] — Message hierarchy review

The human should:
- Validate that the primary claim is specific, differentiated, and reflects the approved canvas
- Confirm the three pillars are the right three (not just the most common things marketing has said before)
- Review proof gaps — identify which gaps are worth closing before launch vs. acceptable at launch
- Confirm the anti-claims are accurate

**Note on proof gaps:** It is normal to have 1-2 proof gaps at this stage. The goal is to know what evidence is needed and to have a plan to get it — not to block the sprint. Proof gaps become tasks for the customer intelligence sub-domain.

---

### Step 4 — Audience variants (audience-variant-generator)

**Run:** `audience-variant-generator` with the approved canvas and message hierarchy as inputs.

**What it produces:**
- Persona-specific messaging variants for each buyer in the purchase process (typically 4: economic buyer, technical evaluator, business buyer/champion, end user)
- For each: entry point, lead pillar, primary value, relevant proof, primary objection + response, one-sentence message, word-of-mouth message
- Cross-persona consistency check

---

### [GATE 4] — Full package approval

Review the complete output package:
- Category strategy
- Positioning canvas
- Message hierarchy
- Audience variants

**Gate question:** "Can I hand this package to the growth marketing team, the content team, and the sales team and trust them to execute from it without coming back to PMM for clarification on every piece of copy?"

If yes: proceed to Step 5.
If no: identify exactly what's unclear or incorrect and revise the specific component.

---

### Step 5 — Update core/ and notify downstream

After Gate 4 approval:

1. **Update `core/brand/messaging-pillars.md`** with the approved message hierarchy
2. **Update `core/brand/voice-and-tone.md`** if the canvas revealed anything new about how the brand should sound (often: the target market characteristics suggest a specific register)
3. **Update `core/icp/primary-icp.md`** if the target market characteristics refined the ICP definition
4. **Log the update in `core/system-intelligence/changelog.md`** with: date, what changed, why (one sentence), and what it replaces

**Notify downstream systems:**
- Growth Marketing: messaging pillars have been updated — ad copy agents should refresh on next run
- Sales Enablement: battlecards and objection handler should be refreshed against new hierarchy
- Narrative: category narrative and product narrative should be reviewed for alignment
- System Intelligence: log this as a positioning event for the signal tracker

## Output (what the human receives)

A complete positioning package:

```
1. Category Strategy (1 page)
2. Positioning Canvas (completed template)
3. Message Hierarchy (full template + one-page brief)
4. Audience Variants (4 persona variants + consistency check)
5. Proof Gaps Log (what evidence is still needed)
6. Downstream notification summary (what changed, who needs to know)
```

## Human decision points

| Gate | Question | Common outcome |
|---|---|---|
| Gate 1: Category | Is this the right category to compete in? | Often approved with minor narrative refinements |
| Gate 2: Canvas | Does this canvas hold up to scrutiny? | Most commonly requires Component 4 (target market) to be sharpened |
| Gate 3: Hierarchy | Are these the right claims, with the right evidence? | Often requires 1-2 proof gaps to be logged as tasks |
| Gate 4: Full package | Can downstream teams execute from this? | Usually approved; occasional variant revision needed |

## Timeline expectations
- Inputs gathered: Day 0
- Category strategy: Day 1
- Gate 1: Day 1 (same day if inputs are ready)
- Canvas: Day 2-3 (requires reading customer evidence)
- Gate 2: Day 3-4 (allow time for genuine scrutiny)
- Message hierarchy: Day 4-5
- Gate 3: Day 5
- Audience variants: Day 6
- Gate 4 + core/ update: Day 7

Total: approximately 1 week for a clean run with good inputs. Add 2-5 days if customer interview data needs to be gathered or if competitive landscape needs to be populated first.
