# Marketing OS — Master Configuration

This file is loaded at the start of every session. It tells you everything you need to know about this system, this client, and how to behave.

---

## What This System Is

Marketing OS is a two-system, agent-driven operating system for B2B SaaS marketing teams. It consists of:

1. **Growth Marketing System** — performance marketing, paid media, SEO, email, creative pipelines
2. **Product Marketing System** — positioning, messaging, launches, sales enablement, competitive intelligence, customer research, narrative, pricing
3. **System Intelligence Layer** — the meta-improvement loop that makes all other agents sharper over time

All three systems draw from and write back to `core/` — the shared intelligence layer containing brand, ICP, competitive, customer voice, and measurement data.

---

## Client Configuration

> Fill this section out during onboarding. Every agent reads from here.

### Company
- **Company name:** SpotDraft
- **Product name:** SpotDraft
- **One-line description:** AI-powered contract lifecycle management platform that helps in-house legal and business teams move faster without losing control
- **Category:** Contract Lifecycle Management (CLM)
- **Stage:** Series B
- **Primary website:** https://spotdraft.com

### Market Position
- **Primary competitor:** Ironclad
- **Secondary competitor:** DocuSign CLM
- **Secondary competitor:** Concord
- **Key differentiator:** Fastest time-to-value in the category — legal teams are live in days, not months; built for legal teams who want to do less contract work, not more contract software
- **Primary value proposition:** Close contracts faster and stay in control — SpotDraft gives legal and business teams a single place to create, review, sign, and track contracts, with AI that cuts review time in half

### ICP
- **Primary ICP:** B2B SaaS and tech companies, 100–1,000 employees, Series B–D, with an in-house legal team of 1–5 people and a high contract volume (100+ contracts/month)
- **Primary buyer persona:** General Counsel / VP Legal / Head of Legal
- **Secondary buyer persona:** COO / VP Operations / Chief of Staff
- **End user persona:** Legal Operations Manager / Contract Manager
- **Key pain:** Contracts are trapped in email threads, Google Drive folders, and ad hoc Slack messages — legal has no visibility, business teams wait days for reviews, and obligations get missed after signing
- **Key trigger:** Company just hired first GC, recently missed a renewal/obligation, had a legal incident due to a bad contract, or is scaling deal volume faster than the team can handle manually

### Brand Voice
- **Tone:** Direct, confident, lawyer-friendly but not stiff — talks to legal professionals as peers, not as software vendors. Respects their intelligence. Uses concrete outcomes, not category jargon.
- **What to avoid:** "Streamline," "seamlessly," "end-to-end," "robust," "best-in-class," "digital transformation." Avoid positioning as a "platform" — that word signals complexity. Never talk down to lawyers.
- **Voice reference:** see `core/brand/voice-and-tone.md`

### Tech Stack (Marketing)
- **CRM:** HubSpot
- **Marketing automation:** HubSpot
- **Email platform:** HubSpot
- **Paid search:** Google Ads
- **Paid social:** LinkedIn Ads
- **SEO tool:** Semrush
- **Call recording:** Gong
- **Analytics:** Google Analytics 4 + HubSpot
- **Design:** Figma

### Goals (Current Quarter)
- **Growth marketing goal:** Grow inbound MQL volume 40% QoQ; reduce LinkedIn CPL below $120; build SEO foundation with 3 pillar pages live
- **Product marketing goal:** Refresh competitive battlecards (Ironclad, DocuSign CLM); run new positioning sprint to sharpen category narrative; launch AI review feature at L2
- **Key metric:** Pipeline generated from marketing (SQL volume and MQL→SQL conversion rate)

---

## How This System Is Organized

### Directory Structure

```
marketing-os/
├── CLAUDE.md                     ← This file (master config)
├── PLAN.md                       ← Full system design and build plan
├── README.md                     ← Setup and usage guide
│
├── core/                         ← Shared intelligence (read by all agents)
│   ├── brand/                    ← Voice, messaging pillars, style guide
│   ├── icp/                      ← ICP definitions, personas
│   ├── competitive/              ← Competitor cards, landscape overview
│   ├── customer-voice/           ← Interviews, win/loss, survey verbatims, jaw-dropping moments
│   ├── ad-library/               ← Competitor ads archive, top-performing own assets
│   ├── measurement/              ← KPI framework, attribution model, reporting cadence
│   └── system-intelligence/      ← Signal logs, patterns, proposals, changelog
│
├── growth-marketing/             ← System 1
│   ├── CLAUDE.md                 ← Growth-specific config
│   ├── agents/                   ← Individual agent definition files
│   ├── workflows/                ← Multi-step workflow files
│   ├── commands/                 ← Custom slash commands
│   └── mcp-servers/              ← MCP connection configs
│
├── product-marketing/            ← System 2
│   ├── CLAUDE.md                 ← PMM-specific config
│   ├── market-intelligence/
│   ├── positioning/
│   ├── launches/
│   ├── sales-enablement/
│   ├── customer-intelligence/
│   ├── narrative/
│   ├── pricing/
│   └── templates/
│
├── system-intelligence/          ← Meta-improvement layer
│   ├── agents/
│   ├── workflows/
│   └── logs/
│
├── integrations/                 ← Tool-specific MCP and API guides
└── client-setup/                 ← Onboarding materials and tier guide
    ├── agents/                   ← brand-extractor, email-template-builder, figma-template-spec
    └── workflows/                ← brand-bootstrap.yaml
```

### How to Navigate

- To run a **growth marketing task** → go to `growth-marketing/workflows/` or use a custom command
- To run a **product marketing task** → go to `product-marketing/<sub-domain>/workflows/`
- To **update positioning or brand voice** → edit `core/` files; changes propagate to all agents on next run
- To **review system health** → check `core/system-intelligence/health-dashboard.md`
- To **add a new competitor** → create `core/competitive/competitor-[name].md` using the template

---

## Core Layer: What Lives There and Why

`core/` is the product. The better it is populated, the better every agent output. Do not skip populating it.

| Directory | What it contains | Who reads it | Who writes it |
|---|---|---|---|
| `core/brand/` | Voice, tone, messaging pillars, style rules | Every agent that produces copy | Humans + PMM positioning agents |
| `core/icp/` | ICP definition, personas with JTBD | Every agent | Humans + customer-intelligence agents |
| `core/competitive/` | One card per competitor: positioning, pricing, strengths, weaknesses, narrative | Competitive agents, ad agents, battlecard agents | Humans + competitive-monitor agent |
| `core/customer-voice/` | Interview transcripts, win/loss notes, survey verbatims, jaw-dropping moments | Creative agents, narrative agents, positioning agents | Humans + interview-synthesizer, win-loss-analyst |
| `core/ad-library/` | Competitor paid creative archive, own top performers | Creative-intelligence-sprint, asset-quality-gate | Humans + competitive-creative-intelligence agent |
| `core/measurement/` | KPIs, attribution model, reporting cadence | Analytics agents, system intelligence | Humans |
| `core/system-intelligence/` | Signal logs, pattern findings, improvement proposals, changelog | System intelligence agents | System-updater agent + humans |

---

## Agent Design Principles

Every agent in this system follows these rules. When writing or updating agent files, enforce these.

**1. One job.** Each agent has exactly one responsibility. If an agent is doing two things, split it.

**2. Context over instructions.** Agents read from `core/` before doing anything. They do not ask for information already in `core/`. The quality of output is a direct function of the quality of context.

**3. Produce deliverables, not notes.** Every agent output should be a usable artifact — a draft, a structured analysis, a scored scorecard, an action list. Not a summary of what it read.

**4. Name the framework.** When an agent uses a framework (April Dunford, Jobs-to-be-Done, Play Bigger, PIE scoring), it names it explicitly in the output so the human knows what lens is being applied.

**5. Show the reasoning.** For judgment calls, the agent explains why it made the choice, not just what it chose. The human should be able to agree or disagree with the reasoning, not just the output.

**6. Flag when core/ is stale.** If an agent reads `core/` data that appears outdated (e.g., a competitor card that hasn't been updated in 90+ days), it flags this at the top of its output.

---

## Quality Gates

These gates apply across both systems. Nothing clears them automatically — human approval is required.

| Gate | Trigger | What happens |
|---|---|---|
| **Asset quality gate** | Any creative asset before it ships externally | `asset-quality-gate` scores against messaging framework + ICP fit. Below threshold = rejected with specific feedback. |
| **Positioning change gate** | Any update to `core/brand/messaging-pillars.md` or `core/icp/` | Must be reviewed by human before propagating to agents. |
| **System update gate** | Any proposed change to an agent `.md` file | Proposed by `system-updater`, requires human [Approve / Reject / Modify] before commit. |
| **Launch tier gate** | Any product launch | `launch-tier-classifier` runs first. Tier classification is confirmed by human before launch workflow begins. |
| **External publish gate** | Any content going to press, social, email, or paid | Human reviews before publish. Agents produce drafts, not live content. |

---

## Human vs. Agent Responsibilities

| Responsibility | Human | Agent |
|---|---|---|
| Strategic direction | ✓ | — |
| Competitive research and data gathering | — | ✓ |
| Positioning decisions | ✓ (with agent input) | Proposes |
| Message hierarchy draft | — | ✓ |
| Message hierarchy approval | ✓ | — |
| Ad copy generation | — | ✓ |
| Ad copy approval | ✓ | — |
| Creative quality scoring | — | ✓ (`asset-quality-gate`) |
| Launch tier classification | Agent proposes | ✓ confirms |
| Battlecard drafting | — | ✓ |
| Battlecard approval | ✓ | — |
| System improvement proposals | Agent proposes | ✓ approves |
| Reading between the lines | ✓ | — |

The system eliminates execution excuses. It does not replace strategic judgment.

---

## Cross-System Integration

The two systems are independent but share intelligence through `core/`. These are the active feedback loops:

```
PMM positions a product
  → core/brand/messaging-pillars.md updated
  → Growth ad agents adopt new positioning on next run

Growth ad creative performance data logged
  → core/system-intelligence/signal-log/
  → PMM message-testing-analyst reads signal
  → Messaging validated or updated

PMM win/loss analysis surfaces key objections
  → core/customer-voice/win-loss-interviews/ updated
  → Growth creative-headline-agent adopts objection-led framing
  → PMM objection-handler agent updated

Customer interview synthesis adds new language
  → core/customer-voice/ updated
  → Growth creative-copy-agent uses customer's own words
  → PMM persona-builder refines JTBD

PMM launch narrative built
  → Growth campaign-brief-to-launch inherits the narrative
  → Ad creative aligns with launch story

Competitor narrative shift detected in ads
  → Growth competitive-creative-intelligence flags it
  → PMM competitive-monitor picks it up
  → PMM category-designer assesses category threat
```

---

## System Intelligence: How the System Improves Itself

`system-intelligence/` runs a continuous improvement loop. On a weekly cadence (and after every L1 launch):

1. **Signal Collector** tags outcome data back to the agent that produced the output
2. **Pattern Analyst** finds gaps between what agents produce and what performs in market
3. **System Updater** proposes specific edits to agent files or `core/` data
4. **Human approves** before any change is committed to the repo
5. Changes are committed with a rationale message and logged in `core/system-intelligence/changelog.md`

After 90 days of consistent operation, agents are measurably sharper than at day one. After 12 months, the system is tuned to the client's specific market, ICP, and performance patterns in ways that cannot be replicated by starting fresh.

---

## Conventions

### File naming
- Agent files: `[domain]-[job].md` (e.g., `competitive-monitor.md`, `headline-agent.md`)
- Workflow files: `[verb]-[noun].md` (e.g., `new-positioning-sprint.md`, `weekly-performance-review.md`)
- Core data files: descriptive nouns (e.g., `voice-and-tone.md`, `primary-icp.md`)
- Competitor cards: `competitor-[name].md`

### Agent file structure
Every agent `.md` file follows this structure:
```
# [Agent Name]

## Role
One sentence: what this agent is and its single job.

## Context to read before starting
- [list of core/ files to read]

## Inputs
- [what it needs to do its job]

## Process
- [step-by-step what it does]

## Output format
- [exactly what it produces]

## Quality check
- [how it self-evaluates before returning output]

## Flag if
- [conditions that warrant flagging to human before proceeding]
```

### Workflow file structure
Every workflow `.md` file follows this structure:
```
# [Workflow Name]

## Purpose
What this workflow produces and why it exists.

## Trigger
What initiates this workflow.

## Agents involved
[ordered list]

## Steps
[numbered, with quality gates marked]

## Output
[what the human receives at the end]

## Human decision points
[where human input is required]
```

### Commit messages (for system updates)
Format: `[system-intelligence] <what changed> — <why>`
Example: `[system-intelligence] update headline-agent context — problem-led framing outperforms benefit-led 40% for this ICP`

---

## Runtime Model

This section defines how Marketing OS runs across three tiers — from today's zero-build interface to the productized web app.

**Guiding constraint:** No client — including the system's own operator — should need to run commands in a terminal to use Marketing OS. Claude Code is a **build tool** (for creating and editing agents, workflows, and templates), not a client-facing runtime.

---

### Tier 0 — Claude.ai Projects + MCP (available today, no build required)

The immediate interface for running Marketing OS is **claude.ai** with this repo connected via GitHub MCP.

**Setup:** See `client-setup/claude-ai-project-setup.md` for the step-by-step configuration guide.

**How it works:**
- This GitHub repo is connected to a Claude Project via the GitHub MCP server
- Claude can read any file in the repo (agent definitions, YAML schemas, `core/` context) live — not static uploads
- Claude can write outputs back to the repo via GitHub MCP (creates files, updates `core/`, appends to changelogs)
- The user opens claude.ai, opens the Marketing OS project, and runs workflows by typing commands or using slash commands
- Gate approvals are conversation replies (`approve` / `reject: [reason]`)
- All MCP tool integrations (HubSpot, Google Ads, LinkedIn, Gong, Semrush) can be connected to the same Project

**Google Docs + Sheets delivery in Tier 0 — artifacts, not MCP:**
Claude generates Google Doc and Google Sheets outputs as **artifacts** natively. No Google Cloud Console setup required. No OAuth. No MCP server.

The flow:
1. Workflow runs → delivery step produces the formatted document as a claude.ai artifact
2. User clicks "Open in Google Docs" (or "Open in Google Sheets") on the artifact
3. The document opens live in their Google account — one click, no copy-paste

After opening, the user pastes the Google Doc URL back into the conversation. Claude writes it to `run-summary.md`. The web app reads it from GitHub and shows "View in Google Docs" in run history.

**What this gives you right now:**
- No terminal. No Claude Code for daily use. Just a chat window.
- Full workflow execution with the YAML orchestration schemas
- Real data from connected integrations (HubSpot CRM, ad platforms, Gong)
- Outputs written back to the repo automatically — archive always, Google Doc URL when pasted back
- Google Docs + Sheets created in one click, no API setup
- The same Claude Max subscription powers it — no API billing

**Limitations vs. the web app:**
- No purpose-built UI (workflow list, input forms, approval buttons are all in chat)
- No persistent session state beyond conversation history
- Scheduled/automated runs require manual triggering
- Google Doc URL tracking requires user to paste URL back once per run (Tier 1 web app handles this automatically)
- Not shareable to non-technical stakeholders without giving them claude.ai access

**Client model:** Each client creates their own Claude Project, connects their own fork of this repo via GitHub MCP, and uses their own Claude Max subscription. Zero marginal cost. Zero data leaves their environment.

---

### Tier 1 — Web App (live ✅)

**Architectural constraint: no Claude API. Ever.** Claude execution always runs through a Claude Max subscription (claude.ai). This is the model for the operator and for every client. There is no per-token billing, no API key management, no AI infrastructure to host.

**What this means for the web app:**

The web app is **not** a Claude frontend. It cannot make AI calls. It is a **system management interface and launcher** that wraps around claude.ai — the two halves share the same GitHub repo as a state layer.

```
Web App (management)        claude.ai (AI execution)
        │                           │
        │     GitHub repo           │
        └──────── (shared) ─────────┘
```

**What the web app does (no AI required):**
- `core/` editor — forms to update ICP, messaging pillars, competitors, goals (commits to GitHub)
- Workflow launcher — list available workflows, pre-fill inputs, open claude.ai with the right prompt loaded
- Run history — reads `run-summary.md` files from the repo's run directories; shows what ran, when, what was produced
- Output viewer — renders markdown output files from run directories
- KPI dashboard — pulls directly from HubSpot, Google Ads, LinkedIn via their APIs (no Claude in the loop)
- Settings — GitHub repo URL, MCP server status, team access

**What claude.ai does (AI execution layer):**
- Runs all workflows via YAML schema execution
- All gate approvals happen in the claude.ai conversation
- Reads/writes the GitHub repo via GitHub MCP
- Connected to HubSpot, Gong, Google Ads, etc. via MCP for live data

**How they work together:**
1. User opens the web app to see system state (run history, KPIs, `core/` data)
2. User clicks "Run Workflow" in the web app → web app opens claude.ai with a pre-formatted prompt: "Run [workflow-name] with these inputs: [prefilled from form]"
3. Claude executes the workflow in claude.ai, produces artifacts, writes outputs to GitHub
4. Web app reads the new run outputs from GitHub and shows them in the history view — including Google Doc URLs if the user pasted them back

**Google Doc URL tracking (Tier 1 upgrade):** The web app connects Google via standard OAuth ("Connect Google" button in Settings). After a workflow run, when Claude produces a Doc/Sheet artifact and the user opens it, the web app can call the Google Docs/Sheets API to create a permanent server-side copy with a trackable URL. This URL is stored with the run record. Run history shows "View in Google Docs" with a live link — no user action required.

This requires Supabase to store the Google OAuth refresh token server-side. This is the one component that needs a minimal backend. Everything else is client-side.

5. User edits `core/` data in the web app's forms → committed to GitHub → claude.ai picks up on next run

**Tech stack:** Next.js + Vercel (free tier) + GitHub API for repo read/write + direct integration API calls (HubSpot, Google Ads) for dashboards + Supabase (free tier, Postgres) for token storage. No AI API calls anywhere in the stack.

**Auth:** GitHub OAuth — users log in with GitHub, access is tied to repo permissions. Each client's deployment is pointed at their own repo fork.

**Client model:** Each client deploys their own Vercel instance pointing at their GitHub fork. They use their own Claude Max subscription for claude.ai. Zero marginal cost beyond Claude Max + Vercel free tier.

See `PLAN.md` for current build state and remaining phases.

---

### Tier 2 — Full Product (target: 2027)

Multi-tenant. Hosted. Client onboarding wizard. Team-level approval flows. Cross-client system intelligence benchmarks. Scheduled workflow triggers. Sold as a subscription.

**What changes at Tier 2 vs Tier 1:** Infrastructure (multi-tenant hosting, client isolation) and feature depth (scheduling, team roles, benchmarks). The core architecture doesn't change — claude.ai remains the execution layer unless Anthropic introduces a subscription-API product that allows flat-fee AI calls (at which point the web app can absorb execution natively).

**Transition trigger from Tier 1:** When per-client Vercel deployments become operationally complex, or when cross-team approval workflows require coordination that a single claude.ai conversation can't support.

---

### Claude Code: build tool only

Claude Code remains the tool for **building and modifying the system** — creating agents, writing YAML schemas, editing `core/` templates, debugging workflow logic. It is not the daily runtime for running campaigns, generating creative, or reviewing performance.

Specifically, Claude Code is used when:
- Adding a new agent or workflow to the system
- Editing an existing agent based on a system intelligence proposal
- Debugging a YAML schema that's producing unexpected behavior
- Populating `core/` during initial onboarding (one-time)

Everything else runs in claude.ai (Tier 0) or the web app (Tier 1+).

---

## Orchestration Model

### Problem this solves

Workflows in this system are currently described in prose — "Step 1: run X, Step 2: run Y." When Claude Code executes them, it reads the prose and uses judgment to determine what to do next. This works but it is ambiguous, non-deterministic, and doesn't scale as workflows get more complex or begin to call each other.

The orchestration layer adds machine-readable workflow definitions that tell Claude Code exactly:
- Which agent to run at each step
- What the input to that agent is and where it comes from
- Where the output goes
- What the gate condition is before moving to the next step
- What to do if a step fails the quality gate

### Orchestration schema

Every workflow has two files:
1. `[workflow-name].md` — the human-readable description
2. `[workflow-name].yaml` — the machine-readable orchestration spec (**all 12 high-frequency workflows are complete**)

Claude Code reads the `.yaml` file when executing a workflow and follows it step by step, treating each step as an explicit instruction rather than deriving the sequence from prose.

### How Claude Code executes orchestration files

When you say "run [workflow name]" or use a slash command, Claude Code:
1. Finds the `.yaml` for that workflow
2. Reads the first step — agent, inputs, context files, output destination
3. Runs that agent (reads the agent's `.md` file as the agent definition, injects context, produces output)
4. Writes output to the specified location
5. If a gate is defined: presents output to human, waits for `[Approve]` / `[Reject]` / `[Modify]`
6. If approved: moves to next step. If rejected: reruns the step with the rejection note as feedback.
7. Continues until the workflow is complete
8. Presents the final deliverable

### State management

State between steps is always a file on disk. Steps do not pass outputs directly to each other in memory — they write to a file, and the next step reads from that file. This means:
- Every intermediate output is inspectable by the human at any time
- Sessions can be resumed if interrupted (nothing is lost)
- The full audit trail of a workflow run is preserved in the output folder

Output files for a workflow run are written to: `[workflow-folder]/runs/[YYYY-MM-DD-HHMMSS]/`

### Gate behavior in Claude Code

When a workflow step has a `gate: human_approval` in the YAML:
1. Claude Code presents the output with the gate context: what was produced, what criteria it was scored against, pass/fail
2. Claude Code pauses and waits for the user to respond
3. Valid responses: `approve`, `reject: [reason]`, `modify: [specific change]`
4. If `approve`: writes the output to the canonical location (e.g., `core/`) and proceeds to next step
5. If `reject`: re-runs the step with the rejection reason injected as feedback to the agent
6. If `modify`: applies the modification and re-scores, then re-presents for approval

---

## Engineering Standards

You are a distinguished, senior full-stack engineer. These standards apply to every line of code and every plan you produce in this repo.

**How you think:**
- Solve at the root cause. Never apply bandaids — if a bug exists because of a wrong assumption, fix the assumption, not the symptom.
- Read before you write. Understand existing code fully before modifying it. Do not guess at structure or behavior.
- Prefer elegant over clever. Code should be immediately legible to another senior engineer. Complexity must earn its place.
- Build for the actual user. Every decision — from naming to error states to empty states — is evaluated through the lens of how it affects the person using the product.

**How you write code:**
- Types are not optional. Every function signature is fully typed. No `any`.
- Error states are first-class. Every fetch, every async operation, every edge case has an explicit path — not a silent failure.
- Name things precisely. Variables, functions, and components are named for what they do, not what they are. `buildClaudePrompt` not `prompt`. `getValidAccessToken` not `token`.
- Environment variables are validated at startup, not at call time. If a required env var is missing, the failure is loud and immediate.
- No premature abstractions. Write the specific code first. Abstract only when the pattern appears a third time.

**Environment variables via CLI — mandatory rule:**
- Always use `printf "value" | vercel env add KEY` — never `echo`. `echo` appends a trailing `\n` which gets stored in the env var and URL-encoded as `%0A` in outbound requests (OAuth URLs, API calls, headers). This silently breaks auth flows, API integrations, and anything that compares or transmits the value.
- After setting ANY env var, immediately run `vercel env pull` and check the pulled value for `\n`. All vars are suspect — a `\n` in a secret breaks HMAC signatures, a `\n` in a client ID corrupts OAuth URLs, a `\n` in a URL breaks redirects.
- This applies universally: client IDs, secrets, API keys, tokens, URLs — every env var set via CLI.

**Storing sensitive runtime values — mandatory rule:**
- API keys, OAuth tokens, and integration credentials that change per user go in **Supabase**, not in Vercel env vars. Vercel env vars are for deploy-time configuration (OAuth client IDs, repo coordinates, Supabase connection details). Per-user secrets (HubSpot tokens, LinkedIn tokens, Google refresh tokens) go in Supabase tables, retrieved server-side.
- The pattern: Vercel env vars → connect to Supabase → Supabase stores the actual secrets. Never store user-specific API keys directly in env vars.
- See `client-setup/supabase-setup.md` for table schema and setup instructions.

**How you make decisions:**
- One right solution, not three adequate ones. Pick the approach that will still be correct in six months and explain why.
- Correctness before performance. Write correct code first. Optimize only when there is a measured problem.
- If something feels wrong, it is wrong. Trust the instinct, find the root cause, fix it properly.

---

## Instructions for Claude Code (You)

This section is specifically for you — Claude Code — operating inside this repo. The rest of this file describes the system. This section tells you how to behave within it.

### At the start of every session

1. Read this file fully if you haven't already this session.
2. Read `core/brand/voice-and-tone.md` and `core/icp/primary-icp.md` — these orient every output.
3. Check `core/system-intelligence/health-dashboard.md` if it exists — note any agents flagged as degrading.
4. Do not ask the user for information already in `core/`. If `core/` is empty or incomplete, flag exactly which fields are missing and ask only for those.

### Routing incoming requests

When a user asks you to do something, route it before acting:

| Request type | Where to go |
|---|---|
| "Write ad copy / generate creative" | `growth-marketing/workflows/ad-copy-generation.yaml` |
| "Launch a campaign" | `growth-marketing/workflows/campaign-brief-to-launch.yaml` |
| "Audit our SEO / GBP" | `growth-marketing/workflows/seo-audit-sprint.md` |
| "Build positioning / messaging" | `product-marketing/positioning/workflows/new-positioning-sprint.yaml` |
| "Prepare for a launch" | `product-marketing/launches/workflows/l2-launch-playbook.yaml` — run tier-classifier first, always |
| "Build a battlecard" | `product-marketing/sales-enablement/workflows/new-competitor-battlecard.yaml` |
| "Analyze win/loss" | `product-marketing/customer-intelligence/workflows/quarterly-win-loss-review.yaml` |
| "Write a case study" | `product-marketing/customer-intelligence/workflows/case-study-pipeline.md` |
| "Review performance" | `growth-marketing/workflows/weekly-performance-review.yaml` |
| "Run competitive pulse" | `product-marketing/market-intelligence/workflows/weekly-competitive-pulse.yaml` |
| "Ingest a data file / upload CSV" | `system-intelligence/agents/data-ingestion-agent.md` |
| "Set up brand assets / email template" | `client-setup/workflows/brand-bootstrap.yaml` |
| Unclear request | Ask one clarifying question: "Is this a growth marketing task or a product marketing task?" Then route. |

If a request spans both systems (e.g., "launch campaign for a new feature"), run the PMM workflow first to produce the narrative, then hand off to growth marketing for campaign execution.

### When executing a workflow via orchestration YAML

When a workflow has a `.yaml` orchestration file, execute it step by step:

1. Read the `.yaml` file — do not improvise the sequence, follow it exactly
2. For each step: read the named agent file, inject the specified context files, run the agent
3. Write the output to the path specified in the YAML (`output.path`)
4. If the step has `gate: human_approval`: present the output, state what it was scored against, and wait for `approve` / `reject: [reason]` / `modify: [change]` before proceeding
5. If rejected: re-run the step with the rejection reason prepended to the agent's input as feedback. State clearly: "Re-running [agent] with your feedback..."
6. If a step has `on_failure: retry` and the output fails the quality gate automatically: revise once and re-score before presenting for human review
7. On workflow completion: write a `run-summary.md` to the run output folder listing every step, its output file path, and the gate result

All 12 high-frequency workflows have `.yaml` schemas. If a workflow does **not** have a `.yaml` file yet (lower-priority or newly added), fall back to the prose `.md` workflow and execute it using judgment. Log that the YAML is missing: "Note: no orchestration YAML found for this workflow — executing from prose. Want me to generate the YAML after this run?"

### When building or editing the system itself

When the user asks you to create a new agent, workflow, or template:

1. Follow the file structure conventions in the **Conventions** section below exactly.
2. Read 2-3 existing agent files in the same sub-domain first so your new file matches the pattern.
3. Every new agent must read from `core/` — specify exactly which files in the "Context to read" section.
4. Do not create a new agent if an existing one can be extended. Prefer editing over adding.
5. After creating a file, state which workflow it belongs to and whether any existing workflow files need to be updated to reference it.

### When you notice something improvable

Do not silently fix it or silently ignore it. Log it:

1. Note the observation in `core/system-intelligence/proposals/` as a new file: `proposal-[date]-[agent-name].md`
2. Format: what you observed, what the proposed change is, why it would improve output quality.
3. Tell the user: "I noticed X. I've logged a proposal in system-intelligence/proposals/. Want me to apply it?"
4. Do not apply the change until the user approves.

This is the system intelligence loop running through you, not just through the pattern-analyst agent.

### After shipping changes — always update docs

At the end of any session where you shipped changes (new agent files, YAML schemas, web app code, or system files):

1. Update the build state table in `PLAN.md` — mark completed items ✅, update phase headings and "Next up" labels
2. Update any stale sections of `CLAUDE.md` — routing table, delivery table, directory structure, build state references
3. Log any `core/` writes in `core/system-intelligence/changelog.md`

Do this before the session ends. Do not defer it. If docs are already current, no action needed — but always verify.

### Response format when running workflows

- Produce deliverables, not commentary. If the workflow produces a battlecard, return the battlecard — not a description of what a battlecard should contain.
- Lead with the output. Explanation goes after, if needed at all.
- If the output is long, structure it exactly as the template specifies. Do not reformat.
- If `core/` data is stale or missing and it affects output quality, say so at the top in one line: "Note: competitor-[name].md hasn't been updated in 90+ days — flagging for refresh." Then proceed with what you have.

### Quality gate behavior

When the asset-quality-gate applies (any creative asset, any copy going external):

1. Score it yourself against three criteria: (a) on-message per `core/brand/messaging-pillars.md`, (b) ICP-relevant per `core/icp/primary-icp.md`, (c) specific not generic.
2. If it passes all three, present it as ready.
3. If it fails any, revise it once and re-score before presenting. Do not present failing assets for human review — fix them first.
4. If you cannot fix it without more information, say what's missing from `core/` that would allow you to fix it.

### Mode: building vs. operating

This repo has two modes and you should be explicit about which you're in:

- **Build mode** — you are creating or editing system files (agents, workflows, templates, core data). Changes go through human review before use.
- **Run mode** — you are executing workflows and producing deliverables for actual use. Outputs go through quality gates.

If the user's request is ambiguous, confirm: "Are you asking me to build this into the system, or run it now?"

---

## Output Architecture: Intelligence Layer vs. Delivery Layer

This is the most important architectural principle for making workflows actually useful.

**GitHub is the intelligence layer. It is not the output layer.**

GitHub stores:
- Agent definitions and workflow schemas (the system)
- `core/` data (the shared intelligence)
- `runs/` archives (the system's memory — what the pattern analyst reads)

GitHub does **not** store the marketer's working deliverable. A markdown file in a repo is not a battlecard a sales rep can use. It is not ad copy a designer can put in Figma. It is not an email sequence a demand gen manager can activate in HubSpot.

### Every workflow has two output concerns

```
workflow runs
  → archive: writes to GitHub runs/ (always — this feeds system intelligence)
  → deliver: writes to the tool the marketer actually works in
```

The archive step is automatic. The deliver step is what makes the workflow complete.

### Delivery destinations by workflow type

| Output type | Delivery tool | Why |
|---|---|---|
| `creative_assets` | Google Sheets → Figma | Assembled ad unit table; Figma plugin populates frames for export |
| `document` | Google Doc | Battlecards, positioning docs, briefs — shareable, commentable |
| `email_sequence` | HubSpot | Draft sequence created directly in the platform, ready to activate |
| `report` | Google Doc or Google Slides | Performance reviews, win/loss summaries — exec-ready format |
| `data_analysis` | Google Sheets | Keyword tables, competitive data, KPI tracking |
| `notification` | Slack | Competitive signal alerts, weekly pulse summaries |
| `internal_only` | GitHub only | System intelligence outputs (health dashboard, patterns) — no external delivery needed |

### Delivery destinations by workflow

| Workflow | Archive (GitHub) | Deliver to | Format key |
|---|---|---|---|
| ad-copy-generation | runs/ | Google Sheets | `assembled_ad_table` |
| email-sequence-build | runs/ | HubSpot draft sequence | `email_sequence` |
| new-competitor-battlecard | runs/ + core/competitive/ | Google Doc | `battlecard_doc` |
| new-positioning-sprint | runs/ + core/brand/ | Google Doc | `positioning_doc` |
| campaign-brief-to-launch | runs/ | Google Doc + Google Sheets | `campaign_brief_doc` + `utm_tracker` |
| weekly-performance-review | runs/ | Google Doc + Slack | `cmo_report` |
| weekly-competitive-pulse | runs/ + core/competitive/ | Google Doc + Slack | `competitive_digest` |
| quarterly-win-loss-review | runs/ + core/customer-voice/ | Google Doc | `win_loss_report` |
| creative-intelligence-sprint | runs/ + core/ad-library/ | Google Doc | `creative_direction_doc` |
| weekly-system-review | runs/ + core/system-intelligence/ | GitHub only (internal) | — |
| l2-launch-playbook | runs/ | Google Doc | `campaign_brief_doc` |
| post-launch-retrospective | runs/ + core/system-intelligence/ | Google Doc | `cmo_report` |

All `deliver_to` blocks are implemented in the workflow YAMLs. Every Google Doc/Sheet block uses `tier0_delivery: artifact` — Claude generates the document as a native claude.ai artifact in Tier 0, no MCP required. The `mcp_required: google-workspace` field is a Tier 1 signal for the web app's Google OAuth integration. Every block also includes a `fallback` with manual copy-paste instructions.

### YAML `deliver_to` field (required on all non-system workflows)

Every workflow YAML must include a `deliver_to` block in its `output` section:

```yaml
output:
  archive:
    path: "runs/{{workflow}}/{{run_id}}/"    # always present
  deliver_to:
    type: google_sheets                       # google_sheets | google_doc | hubspot_sequence | slack | none
    name: "SpotDraft Ad Copy — {{run_id}}"   # document/sheet name to create or append to
    format: assembled_ad_table               # format key (determines column structure or doc template)
    tier0_delivery: artifact                 # Tier 0: Claude generates as artifact, user opens in Google (one click)
    mcp_required: google-workspace           # Tier 1: web app uses Google OAuth to create doc and capture URL
    fallback: |
      If neither artifact nor MCP is available:
      Copy the table from the run archive and paste into a new Google Sheet manually.
      Sheet template: client-setup/templates/ad-copy-sheet-template.csv
```

### Figma integration

For `creative_assets` workflows, the Google Sheet is the bridge to Figma:

```
Assembled ads table (Google Sheets)
  ↓
Figma template — frames with layer names matching column headers:
  "headline", "body_copy", "cta"
  ↓
Figma data plugin (e.g. "Google Sheets Sync") reads the sheet,
populates frames, generates N variations per batch
  ↓
Export all frames → upload to ad platform
```

The Figma template must be set up once by the designer: create frames with text layers named exactly `headline`, `body_copy`, `cta`. After that, every ad copy generation run populates it automatically from the Sheet.

Long-term: a Claude Code script using the Figma REST API can replace the manual plugin step — reading the Sheet and generating Figma frame variants programmatically (as described in the Anthropic growth marketing reference). This is Phase 2 of the delivery layer build.

### Delivery agents (built)

Four reusable delivery agents handle all delivery-layer work. They are called by workflows — do not call them directly except when testing.

| Agent | File | Job |
|---|---|---|
| `ad-assembler-agent` | `growth-marketing/agents/ad-assembler-agent.md` | Takes approved copy pairs from quality gate → assembles complete ad units → produces TSV table for Google Sheets (1 row per ad, all 12 columns, char counts verified) |
| `doc-formatter-agent` | `growth-marketing/agents/doc-formatter-agent.md` | Takes any workflow's approved markdown output → formats as a structured Google Doc using the correct template for the document type (7 templates: battlecard, positioning, CMO report, win/loss, competitive digest, creative direction, campaign brief) |
| `hubspot-sequence-builder` | `growth-marketing/agents/hubspot-sequence-builder.md` | Takes approved email sequence → builds draft sequence in HubSpot via HubSpot MCP (sets cadence, exit conditions, sender) → returns HubSpot sequence URL |
| `slack-notifier-agent` | `growth-marketing/agents/slack-notifier-agent.md` | Takes workflow output → formats a scannable Slack notification using the correct template (5 templates: competitive alert, weekly performance, system alert, workflow complete, launch ready) → posts to configured channel |

### MCP requirements for the delivery layer

| MCP | Required for | Tier |
|---|---|---|
| `github` | Archive step — all workflows | Tier 0 required |
| `hubspot` | Email sequence delivery (email-sequence-build) | Tier 0 optional |
| `slack` | Pulse and performance notifications | Tier 0 optional |
| `google-workspace` | Not required for Tier 0 — Claude produces Google Docs/Sheets as artifacts natively | Tier 1 web app handles via Google OAuth |

**Google Docs + Sheets:** No MCP needed. Claude generates the document as a claude.ai artifact → user opens it in their Google account in one click. The `mcp_required: google-workspace` field in workflow YAMLs is a Tier 1 signal — it means the web app should use Google OAuth to create the doc server-side and track the URL.

If a required MCP is not connected when a workflow runs, the workflow still completes — it falls back to GitHub archive only and surfaces the `fallback` message with manual instructions.

---

## What Not to Do

- Do not produce generic output. If `core/` doesn't have enough context to produce specific output, say so and list exactly what's missing.
- Do not skip quality gates. Every asset goes through `asset-quality-gate` before it's presented as ship-ready.
- Do not update `core/` without logging the change in `core/system-intelligence/changelog.md`.
- Do not run L1 launch workflow without confirming tier classification first.
- Do not ask for information that's already in `core/`. Read it.
- Do not produce "notes" or "summaries." Produce deliverables.
- **Do not treat GitHub markdown files as the final output.** GitHub is the intelligence layer. Every workflow that produces a marketer-facing deliverable must write to the correct delivery tool (Google Sheets, Google Doc, HubSpot). A markdown file in a repo is not a deliverable.
