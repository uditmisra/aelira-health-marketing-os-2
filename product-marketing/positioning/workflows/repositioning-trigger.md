# Repositioning Trigger

## Purpose
A decision workflow for determining whether current positioning needs a full repositioning — not a message refresh, not a pillar adjustment, but a fundamental change to the category frame, the ICP definition, or the core value claim. Repositioning is expensive, disruptive, and often unnecessary. This workflow exists to prevent both false positives (triggering a repositioning for a problem that a messaging audit would fix) and false negatives (running messaging audits repeatedly when the fundamental frame is broken).

This workflow is a decision tree, not an execution sequence. Its primary output is a decision: full repositioning, or messaging fix. If the answer is messaging fix, this workflow closes and the messaging-audit workflow opens. If the answer is full repositioning, this workflow hands off to the new-positioning-sprint workflow.

## Trigger
This workflow is triggered when any one of the following conditions is observed:

**Trigger 1: Win rate declining for 2+ consecutive quarters with no clear operational cause.**
Win rate drops happen for operational reasons (rep turnover, product bugs, competitive pricing move, territory restructuring) and positioning reasons (the category frame has shifted, a competitor is winning the framing battle, the ICP has evolved beyond current positioning). Operational causes must be ruled out before triggering this workflow. If win rate is declining and the cause is clearly operational, fix the operational problem — do not reposition.

**Trigger 2: A new competitor is winning by claiming a category frame we haven't addressed.**
A competitor is not just outspending in the market — they are using a frame that resonates with buyers in a way that makes our current positioning look incomplete, outdated, or irrelevant by contrast. Buyers are referencing the competitor's category language in discovery calls. Deal notes show our positioning is not holding up against the competitor's frame.

**Trigger 3: Product has evolved significantly beyond original positioning.**
The product shipped features or capabilities in the past 12 months that represent a meaningfully different value proposition than what the current positioning describes. The positioning is still accurate for the original product but does not reflect what the product can actually do for buyers now. Customers who discover capabilities the positioning never mentioned are surprised — and buyer surprise is a sign that positioning and product have diverged.

**Trigger 4: A new, larger ICP segment is emerging that current positioning does not address.**
Sales or CS data shows a meaningful and growing segment of buyers who are evaluating, buying, and getting value from the product — but who are not the defined primary ICP. Current positioning either does not resonate with them or actively signals "this isn't for you." If this segment is larger or higher-value than the current ICP, the positioning decision has strategic consequences beyond messaging.

**How to apply the triggers:** any one of the four triggers is sufficient to initiate this workflow. The workflow's job is to assess whether the trigger reflects a true positioning problem or a different underlying issue.

## Agents involved
- competitive-monitor (for Trigger 2: assess whether the competitor's frame is winning buyer mindshare)
- win-loss-analyst (for Triggers 1 and 4: assess field evidence for the positioning problem)
- message-testing-analyst (for all triggers: assess whether messaging data shows positioning drift vs. execution drift)

## Steps

**Step 1: Document the trigger**
Before running any agent, write a concise trigger document:
- Which trigger condition applies (1, 2, 3, or 4)?
- What specific evidence activated the trigger? (Not "win rate is declining" — "win rate in the mid-market segment declined from 28% to 19% in Q3 and Q4, two consecutive quarters, with no rep turnover or product issues in that segment during the same period.")
- What has already been tried? (Have messaging audits been run? Did they produce improvements? Did those improvements hold?)
- What does "fully solved" look like? (What would we see in the data if the positioning problem were fixed?)

This document is shared with leadership at Gate 1. A trigger document that cannot answer these four questions with specific evidence is not yet ready for a Gate 1 discussion.

**Step 2: Run the relevant agents to gather evidence**
Based on the trigger type, run the relevant agents:

*For Trigger 1 (win rate decline):*
- Run win-loss-analyst on the past two quarters of data, specifically filtering for deals lost in the declining segment. The question: what are buyers saying when they choose a competitor or choose to do nothing? Is the pattern positioning-related (our frame isn't resonating, competitor's frame is more compelling) or something else?
- Run message-testing-analyst on the past 90 days of messaging performance. The question: is there evidence of messaging drift — pillars weakening, frames losing effectiveness — that would explain the win rate decline?

*For Trigger 2 (competitor's category frame):*
- Run competitive-monitor focused on the specific competitor and their category claim. Document the frame they're using, how widely it's appearing in buyer conversations, and whether it's appearing in deal notes as the reason we're losing.
- Run win-loss-analyst filtered for deals lost to this specific competitor. The question: are buyers citing the competitor's frame language in their reasons for choosing them?

*For Trigger 3 (product evolution):*
- No agent run required for this trigger — the evidence is internal. Document the specific capabilities that have shipped since the current positioning was last set, and assess the gap between what the product can now do and what the current positioning claims it does.
- Run win-loss-analyst to assess: are wins citing capabilities the positioning doesn't claim? Are losses citing positioning that describes a less capable version of the product?

*For Trigger 4 (new ICP segment):*
- Run win-loss-analyst on deals in the emerging segment. The question: is this segment winning despite the positioning (they're finding their own reasons to buy) or because of it (the positioning accidentally speaks to them)?
- Run message-testing-analyst on any assets that have been tested with this segment, if they exist.

Deliverable for Step 2: assembled evidence package — agent outputs plus internal data — that speaks to whether the trigger reflects a true positioning problem.

---

**[GATE 1] Leadership alignment: repositioning or messaging fix?**

*Who is in this meeting:* PMM lead, marketing leadership (CMO or VP Marketing), sales lead, and optionally product lead if Trigger 3 applies.

*This gate is the most important decision in the workflow.* The question is not "what should our new positioning be?" The question is: "Is this a positioning problem, or a different kind of problem?"

Apply the following decision framework:

**The problem is a messaging fix if:**
- The current category frame is still correct — buyers are operating within the same mental model they had when positioning was set
- The ICP is still the same — the buyers who are best served by the product haven't materially changed
- The product's core value claim is still true — the product delivers the same type of value it always did, just more of it
- Win/loss data shows buyers understand what we do but are choosing competitors for execution reasons (feature gaps, pricing, trust), not framing reasons

If the problem is a messaging fix, close this workflow and open the messaging-audit workflow.

**The problem is a positioning problem if:**
- Buyers are operating in a mental model that our current frame doesn't match (a new category is forming, or the category definition has shifted)
- The ICP we're best positioned for is meaningfully different from the ICP we're currently positioned for
- The product's core value claim has changed — the product now does something fundamentally different than it did when positioning was set
- Win/loss data shows buyers don't understand what we do, or understand it correctly but don't think it matters to them

If the problem is a positioning problem, proceed to Step 3.

**The problem may be neither if:**
- Win rate decline has an operational explanation that wasn't caught in Step 2
- The competitor's frame is winning because of product superiority, not positioning superiority (this is a product problem, not a positioning problem)
- The new ICP segment is too small or too early to justify repositioning away from the current ICP

*Human decision required.* Leadership must make a clear call: repositioning, messaging fix, or other. An ambiguous output from this gate ("let's see how the next quarter goes") is a decision to do nothing — name it as such and set a specific re-evaluation date.

*Gate output:* written decision — repositioning confirmed, messaging fix instead, or other with specific next steps and re-evaluation date.

---

**Step 3 (if repositioning confirmed): Run new-positioning-sprint workflow**
Hand off to the new-positioning-sprint workflow with:
- The trigger document from Step 1
- The assembled evidence package from Step 2
- The leadership decision document from Gate 1

The new-positioning-sprint workflow owns all subsequent steps: ICP re-examination, category frame definition, message hierarchy rebuild, and all downstream updates. This workflow does not continue past Gate 1 if repositioning is confirmed — the sprint workflow takes over.

**Step 4 (if messaging fix): Run messaging-audit workflow**
Close this workflow and open the messaging-audit workflow with:
- The assembled evidence package from Step 2 as context (specifically: what the agents found that pointed toward execution rather than positioning)
- A note in the messaging audit brief that this audit was triggered by a repositioning evaluation — the bar for "changes warranted" should be higher than usual, because the same patterns were evaluated at leadership level and determined to be execution, not positioning

---

## Output
At the end of this workflow, the human has:
1. A trigger document with specific evidence (Step 1)
2. Agent evidence package — win/loss analysis, competitive frame assessment, or message testing data, depending on trigger type (Step 2)
3. A leadership decision: repositioning confirmed, messaging fix, or other (Gate 1)
4. Either: handoff to new-positioning-sprint (repositioning confirmed) or handoff to messaging-audit (messaging fix)

## Human decision points
- **Gate 1:** Leadership must make an explicit decision — repositioning, messaging fix, or other with a specific re-evaluation date. This gate cannot produce an ambiguous output. The cost of triggering an unnecessary repositioning sprint is high (months of PMM capacity, sales disruption, brand consistency risk). The cost of delaying a necessary repositioning is also high (continued win rate erosion, losing the category frame battle). The decision must be deliberate.
- **Trigger document approval (Step 1):** PMM lead must confirm that the trigger document meets the evidence standard before convening Gate 1. A Gate 1 meeting without a specific, evidenced trigger document produces an unproductive discussion. The PMM lead owns the quality bar on the trigger document.

## Notes
- Repositioning is not a marketing project. It is a company decision. When it is triggered, leadership must be aligned — not informed after the fact. That is why Gate 1 exists before any repositioning work begins.
- The most common false positive: declining win rate in one segment is interpreted as a positioning failure before operational causes are ruled out. Rep turnover, product gaps, and competitive pricing moves explain most single-quarter win rate changes. Two consecutive quarters with no operational explanation is the minimum threshold.
- The most common false negative: running messaging audits repeatedly on fundamentally broken positioning. Messaging audits improve pillar execution within a frame. They cannot fix a frame that the market has moved past. If three consecutive messaging audits have produced diminishing returns, that is itself a signal that this workflow should be triggered.
- Repositioning downstream consequences are significant: every marketing asset, every sales deck, every enablement material, every SEO-anchored page, every customer-facing description of the product must be updated. Estimate the scope before committing at Gate 1.
