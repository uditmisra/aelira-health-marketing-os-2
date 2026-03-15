# Marketing OS

An agent-driven operating system for B2B SaaS marketing teams. Two independent but integrated systems — Growth Marketing and Product Marketing — with a meta-improvement layer that makes every agent sharper over time.

The system compounds: the longer it runs and the better `core/` is populated, the higher the quality floor on every output.

---

## Systems

| System | Purpose | Status |
|---|---|---|
| [Growth Marketing](growth-marketing/) | Paid media, SEO, email, creative pipelines, campaign analytics | Complete |
| [Product Marketing](product-marketing/) | Positioning, messaging, launches, sales enablement, customer intelligence, narrative, pricing | Complete — all 7 sub-domains |
| [System Intelligence](system-intelligence/) | Meta-improvement layer — weekly review, post-launch retro, quarterly audit | Complete |

---

## What's built

### Core layer (`core/`)
The shared intelligence that all agents read. Templates for: brand voice + messaging pillars, ICP profiles, competitive cards, customer voice + jaw-dropping moments, ad library, measurement framework, system intelligence signal log.

Agents are only as good as `core/` is populated. Populating it is the onboarding.

### Product Marketing System — all 7 sub-domains

**Positioning** — April Dunford's Obviously Awesome + Play Bigger embedded in agents:
- `category-designer`, `positioning-canvas-builder`, `message-hierarchy-builder`, `audience-variant-generator`, `message-testing-analyst`
- Workflows: `new-positioning-sprint`, `messaging-audit`, `repositioning-trigger`

**Launches** — tier-classified launch machinery (L1/L2/L3):
- `launch-tier-classifier`, `launch-orchestrator`, `internal-readiness-agent`, `analyst-prebrief-agent`, `partner-activation-agent`, `launch-retro-agent`
- Workflows: `l1-launch-playbook` (30-day), `l2-launch-playbook` (14-day), `l3-launch-playbook` (7-day)

**Sales Enablement** — field-ready materials grounded in win/loss data:
- `battlecard-generator`, `battlecard-maintenance`, `objection-handler`, `field-feedback-synthesizer`, `roi-business-case-builder`, `demo-script-optimizer`, `pitch-deck-reviewer`
- Workflows: `new-competitor-battlecard`, `quarterly-enablement-refresh`, `sales-enablement-sprint`

**Customer Intelligence** — the language layer that feeds everything else:
- `interview-synthesizer`, `persona-builder`, `icp-refinement-agent`, `survey-analyzer`, `case-study-producer`
- Workflows: `customer-discovery-sprint`, `icp-quarterly-review`, `case-study-pipeline`

**Narrative** — category and product story architecture:
- `category-narrative-builder`, `product-narrative-builder`, `founder-story-builder`, `thought-leadership-strategist`, `content-architecture-mapper`
- Workflows: `narrative-from-scratch`, `narrative-evolution`, `thought-leadership-calendar`

**Pricing** — packaging design through pricing page:
- `packaging-designer`, `competitive-pricing-mapper`, `price-sensitivity-analyst`, `expansion-revenue-framer`, `pricing-page-reviewer`
- Workflows: `annual-pricing-review`, `new-tier-design`

**Market Intelligence** — competitive monitoring, win/loss analysis, analyst landscape, market sizing:
- `competitive-monitor`, `win-loss-analyst`, `market-sizing-agent`, `analyst-landscape-mapper`
- Workflows: `weekly-competitive-pulse`, `quarterly-win-loss-review`, `analyst-briefing-prep`

### Growth Marketing System — complete

**Creative pipeline:**
- `creative-headline-agent` — 5 frame types (problem/benefit/curiosity/social proof/comparison), platform-specific char limits
- `creative-copy-agent` — 3 structure patterns, extension test, specificity test
- `asset-quality-gate` — 3-criterion scoring (on-message / ICP-relevant / specific), revise-once protocol
- `competitive-creative-intelligence` — longevity analysis, frame map, 10-15 asset briefs per sprint
- Workflows: `ad-copy-generation`, `creative-intelligence-sprint`

**Paid media:**
- `paid-search-agent` — intent tier table (brand/category/competitor/solution/problem), match type strategy, QS diagnosis, bid strategy framework
- `paid-social-agent` — Meta audience hierarchy, LinkedIn targeting tradeoffs, creative rotation rules
- `distribution-optimizer` — marginal CAC framework, channel CAC targets, concentration risk flag

**Analytics:**
- `campaign-analytics-agent` — materiality threshold (>15% WoW + >$500 impact), 6-stage funnel, decisions-required section
- `performance-narrative-analyst` — correlation vs. causation discipline, confidence levels, max 3 material changes
- `weekly-cmio-report-generator` — 400-word limit, 5 questions answered, one ask at the end

**SEO:**
- `seo-content-strategist` — topic cluster model, keyword scoring (traffic potential × ICP relevance × competitive gap), content brief format
- `gbp-category-auditor` — category gap analysis, specificity check, ranked recommendations
- `gbp-attributes-auditor` — attribute impact framework, baseline vs. differentiator classification
- `gbp-description-tester` — 750/250-char rules, 2–3 variants across angles
- `gbp-posts-calendar-agent` — 30-day calendar, 4 post types, 2x/week cadence
- `services-content-optimizer` — 300-char writing framework, outcome→approach→audience structure

**Reviews:**
- `review-intelligence-agent` — velocity gap analysis, review text mining, monthly target + signal list
- `review-response-generator` — 3 variants per star tier, critical response framework, keyword rotation

**Email:**
- `email-strategist` — 4 sequence types (nurture/onboarding/re-engagement/expansion), segment strategy, suppression rules
- `email-copy-agent` — 40-char subject line limit, two variants, one CTA rule, 150/200/100-word limits by type
- `email-performance-analyst` — MPP inflation handling, CTOR as primary metric, 5-step analysis framework

**Workflows and commands:**
- Workflows: `weekly-performance-review`, `campaign-brief-to-launch`, `experiment-cycle`, `seo-audit-sprint`, `email-sequence-build`
- Commands: `/gen-ads`, `/perf-report`, `/creative-sprint`, `/seo-audit`, `/experiment-log`

### System Intelligence

- `pattern-analyst` — 6-pattern taxonomy, 3-data-point signal/noise threshold, weekly mode + launch-retro mode
- `system-updater` — change card format, human-gated commits, `[system-intelligence]` commit convention
- Workflows: `weekly-system-review` (Monday cadence), `post-launch-retrospective` (14 days post-L1), `quarterly-system-audit`

---

## Setup

### 1. Fork this repo into your org

### 2. Fill out the client config
Open `CLAUDE.md` and fill in the `## Client Configuration` section — company name, product, ICP, competitors, tech stack, channels.

### 3. Populate `core/`
Work through each file in `core/` using the templates provided. Priority order:
1. `core/brand/messaging-pillars.md` — everything draws from this
2. `core/icp/primary-icp.md` — especially the pain language and jaw-dropping moments
3. `core/competitive/` — at least one card per primary competitor
4. `core/customer-voice/jaw-dropping-moments.md` — the best creative raw material

Run the onboarding checklist: `client-setup/onboarding-checklist.md`

### 4. Connect integrations
See `integrations/` for MCP server setup guides.

### 5. Run your first workflow
- **Fast signal:** start with `growth-marketing/workflows/ad-copy-generation.md`
- **Foundational:** start with `product-marketing/positioning/workflows/new-positioning-sprint.md`

---

## How the system improves itself

Every week, the system reviews its own outputs against real-world performance signals. When it finds a confirmed pattern (3+ data points), it proposes a change to the relevant agent file. A human approves, rejects, or modifies before anything is committed. Changes are logged in `core/system-intelligence/changelog.md`.

Over time: agents that produce low-quality outputs get their instructions refined. Core files that become stale get flagged. Feedback loops that go quiet get fixed. The system compounds.

---

## Tiers

See `client-setup/tier-guide.md` for OS-Micro, OS-Sprint, and OS-Full engagement options.

---

## Design principles

- **One agent, one job** — narrow and deep beats broad and shallow
- **Context over instructions** — agents read from `core/`, not long rule lists
- **Core layer is the product** — populating it is the onboarding
- **Human gates on irreversible actions** — nothing ships externally or commits to `core/` without approval
- **Agents do the research. Humans make the decisions.**
- **Compound over time** — system intelligence makes agents sharper with every cycle
