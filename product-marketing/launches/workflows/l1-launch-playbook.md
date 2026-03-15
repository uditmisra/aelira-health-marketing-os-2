# L1 Launch Playbook

## Purpose
The definitive playbook for major launches: new products, new categories, and major market expansions. An L1 launch is a market-facing milestone — it changes how the company is perceived, how it is positioned in analyst research, and how the sales team wins deals. Every L1 launch runs this playbook in full. No steps are optional unless explicitly descoped by the DRI with documented rationale.

## Trigger
launch-tier-classifier outputs L1 classification (score 10–12) AND the DRI (CMO or CPO) provides written confirmation of L1 tier. Both conditions must be met. Tier alone is not sufficient — DRI confirmation activates the playbook and assigns resource allocation.

## Agents Involved

| Agent | When | Role |
|-------|------|------|
| launch-tier-classifier | Before T-30 | Classifies the launch as L1; human confirms |
| launch-orchestrator | T-30 through T+14 | Coordinates sequence, tracks milestones, escalates blockers |
| internal-readiness-agent | T-14, T-7 (T-5 standard run), T-2 (T-1 standard run), T-0 | Readiness checks at each milestone |
| analyst-prebrief-agent | T-14 (prep), T-10 (outreach), T-7 (briefings scheduled) | Analyst briefing materials and outreach |
| partner-activation-agent | T-14 (prep), T-7 (comms sent) | Partner brief, email, FAQ, co-marketing |
| battlecard-generator | T-21 | New or updated competitive battlecard |
| creative-headline-agent | T-10 | Headlines for launch blog, email, paid |
| creative-copy-agent | T-10 | Full copy for all launch assets |
| asset-quality-gate | T-7 | Quality review of all external-facing assets |
| launch-retro-agent | T+14 | Post-launch retrospective |

## Full 30-Day Sequence

---

### PRE-LAUNCH PHASE

---

**T-30: Launch Initialization**

Actions:
- Launch brief finalized and approved by DRI
- Stakeholder RACI populated (every role named — no gaps)
- Launch date locked on calendar
- launch-orchestrator activated with launch brief, launch date, and RACI

[GATE] DRI signs off on launch brief and RACI before any work begins downstream. This gate prevents wasted effort if scope, date, or ownership shifts.

Milestone output: Approved launch brief, populated RACI, launch timeline tracker initialized

---

**T-30 to T-28: Positioning and Messaging**

Actions:
- PMM reviews existing positioning canvas against this launch
- If positioning requires updates: positioning-agent runs (out-of-scope for this playbook — handled in positioning sub-domain)
- Message hierarchy drafted for this specific launch: primary message, supporting messages per audience (buyer, user, press, analyst)
- PMM lead reviews and approves message hierarchy

[GATE] PMM lead and CMO approve positioning canvas and message hierarchy before any asset creation begins. No draft copy is produced without locked messaging.

Milestone output: Approved positioning canvas (or confirmed no change needed), approved message hierarchy document

---

**T-21: Sales Enablement**

Actions:
- battlecard-generator runs with launch brief and competitive landscape input
- Sales training deck produced by PMM (based on approved message hierarchy)
- Sales training session scheduled (date confirmed, invitations sent to all AEs and SEs)
- Objection handling guide drafted

[GATE] Sales lead reviews and approves battlecard and objection handling guide before distribution to the field.

Milestone output: Battlecard (approved, staged for distribution), sales training deck (final), training session on calendar, objection handling guide distributed

---

**T-14: Internal Readiness Check #1 + Analyst Prebrief Preparation**

Actions:
- internal-readiness-agent runs first L1 readiness check (earlier than standard T-5 due to L1 complexity)
- Red/Amber/Green status assigned per checklist item with T-7 resolution deadline for any Red items
- analyst-prebrief-agent activated: core briefing document drafted, analyst-specific talking points drafted, anticipated Q&A drafted
- Analyst outreach initiated: briefing invites sent to Tier 1 analysts (Gartner, Forrester, IDC), NDA paperwork prepared
- Tier 2 analyst outreach prepared (send at T-10)
- partner-activation-agent activated: partner brief and email templates drafted

[GATE] DRI reviews T-14 readiness dashboard. Any Red items are assigned resolution owners with T-7 deadline. Analyst briefing materials reviewed by PMM lead and CMO before any analyst contact is made.

Milestone output: T-14 readiness dashboard, analyst briefing materials (approved), analyst meeting invitations sent, partner brief in draft

---

**T-10: Asset Creation**

Actions:
- creative-headline-agent runs with approved message hierarchy and ICP context
- creative-copy-agent runs for all launch assets: launch blog post, press release, customer email, social post copy (LinkedIn, Twitter/X), paid ad copy (if paid amplification planned)
- Tier 2 analyst outreach sent

Milestone output: First draft of all launch assets (blog, press release, email, social, paid copy)

Note: These are first drafts. Asset quality gate runs at T-7. Do not finalize or stage any asset before the quality gate.

---

**T-7: Asset Quality Gate + Internal Readiness Check #2 + Partner Comms**

Actions:
- asset-quality-gate reviews all external-facing launch assets: blog post, press release, email, social copy, paid creative
- PMM lead approves all assets; CMO approves press release; demand gen lead approves paid creative
- All approved assets staged (scheduled to publish on launch date/time)
- internal-readiness-agent runs second readiness check (standard T-5 run, adjusted to T-7 for L1)
- partner-activation-agent sends approved partner comms (brief, email template, FAQ)
- Sales training session completed — sales team confirmed trained

[GATE] Asset quality gate: every external-facing asset reviewed and approved before staging. No unreviewed asset is scheduled. Press release approved by CMO. Paid creative approved by demand gen lead.

[GATE] Internal readiness check #2: DRI reviews dashboard. Any Red items require resolution path by T-2.

Milestone output: All assets staged and approved, partner comms sent, readiness dashboard updated, sales training confirmed

---

**T-2: Final Readiness Check + Go/No-Go Decision**

Actions:
- internal-readiness-agent runs final readiness check (standard T-1 run)
- Any items Red at T-2 are escalated to DRI immediately with options: resolve, descope, or delay
- Go/no-go decision made by DRI

[GATE — HARD STOP] Go/No-Go Decision. DRI must make an explicit, documented decision: Proceed, Delay, or Partial Launch. No launch proceeds without this confirmation.

**Proceed criteria (all must be true):**
- All L1 checklist items are Green or Amber with confirmed Green path by T-0
- All external assets are staged and approved
- Sales training confirmed complete
- Press release approved and embargo instructions sent to all PR contacts
- No unresolved legal or compliance flags
- Pricing configured in billing system (if applicable)
- Partner comms confirmed sent

**Delay criteria (any one triggers delay consideration):**
- Sales training not completed with no confirmed completion path before T-0
- External docs not published
- Pricing not configured in billing system (if pricing announcement is part of launch)
- Any unresolved legal or compliance review
- Material factual error identified in any external asset

**Partial launch criteria:**
- One non-core channel is not ready (e.g., paid campaign staging failed)
- Core channels (blog, email, PR) are ready and can proceed
- DRI documents which elements launch on schedule and which are delayed, with revised dates

Milestone output: Documented go/no-go decision with reasoning

---

### LAUNCH PHASE

---

**T-0: Launch Day Execution**

Actions:
- internal-readiness-agent runs day-of confirmation (final check that all go conditions still hold)
- DRI confirms proceed before any external assets go live
- Staged assets activate on schedule: blog publishes, press release distributes, email sends, social posts publish, paid campaigns activate
- PR embargo lifts (if press release was embargoed)
- All team leads notified: "We are live"
- DRI monitors inbound for first 4 hours

[GATE] Day-of DRI confirmation before assets go live. This is a 5-minute check, not a review — it confirms the T-2 go decision still stands and no blocking event occurred overnight.

**Day-of monitoring checklist:**
- Blog published and loading correctly
- Email campaign sending without errors
- Social posts live on all channels
- Press release distributed via wire
- Paid campaigns active
- Pricing live in product (if applicable)
- CS and Support team briefed this morning (confirmation message sent)
- No inbound customer complaints or questions that indicate a factual error in launch materials

If any monitoring item fails: notify DRI immediately. Do not wait for the 4-hour check.

---

### POST-LAUNCH PHASE

---

**T+2 to T+7: Early Signal Monitoring**

Actions:
- PMM reviews inbound: press coverage, analyst reactions, social engagement, email metrics
- Sales team debriefed informally: early signal from customer conversations
- Any press or analyst framing that diverges significantly from positioning flagged to CMO
- No formal retro yet — qualitative signal gathering

---

**T+14: Post-Launch Retrospective**

Actions:
- launch-retro-agent runs structured post-launch retrospective
- Sales feedback collection template sent to all AEs/SEs at T+12 (2-day response window before retro runs)
- 14-day channel performance data compiled
- Press and analyst coverage collected
- Win/loss data from launch window pulled from CRM

[GATE] DRI reviews retro document before findings are filed to core/system-intelligence/signal-log/. Retro findings influence future positioning decisions — they are not auto-filed.

Milestone output: Structured retro document reviewed and approved by DRI, filed to system-intelligence signal log

---

## Go/No-Go Gate at T-2 — Decision Framework

This is the most important gate in the playbook. Delaying a launch is better than launching with a broken readiness item. The criteria are listed above under T-2. When making the decision, the DRI should consider:

**Proceed:** All core readiness items are Green. Amber items have confirmed resolution paths. The launch story is clean and consistent across all channels.

**Delay:** Any of the hard blockers listed above are unresolved. The DRI documents the reason for delay, the new target date, and what must be resolved before the new date. A delay is not a failure — a launch with uninformed sales or unpublished docs is.

**Partial launch:** Core channels proceed. Non-core channels with isolated readiness issues are delayed with documented revised dates. The DRI communicates the partial scope to all team leads.

The go/no-go decision must be documented in the launch timeline tracker, not communicated verbally.

---

## Human Decision Points

| Decision | Who decides | When | What they're deciding |
|----------|------------|------|----------------------|
| L1 tier confirmed | CMO or CPO | Before T-30 | Whether this launch meets L1 criteria and warrants L1 resource allocation |
| Launch brief approved | DRI | T-30 | Scope, date, and RACI are correct |
| Positioning and messaging locked | PMM Lead + CMO | T-28 | Message hierarchy is approved; asset creation can begin |
| Battlecard approved | Sales Lead | T-21 | Competitive card is accurate and ready for field use |
| Analyst briefing materials approved | PMM Lead + CMO | T-14 | Materials are accurate and appropriately framed before any analyst contact |
| Asset quality gate passed | PMM Lead (blog/email/social), CMO (press release), Demand Gen Lead (paid) | T-7 | All external assets are approved for staging |
| Go/No-Go | DRI | T-2 | Launch proceeds, delays, or proceeds partially |
| Day-of confirmation | DRI | T-0 | T-2 go decision still holds |
| Retro approved and filed | DRI | T+14 | Retro findings are accurate and appropriate for filing to signal-log |

---

## Output: Launch Day Package

At T-0, the following is live:

- Launch blog post (published)
- Press release (distributed via wire or direct to press)
- Customer email campaign (sending)
- Social posts (published on all active channels)
- Paid campaigns (active, if budgeted)
- Battlecard (distributed to sales team)
- Sales training (completed)
- Support knowledge base updated
- External documentation live
- Partner comms sent and acknowledged

## Output: Post-Launch Package (T+14)

- Structured retro document (goal vs. actual, sales signal, market reception, tier validation)
- System intelligence entries filed to signal-log
- Recommendations for next launch improvement
