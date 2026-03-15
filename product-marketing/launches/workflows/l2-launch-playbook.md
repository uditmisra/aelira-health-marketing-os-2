# L2 Launch Playbook

## Purpose
The playbook for significant feature launches: meaningful capabilities that solve a documented ICP problem or close a competitive gap. An L2 launch strengthens an existing messaging pillar — it does not open a new GTM motion. The 14-day sequence is calibrated to move quickly while maintaining quality. No analyst briefings by default (unless specifically requested), no PR unless a strong story exists. Core outputs are sales enablement update, customer comms, and optionally a press release.

## Trigger
launch-tier-classifier outputs L2 classification (score 6–9) AND PMM lead confirms. CMO does not need to approve L2 launches, but should be informed when the sequence begins.

## Agents Involved

| Agent | When | Role |
|-------|------|------|
| launch-tier-classifier | Before T-14 | Classifies launch as L2; PMM confirms |
| launch-orchestrator | T-14 through T+7 | Sequences milestones and tracks completion |
| battlecard-generator | T-10 | Updates existing battlecard (update mode, not new card) |
| internal-readiness-agent | T-7, T-2 | Readiness checks |
| creative-headline-agent | T-7 | Headlines for blog, email, optional press release |
| creative-copy-agent | T-7 | Full copy for launch assets |
| asset-quality-gate | T-5 | Quality review of all external-facing assets |

Note: analyst-prebrief-agent is not activated by default for L2. Activate only if: (a) the feature directly affects an analyst's coverage area and we have an existing relationship, or (b) PMM lead specifically requests it for a high-visibility feature. If activated, run at T-7 with abbreviated Tier 2 briefing only.

Note: partner-activation-agent is activated only if the launch is directly relevant to the partner ecosystem. Flag for PMM lead to decide.

## 14-Day Sequence

---

**T-14: Launch Initialization**

Actions:
- Launch brief finalized by PMM (simpler than L1 brief — 1 page is sufficient for L2)
- PMM identifies the specific messaging pillar this feature strengthens
- Stakeholder list populated (PMM, sales lead, CS lead, support lead — fewer roles than L1)
- launch-orchestrator activated

[No gate at T-14 — PMM initializes. Inform CMO via brief note ("we're running L2 for X, launching on [date]").]

Milestone output: Launch brief, stakeholder list, launch timeline initialized

---

**T-10: Messaging Alignment + Sales Enablement Content**

Actions:
- PMM confirms messaging approach — update to existing pillar, not new positioning
- battlecard-generator runs in update mode (revise relevant sections of existing card, not a new card)
- Sales brief written (1-page email-format brief to AEs and SEs)
- Customer comms drafted (email to relevant customer segment)

[No formal gate — PMM judgment. If messaging approach is unclear or represents a material change to positioning, stop and escalate to CMO before proceeding.]

Milestone output: Updated battlecard draft, sales brief draft, customer email draft

---

**T-7: Asset Creation + Internal Readiness Check + Sales Brief Distribution**

Actions:
- creative-headline-agent runs with message hierarchy
- creative-copy-agent runs for: blog post (or product update post), customer email (finalized), social copy
- If press release warranted: copy agent drafts; PMM evaluates story strength before committing to PR effort (criteria below)
- internal-readiness-agent runs L2 readiness check (T-7 version of the L2 checklist)
- Sales brief distributed to all AEs and SEs

**Press release decision criteria for L2:**
Run a press release if two or more are true: (a) named customer reference available, (b) measurable outcome data exists, (c) feature closes a well-known competitive gap, (d) feature enables a new use case that expands the ICP. If only one is true or none, a press release is not worth the effort for L2 — skip and invest in customer comms and sales enablement instead.

[Informal check: PMM reviews readiness status from internal-readiness-agent. No formal gate — PMM judgment. If any item is Red with no clear path to Green by T-2, flag to DRI.]

Milestone output: All launch assets in first draft, sales brief distributed, readiness check completed

---

**T-5: Asset Quality Gate**

Actions:
- asset-quality-gate reviews all external-facing assets: blog/product update post, customer email, social copy, press release (if applicable)
- PMM lead approves all assets
- Any revisions requested and completed within 24 hours
- Approved assets staged for launch date

[GATE] PMM lead approves all external assets before staging. This is the only formal asset approval gate for L2.

Milestone output: All assets approved and staged

---

**T-2: Readiness Confirmation + Go/No-Go**

Actions:
- internal-readiness-agent runs final L2 readiness check
- PMM reviews readiness status
- Any Red items escalated to PMM lead with resolution options

[GATE] PMM confirms go. This is the one formal gate for L2. Document the decision — proceed, delay, or partial launch — in the launch brief.

**L2 Go/No-Go criteria:**
Proceed if: L2 checklist items are Green or Amber with confirmed path; customer email is staged and approved; blog/product post is staged; sales team notified; support briefed.

Delay if: Customer email has not been approved, blog post has a material error, or the feature is not yet live in the product (L2 launches are almost always feature launches — the feature must be available to customers on launch day).

Milestone output: Documented go/no-go decision in launch brief

---

**T-0: Launch Day**

Actions:
- Blog post or product update post publishes
- Customer email sends
- Social posts publish
- Sales team notified: "Feature is live"
- Press release distributes (if applicable)
- PMM monitors inbound for the first 2 hours — email replies, social engagement, any customer questions that indicate a messaging issue

No formal day-of gate for L2 — PMM judgment to proceed once T-2 go decision is confirmed and assets are confirmed staged.

---

**T+7: Performance Check**

Actions:
- PMM pulls channel metrics: email open rate, CTR, blog traffic, social engagement
- Compares to goals stated in launch brief
- Checks with sales lead: did the feature come up in any customer conversations this week?
- No formal retro for L2 — this is a quick performance check
- If performance is significantly below goal on any metric: PMM documents the finding and flags for the next positioning review
- If the feature generates unexpectedly strong market response (press pickup, high inbound, strong sales feedback): flag to CMO — consider whether this should have been classified L1

[No gate at T+7 — PMM judgment. Document findings in a brief note, not a full retro.]

Milestone output: Performance check note filed (not a full retro document — 1 page max)

---

## Human Decision Points

| Decision | Who decides | When | What they're deciding |
|----------|------------|------|----------------------|
| L2 tier confirmed | PMM Lead | Before T-14 | Launch meets L2 criteria |
| CMO informed | CMO | T-14 | Awareness only — not approval |
| Messaging approach confirmed | PMM Lead | T-10 | Feature strengthens existing pillar; no new positioning required |
| Press release decision | PMM Lead | T-7 | Story is strong enough to warrant PR effort |
| Asset quality gate | PMM Lead | T-5 | All assets approved for staging |
| Go/No-Go | PMM Lead | T-2 | Launch proceeds as planned |

---

## Output: Launch Day Package

At T-0, the following is live:
- Blog post or product update post (published)
- Customer email (sending to relevant segment)
- Social posts (published)
- Press release (if applicable — distributed)
- Updated battlecard (distributed to sales)
- Support briefed
- Help center article updated or published

## Output: Post-Launch (T+7)

- 1-page performance check note (not a full retro)
- Any significant findings flagged to PMM lead for next positioning review
