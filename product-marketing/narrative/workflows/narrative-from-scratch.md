# Narrative From Scratch

## Purpose
Full narrative build for a company that has no narrative infrastructure — or is repositioning and treating the prior narrative as void. Produces the complete narrative package: category narrative, product narrative, founder story, thought leadership strategy, and content architecture map. This is the foundational workflow. Everything else in the narrative sub-domain depends on it.

## Trigger
Initiate this workflow when any of the following conditions are true:
- The company is pre-launch and has no published narrative
- The company is executing a strategic repositioning and the prior narrative is being retired
- The company has messaging (what the product does) but no narrative (why the category exists and why now)
- A `messaging-audit` has determined that the existing narrative is incoherent or misaligned with current positioning

Do not use this workflow for incremental updates. If the category narrative is sound and only one component needs refreshing, use `narrative-evolution` instead.

## Prerequisites (complete before starting Step 1)

These must be in place before the workflow can begin. If any are missing, the workflow will stall.

| Prerequisite | Location | Why It's Required |
|---|---|---|
| Positioning canvas (completed) | `product-marketing/templates/positioning-canvas.md` | The category narrative cannot be written without a market frame of reference and named competitive alternatives |
| ICP profile | `core/icp/primary-icp.md` | Narrative must be written for a specific person — generic B2B narrative has no force |
| Competitive landscape overview | `core/competitive/landscape-overview.md` | Act 3 of the category narrative requires a structural critique of existing solutions |
| Customer interview synthesis | `core/customer-voice/interview-transcripts/` | Acts 2 and 3 require actual customer language — not invented buyer pain |
| Founder input (raw) | Supplied by human before Step 3 | Founder story cannot be constructed without direct founder input |

If the positioning canvas is incomplete — specifically, if the Market Frame of Reference field is missing — do not proceed. The category narrative is built on this foundation. Starting without it wastes every subsequent step.

## Agents Involved

| Step | Agent | Can Parallelize? |
|---|---|---|
| 1 | `category-narrative-builder` | No — foundation for all others |
| 2 | `product-narrative-builder` | No — depends on Step 1 output |
| 3 | `founder-story-builder` | Yes — can run in parallel with Step 2 |
| 4 | [GATE] Leadership narrative review | Human decision point — blocks Step 5 |
| 5 | `thought-leadership-strategist` | No — depends on approved category narrative |
| 6 | `content-architecture-mapper` | Yes — can run in parallel with Step 5 |
| 7 | [GATE] Final narrative package review | Human decision point — final approval |

## Steps

---

### Step 1: Build the category narrative
**Agent:** `category-narrative-builder`
**Input required:** Positioning canvas, competitive landscape, customer interview synthesis, message hierarchy, any market timing evidence (analyst reports, industry data, news)
**Output:** 800-1,200 word category narrative + 3-sentence executive summary + 1-sentence category definition

The category narrative is the foundation. Every subsequent step builds on it. If this step produces a weak narrative — one that is too generic, or cannot pass the "why now" test — do not proceed. Return to the positioning canvas and the customer voice inputs.

The category narrative must be approved (Step 4 gate) before Step 5 begins. Steps 2 and 3 can proceed in parallel with Step 4 because they are self-contained — but they may need to be revised if the gate review changes the category narrative substantially.

---

### Step 2: Build the product narrative
**Agent:** `product-narrative-builder`
**Input required:** Approved category narrative, positioning canvas, message hierarchy, customer outcome data (proof points)
**Output:** 500-800 word product narrative + homepage hero copy variant (< 80 words)

The product narrative is the second half of the story. It must begin where the category narrative ends. If there is any contradiction between the two, return to the positioning canvas before proceeding.

---

### Step 3: Build the founder story
**Agent:** `founder-story-builder`
**Input required:** Founder interview or raw notes (must come from the founder — this cannot be constructed from secondary sources), company origin context, positioning canvas
**Can run in parallel with:** Step 2
**Output:** 400-600 word founder story + 150-word compressed version + pull quote

If the founder interview has not been conducted, do not begin Step 3. The agent will flag and halt if the raw input is insufficient. Use the four-question framework from the agent (insight, frustration, bet, proof) to structure the founder interview if one has not already been done.

---

### [GATE] Step 4: Leadership narrative review
**Owner:** Human — founding team or executive sponsor
**Input:** Category narrative (Step 1), product narrative (Step 2), founder story (Step 3)
**Decision:** Does this narrative feel true? Does it represent how the company thinks about the market? Would the founder say this?

This gate is not a wordsmithing review. It is a truth test. The questions to answer:

1. **Does the category narrative accurately describe why the problem exists and why now?** If leadership reads Act 1 and says "that's not actually the market shift we're responding to," the narrative needs to be rebuilt with corrected market timing evidence.
2. **Does the "existing solutions fail" act reflect how we actually think about the competitive landscape?** If it misrepresents competitors or makes a structural critique that isn't accurate, it will damage credibility when buyers read it.
3. **Does the founder story feel like something the founder would say?** Have the founder read it. Their gut reaction — "yes, that's it" vs. "that's not quite right" — is the only valid review here.
4. **Do all three documents tell a continuous, coherent story?** Or do they pull in different directions?

If the answer to any of these is no, identify specifically what needs to change and return to the relevant agent. Do not proceed to Step 5 until this gate is passed.

**Output of this gate:** Written approval from the executive sponsor (can be a brief message), plus any revision notes for Steps 1-3.

---

### Step 5: Build the thought leadership strategy
**Agent:** `thought-leadership-strategist`
**Input required:** Approved category narrative, message hierarchy, competitive landscape (content angle view), ICP profile (information consumption habits), current content audit if available
**Output:** 90-day thought leadership plan + 10 topic briefs + distribution channel recommendations

This step translates the approved narrative into a content execution plan. The 90-day plan is the vehicle for distributing the category narrative at scale — it should read as a systematic argument for the category, not a list of product blog posts.

---

### Step 6: Map the content architecture
**Agent:** `content-architecture-mapper`
**Input required:** Current content inventory (from human), approved category narrative, buyer journey stages (from ICP profile), message hierarchy
**Can run in parallel with:** Step 5
**Output:** Content architecture map + gap analysis + priority recommendations

This step surfaces what content already exists and how it aligns with the new narrative. The most important output is the gap analysis — specifically, whether the existing content portfolio is missing category-building (top-of-funnel) content. Most companies starting this workflow discover they have primarily bottom-of-funnel content and no narrative infrastructure.

---

### [GATE] Step 7: Final narrative package review
**Owner:** Human — founding team, executive sponsor, and (if applicable) board or investors who will be using the narrative externally
**Input:** Complete narrative package (all outputs from Steps 1-6)
**Decision:** Is this narrative package ready to publish and execute?

Review the complete package as a system, not as individual pieces:

1. Does the category narrative + product narrative + founder story tell one coherent story from three angles?
2. Does the 90-day thought leadership plan feel executable at the company's actual production capacity?
3. Does the content gap analysis surface the most critical missing pieces?
4. Are there any claims in any document that are not substantiated — things the company cannot back up with evidence?

This gate is final before the narrative goes live. Publishing a narrative package is a public commitment. Ensure every claim is defensible before proceeding.

**Output of this gate:** Written sign-off. Any remaining revisions must be completed before publishing begins.

---

## Output: Full Narrative Package

At the completion of this workflow, the human receives:

| Document | Length | Use |
|---|---|---|
| Category narrative | 800-1,200 words | Website, sales decks, investor materials, thought leadership foundation |
| Category narrative executive summary | 3 sentences | Executive briefings, one-pagers |
| Category definition | 1 sentence | Everywhere — this is the company's market frame |
| Product narrative | 500-800 words | Website product page, sales enablement, partner materials |
| Homepage hero copy | < 80 words | Website — most-tested piece in the package |
| Founder story (full) | 400-600 words | About page, press kit |
| Founder story (compressed) | 150 words | Pitch decks, press releases, investor bios |
| Founder pull quote | 1-2 sentences | About page, press coverage |
| 90-day thought leadership plan | Plan format | Content team execution guide |
| 10 topic briefs | Brief format | Individual content briefs for writers |
| Distribution channel recommendations | List format | Marketing operations |
| Content architecture map | Table format | Content team reference |
| Gap analysis | Matrix + narrative summary | Content roadmap |
| Priority build recommendations | Ordered list | Content team sprint planning |

## Human Decision Points

| Decision Point | Gate? | Owner | Cannot Proceed Without |
|---|---|---|---|
| Provide founder interview input before Step 3 | Pre-step dependency | Founder | Raw founder interview or structured notes |
| Provide current content inventory before Step 6 | Pre-step dependency | Marketing lead | Content URL list or descriptions |
| Leadership narrative review (Step 4) | Hard gate | Executive sponsor | Written approval before Step 5 begins |
| Final narrative package review (Step 7) | Hard gate | Executive sponsor + founding team | Written sign-off before publishing begins |
| Publishing decision | Post-workflow | Marketing lead | This workflow ends at approval; publishing is a separate action |

## Timeline Expectation

This workflow is not a one-day sprint. Realistic timeline:
- Steps 1-3: 3-5 business days (longer if customer interview synthesis is incomplete or founder interview needs to be scheduled)
- Step 4 gate review: 2-5 business days (depends on leadership availability and number of revision cycles)
- Steps 5-6: 3-5 business days
- Step 7 final review: 2-5 business days

Total: 2-4 weeks from start to approved narrative package. Compress at the cost of quality. A narrative that is rushed and incoherent damages positioning — it is better to take the time than to publish something the company will need to walk back.
