# New Tier Design

## Purpose
Design a new pricing tier from scratch — its position in the architecture, what it includes, what it costs, and how it fits the existing page. Used when a new product capability warrants its own tier, when expanding into an ICP segment with meaningfully different willingness to pay, or when competitive pressure has exposed a gap in the current tier structure that a new tier would address. A new tier is a significant packaging and positioning decision, not a product catalog entry.

## Trigger
This workflow is triggered by one of three conditions:

**New product feature or capability:** A major new feature has shipped that is meaningfully more powerful than what the current top tier offers, that warrants a new pricing tier rather than inclusion in the existing structure. The product team has flagged this.

**New ICP segment:** The product is being sold into or tested with a segment whose characteristics (company size, budget authority, use case complexity) are materially different from the existing ICP, and the current tier structure does not map to how that segment grows or what they will pay.

**Competitive pressure:** A competitor has introduced a tier or pricing structure that is winning deals by offering something the current structure doesn't address — either a more accessible entry point, a more capable mid-tier, or a more clearly defined enterprise offering.

Do not trigger this workflow for minor packaging adjustments (what's included in an existing tier). That is handled in the annual-pricing-review.

## Agents involved
- competitive-pricing-mapper
- price-sensitivity-analyst
- packaging-designer
- pricing-page-reviewer

## Steps

**Step 1: Define the trigger and scope**
Before running any agent, document in writing:
- Which trigger applies (new feature / new segment / competitive pressure)?
- What specific gap or opportunity the new tier is intended to address?
- What would success look like — what does this tier enable that the current structure doesn't?
- What is the hypothesis for where this tier sits in the architecture (below Tier 1? between Tier 1 and Tier 2? above the current top tier?)?

This scoping document is the brief for all subsequent agent work. Without it, agents will produce general packaging advice rather than work targeted to the specific tier design question.

**Step 2: Run competitive-pricing-mapper (focused)**
Run the competitive pricing mapper focused specifically on the tier type being designed. The question is not "what does the whole competitive landscape look like?" — that was answered in the last annual review. The question is: "What do competitors do at the tier position we're designing for, and what does that tell us about buyer expectations and price anchoring?"

Specifically:
- What do competitors offer at this position in their tier structure?
- What is the expected price range at this tier position?
- What do competitors include or exclude that we should consider for this tier?
- Is there a packaging gap at this position that no competitor has addressed?

Deliverable: Focused competitive pricing analysis for the target tier position. This is a subset of the full competitive pricing map, not a full re-run.

**Step 3: Run price-sensitivity-analyst (segment-specific)**
Run price sensitivity analysis specifically for the ICP segment or use case the new tier is designed for. This is particularly important if the trigger was a new ICP segment — willingness to pay varies significantly by segment, and designing a tier without segment-specific price sensitivity data produces a price that may be wrong by 2x or more.

The analyst should focus on:
- What is the willingness-to-pay range for this specific segment?
- Are there deal notes or customer interviews that reveal what buyers at this tier position have paid or refused to pay?
- What discount patterns exist in deals with this segment if it is already being sold into?

If the new segment has fewer than 10 data points, the analyst will flag low confidence. Proceed with the design but mark pricing as directional and plan for a validation experiment.

Deliverable: Price sensitivity mini-report for the target segment, with recommended price range and confidence level.

**Step 4: Run packaging-designer (new tier design)**
With the competitive analysis and price sensitivity data in hand, run the packaging designer focused on the new tier. The designer should:

- Define the tier's position in the architecture: what tier does it sit between, and why does it belong there?
- Define what is included: what features, limits, and capabilities belong in this tier, given what the buyer at this stage needs?
- Define the upgrade trigger from the tier below: what is the natural sentence a customer says when they've outgrown the previous tier and are ready for this one?
- Define the upgrade trigger from this tier to the next: what is the natural sentence a customer says when they've outgrown this tier?
- Define the pricing recommendation range: consistent with the price sensitivity analysis and within the competitive range identified in Step 2
- Define the land-and-expand implication: how does adding this tier change the expansion path for customers who enter below it?

The designer should also assess: does adding this tier create any problems for the existing tiers? Does it cannibalize the tier below? Does it make the tier above harder to sell? These are common failure modes for mid-tier additions.

Deliverable: New tier architecture document — the new tier in full detail, plus a summary of how it fits and affects the existing tier structure.

---

**[GATE] Cross-functional review: PMM + Finance + Sales + CS**

*Who is in this meeting:* PMM lead, finance lead, sales lead, CS lead (CS is essential here because a new tier affects existing customer upgrade paths and renewal conversations).

*What they review:*
- Does the new tier address the stated trigger? (If it was a competitive pressure trigger, does this tier actually close the competitive gap?)
- Does the pricing recommendation range work for the sales motion? (Can sales sell this tier at this price? Does it conflict with any existing deal structures or enterprise commitments?)
- Does the tier create any expansion path problems? (CS lead: will this confuse existing customers about their current tier or their upgrade path?)
- What is the revenue model for this tier? (Finance: what is the projected impact? What is the breakeven point for the investment in designing, building, and selling this tier?)
- What is the go-live plan? (Who needs to know about this before launch? What sales training is required? What customer communication is required?)

*Human decision required.* The cross-functional review must produce a go / no-go decision before the pricing page is updated. A tier that enters the packaging-page-reviewer phase cannot be reversed without a second page update — the review is downstream of the structural decision.

*Gate output:* documented go / no-go decision with any modifications to the tier design from the review. If go: confirm the pricing, the tier name, the effective date, and the launch communication plan.

---

**Step 6: Run pricing-page-reviewer**
With the approved new tier design, run the pricing-page-reviewer to assess how the new tier fits the existing page.

The reviewer should specifically address:
- Does adding this tier exceed the three-tier cognitive limit? If yes, how does the page handle the complexity — and is the handling sufficient?
- Where does the new tier sit visually on the page, and does that position match its intended role (entry, middle, or premium)?
- Does the new tier's feature description and CTA match the upgrade trigger logic from the packaging design?
- Are there any existing tier descriptions that need to be updated to maintain clean self-selection now that a new tier has been added?
- Does the page still have a clear recommendation anchor, or does the new tier create decision paralysis?

Deliverable: Pricing page update plan — what changes are needed on the existing page to accommodate the new tier, ranked by priority.

**Step 7: Design, test, and launch the pricing page update**
Implement the pricing page changes from Step 6. Before launching to all traffic, test the updated page:
- Does the self-selection test pass for all tiers including the new one? (Can an ICP buyer identify their tier from names and opening descriptions alone?)
- Are all CTAs correct and pointed at the right next step?
- Is the new tier's price point correctly displayed and correctly linked to billing?

Launch the page update. Notify sales and CS before the page goes live — they should not discover the new tier by reading the website.

**Step 8: Monitor post-launch signals**
In the 30 and 60 days following launch, monitor:
- New tier adoption rate: are buyers choosing this tier? If adoption is very low, was the tier solving a real gap or a hypothetical one?
- Cannibalization: has the tier above or below seen a meaningful drop in new signups? If yes, the new tier may be positioned ambiguously.
- Upgrade path: are customers from the tier below upgrading to the new tier at the expected rate?
- Sales friction: are sales reps receiving questions about the new tier that suggest the page is unclear?

Report findings at the next PMM review meeting.

---

## Output
At the end of this workflow, the human has:
1. A scoping document defining the trigger and success criteria (Step 1)
2. A focused competitive pricing analysis for the target tier position (Step 2)
3. A price sensitivity mini-report for the target segment (Step 3)
4. A new tier architecture document (Step 4)
5. A go / no-go decision from the cross-functional gate (Gate)
6. A pricing page update plan (Step 6)
7. A live updated pricing page (Step 7)
8. A 30/60-day monitoring report (Step 8)

## Human decision points
- **Gate (Step 5):** PMM + Finance + Sales + CS must review and approve the tier design before the pricing page is updated. This is a go / no-go gate — not an FYI meeting. The decision to proceed must be explicit.
- **Step 7 launch approval:** PMM lead signs off that the page update is correct before going live. Finance confirms the new tier pricing is correctly configured in the billing system before the page goes live.
- **Step 8 review:** PMM lead reviews the 30-day monitoring report and decides whether the new tier is performing as expected, needs adjustment, or needs to be reconsidered entirely.

## Notes
- A new tier is not a minor packaging update. It changes the page structure, the sales conversation, the CS upgrade playbook, the billing system, and the existing customer upgrade path. Plan for 4–6 weeks minimum from trigger to launch.
- The most common failure mode for new tiers is designing them for hypothetical buyers rather than observed ones. The trigger documentation in Step 1 must be grounded in specific evidence — a specific competitive loss, a specific new ICP account, a specific product release — not a general sense that "we're probably leaving money on the table."
- If the cross-functional gate produces significant changes to the tier design, return to packaging-designer before proceeding to pricing-page-reviewer. Do not run the page review against an unapproved or materially changed tier design.
