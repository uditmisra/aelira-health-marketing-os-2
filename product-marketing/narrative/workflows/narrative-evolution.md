# Narrative Evolution

## Purpose
Updates the narrative after a positioning change or significant market shift — without rebuilding everything from scratch. The key discipline of this workflow is surgical precision: identify which narrative components have drifted and update only those, leaving stable components untouched. A company that rebuilds its entire narrative every time the market shifts loses the compounding authority of consistent positioning.

## Trigger

Initiate this workflow when any of the following conditions are true:

| Trigger | Source | Notes |
|---|---|---|
| `messaging-audit` output identifies significant narrative drift | `product-marketing/messaging/agents/messaging-auditor.md` | Most common trigger — audit surfaces gap between current narrative and market reality |
| Post-launch retrospective recommends narrative update | Launch retrospective document | Launch revealed that the narrative didn't land as expected with buyers |
| Competitive landscape has shifted materially | `core/competitive/landscape-overview.md` | A new entrant has defined the category differently, or the dominant competitor has shifted its narrative |
| ICP has shifted (new primary buyer, new job title, new context) | `core/icp/primary-icp.md` | The narrative was written for a buyer who is no longer the primary buyer |
| "Why now" has become dated | Category narrative review | The market shift described in Act 1 is no longer recent or is no longer the most relevant shift |
| Company has pivoted product scope significantly | Internal — product roadmap or strategy change | The product now solves a materially different problem than it did when the narrative was written |

Do not initiate this workflow for cosmetic changes (rewriting the product narrative in a different tone, updating proof points in "what becomes different"). Those are content updates, not narrative evolution. Use this workflow only when the underlying narrative argument has changed.

## Trigger Assessment: Is This Evolution or Wholesale Change?

Before running any steps, answer the following diagnostic questions. They determine whether this workflow is appropriate or whether `narrative-from-scratch` should be used instead.

**Question 1: Is the category frame of reference still valid?**
The category narrative places the product into a market. Has the market itself changed — not just the company's position in it? If the company is moving from one category to another (e.g., from "workflow automation" to "AI operations"), the category narrative must be rebuilt from scratch. Evolution is not the right tool for a category change.

**Question 2: Is the "why now" still accurate?**
The world-changed act is the most time-sensitive component of the narrative. If the market shift described in Act 1 is more than 18-24 months old and a more recent, more relevant shift has occurred, the "why now" needs updating. This is the most common evolution — Act 1 is updated, Acts 2-5 are refined to reference the updated shift, but the core argument remains.

**Question 3: Is the ICP still the same person?**
If the primary buyer has changed job title, company stage, or decision-making context significantly, the narrative framing throughout will need updating. The buyer is referenced in every act. A narrative written for a CFO in a Series B company reads differently than one written for a VP of Finance in a public company.

**Question 4: Has the structural critique of existing solutions become inaccurate?**
Act 3 claims that existing solutions were built for the old world. If those solutions have genuinely evolved and the critique is now inaccurate or unfair, the act must be updated — publishing an inaccurate critique damages credibility.

**Question 5: Has the product changed enough that "how it works" is now wrong?**
Major product changes (new core mechanism, new primary use case, significant capability addition) may invalidate the product narrative's "how it works" section. If the product narrative no longer accurately describes the customer experience, it must be updated.

**Decision rule:**
- If 1 or 2 of the above questions require updates: use this workflow (narrative evolution)
- If 3 or more require updates: use `narrative-from-scratch` (the narrative needs to be rebuilt, not evolved)
- If the category frame of reference has changed: always use `narrative-from-scratch`

Document the answers to the five questions as the first output of this workflow. This documentation is the justification for the scope of changes.

## Agents Involved

Only run agents for the components that need updating. Do not run agents for stable components — editing stable components introduces unnecessary risk of regression.

| Component | Agent | Run If |
|---|---|---|
| Category narrative (Act 1 — "why now") | `category-narrative-builder` (partial) | "Why now" has become dated or a more relevant shift has occurred |
| Category narrative (Act 3 — "existing solutions fail") | `category-narrative-builder` (partial) | Competitive landscape has shifted materially |
| Full category narrative | `category-narrative-builder` (full) | Multiple acts require significant changes |
| Product narrative | `product-narrative-builder` | Product has changed significantly, or product narrative contradicts updated category narrative |
| Founder story | `founder-story-builder` | Rarely needed in evolution — only if company has pivoted so significantly that the founding story no longer connects to current positioning |
| Thought leadership strategy | `thought-leadership-strategist` | Category narrative has changed enough that the existing 90-day plan argues for an outdated position |
| Content architecture | `content-architecture-mapper` | After narrative update, to identify which existing content is now narrative-incoherent |

## Steps

---

### Step 1: Read the current narrative files and updated positioning canvas

**Action:** Read the following files in full before doing anything else:
- Current category narrative (wherever it is stored — note the file path)
- Current product narrative
- Updated positioning canvas (`product-marketing/templates/positioning-canvas.md`)
- Updated competitive landscape overview (`core/competitive/landscape-overview.md`)
- Trigger document (the audit, retrospective, or analysis that initiated this workflow)

**Output of this step:** A written comparison document that states, for each of the five diagnostic questions above:
- What the current narrative says
- What the updated positioning/market reality says
- Whether there is a gap, and how significant it is

Do not draft new narrative in this step. This step is diagnosis only.

---

### Step 2: Identify which narrative components need updating

Using the comparison document from Step 1, classify each narrative component:

| Narrative Component | Status | Action Required |
|---|---|---|
| Category narrative — Act 1 (world changed) | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Category narrative — Act 2 (problem bigger than realized) | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Category narrative — Act 3 (existing solutions fail) | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Category narrative — Act 4 (new way) | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Category narrative — Act 5 (what becomes possible) | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Product narrative — philosophy | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Product narrative — how it works | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Product narrative — what becomes different | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Product narrative — who it's for | Stable / Needs update / Significantly wrong | No action / Targeted revision / Rebuild |
| Founder story | Stable / Needs update | No action / Targeted revision |

If 5 or more components are marked "Significantly wrong," this is not evolution. Stop. Run `narrative-from-scratch`.

**Output of this step:** Completed classification table. This is the work order — only components marked "Needs update" or "Significantly wrong" will be touched.

---

### Step 3: Run only the relevant agents

Execute only the agents identified in Step 2 as requiring action. The sequence matters:

- If the category narrative is changing: run `category-narrative-builder` before `product-narrative-builder`. The product narrative depends on the category narrative.
- If only the product narrative is changing (category narrative is stable): run `product-narrative-builder` independently.
- If the founder story needs bridging (company pivoted): run `founder-story-builder` after category narrative is updated.

For partial updates to a single narrative act (e.g., only Act 1 needs to be rewritten): instruct the agent to revise only the specified act while keeping the rest of the narrative intact. Rewriting only one act of a five-act narrative requires care — the transitions into and out of the revised act must be checked for coherence.

**Output of this step:** Revised narrative document(s) — only the components that were updated.

---

### [GATE] Step 4: Evolution or wholesale change review

**Owner:** Human — executive sponsor
**Input:** Comparison document from Step 1, classification table from Step 2, revised documents from Step 3

Before approving the evolved narrative, answer the final question: is this genuinely an evolution of the same narrative, or is it a fundamentally different story?

The test: read the updated category narrative alongside the prior version. Does the company's core market argument remain continuous — same underlying claim about why the category exists, same structural critique, same "new way"? Or has the core argument changed?

If the core argument has changed: the company is not evolving its narrative, it is replacing it. Use `narrative-from-scratch`. An evolved narrative that is actually a new narrative will confuse buyers who have seen the prior version and undermine the authority built over the prior period.

If the core argument is continuous and the updates are genuine refinements: approve and proceed to Step 5.

**Output of this gate:** Written approval with a brief statement of what changed and why. This documentation is valuable — it creates an audit trail of narrative evolution that prevents future drift from being invisible.

---

### Step 5: Update and publish

Once the evolved narrative is approved:

1. **Update the narrative files** with the revised content. Archive the prior versions with a date stamp — do not delete.
2. **Identify which existing published content is now narrative-incoherent** with the updated narrative. Run `content-architecture-mapper` with the updated narrative as the alignment reference. Content that was previously aligned but is now incoherent must be flagged for update or retirement.
3. **Update the thought leadership strategy** if the category narrative has changed enough that the existing 90-day plan argues for an outdated position. Run `thought-leadership-strategist` with the updated narrative as input.
4. **Brief the sales team** on what changed and why. Narrative evolution is invisible to the sales team unless they are explicitly informed. If the "why now" story has changed, sales reps need the updated version before their next call.
5. **Update homepage and key web pages** to reflect the evolved narrative. The homepage hero copy (from the product narrative) is the most visible signal — update it promptly.

**Output of this step:** Updated narrative files (with archived prior versions), revised content flags list, updated thought leadership brief (if applicable), sales brief on narrative changes.

---

## Output: Evolution Package

At completion of this workflow, the human receives:

| Document | Contents |
|---|---|
| Trigger assessment | Answers to the 5 diagnostic questions; justification for scope |
| Component classification table | What changed, what was stable, what action was taken |
| Revised narrative files | Only the components that were updated — not the full package |
| Prior version archive | Dated copies of the prior narrative files |
| Content incoherence flags | List of published content that is now misaligned with the updated narrative |
| Sales brief | Summary of what changed in the narrative and why — written for non-narrative audiences |

## Human Decision Points

| Decision Point | Gate? | Owner | Cannot Proceed Without |
|---|---|---|---|
| Trigger assessment and scope determination (Step 2) | Soft gate | Marketing lead | Before running agents, confirm the scope with the executive sponsor — prevents over-engineering |
| Evolution vs. wholesale change review (Step 4) | Hard gate | Executive sponsor | Written approval before publishing |
| Content incoherence resolution | Post-workflow | Marketing lead + content team | Decision on whether to update or retire flagged content |
| Sales team briefing | Post-workflow | Marketing or sales enablement lead | Sales team briefed before updated narrative goes live publicly |
