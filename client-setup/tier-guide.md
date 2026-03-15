# Marketing OS — Tier Guide

This guide is for agencies, consultants, or in-house operators deciding how to deploy Marketing OS for a client or team. There are three tiers. Each is a complete, self-contained deployment — not a stripped-down version waiting to be upgraded.

---

## OS-Micro — Single Workflow

**The right choice when:** Your client has one specific, acute problem and wants proof before committing to a full build. Or when you need a 1-2 week engagement to demonstrate value and earn the larger mandate.

### What's included
- One workflow fully configured and ready to run (chosen at kickoff based on the client's highest-leverage need)
- The agents and templates that workflow depends on
- The `core/` files required for that specific workflow — not the full layer
- One MCP integration connected and tested
- One full run-through of the workflow with support — from raw input to finished deliverable
- A handoff doc: what was produced, how to run it again, what to populate next to unlock more of the system

### What's NOT included
- Any other workflow, agent, or system component
- The System Intelligence layer (no improvement loop)
- Cross-system feedback loops
- Ongoing cadence or weekly reviews
- Populated `core/` beyond what the single workflow needs

### Recommended workflows for OS-Micro

| Workflow | Best for |
|---|---|
| `new-positioning-sprint` | Positioning unclear; new category; rebranding |
| `ad-copy-generation` | Paid media underperforming; new channel launch |
| `new-competitor-battlecard` | New competitor in deals; losing deals to a specific player |
| `case-study-pipeline` | Sales needs social proof; content team stretched thin |
| `quarterly-win-loss-review` | Win rate declining; need to understand why |

### Setup time
1 day to configure + 1 session to run the first workflow.

### What good looks like
The client has one production-quality deliverable (a positioning canvas, a set of ad copy, a battlecard) they did not have before — and they understand exactly what would be different if they had the full system running.

---

## OS-Sprint — One Full System

**The right choice when:** Your client has a clear immediate priority — either growth marketing or product marketing — and the other system can wait 30-60 days. Common in Series A-B companies where one function is significantly ahead of the other.

### What's included
- Either the full **Growth Marketing system** OR the full **Product Marketing system** — not both
- All agents and workflows for the chosen system
- All `core/` files populated (not just the subset for one workflow)
- All integrations for the chosen system connected and tested
- Onboarding walkthrough for each workflow
- First 4-week cadence established (weekly reviews running)
- System Intelligence active for the chosen system
- 30-day onboarding support

### What's NOT included
- The other system (Growth or PMM, whichever was not chosen)
- Cross-system feedback loops — these require both systems to be active
- Compound improvement only runs within the one system

### Which system to choose

**Choose Growth Marketing if:**
- CAC is too high or rising
- Paid media is underperforming
- Creative is stale and not being refreshed systematically
- SEO is not generating pipeline
- Email is running on gut feel

**Choose Product Marketing if:**
- Positioning is unclear or inconsistent
- Launches are happening without a systematic process
- Sales win rate is declining and sales lacks good competitive materials
- No systematic customer research process
- Pricing is unmeasured or gut-feel

### Setup time
1-2 weeks to configure, populate `core/`, connect integrations, and run first workflows.

### What good looks like at 30 days
- All workflows in the chosen system run at least once
- Weekly cadence running without requiring setup work
- At least one System Intelligence proposal generated
- The client's team can run workflows independently

---

## OS-Full — Both Systems + Intelligence Layer

**The right choice when:** The client's marketing team is 3+ people, has committed to an operating system model (not just a tool), and is willing to invest in the 60-90 day setup period to unlock compound improvement. The full value — cross-system feedback loops, 12-month ICP calibration, agent improvement over time — only activates at this tier.

### What's included
- Both the Growth Marketing system and the Product Marketing system, fully configured
- System Intelligence running across both systems
- Full `core/` layer populated: brand, ICP, competitive, customer voice, measurement
- All integrations connected and tested
- All workflows in both systems run at least once during onboarding
- Cross-system feedback loops active:
  - PMM positioning changes propagate to growth creative agents
  - Growth ad performance data informs PMM message testing
  - Win/loss insights update both systems simultaneously
  - Customer voice from PMM interviews updates growth copy agents
- 60-day onboarding support
- First quarterly audit included

### The compound improvement model

At OS-Sprint, you get one system improving over time. At OS-Full, you get two systems improving each other.

| Timeframe | What happens |
|---|---|
| Month 1 | First patterns identified across both systems; first 2-3 agent updates applied |
| Month 3 | Agents calibrated to client's specific ICP language; cross-system loops have fired at least once |
| Month 6 | Ad performance data actively informing PMM positioning; win/loss data actively informing creative framing |
| Month 12 | System is materially sharper than at launch — calibrated to this market, this ICP, this competitive landscape |

A team that runs OS-Full for 12 months has a system that knows more about their market than any individual contributor who joined the company in the last year.

### Setup time
4-6 weeks for full configuration, population, integration, and first-run of all workflows.

---

## Which tier is right? (Decision guide)

Work through these questions in order. Stop at the first answer that fits.

**Q1: Does the client have one specific acute problem and are they skeptical about the full system?**
- Yes → **OS-Micro.** Solve the acute problem first. Earn the larger mandate with proof.
- No → continue.

**Q2: Is the marketing team 1-2 people, or is only one marketing function (growth or PMM) currently active?**
- Yes → **OS-Sprint.** Configure the system they will actually use. The other system creates maintenance overhead they can't sustain.
- No → continue.

**Q3: Does the client have a 3+ person marketing team and are they committed to running this as an operating system?**
- Yes → **OS-Full.**
- No → **OS-Sprint.** Better to run one system well than two systems poorly.

**OS-Sprint tie-breaker: which system?**
- Primary problem is "we don't know where to spend to get more pipeline efficiently" → **Growth Marketing**
- Primary problem is "our messaging is inconsistent, we lose deals we should win, launches feel chaotic" → **Product Marketing**
- Both equally bad → start with **Product Marketing.** Positioning is upstream of growth. Fixing growth without fixing positioning is optimizing a leaky funnel.

---

## A note on `core/` completeness across tiers

| Tier | `core/` requirement |
|---|---|
| OS-Micro | Only the files the chosen workflow reads |
| OS-Sprint | All `core/` files, fully populated for the chosen system |
| OS-Full | All `core/` files, fully populated for both systems |

The `core/` layer is not optional at OS-Sprint or OS-Full. A team that skips or thin-fills `core/` and then complains about generic output has skipped the most important step. The quality of `core/` is the quality of the system.
