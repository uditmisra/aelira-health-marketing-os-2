# Pricing Page Architecture

> Produced by: pricing-page-reviewer agent
> Last updated: [ YYYY-MM-DD ] | Owner: [ PMM name ]
> Read `core/icp/primary-icp.md` and `core/brand/messaging-pillars.md` before filling in this template.

---

## Design Principle

The pricing page is the highest-intent page on your website. The visitor has already decided they want to solve the problem — they are deciding whether to buy from you and at what tier. Every element should either remove friction, build confidence, or guide the decision. Nothing should make the buyer feel confused, suspicious, or like they need to talk to a human just to understand what they're getting.

---

## Section 1: Hero (Above the Fold)

**Value statement (headline):**
_Lead with what they get, not what it costs. The buyer's question at this moment is "is this worth it?" Answer that first._

> [ e.g., "The revenue intelligence platform for sales teams that care about winning." ]

Guidelines:
- Should match or riff on the primary messaging pillar from `core/brand/messaging-pillars.md`
- Should not mention price, tiers, or features — those come next
- Should make the ICP self-identify: "yes, that's me"

**Subheadline (optional):**
> [ 1 sentence that adds specificity — e.g., "Simple pricing that scales with your team. Three plans. No hidden fees." ]

**Tier names visible above the fold:**
[ Name all three tiers so the visitor knows the structure before scrolling — e.g., "Starter | Growth | Enterprise" ]

**Billing toggle:** [ Monthly / Annual — show discount if applicable: "Save 20% with annual billing" ]

---

## Section 2: Tier Cards

**Rule:** 3 tiers maximum. If you have more than 3, you have a pricing architecture problem, not a pricing page problem.

**The middle tier should be visually highlighted** (colored border, "Most popular" badge) — this is the tier you most want buyers to choose. Anchoring to the highest tier makes the middle look reasonable.

---

### Tier 1: [ Name — e.g., "Starter" ]

**Target user:** [ Who this is for in 1 sentence ]

**Price:** [ $X / month (billed monthly) ] or [ $X / month (billed annually, save $Y) ]

**CTA:** [ e.g., "Start free trial" / "Get started" ]

**What's included (5-7 items — outcomes, not feature names):**
- [ e.g., "Up to 3 team members" ]
- [ e.g., "Pipeline visibility for up to 50 active deals" ]
- [ e.g., "Weekly automated deal risk summary" ]
- [ e.g., "Email support" ]

**Upgrade trigger visible on this card:**
[ The one limitation that makes a buyer want to move up — e.g., "Need more than 50 active deals? See Growth." ]

---

### Tier 2: [ Name — e.g., "Growth" ] — RECOMMENDED

**Target user:** [ Who this is for ]

**Price:** [ $X / month (billed monthly) ] or [ $X / month (billed annually, save $Y) ]

**CTA:** [ e.g., "Start free trial" ]

**What's included:**
- Everything in Starter, plus:
- [ e.g., "Unlimited active deals" ]
- [ e.g., "Real-time deal risk alerts via Slack" ]
- [ e.g., "Manager dashboards and team rollup" ]
- [ e.g., "Priority email and chat support" ]

**Why this is the obvious choice:** [ 1 sentence — e.g., "The full power of the platform for most teams." ]

**Upgrade trigger:** [ e.g., "Need SSO, custom contracts, or dedicated support? See Enterprise." ]

---

### Tier 3: [ Name — e.g., "Enterprise" ]

**Target user:** [ Who this is for ]

**Price:** [ "Custom pricing — talk to us" ] or [ "$X / month starting at X seats" ]

**CTA:** [ "Talk to sales" / "Request a demo" — not "Start free trial" ]

**What's included:**
- Everything in Growth, plus:
- [ e.g., "SSO / SAML authentication" ]
- [ e.g., "Dedicated customer success manager" ]
- [ e.g., "Custom integrations and API access" ]
- [ e.g., "SLA and enterprise security review" ]
- [ e.g., "Volume pricing and custom contracts" ]

---

## Section 3: Feature Comparison Table

**Purpose:** For the detail-oriented buyer (champion or technical evaluator) who wants to understand exactly what each tier includes.

**Design note:** Make this expandable / collapsible. Most buyers don't need it; enterprise buyers do.

| Feature category | Starter | Growth | Enterprise |
|---|---|---|---|
| **Core features** | | | |
| [ Feature 1 ] | [ Yes / No / Limit ] | [ Yes / No / Limit ] | [ Yes / No / Custom ] |
| **Integrations** | | | |
| [ Integration 1 ] | [ ] | [ ] | [ ] |
| **Admin and security** | | | |
| SSO / SAML | No | No | Yes |
| Audit logs | No | Limited | Full |
| **Support** | | | |
| Support tier | Email | Email + Chat | Dedicated CSM |
| SLA | Best effort | 24-hour response | Custom SLA |

---

## Section 4: Social Proof Block

**Placement:** Below the tier cards, above the FAQ.

**Choose one — using all three reads as insecure:**

**Option A — Logo row:**
[ 5-8 recognizable customer logos + 1-line caption — e.g., "Trusted by 400+ sales teams" ]

**Option B — Single jaw-dropping quote:**
> "[ Best quote from `core/customer-voice/jaw-dropping-moments.md` — the one that addresses the buyer's main hesitation at this page: "is this worth the price?" ]"
> — [ Name ], [ Title ], [ Company ]

**Option C — Proof stat:**
> [ Single bold metric — e.g., "Teams that use [ Product ] see 34% fewer deal slips in their first quarter." ]

---

## Section 5: FAQ

**"Which plan is right for me?"**
> [ 2-3 sentences of guidance that help buyers self-select into the right tier. ]

**"Can I switch plans later?"**
> [ e.g., "Yes — you can upgrade at any time. Downgrades take effect at the next billing cycle. No long-term commitments on Starter or Growth." ]

**"What happens when my trial ends?"**
> [ e.g., "At the end of your 14-day trial, you can choose a plan and add payment. We do not auto-charge without your action." ]

**"Is there a contract? What's the cancellation policy?"**
> [ e.g., "Starter and Growth are month-to-month. Annual plans require annual commitment. Enterprise plans have custom terms." ]

**"What does implementation look like? How long does it take?"**
> [ e.g., "Most Growth customers are live in under a day — connect your CRM, set your preferences, and you're running. No professional services required." ]

**"Do you offer discounts for nonprofits / startups / annual billing?"**
> [ Answer honestly — e.g., "We offer 20% off all plans with annual billing. Nonprofit and startup pricing available — contact us." ]

---

## Section 6: Enterprise CTA Block

**Placement:** Below the FAQ.

**Headline:** [ e.g., "Custom pricing for 50+ seats" ]

**Description:** [ 1-2 sentences — e.g., "If you have enterprise security requirements, need custom contracts, or are evaluating for a large team, talk to us. We'll build a pricing structure that fits." ]

**CTA button:** [ "Talk to sales" ] or [ "Request a custom quote" ]

**Expectation-setting:** [ e.g., "Response within 1 business day. No high-pressure sales process." ]

---

## Anchor, Default, and CTA Strategy Summary

| Tier | Anchor role | CTA | Post-CTA experience |
|---|---|---|---|
| Enterprise | Price anchor — makes Growth look reasonable | "Talk to sales" | AE outreach within 1 business day |
| Growth | Default / recommended | "Start free trial" | 14-day trial, full Growth features, no credit card required |
| Starter | Entry point for small teams | "Get started free" | Immediate access, limited features, upsell trigger in-product |
