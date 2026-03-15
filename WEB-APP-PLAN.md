# Marketing OS — Web App Plan

## Core Architectural Decision

**No Claude API. Ever.**

All AI execution runs through claude.ai using a Claude Max subscription. The web app makes zero AI calls. It is a management interface, launcher, and results viewer. Claude.ai is the AI execution layer. The GitHub repo is the shared state layer both halves read and write.

This is not a temporary constraint — it is the product model. Clients bring their own Claude Max subscription. There is no AI infrastructure to host, no per-token billing, no API key management.

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Marketing OS Interface                          │
│                                                                     │
│  ┌──────────────────────┐      ┌────────────────────────────┐       │
│  │      Web App          │      │         claude.ai           │       │
│  │  (management + UI)    │      │    (AI execution engine)    │       │
│  │                      │      │                            │       │
│  │  core/ editor        │      │  Workflow execution         │       │
│  │  Workflow launcher ──┼──────►  YAML schema execution      │       │
│  │  Run history viewer  │◄─────┼─ Gate approvals (in chat)   │       │
│  │  Output viewer       │      │  GitHub MCP reads/writes    │       │
│  │  KPI dashboard       │      │  Integration MCPs (data in) │       │
│  │  Settings            │      │                            │       │
│  └──────────┬───────────┘      └────────────┬───────────────┘       │
│             │                               │                       │
│             └───────────────────────────────┘                       │
│                          GitHub Repo                                │
│                  (shared state — single source of truth)            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Delivery Layer (web app)                    │  │
│  │                                                              │  │
│  │  When run completes → web app reads deliver_to from YAML     │  │
│  │  → calls Google Docs/Sheets API with client's stored token   │  │
│  │  → creates Doc/Sheet in client's Drive                       │  │
│  │  → writes URL back to run-summary.md                         │  │
│  │  → run history shows "View in Google Docs" link              │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## What the Web App Does (and Does Not Do)

### Does

| Feature | What it is | How it works |
|---|---|---|
| `core/` editor | Forms to edit ICP, messaging pillars, competitors, goals | Reads/writes files in GitHub repo via GitHub API. Commits on save. |
| Workflow launcher | List of available workflows + input forms + "Run" button | Reads YAML files from repo. On "Run": opens claude.ai with a pre-formatted prompt. |
| Run history | List of past workflow runs with status and outputs | Reads `run-summary.md` files from `runs/` directories in repo |
| Output viewer | Renders the markdown output files from a run | Reads files from the run directory in GitHub repo |
| KPI dashboard | Live performance metrics across channels | Direct API calls to HubSpot, Google Ads, LinkedIn — no Claude in the loop |
| Settings | GitHub repo connection, MCP server status indicators | GitHub OAuth; reads MCP config from repo |

### Does NOT do

- Make any calls to the Claude API
- Execute workflows itself — it hands off to claude.ai
- Schedule automated runs (manual trigger only at Tier 1)
- Host any AI models

### One backend component: token storage

The web app stores two things outside the GitHub repo, both in Supabase (free tier):
- Google OAuth refresh tokens — required for the delivery layer (creating Google Docs/Sheets)
- Integration tokens for HubSpot, LinkedIn Ads, etc. — stored per user, used for KPI dashboard API calls

Everything else lives in the GitHub repo. Supabase is the only exception.

---

## Pages and Components

### 1. Dashboard (home page)

**Purpose:** Status-at-a-glance for the marketing system.

**Sections:**
- **System health strip** — reads `core/system-intelligence/health-dashboard.md` from repo; shows which agents are sharp vs. degrading
- **Recent runs** — last 5 workflow runs with status, timestamp, and link to output
- **KPI snapshot** — 4–6 headline metrics pulled directly from HubSpot and ad platforms (no Claude): MQL volume, pipeline this week, LinkedIn CPL, organic traffic trend
- **Pending actions** — any workflow runs with gate approvals waiting (reads run dirs for runs in `pending_approval` state)
- **`core/` staleness alerts** — reads `core/` file update dates; surfaces any files past their staleness threshold (per `integrations/data-flow.md`)

---

### 2. Workflows

**Purpose:** Browse, configure, and launch workflows.

**Layout:** Two-panel — workflow list on left, detail/inputs on right.

**Workflow list panel:**
- Grouped by system: Growth Marketing / Product Marketing / System Intelligence
- Each workflow shows: name, description (from YAML), last run date, status (never run / ran N days ago / run today)
- Click to open detail panel

**Workflow detail panel:**
- Name, description, estimated steps, which integrations it reads from
- Dynamic input form — generated from the `inputs[]` section of the YAML (each input becomes a form field)
- "Agents involved" — list of agent files this workflow calls (links to output viewer for that agent's most recent output)
- **"Run in Claude" button** — opens claude.ai (in new tab) with a pre-formatted prompt:

```
Please run the [workflow-name] workflow.

YAML schema: [link to file in GitHub repo, or inline the YAML content]

Inputs:
- campaign_brief: [user's input]
- platforms: [user's input]
- pillar_focus: [user's input]

Follow the YAML schema exactly. Start with the preflight validation.
```

- Run history for this workflow (last 10 runs)

---

### 3. Run History + Output Viewer

**Purpose:** See everything a workflow produced.

**Run list:** All runs across all workflows, filterable by workflow name, date range, status.

**Run detail view:**
- Run metadata: workflow, timestamp, inputs used, total steps, gate results
- Step-by-step timeline: each step with status (completed / gate pending / gate rejected / failed) and link to its output file
- Output pane: renders the final deliverable (markdown → formatted HTML)
- Side-by-side: step outputs and the full run summary
- **Delivery status:** for any run whose YAML has a `deliver_to: google_doc` or `deliver_to: google_sheets` block:
  - If URL already in `run-summary.md`: show **"View in Google Docs"** link (blue, opens in new tab)
  - If no URL yet and Google is connected: show **"Create Google Doc"** button → on click, web app calls Google API, creates the doc, writes URL to `run-summary.md`, button becomes a link
  - If Google not connected: show **"Connect Google to enable"** (links to Settings → Integrations)

**Renders from:** `runs/[workflow]/[run-id]/run-summary.md` and step output files in the same directory, read from GitHub repo.

---

### 4. Core Editor

**Purpose:** Edit the `core/` intelligence layer through forms — no Markdown editing required.

**Sections (one page per `core/` file group):**

**Brand**
- Voice and Tone: voice adjectives, tone description, word list (do/don't)
- Messaging Pillars: primary claim + 3 pillars, each with message + proof points + objection
- Style Guide: naming rules, capitalization, CTA rules

**ICP**
- Primary ICP: company profile fields, buying signals, buyer personas (forms)
- Secondary ICP: same structure

**Competitive**
- Competitor list: add/remove/edit competitors
- Each competitor card: all fields from the competitor template as form fields
- Landscape overview: category definition, market map narrative

**Measurement**
- KPI targets: editable table of metrics with targets and cadences
- Attribution model: dropdown for model type, notes field

**How it works:**
- On load: reads the current file from GitHub repo, parses the Markdown into form fields
- On save: converts form state back to Markdown (preserving the file structure), commits to repo with message `[core-editor] update [file] — via web app`
- Conflict detection: if the file was updated on GitHub since last load, warn before overwriting

---

### 5. KPI Dashboard

**Purpose:** Live performance data without running a workflow. Always-on visibility.

**Data sources (all direct API calls — no Claude):**

| Section | Data source | Metrics shown |
|---|---|---|
| Pipeline | HubSpot API | Marketing-sourced pipeline this week, MQL volume, MQL→SQL rate |
| Paid Search | Google Ads API | Spend, CPC, conversions, CPA by campaign |
| Paid Social | LinkedIn Ads API | Spend, CPL, demographic breakdown (top titles clicking) |
| Paid Social | Meta Ads API | Spend, CTR, CPL by format |
| Email | HubSpot API | Open rate, reply rate, click rate by sequence |
| Organic | Semrush API | Keyword ranking changes, organic traffic trend |

**Layout:** 6 channel tiles, each showing last-30-days headline metric + sparkline + vs. target indicator (green / amber / red against KPI framework targets from `core/measurement/kpi-framework.md`).

**Signal flag:** If any metric is >20% below target for 2+ consecutive weeks, show a banner: "3 metrics below target — consider running the weekly-performance-review workflow."

---

### 6. Settings

**Purpose:** Connect the web app to the GitHub repo and configure integrations.

**Sections:**

**Repository**
- GitHub repo URL (the client's fork)
- Branch to read/write (default: main)
- Last sync timestamp
- Test connection button

**Integrations**

**Google (delivery layer):**
- **Connect Google** button — standard OAuth flow. Scopes: `documents`, `spreadsheets`, `drive.file`
- Status: Connected (shows Google account email) / Not connected
- On connect: web app stores refresh token in Vercel KV, keyed to the user's GitHub ID
- On disconnect: token deleted from KV
- What it unlocks: "Create Google Doc" / "Create Google Sheet" buttons in run history; automatic URL writing to `run-summary.md`
- Note: You (operator) set up the Google OAuth app once (`GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` as Vercel env vars). Clients just click Connect — they never touch Google Cloud Console.

**Other integrations (dashboard data):**
- One row per integration: HubSpot, Google Ads, LinkedIn Ads, Meta Ads, Semrush, Gong
- Status: Connected / Not configured
- API key input (stored in Vercel env vars, not in the repo)
- For MCP integrations: shows the MCP server config to paste into claude.ai settings, links to `integrations/[tool].md` for setup guide

**Claude.ai**
- Link to the Claude Project URL (once created)
- Instructions for connecting GitHub MCP to the project
- Test prompt: "Click to open claude.ai and run a test prompt" (verifies MCP is working)

**Team**
- Invite team members (GitHub-based — adds them to the repo with appropriate permissions)
- Role: Admin (can edit `core/`, can approve runs) / Viewer (can see dashboards and history only)

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Fast, well-supported, Vercel-native |
| Styling | Tailwind CSS | Rapid UI, consistent design system |
| Deployment | Vercel | Free tier covers this; instant deploy from GitHub |
| Auth | NextAuth.js + GitHub OAuth | Login with GitHub; repo permissions map directly to app access |
| Data fetching | Server Components + API routes | Repo reads are server-side (GitHub token stays private); dashboard data fetched at request time |
| GitHub integration | Octokit (GitHub SDK) | Read/write repo files, commit on save |
| Google integration | `googleapis` npm package | Create Docs/Sheets, get URLs back; uses client's stored OAuth token |
| Token storage | Supabase (Postgres) | Stores Google OAuth tokens + integration tokens (HubSpot, LinkedIn) per user |
| Integration APIs | Direct fetch calls | HubSpot, Google Ads, LinkedIn, Meta, Semrush — all have well-documented REST APIs |
| Markdown rendering | react-markdown + remark-gfm | Render workflow outputs cleanly |
| State management | React Server Components + minimal client state | No Redux, no Zustand — keep it simple |

**The GitHub repo is the primary data layer.** All workflow outputs, `core/` data, and run history live there. The one exception is OAuth and integration tokens, stored in Supabase (Postgres, free tier) — two tables: `google_tokens` and `integration_tokens`, both keyed by user email.

---

## Build Sequence

### Week 1: Core infrastructure + read-only features

**Day 1–2: Setup**
- Next.js project with Tailwind + Vercel deploy
- GitHub OAuth auth (NextAuth)
- GitHub API integration (Octokit) — read files from repo
- Basic layout: sidebar nav, header, main content area

**Day 3–4: Dashboard + Run history (read-only)**
- Dashboard page: reads health-dashboard.md and recent run summaries from repo
- Run history page: lists all run directories, reads run-summary.md files
- Output viewer: renders markdown output files

**Day 5: Workflows page (read-only + launcher)**
- Reads YAML files from repo, renders workflow list
- Generates input forms from YAML `inputs[]` definitions
- "Run in Claude" button — builds the pre-formatted claude.ai prompt, opens in new tab

### Week 2: Write features + KPI dashboard

**Day 1–2: `core/` editor**
- Parse Markdown files into form state (start with messaging-pillars, ICP, competitor cards)
- Commit changes back to GitHub on save
- Conflict detection

**Day 2–3: Google delivery layer**
- Server action: `createGoogleDoc(runId, workflowName, content, format)` — reads `deliver_to` from YAML, calls Google Docs API, returns URL
- Server action: `createGoogleSheet(runId, workflowName, tsvContent)` — calls Sheets API, writes rows, returns URL
- Both actions write the returned URL back to `run-summary.md` via GitHub API
- Wire up "Create Google Doc" buttons in run history detail view

**Day 3–4: KPI dashboard**
- HubSpot API integration (pipeline, MQL data)
- Google Ads API integration (spend, CPA)
- LinkedIn Ads API integration (CPL, demographics)
- Dashboard tile components with sparklines

**Day 4–5: Settings page + Google OAuth**
- GitHub repo configuration
- Integration status indicators
- MCP configuration display
- **Google OAuth flow:**
  - `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` as Vercel env vars (operator sets up Google Cloud project once)
  - "Connect Google" button → OAuth redirect → exchange code for tokens → store refresh token in Supabase `google_tokens`
  - "Disconnect" → delete row from `google_tokens`
  - Token refresh logic: use refresh token to get new access token on each API call
- Responsive layout, loading states, error handling

### Week 3: Refinement + client handoff

- End-to-end test with SpotDraft data
- Performance (static generation where possible, ISR for dashboards)
- Deployment guide for client forks
- Documentation: how to deploy your own instance

---

## The Claude.ai Handoff: Prompt Format

When the user clicks "Run in Claude", the web app generates this prompt and opens it in claude.ai:

```
/run [workflow-name]

Inputs:
[input_name_1]: [value]
[input_name_2]: [value]
...

Please read the workflow YAML at [workflow-name].yaml in this project's repository and execute it step by step. Start with the preflight validation. Follow the schema exactly — do not skip steps or gates.
```

The claude.ai Project already has the repo connected via GitHub MCP, so Claude can immediately find and read the YAML file.

**For the user:** one click in the web app → claude.ai opens → workflow starts running. No copy-pasting, no navigating to the right workflow file, no remembering syntax.

---

## Client Deployment Model

Each client gets their own instance:

1. Fork this repo to their GitHub org (private)
2. Deploy the web app to Vercel (connect to their GitHub fork)
3. Set environment variables in Vercel:
   - `GITHUB_TOKEN` — GitHub app token with read/write to their repo
   - `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` — shared OAuth app credentials (you set these up once; same values for all clients)
   - `HUBSPOT_ACCESS_TOKEN`
   - `GOOGLE_ADS_*` credentials
   - `LINKEDIN_ACCESS_TOKEN`
   - etc.
4. Set up Supabase: create a free project at supabase.com, run the two `CREATE TABLE` statements from `client-setup/supabase-setup.md`, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel env vars via `printf`
5. Client clicks "Connect Google" in Settings — authorizes once, done
6. Configure GitHub MCP on their claude.ai account (see `client-setup/claude-ai-project-setup.md`)
7. Fill out `core/` via the web app's editor
8. Run first workflow

**Cost per client:**
- Vercel: free tier (hobby) for single-tenant deployment
- GitHub: free (private repo)
- Claude Max: client's own subscription (~$100–200/month)
- Integration APIs: client's existing tool subscriptions
- Total marginal cost to operate: ~$0 beyond Claude Max

---

## Future: Subscription-API Path

When Anthropic introduces a subscription-based API (flat-fee programmatic access), the architecture upgrades without redesign:

- Web app makes Claude API calls directly (using subscription auth, not per-token billing)
- The "Run in Claude" button becomes a "Run" button that executes entirely within the web app
- Gate approvals become real UI buttons (Approve / Reject / Modify) within the app
- claude.ai becomes optional rather than required

The YAML schemas don't change. The GitHub repo stays the state layer. Only the execution path changes: instead of handing off to claude.ai, the web app's API routes make the Claude calls.

This is why the "no API today" constraint is an architectural choice, not a limitation. When the subscription-API product exists, the upgrade path is clean.
