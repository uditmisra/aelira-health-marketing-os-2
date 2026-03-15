# L3 Launch Playbook

## Purpose
The lightweight checklist for minor enhancements: quality-of-life improvements, bug fix categories, and incremental updates. An L3 does not change how the company is positioned, how buyers evaluate the product, or how the sales team wins deals. The goal is to communicate the change cleanly to the right internal and external audiences — nothing more. L3 launches do not use the launch-orchestrator agent. PMM handles directly.

## Trigger
launch-tier-classifier outputs L3 classification (score 4–5) AND PMM confirms. If PMM believes the tier is wrong after reviewing the scoring, they escalate to launch-tier-classifier for re-scoring before proceeding. Do not run an L3 playbook on a feature that might be L2.

## Agents Involved

None. L3 launches are handled directly by PMM without agent orchestration. The launch-tier-classifier is the only agent involved — its output is the input to this playbook.

If PMM wants assistance drafting the changelog entry or the internal Slack notification, they may invoke creative-copy-agent with the launch brief as input. This is optional, not required.

## 7-Day Sequence

---

**T-7: PMM Confirms L3 Tier**

Actions:
- PMM reviews launch-tier-classifier output
- Confirms L3 is the correct tier (key question: is there any customer-facing communication value beyond a changelog entry? If yes, the tier may be L2 — re-evaluate)
- Identifies the audiences who need to know:
  - Always: CS team, Support team, internal changelog
  - Sometimes: customers (if the change is user-facing and affects their workflow)
  - Rarely: press or sales (L3 does not warrant external launch machinery)

[No gate at T-7 — PMM decision to proceed.]

Milestone output: Confirmed L3 tier, audience list noted

---

**T-3: Changelog Entry and Internal Notification Drafted**

Actions:
- PMM writes changelog entry (format below)
- PMM drafts internal Slack notification for CS and Sales channels (format below)
- If the change is user-facing and affects customer workflow: PMM drafts a brief in-app notification or customer email (optional — PMM judgment)

No external assets required for L3. No press release. No blog post. No social post. If the feature is worth a blog post, re-evaluate tier.

Milestone output: Changelog entry draft, Slack notification draft, optional customer communication draft

---

**T-1: PMM Confirmation**

Actions:
- PMM reviews changelog entry and Slack notification for accuracy
- Confirms the feature is live in the product (or will be live by T-0)
- Confirms Support team is aware (direct Slack message to Support lead — no formal brief needed for L3)

[GATE] PMM sign-off. This is a self-review, not a formal approval process. PMM reads through the changelog entry and Slack notification, confirms factual accuracy, and proceeds. If anything seems materially wrong or the feature scope has changed since T-7, stop and re-evaluate tier.

Milestone output: Changelog entry approved, Slack notification ready to send

---

**T-0: Publish**

Actions:
- Changelog entry published to the appropriate location (product changelog, help center, release notes page)
- Internal Slack notification sent to CS channel and Sales channel
- Optional: in-app notification published (if user-facing workflow change)
- Optional: customer email sent (if the change is significant enough to notify customers directly — PMM judgment)

No monitoring required for L3. If a customer responds to the changelog or asks a question, Support handles it with normal support process.

---

## Output Formats

### Changelog Entry Format

Keep it short. Customers read changelogs to quickly understand what changed — not to read marketing copy.

```
[DATE] — [FEATURE/AREA NAME]

[One sentence: what changed.]
[One sentence (optional): why it matters or what problem it solves — only if this adds genuine context.]

[Link to docs or help article if relevant]
```

Example (good):
```
March 12, 2026 — Export settings

CSV exports now include all custom field columns by default. Previously, custom fields required manual column selection on each export.

Help article: [link]
```

Example (bad — do not write this way):
```
March 12, 2026 — Exciting new CSV export improvements!

We're thrilled to announce that we've made some powerful enhancements to our CSV export functionality that will dramatically improve your workflow experience...
```

---

### Internal Slack Notification Format

One message, sent to both CS and Sales channels. Keep it to 3–5 lines.

```
[FEATURE UPDATE] [Feature/Area Name] — Live as of [date]

What changed: [One sentence]
Who it affects: [Customer profile — e.g., "All customers using the Reporting module"]
What to know: [One sentence of context if CS/Sales needs to be aware for customer conversations]
Docs: [Link if relevant]

No action required — heads up only.
```

---

## Human Decision Points

| Decision | Who decides | When | What they're deciding |
|----------|------------|------|----------------------|
| L3 tier confirmed | PMM | T-7 | This is genuinely L3; no external launch machinery needed |
| Changelog entry and Slack notification approved | PMM | T-1 | Content is factually accurate and ready to publish |
| Optional customer comms decision | PMM | T-3 | Whether the change warrants customer notification beyond changelog |

---

## When to Re-Evaluate L3 Mid-Sequence

Stop and escalate to re-evaluate the tier if any of the following occur after the sequence has started:

- The feature receives unexpected inbound interest from customers or prospects before launch
- Sales team hears about the feature and asks for talking points — this suggests L2, not L3
- Support team says "this is going to generate a lot of tickets" — customer impact may be higher than assessed
- A press or analyst contact asks about the feature unprompted — this is a market signal that the feature has more visibility than classified

If any of these occur, pause the L3 sequence and run launch-tier-classifier again with the new information. It is better to upgrade a launch mid-sequence than to under-launch a feature that turns out to matter.

---

## What L3 Does Not Include

The following items are explicitly out of scope for L3. If any of these are being considered, re-evaluate the tier:

- Press release
- Blog post
- Social post (organic or paid)
- Analyst briefing
- Partner communication
- Sales training session
- Formal customer email campaign
- Paid amplification

L3 is a changelog entry and an internal notification. That is the full scope. Any addition to this scope is a signal that the tier was wrong.
