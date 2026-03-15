# Marketing OS — Master Plan

> Last updated: 2026-03-15
> This document supersedes all previous plan files. It reflects the current build state and full vision.

---

## Vision

A marketing production OS for any SMB that produces **final, branded, instantly usable outputs** — not drafts, not markdown files, not inputs for other tools. An HTML email ready to send. A LinkedIn ad frame ready to export. A battlecard in a Google Doc shared with the sales team. A condition-specific patient acquisition campaign for a healthcare clinic. A seasonal promotion for a local services business.

The system works with whatever context exists. No brand kit required — it builds one. No integrations required on day one — it processes uploaded files. No designer required — it generates production-ready templates from the website. As integrations and data accumulate, outputs get more specific and more accurate. The system compounds.

**North star:** A client running Marketing OS for 12 months operates at the quality and output level of a team 3x their size. Every agent is measurably sharper than day one. Every output is final, not a starting point.

---

## Settled Architectural Decisions

**1. GitHub = intelligence layer, not output layer.**
GitHub stores: agent definitions, workflow schemas, `core/` intelligence, `runs/` archives. It does not store the marketer's working deliverable.

**2. Every workflow has two output concerns.**
Archive (GitHub, always) + Deliver (the tool the marketer works in). Independent. One cannot block the other.

**3. No Claude API. Ever.**
All AI execution runs through a Claude Max subscription on claude.ai. No per-token billing, no API key management, no AI infrastructure.

**4. Works without integrations.**
GitHub + Google are the only required dependencies. Everything else degrades gracefully.

**5. Final outputs only.**
Every workflow that produces a marketer-facing deliverable must produce something usable immediately without additional production work.

**6. Web app is the primary interface.**
No marketer should ever need to open GitHub or a terminal.

**7. Two delivery paths, not one.**
- **claude.ai delivery** (via Google Workspace MCP): Claude creates Docs/Sheets *during* workflow execution
- **Web app delivery** (via stored Google OAuth token): Web app creates Docs/Sheets *after* the run, from archived markdown

Both must be built. They serve different moments. The YAML `deliver_to` block drives path 1; the "Create Google Doc" button in run history drives path 2.

---

## Current Build State (2026-03-15)

### Done ✅

| Component | Status |
|---|---|
| Web app — all 6 pages (Dashboard, Workflows, Run History, Core Editor, KPI Dashboard, Settings) | ✅ |
| GitHub OAuth login + auth-protected routes | ✅ |
| Google OAuth connect/disconnect (token in Supabase) | ✅ |
| HubSpot / LinkedIn token storage (Supabase) | ✅ |
| Supabase backend (google_tokens + integration_tokens tables live) | ✅ |
| Auto-deploy on push to main (GitHub Actions → Vercel) | ✅ |
| All 10 workflow YAML schemas with `deliver_to` blocks | ✅ |
| `l2-launch-playbook.yaml` — full 7-step schema with checkpoints + gates | ✅ |
| `post-launch-retrospective.yaml` — full 5-step schema + system update loop | ✅ |
| All `on_completion.triggers` + `resume` blocks on weekly workflows | ✅ |
| 46+ agent .md files (all execution agents complete) | ✅ |
| 6 previously missing execution agents built | ✅ |
| 2 YAML filename mismatches fixed | ✅ |
| SpotDraft core/ data (ICP, brand, competitive) | ✅ |
| claude.ai Project setup guide + GitHub MCP setup guide | ✅ |
| KPI dashboard — HubSpot live data + CSV upload | ✅ |
| Workflow launcher — generates claude.ai prompt, copies + opens tab | ✅ |
| Run history — search, pagination, structured detail view | ✅ |
| Core editor — full file tree, on-demand load, Cmd+S save | ✅ |
| Web app delivery API (`/api/google/create`) — creates Google Docs/Sheets from run output | ✅ |
| DeliveryStrip component — "Create Google Doc" / "View in Google Docs" in run history | ✅ |
| `brand-extractor.md` — extracts colors, fonts, logo from website CSS | ✅ |
| `email-template-builder.md` — builds production-ready HTML email template from assets.md | ✅ |
| `figma-template-spec.md` — produces Figma frame spec for designer handoff + ad automation | ✅ |
| `data-ingestion-agent.md` — accepts any file type, extracts structured data, routes to core/ | ✅ |
| `brand-bootstrap.yaml` — 6-step onboarding workflow: extract → review → build templates → commit | ✅ |
| Web app: `/data` page — standalone drag-drop data upload → data-ingestion-agent prompt | ✅ |
| Web app: workflow file attachment — attach CSV/PDF to any workflow run, inlined in Claude prompt | ✅ |
| `pattern-analyst.md` — source-aware signal inventory (`mcp \| upload \| manual`) | ✅ |
| Signal-log format — `source` field added to template + documentation | ✅ |
| Doc-update Stop hook + CLAUDE.md rule — always update docs after shipping changes | ✅ |
| `email-production-agent.md` — assembles production HTML from brand template + approved copy | ✅ |
| `integrations/figma.md` + `figma-populate-frames.md` runbook — Figma API + data plugin pipeline | ✅ |
| `ad-copy-generation.yaml` — optional Figma step 5, condition-gated on PAT configuration | ✅ |
| **Figma plugin** (`figma-plugin/`) — TypeScript plugin: reads assembled ads table → duplicates [Master] frames → swaps headline/body_copy/cta layers → outputs one page per format. TSV paste + Google Sheets URL import. Up to 100 variants in under a second. | ✅ |
| Web app: approval interface — Approve/Reject/Request Changes → writes approval.md to GitHub run directory | ✅ |
| Web app: HTML email preview — iframe in run detail, auto-detects .html files | ✅ |
| Web app: `/assets` page — Asset Library, aggregates all Google Docs/Sheets/HTML emails across all runs, grouped by type | ✅ |
| **Phase 10 — Day 1 Pack** (all agents, YAML, web app UI) | ✅ |
| **Phase 11A — Image Generation** — ~~FAL~~ Nano Banana 2 (Gemini 3.1 Flash Image Preview) — swapped FAL for Gemini; API key stored under `"gemini"` integration ID; 13 ad templates, brand-dna-extractor, ad-image-template-agent, `/api/creative/generate`, RunCreativeGenerator, Images in Asset Library, Gemini key in Settings | ✅ |
| **Phase 11B — Image Generation** — `day-one-research-agent` Brand DNA section, `ad-copy-generation.yaml` Step 5 (generate_image_prompts → ad-image-template-agent) | ✅ |
| **Web app polish** — Fix Quick Launch "Never run" hardcode (shows actual last-run date); scope RunCreativeGenerator to ad-copy + Day 1 Pack only; add Latest Weekly Outputs widget to dashboard; Competitive Intelligence page (`/competitive`) with parsed card grid, staleness badges, "Run Competitive Pulse" CTA | ✅ |
| **Auth JWT fix** — `session.accessToken` now captured on initial sign-in via NextAuth JWT callback; sessions before this deploy require sign-out + sign-in to refresh token | ✅ |
| **Client onboarding wizard** (`/onboard`) — two-step flow: client name → fork template repo (via GitHub API using session.accessToken) or connect existing repo; sets `mkt_os_active_client` cookie; creates client record in Supabase | ✅ |
| **Multi-client cookie routing** — `mkt_os_active_client` cookie (base64url JSON `{id, name, owner, repo}`) read by `getActiveRepoConfig()` in `lib/clients.ts`; scopes all GitHub API calls to active client's repo | ✅ |
| **Supabase multi-tenant migration — all 7 steps run** — `clients`, `client_members`, `github_installations` tables created; `client_id` FK added to `google_tokens` and `integration_tokens`; SpotDraft backfilled as client #1 | ✅ |
| **Figma plugin AI Images tab** — top-level mode switch between Ad Copy and AI Images; fetches `images.json` from any run path via `GET /api/runs/images` (plugin API key auth, no session cookies required); image grid with multi-select; applies as IMAGE fills via `figma.createImage(bytes)` on selected or new frames | ✅ |
| **`GET /api/runs/images`** — Octokit reads `images.json` from any run directory; auth via `PLUGIN_API_KEY` env var (`x-plugin-key` header or `?key=` param) | ✅ |
| **Settings: Figma Plugin section** — displays `PLUGIN_API_KEY` (masked/reveal toggle) for copy into Figma plugin | ✅ |
| **Settings integration allowlist fix** — `VALID_IDS` in `/api/settings/integration` updated to include `"gemini"` (was missing, blocking Gemini API key saves) | ✅ |

### Next Up

| Phase | Trigger |
|---|---|
| **Phase 11C — Figma Bridge** | Plugin-based image→Figma bridge is live (see above). REST API bulk export (auto-populate without plugin install) still deferred. Trigger: first client requests bulk export without Figma Desktop. |
| **Phase 12 — Multi-Tenant** | SQL migration done. Remaining: `github.ts` refactor, server component updates, GitHub App setup. Trigger: onboarding client #2. |

---

## Phase 4 — File Upload as Data Input ✅

| Task | Status |
|---|---|
| Web app: workflow file upload — file attachment panel in WorkflowRunner, inlines CSV content into Claude prompt, binary files (XLSX/PDF) flagged for manual attach | ✅ |
| Web app: performance input panel — standalone `/data` page with drag-drop, auto-detects data type, generates data-ingestion-agent prompt | ✅ |
| `Data Input` nav item added to sidebar | ✅ |
| Updated `pattern-analyst.md` — source-aware signal inventory, flags mcp→upload source shifts as loop health signal | ✅ |
| Updated signal-log format — `source: mcp \| upload \| manual` field in template + source documentation table | ✅ |

**The no-API shortcut for ad platforms:**
Every ad platform has a native Sheets sync (Google Ads → Reports → Schedule; LinkedIn → native Sheets export). These Sheets become data sources via Sheets MCP — full performance data without developer tokens.

---

## Phase 5 — HubSpot + Slack Delivery
*Deferred.*

| Task | Detail |
|---|---|
| HubSpot token connection (deferred — connect in Settings when ready) | Connect HubSpot OAuth in web app Settings |
| Update `email-sequence-build.yaml` | Set primary `deliver_to: hubspot_sequence` |
| `integrations/slack.md` | Slack MCP setup guide |
| Web app: Slack config in Settings | Webhook URL input + channel mapping |
| Web app: HubSpot sequence link in run output | "View in HubSpot" link for email-sequence-build runs |

---

## Phase 6 — Final Output Production ✅

| Task | Status |
|---|---|
| `email-production-agent.md` — assembles production HTML email from brand template + approved copy | ✅ |
| `integrations/figma.md` — Figma plugin setup guide (updated from data plugin to custom plugin) | ✅ |
| `growth-marketing/scripts/figma-populate-frames.md` — Google Sheet → Figma REST API → export manifest runbook | ✅ |
| Update `ad-copy-generation.yaml` — optional Figma step 5 (skips if PAT not configured, skip_message guides setup) | ✅ |
| Web app: HTML email preview — iframe with `srcdoc` in run detail, auto-detects .html files in run directory | ✅ |
| Web app: approval interface — Approve / Reject / Request Changes → writes `approval.md` to run directory via GitHub API | ✅ |
| `/api/runs/approve` route — POST endpoint, auth-protected, prevents overwriting approved decisions | ✅ |
| Landing page deployment | Deferred to Phase 7 |

---

## Ad Hypothesis Memory System ✅

| Component | Status |
|---|---|
| `core/system-intelligence/ad-hypotheses.md` — structured hypothesis log with 4 seed hypotheses for SpotDraft ICP | ✅ |
| `creative-headline-agent.md` — reads ad-hypotheses.md; confirmed findings = constraints, active = test targets, refuted = guardrails | ✅ |
| `creative-copy-agent.md` — reads ad-hypotheses.md; generates parallel language variants for active hypotheses | ✅ |
| `ad-copy-generation.yaml` — log_and_archive step logs new hypotheses and tags run IDs to active ones after every run | ✅ |
| `pattern-analyst.md` — cross-references signal log against hypothesis run IDs; moves confirmed/refuted on sufficient performance data | ✅ |

**How it compounds:** Every ad copy run tags active hypotheses. Pattern analyst reads signal data against tagged run IDs. Confirmed findings become generation constraints. Refuted findings become hard guardrails. After 90 days the agents are measurably shaped by what actually converts for SpotDraft's ICP.

---

## Phase 7A — Dashboard Completeness ✅

| Task | Status |
|---|---|
| Dashboard: pending approvals widget — scans last 10 runs for missing approval.md, amber banner + count + direct links | ✅ |
| Dashboard: `core/` staleness alerts — orange banner, `getCoreFileStaleness()` checks competitor cards (60d) + pillars/ICP (90d) via GitHub commits API | ✅ |
| Overdue workflow signal — blue banner when weekly-performance-review / competitive-pulse / system-review last ran 8+ days ago or never | ✅ |
| Recent runs table — review status column shows Approved / Rejected / Changes requested / Awaiting review per run | ✅ |

---

## Phase 7B — Ad Platform KPI Tiles ✅

| Task | Status |
|---|---|
| Google Ads KPI tile — spend, CPC, clicks, conversions via Google Ads REST API (GOOGLE_ADS_DEVELOPER_TOKEN + GOOGLE_ADS_CUSTOMER_ID + Google OAuth refresh token from Supabase) | ✅ |
| LinkedIn Ads KPI tile — spend, leads, CPL, CTR via LinkedIn Marketing API (token in Supabase, LINKEDIN_ADS_ACCOUNT_ID env) | ✅ |
| Meta Ads KPI tile — spend, leads, CPL, ROAS via Meta Marketing API (META_ADS_ACCESS_TOKEN + META_ADS_ACCOUNT_ID env) | ✅ |
| Meta Ads MCP server (`mcp-servers/meta-ads/`) — 5 tools: account overview, campaign performance, ad performance, top performers, spend by campaign. Builds and runs via Claude Desktop. | ✅ |

---

## Phase 8 — Asset Library ✅

| Task | Status |
|---|---|
| `/assets` page — aggregates all delivered outputs across all runs, grouped by type (Docs, Sheets, HTML emails) | ✅ |

---

## Phase 9 — Landing Page ✅

| Task | Status |
|---|---|
| Marketing page — describes the product, workflow overview, "Get started" CTA. Required before client onboarding. | ✅ |

---

## Phase 10 — Day 1 Pack ✅

> **Vision:** Client enters one URL. System does everything else. In ~90 minutes: every `core/` file populated, 3 complete blog posts, 5 LinkedIn ad units, 3 Google Search ad groups, 5-email welcome sequence, 3 competitor battlecards, homepage copy rewrite. All rendered as actual assets in the web app — not markdown files.

### The Dependency Graph

```
INPUT: website_url
         │
         ▼
PHASE 0 — Research (1 agent, sequential, ~20 min)
  day-one-research-agent
    Crawls: homepage, /pricing, /features, /customers, /about, top blog posts
    Searches: G2, Capterra, "[company] alternatives", competitor sites, Reddit/category
    Produces: raw-research.md
      (product signals, ICP signals, competitive data × 3-5, customer language bank,
       current messaging audit, category intelligence, confidence flags)
         │
         ▼
PHASE 1 — Core Foundation (4 agents, PARALLEL, ~20 min)
  All read raw-research.md, produce simultaneously:
  brand-extractor ──────────→ core/brand/assets.md
  voice-tone-extractor ─────→ core/brand/voice-and-tone.md
  icp-builder ─────────────→ core/icp/primary-icp.md
  competitive-landscape ───→ core/competitive/competitor-[N].md + landscape-overview.md
         │
         ▼
PHASE 2 — Positioning (2 agents, SEQUENTIAL, ~20 min)
  new-positioning-sprint ──→ core/brand/messaging-pillars.md  ← adds write step
  product-narrative-builder → core/brand/narrative.md         ← adds write step
         │
         ▼
  ══ HUMAN GATE (5 min) ══
  "Does this positioning feel right? Approve / change one thing."
  All Phase 3 assets inherit from this decision.
         │
         ▼
PHASE 3 — Growth Assets (5 workflows, PARALLEL, ~30 min)
  All read from completed core/:
  blog-content-agent ──────→ 3 complete posts (1500+ words)
  ad-copy-generation ──────→ LinkedIn (5 units) + Google Search (3 ad groups)
  email-sequence-build ────→ 5-email welcome sequence (HubSpot-ready)
  new-competitor-battlecard → 1 card × N competitors
  website-copy-agent ──────→ Homepage hero + 3 key page rewrites
```

### Build Tasks

#### New Agents

| Task | File | Status |
|---|---|---|
| Day 1 research agent — deep crawl + web search, produces raw-research.md | `client-setup/agents/day-one-research-agent.md` | ✅ |
| ICP builder — synthesizes ICP from research into core/icp/primary-icp.md | `client-setup/agents/icp-builder-agent.md` | ✅ |
| Competitive landscape builder — all competitors in one pass, landscape-overview.md | `client-setup/agents/competitive-landscape-builder.md` | ✅ |
| Voice and tone builder — brand voice from customer language bank → core/brand/voice-and-tone.md | `client-setup/agents/voice-and-tone-builder.md` | ✅ |
| Blog content agent — 3 complete posts, SEO-targeted, business_model-aware, ready to publish | `growth-marketing/agents/blog-content-agent.md` | ✅ |
| Website copy agent — homepage hero + key page rewrites from approved positioning | `growth-marketing/agents/website-copy-agent.md` | ✅ |

#### New Workflows

| Task | File | Status |
|---|---|---|
| Day 1 Pack orchestration — 4 phases, one human gate, writes to core/, produces 5 asset types | `client-setup/workflows/day-one-pack.yaml` | ✅ |

#### Modified Workflows

| Task | File | Change | Status |
|---|---|---|---|
| Positioning sprint writes to core/ | `product-marketing/positioning/workflows/new-positioning-sprint.yaml` | Step 7 (update_core) already writes to `core/brand/messaging-pillars.md` — confirmed ✅ | ✅ |
| Narrative builder writes to core/ | `product-marketing/narrative/agents/product-narrative-builder.md` | Write step added: approved output → `core/brand/narrative.md` | ✅ |

#### Web App

| Task | File | Status |
|---|---|---|
| Dashboard: Day 1 Pack as hero launcher — URL input + "Build your marketing system" CTA (shows until messaging-pillars.md exists) | `web-app/src/app/(app)/dashboard/Day1PackLauncher.tsx` | ✅ |
| Run history: asset renderer — tabbed view for day-one-pack runs: Research / Core Intel / Narrative / Website Copy / Blog Posts / Ads / Email Sequence / Battlecards | `web-app/src/app/(app)/runs/[...slug]/Day1PackView.tsx` | ✅ |
| Retention trigger: Monday digest banner — overdue workflows + staleness summary + mailto: link. Shows when system has been used in last 30 days. | `web-app/src/app/(app)/dashboard/page.tsx` | ✅ |

### Agent Specs

#### `day-one-research-agent.md`
- **Input:** `website_url`, optional `company_name`, `known_competitors`
- **Fetches:** homepage, /pricing, /features, /product, /customers, /case-studies, /about, top 3 blog posts
- **Web searches:** `"[company]" site:g2.com`, `"[company]" site:capterra.com`, `[company] alternatives`, `[company] vs [competitor]`, `best [category] software`, `[category] reddit`, each identified competitor homepage
- **Output structure (`raw-research.md`):**
  - Company fundamentals (product description, price points, sales motion)
  - Product intelligence (exact feature names, integrations, differentiators)
  - ICP signals (explicit targeting, case study profiles, pain/trigger/outcome language)
  - Customer language bank (15+ verbatim phrases from G2/testimonials, grouped by theme)
  - Current messaging audit (exact H1, H2s, CTAs, what they repeat, what they omit)
  - Competitive research × N (positioning claim, top features, pricing, G2 weaknesses, ICP comparison)
  - Category intelligence (G2 category name, how defined, white space)
  - Confidence flags (high/medium/low/MISSING per field)

#### `icp-builder-agent.md`
- **Input:** `raw-research.md`
- **Quality check:** If any field is true for >30% of comparable businesses in the category, it's too generic — revise
- **Output → `core/icp/primary-icp.md`:** Company type/size/stage, `business_model` (one of: `b2b_saas | dtc | healthcare_services | professional_services | retail | other`), buyer/patient personas × 3, key pain (specific), buying/booking trigger, JTBD, NOT ICP, decision criteria, confidence level per field
- **`business_model` detection logic:** Reads sales motion (direct/subscription = b2b_saas, transactional product = dtc, appointment/referral = healthcare_services, retainer/project = professional_services). This field gates Phase 3 agent behavior and Phase 11 image generation path.

#### `competitive-landscape-builder.md`
- **Input:** `raw-research.md` (competitor research already done in Phase 0 — no re-fetching)
- **Output:**
  - `core/competitive/competitor-[name].md` × N (uses existing template)
  - `core/competitive/landscape-overview.md` — positioning map, white space, recommended posture (challenger/leader/category creator), category narrative opportunity

#### `blog-content-agent.md`
- **Input:** core/icp/, core/brand/ (all files), core/competitive/landscape-overview.md, raw-research.md (customer language)
- **Post selection:**
  - Post 1: Decision-stage SEO — "[competitor] alternative" or "[category] for [specific ICP]" keyword
  - Post 2: Problem-awareness — the trigger pain before they know the solution exists
  - Post 3: Proof/outcome — customer profile → before → change → specific outcomes
- **Each post:** title with keyword, meta description (155 chars), 1500-2000 words, H2 structure, 2-3 internal link suggestions, CTA
- **Quality check:** runs asset-quality-gate before returning; must be specific enough to only work for this company

#### `website-copy-agent.md`
- **Input:** all core/
- **Output:** homepage hero (H1 × 2 variants, subheadline, CTA), 3 feature blocks, pricing page hook, nav copy, "why now" urgency paragraph

#### `day-one-pack.yaml` gate behavior
```yaml
gate:
  type: human_approval
  present_as: |
    Positioning ready. Before generating ads, blog posts, emails, and battlecards — confirm this is right.

    Positioning claim: {{messaging_pillars.primary_claim}}
    Who it's for: {{icp.primary_buyer}} at {{icp.company_type}}
    Key differentiator: {{messaging_pillars.key_differentiator}}
    Never say: {{messaging_pillars.avoid}}

    All Phase 3 assets will be built from this.
    Reply: approve / modify [field]: [change]
  on_approve: continue_phase_3
  on_modify: update_messaging_pillars_then_continue
  on_reject: rerun_positioning_sprint_with_feedback
```

### Acceptance Criteria

1. Client enters URL in web app → claude.ai opens with pre-formatted prompt
2. Claude runs phases 0-2 (~40 min), presents positioning for review
3. Client approves in 5 min
4. Phase 3 runs (~30 min)
5. Web app shows run in history with tabbed asset view
6. Blog posts, ads, email sequence are readable/copyable in the web app without opening any markdown file
7. **Quality bar:** every output must be specific enough that it "could only be for [company name]" — generic output that could apply to any company in the category fails

### Build Order

1. `day-one-research-agent.md` — foundation; everything else depends on research quality
2. `icp-builder-agent.md` + `competitive-landscape-builder.md` — Phase 1 parallel agents
3. Fix `new-positioning-sprint.yaml` + `product-narrative-builder.md` → write to core/
4. `blog-content-agent.md` — highest-visibility Day 1 deliverable
5. `website-copy-agent.md`
6. `day-one-pack.yaml` — wires everything together
7. Web app: Dashboard Day 1 Pack launcher
8. Web app: Run history asset renderer

---

## Phase 11 — Creative Image Generation 🔜

> **Vision:** Approved ad copy from Phase 3 of the Day 1 Pack triggers automatic image generation. Client sees production-ready ad images — with their brand colors, typography, and (for product businesses) real product photos — in the web app within minutes of copy approval. No designer required on Day 1.

**Client base note:** This system works for any SMB — B2B SaaS, DTC, healthcare, local services, professional services, retail. The image generation path differs by `business_model` type (see below), but the template library and Brand DNA methodology apply universally.

**In-pipeline validation client:** Aelira Lung Care (aelira.in) — advanced pulmonary diagnostics + rehabilitation center, South Delhi. Their use case reveals a third major execution path (services/healthcare) not covered by the original B2B SaaS / DTC split. Condition-specific patient acquisition creative, educational infographics, trust/credential content, and seasonal campaigns (Delhi pollution season Oct–Feb) are their primary image generation needs.

---

### How It Works

```
Phase 3 output: approved ad copy (headline + body + CTA) × N variants
         │
         ▼
brand-dna-extractor ──→ Brand DNA block
  (visual system: hex colors, font families, CTA button style,
   photography direction, Image Generation Prompt Modifier)
         │
         ▼
ad-image-template-agent ──→ populated template prompts × N
  (reads: ad-image-templates/ library + Brand DNA block + approved copy)
  (selects: best template format per copy variant)
         │
         ▼
/api/creative/generate (web app API route)
  ──→ Gemini 3.1 Flash Image Preview (Nano Banana 2)
       endpoint: generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent
       auth: x-goog-api-key (stored per-user in Supabase under integration_id = "gemini")
       response: base64 inline_data → data URL returned to client
         │
         ├── B2B SaaS / professional services:
         │   text-to-image via generationConfig.responseModalities = ["TEXT","IMAGE"]
         │   brand colors + typography-dominant layouts
         │   abstract backgrounds, data visualizations
         │
         ├── DTC / product SMBs:
         │   same endpoint; product reference photos inlined as context in prompt
         │   photorealistic product shots in brand context
         │
         └── Healthcare / local services (e.g. Aelira):
             text-to-image endpoint (no product photos)
             facility photos as optional style reference
             condition-specific emotional registers per patient segment
             educational infographic generation
             seasonal/contextual hooks (pollution season, awareness days)
         │
         ▼
web app: image gallery in run detail
  → download individual assets
  → bulk export ZIP
  → "Open in Figma" handoff (Phase 11B)
```

---

### Brand DNA Block

Every client has a Brand DNA block written to `core/brand/brand-dna.md` during the Day 1 Pack (enhanced `day-one-research-agent`). This is the visual intelligence layer for image generation.

```markdown
# Brand DNA

## Visual System
- Primary hex: #1A1A2E
- Secondary hex: #E94560
- Accent hex: #0F3460
- Font family (headings): Inter Bold
- Font family (body): Inter Regular
- CTA button style: rounded, primary hex fill, white text
- Logo safe zone: 24px minimum

## Photography Direction
- Style: clean, professional, bright backgrounds
- Subjects: legal professionals, office environments, contract documents
- Avoid: stock-photo handshakes, generic team shots, overly posed

## Ad Creative Style
- Dominant visual element: [typography | product | person | data]
- Background treatment: [solid | gradient | scene | abstract]
- Layout tendency: [text-heavy | image-heavy | balanced]

## Image Generation Prompt Modifier
[50-75 word paragraph prepended to every image generation prompt]
"Professional B2B SaaS advertisement with clean typography. Brand colors: deep navy (#1A1A2E) with red accent (#E94560). Modern, minimal layout. Legal/contract context. High contrast. No handshakes or stock clichés. Sharp, authoritative visual language. Suitable for LinkedIn and Google Display. Resolution: 1200×628."
```

The Prompt Modifier is the compounding asset — it gets sharper as the system learns what converts.

---

### Ad Template Library

`growth-marketing/templates/ad-image-templates/` — library of proven ad format templates with bracketed placeholders. This library grows over time as formats are validated in market and becomes the system's key compounding advantage.

Initial templates (Phase 11 launch):

| Template | Format | Best for |
|---|---|---|
| `headline-dominant.md` | Bold headline center, small subtext, CTA | B2B SaaS, awareness |
| `testimonial-card.md` | Quote + avatar + company logo + stat | Social proof, consideration |
| `us-vs-them.md` | Split comparison, problem left / solution right | Competitive, decision |
| `stat-callout.md` | Large number dominant, context below | Proof, awareness |
| `product-screenshot.md` | UI screenshot + headline + CTA | B2B SaaS, consideration |
| `product-photo.md` | Hero product shot + minimal text + CTA | DTC/product, all stages |
| `ugc-style.md` | Raw aesthetic, personal caption, low-fi | DTC/product, awareness |
| `before-after.md` | Split: pain state left / outcome state right | All SMB types, consideration |
| `educational-infographic.md` | Diagram + headline + explanatory callouts | Healthcare, fintech, legal, any category where the service needs explaining before buying |
| `trust-and-credentials.md` | Doctor/expert photo + credential badge + quote | Healthcare, professional services, high-trust categories |
| `segment-specific-condition.md` | Patient/customer segment headline + condition context + CTA | Healthcare, wellness — e.g. "Asthma" vs "COPD" vs "Post-COVID" each get distinct visual registers |
| `seasonal-campaign.md` | Urgency-led, contextual hook + offer/CTA | Any SMB with seasonal demand peaks — healthcare (pollution season), retail (festive), services (tax season) |
| `local-context.md` | City/neighborhood visual context + local proof + CTA | Local services businesses — ties the ad visually to the client's geography |

Each template file contains:
- Platform specs (dimensions per platform)
- Visual layout description (layered zones)
- Prompt template with `{{headline}}`, `{{body_copy}}`, `{{cta}}`, `{{brand_dna}}` placeholders
- Best-use guidance (stage, audience, platform)
- Performance notes (updated by pattern-analyst after market validation)

---

### Build Tasks

#### New Agents

| Task | File | Status |
|---|---|---|
| Brand DNA extractor — visual system research from website CSS, design files, existing ads | `client-setup/agents/brand-dna-extractor.md` | ✅ |
| Ad image template agent — selects best template per copy variant, fills placeholders, builds complete FAL prompt | `growth-marketing/agents/ad-image-template-agent.md` | ✅ |

#### New Files

| Task | File | Status |
|---|---|---|
| Brand DNA template | `core/brand/brand-dna.md` (template) | ✅ |
| Ad image template library — 13 templates (expanded from 8) | `growth-marketing/templates/ad-image-templates/` | ✅ |
| FAL API integration guide | `integrations/fal-api.md` | ✅ |

#### Web App

| Task | File | Status |
|---|---|---|
| `/api/creative/generate` route — accepts prompt → calls FAL API (FLUX Schnell) → saves to images.json → returns URL | `web-app/src/app/api/creative/generate/route.ts` | ✅ |
| Run detail: `RunCreativeGenerator` — brand DNA pre-loaded, template selector, size selector, generate + gallery | `web-app/src/app/(app)/runs/[...slug]/RunCreativeGenerator.tsx` | ✅ |
| Settings: FAL API key — `TokenForm` row, stored in Supabase integration_tokens | `web-app/src/app/(app)/settings/SettingsContent.tsx` | ✅ |
| Asset library: Generated Images section — grid view, download, run link (scans last 20 runs for images.json) | `web-app/src/app/(app)/assets/page.tsx` | ✅ |
| `integration-kv.ts`: add "fal" to IntegrationId type | `web-app/src/lib/integration-kv.ts` | ✅ |
| FAL product image upload — UI for DTC clients to upload product reference photos | `web-app/src/app/(app)/settings/page.tsx` | ⬜ Phase 11B |

#### Modified Workflows

| Task | File | Change | Status |
|---|---|---|---|
| Day 1 research agent: capture Brand DNA | `client-setup/agents/day-one-research-agent.md` | Add Brand DNA section to raw-research.md output: visual system, photography direction, Prompt Modifier. For healthcare/local services: also extract conditions treated, patient segments, peak seasonal demand windows, doctor credentials, review sentiment themes. | ✅ |
| Ad copy generation: trigger image generation | `growth-marketing/workflows/ad-copy-generation.yaml` | Add Phase 11 step after quality gate approval: → ad-image-template-agent → /api/creative/generate | ✅ |

---

### Execution Paths by Business Model

| | B2B SaaS / Professional Services | DTC / Product SMBs | Healthcare / Local Services (e.g. Aelira) |
|---|---|---|---|
| FAL endpoint | `text-to-image` | `edit` (image reference) | `text-to-image` with optional facility photo style seed |
| Reference photos | Not applicable | Client uploads 1–14 product photos | Optional: facility/equipment photos as visual style reference |
| Visual dominant | Typography + data + abstract | Real product in context | People, environment, condition context, educational diagrams |
| Primary templates | headline-dominant, stat-callout, us-vs-them, testimonial-card | product-photo, ugc-style, before-after | educational-infographic, trust-and-credentials, segment-specific-condition, seasonal-campaign, local-context |
| Prompt Modifier tone | Professional, authoritative, minimal | Authentic, product-forward, lifestyle-adjacent | Reassuring, medically credible, empathetic — per-segment register (e.g. "post-COVID anxiety" vs "COPD management") |
| Seasonal logic | None by default | Promotional calendar | First-class — peak seasons (Delhi pollution Oct–Feb), awareness days (World Asthma Day, World COPD Day) baked into campaign triggers |
| Setup requirement | None | One-time product photo upload | None (optional: facility photo upload for visual style seeding) |

The system detects client type from `core/icp/primary-icp.md` (`business_model` field: `b2b_saas \| dtc \| healthcare_services \| professional_services \| retail`) and routes automatically. For healthcare clients, the `day-one-research-agent` also extracts: conditions treated, patient segments, peak seasonal demand periods, and trust signals (doctor credentials, certifications, review themes) — all fed into the Brand DNA block and the Prompt Modifier.

---

### Cost Model

| Run type | Images | Est. cost |
|---|---|---|
| Full template library run (8 templates × 5 copy variants) | 40 images | ~$3.20–$4.80 |
| Targeted run (3 best templates × 5 variants) | 15 images | ~$1.20–$1.80 |
| Day 1 Pack full creative suite | ~40 images | ~$3.20–$4.80 |

Cost basis: FAL API Nano Banana 2 at ~$0.08–0.12/image (1K–2K resolution). At a $500/mo client retainer, image generation is <1% of revenue.

---

### Sequencing

Phase 11 runs **after** Phase 10 Day 1 Pack is live. The natural trigger is the Day 1 Pack Phase 3 ad copy approval — once copy is approved, image generation is the automatic next step.

Phase 11A (web app + API): `/api/creative/generate` route + FAL integration + basic image gallery
Phase 11B (template library + agent): full template library + `ad-image-template-agent` + per-client Prompt Modifier
Phase 11C (Figma bridge): auto-populate Figma frames with generated images via Figma REST API (replaces plugin step for image-based creative)

---

### Expanding the scope: beyond "ad creative"

The original framing was image generation for ads. The Aelira use case reveals the full surface area:

| Use case | What gets generated | Who needs it |
|---|---|---|
| Paid ad creative | Headlines + body + CTA → static image ad | All |
| Organic social content | Educational post image, carousel frame, quote card | Healthcare, services, DTC |
| Educational infographics | "How does a PFT test work?" / "What is DLCO?" | Healthcare, fintech, legal |
| Seasonal campaigns | Delhi AQI spike → "Check your lungs" campaign image | Healthcare, retail, local services |
| Condition-specific patient acquisition | Asthma segment vs. COPD segment vs. post-COVID — different visual registers, same service | Healthcare |
| Trust and credentialing content | Doctor + credential + quote overlay | Healthcare, professional services |
| Awareness day content | World Asthma Day (May 2), World COPD Day (Nov), World Lung Day (Sept 25) | Healthcare |
| Local context creative | Delhi skyline + AQI indicator + "Is your air making you sick?" | Local services |

The template library covers all of these. The `ad-image-template-agent` selects the right template per brief — not just for paid ads but for any content type that needs a visual asset.

**Implication for the agent:** rename the agent's internal framing from "ad copy → ad image" to "approved content brief → visual asset." The input is a content brief (headline, message, context, segment), not only an ad copy pair. This unlocks organic social, educational content, and awareness campaigns — not just paid creative.

---

### Deferred: Firehose Real-Time Competitive Intelligence

**What it is:** Firehose (firehose.com) streams 8B+ pages/day crawled by Ahrefs — real-time web content via SSE.
**The case:** Turns weekly reactive competitive pulse into continuous automated signal detection (new ad copy, pricing changes, category positioning shifts, new case studies).
**The architecture:** Vercel cron function polls Firehose SSE stream → filters by competitor domains + category keywords → writes signal files to GitHub `core/system-intelligence/signal-log/` → web app dashboard surfaces signal count → weekly-competitive-pulse workflow reads pre-populated signals.
**Why deferred:** Firehose has not announced public paid pricing. No pricing = no build decision.
**Trigger to build:** Firehose announces paid pricing. If cost < $200/mo, build immediately — the integration ROI is clear.

---

## Deferred

| Task | Reason |
|---|---|
| HubSpot delivery (`email-sequence-build.yaml` → HubSpot draft) | User deprioritized — connect when needed |
| Slack delivery (pulse + performance notifications) | User deprioritized — connect when needed |
| Content calendar | Complex; unclear ROI until multiple active campaigns exist |
| Firehose real-time competitive intelligence | No public pricing yet — build when pricing announced |

---

## Delivery YAML Schema (reference)

```yaml
output:
  archive:
    path: "runs/{{workflow}}/{{run_id}}/"
  deliver_to:
    type: google_sheets                       # google_sheets | google_doc | hubspot_sequence | slack | none
    name: "SpotDraft Ad Copy — {{run_id}}"
    format: assembled_ad_table               # format key
    tier0_delivery: artifact                 # Tier 0: Claude generates as artifact, user opens in Google
    mcp_required: google-workspace           # Tier 1: web app uses stored OAuth token
    fallback: |
      Copy the table and paste into a new Google Sheet manually.
```

### Format keys

| Key | Type | Structure |
|---|---|---|
| `assembled_ad_table` | Google Sheets | platform, format, headline, body_copy, cta, cta_url, headline_chars, body_chars, pillar, frame_type, quality_status, run_id |
| `battlecard_doc` | Google Doc | H1: Competitor. Sections per battlecard template. |
| `positioning_doc` | Google Doc | Statement, alternatives, attributes, implications. |
| `cmo_report` | Google Doc | Summary, channel performance, decisions, next week. |
| `email_sequence` | HubSpot | N emails, send cadence, exit conditions. |
| `competitive_digest` | Google Doc + Slack | Doc: full analysis. Slack: 3-line summary + link. |
| `exec_presentation` | Google Slides | Title + key findings + recommendations. |

---

## Agent Files: Status

| Agent | Location | Status |
|---|---|---|
| `ad-assembler-agent.md` | `growth-marketing/agents/` | ✅ |
| `doc-formatter-agent.md` | `growth-marketing/agents/` | ✅ |
| `hubspot-sequence-builder.md` | `growth-marketing/agents/` | ✅ |
| `slack-notifier-agent.md` | `growth-marketing/agents/` | ✅ |
| `campaign-strategist-agent.md` | `growth-marketing/agents/` | ✅ |
| `creative-brief-agent.md` | `growth-marketing/agents/` | ✅ |
| `battlecard-writer.md` | `product-marketing/sales-enablement/agents/` | ✅ |
| `positioning-researcher.md` | `product-marketing/positioning/agents/` | ✅ |
| `value-mapping-agent.md` | `product-marketing/positioning/agents/` | ✅ |
| `positioning-writer.md` | `product-marketing/positioning/agents/` | ✅ |
| `brand-extractor.md` | `client-setup/agents/` | ✅ |
| `brand-dna-extractor.md` | `client-setup/agents/` | ✅ |
| `email-template-builder.md` | `client-setup/agents/` | ✅ |
| `figma-template-spec.md` | `client-setup/agents/` | ✅ |
| `data-ingestion-agent.md` | `system-intelligence/agents/` | ✅ |
| `blog-content-agent.md` | `growth-marketing/agents/` | ✅ |
| `website-copy-agent.md` | `growth-marketing/agents/` | ✅ |
| `ad-image-template-agent.md` | `growth-marketing/agents/` | ✅ |
| `day-one-research-agent.md` | `client-setup/agents/` | ✅ |
| `icp-builder-agent.md` | `client-setup/agents/` | ✅ |
| `competitive-landscape-builder.md` | `client-setup/agents/` | ✅ |
| `voice-and-tone-builder.md` | `client-setup/agents/` | ✅ |

---

## Phase 12 — Multi-Tenant Web App 🔜

> **Goal:** One Vercel deployment serving N clients, each with their own GitHub repo and their own data isolation. Zero backend migration — GitHub stays as the intelligence layer; only the repo reference becomes a runtime parameter.

**Trigger:** When onboarding client #2 (Aelira, or any second client). Do not build before then — complexity without payoff.

**Architectural principle:** The web app is already stateless. It reads from GitHub and writes to GitHub. "Multi-tenant" means: *which GitHub repo?* That's the only change. Everything else — agents, workflows, core/ structure — is identical per client.

---

### What Changes vs. What Doesn't

**Doesn't change:**
- GitHub as intelligence/execution layer (agents still write to GitHub via MCP on claude.ai)
- Next.js / Vercel deployment (still one project)
- Supabase for token storage (already exists)
- All agent `.md` files and workflow YAMLs (identical per client)
- `core/` directory structure (every client fork has the same layout)

**Changes:**
- `github.ts` — repo reference becomes a parameter, not a hardcoded env var
- Auth — every logged-in user is associated with a client (via Supabase)
- GitHub access — GitHub App replaces PAT; installation tokens are scoped per client repo
- Two new Supabase tables (`clients`, `client_members`)
- Onboarding flow — first-login "Connect your repo" wizard
- Client selector — UI for users who belong to multiple clients (operators, agencies)

---

### Supabase Schema

Two tables. That's it.

```sql
-- Which GitHub repos (clients) are registered
create table clients (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  github_repo  text not null unique,   -- e.g. "org/marketing-os-fork"
  created_at   timestamptz default now()
);

-- Who has access to which client
create table client_members (
  client_id   uuid references clients on delete cascade,
  user_email  text not null,           -- matches GitHub OAuth email
  role        text not null default 'member',  -- 'admin' | 'member'
  primary key (client_id, user_email)
);
```

**Existing tables stay unchanged.** `google_tokens`, `integration_tokens`, and any other token tables get a `client_id` FK added as a non-breaking migration (nullable first, backfill SpotDraft's `client_id`, then make required).

```sql
-- Non-breaking migration for existing token tables
alter table google_tokens      add column client_id uuid references clients;
alter table integration_tokens add column client_id uuid references clients;
-- Backfill: set client_id = (select id from clients where name = 'SpotDraft')
-- Then: alter table google_tokens alter column client_id set not null;
```

---

### GitHub Access: GitHub App replaces PAT

**Today:** `GITHUB_TOKEN` env var (PAT) hardcoded in Vercel — all web app GitHub reads use it; scoped to one repo.

**Multi-tenant:** A GitHub App installed per client repo. Each installation has its own token, scoped only to that client's fork. No cross-client access possible even if the token leaks.

**Flow:**
1. Client creates GitHub fork of marketing-os
2. During onboarding wizard: "Install the Marketing OS GitHub App on your repo"
3. GitHub redirects back with `installation_id`
4. Web app exchanges `installation_id` → short-lived installation token (1hr, auto-refreshable)
5. Token is stored in Supabase `github_installations` table (not in env vars)

```sql
create table github_installations (
  client_id       uuid references clients on delete cascade primary key,
  installation_id bigint not null unique,
  created_at      timestamptz default now()
);
```

The `github.ts` module fetches a fresh installation token before every GitHub API call — tokens are short-lived and auto-refreshed via the GitHub App's JWT.

**During transition (before GitHub App is ready):** Clients add their own PAT in Settings. Stored in Supabase `github_installations` as `personal_access_token` (nullable alongside `installation_id`). GitHub App replaces this without breaking existing behavior.

---

### `github.ts` Refactor

The only code change that touches every page.

```typescript
// Before — repo hardcoded from env var
const REPO = process.env.GITHUB_REPO!;

export async function getFile(path: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN!;
  // ... fetch from REPO
}

// After — repo as parameter, token from Supabase
export async function getFile(path: string, repo: string, token: string): Promise<string | null> {
  // ... fetch from repo using token
}

// Helper used by every server component / route handler
export async function getClientContext(userEmail: string): Promise<{ repo: string; token: string }> {
  const client = await supabase
    .from('client_members')
    .select('clients(github_repo, github_installations(installation_id))')
    .eq('user_email', userEmail)
    .single();

  const repo = client.data.clients.github_repo;
  const installationId = client.data.clients.github_installations.installation_id;
  const token = await getInstallationToken(installationId); // exchanges App JWT → installation token

  return { repo, token };
}
```

Every server component that currently calls `getFile(path)` changes to:
```typescript
const { repo, token } = await getClientContext(userEmail);
const content = await getFile(path, repo, token);
```

This is mechanical — find-and-replace + add the `getClientContext` call. No logic changes.

---

### Onboarding Flow (First Login)

New users who aren't in `client_members` hit a setup wizard instead of the dashboard.

**Step 1 — Create client:**
```
Welcome to Marketing OS
Name your workspace: [________________]
```

**Step 2 — Connect GitHub repo:**
```
Connect your GitHub repo
Paste your fork URL: [github.com/your-org/marketing-os]
─── or ───
[Install GitHub App]  ← installs on the fork, returns installation_id
```

**Step 3 — Confirm:**
```
✅ Connected: your-org/marketing-os
✅ We found your core/ directory

[Open Dashboard →]
```

The wizard writes a row to `clients` + `client_members`. From this point, every API call is scoped to their repo.

---

### Client Selector UI (for operators / agencies)

Users in multiple `client_members` rows (e.g. the SpotDraft operator also onboards Aelira) see a client switcher in the top navigation.

```
[SpotDraft ▾]  ← dropdown, switches active client context
  SpotDraft
  Aelira
  ─────────
  + Add client
```

Active client stored in a cookie (`marketing_os_client_id`). All server components read this cookie to resolve which GitHub repo to query. Switching client reloads the page.

---

### Build Tasks

| Task | File | Status |
|---|---|---|
| Supabase: `clients` + `client_members` tables | `client-setup/supabase-multitenant-migration.sql` (steps 1-4) | ✅ run |
| Supabase: `github_installations` table | `client-setup/supabase-multitenant-migration.sql` (step 3) | ✅ run |
| Supabase: add `client_id` FK to existing token tables (nullable migration) + SpotDraft backfill | `client-setup/supabase-multitenant-migration.sql` (steps 5-7) | ✅ run |
| Client onboarding wizard — fork template or connect existing repo, sets active client cookie | `web-app/src/app/(app)/onboard/` | ✅ |
| `POST /api/clients/fork` — creates GitHub fork via Octokit using session.accessToken, writes client record | `web-app/src/app/api/clients/fork/route.ts` | ✅ |
| `POST /api/clients` — connect existing repo, writes client record | `web-app/src/app/api/clients/route.ts` | ✅ |
| `lib/clients.ts` — `createClientRecord`, `buildClientCookie`, `getActiveRepoConfig`, cookie constants | `web-app/src/lib/clients.ts` | ✅ |
| `github.ts` refactor — repo + token as params, `getClientContext()` helper | `web-app/src/lib/github.ts` | ⬜ |
| Update all server components to use `getClientContext()` | all pages that call `getFile` / `listDirectory` | ⬜ |
| GitHub App: create + configure (repo + contents read/write) | GitHub Developer Settings | ⬜ |
| `/api/github/callback` — exchanges installation_id → stores in Supabase | `web-app/src/app/api/github/callback/route.ts` | ⬜ |
| Middleware: redirect unconfigured users to `/onboard` | `web-app/src/middleware.ts` | ⬜ |
| Client selector dropdown in top nav | `web-app/src/components/ClientSelector.tsx` | ⬜ |
| Settings: personal PAT fallback (bridge before GitHub App rollout) | `web-app/src/app/(app)/settings/page.tsx` | ⬜ |

---

### Sequencing

**Done:** All 7 Supabase migration steps run. SpotDraft backfilled as client #1. Onboarding wizard live at `/onboard` — handles both fork and connect-existing flows. Cookie routing scaffolded.

**When onboarding client #2:** Do the remaining items. Estimated effort: ~6–8 hours — `github.ts` refactor (2h), server component updates (3h), middleware (30m), GitHub App setup (1h), client selector UI (30m).

**Order of operations:**
1. ~~Supabase tables + SpotDraft backfill~~ ✅ done
2. `github.ts` refactor (mechanical, do first — everything else depends on it)
3. Server component updates (find-and-replace + `getClientContext` calls)
4. ~~Onboarding wizard~~ ✅ done (fork/connect flow)
5. Middleware (redirect unconfigured users)
6. Client selector UI
7. GitHub App (can do PAT bridge first, migrate to App later)

---

### What This Unlocks

- Onboard any client without a new Vercel deployment
- Each client's data is fully isolated (repo-scoped tokens, no cross-client reads)
- Agency model: one operator manages multiple client workspaces
- Foundation for Tier 2 (add billing, team roles, scheduled runs — all built on this same schema)

---

## Open Questions

1. **Approval UX with no-API architecture** — Phase 6 visual approvals: web app writes approval file to GitHub → Claude checks on next run. Works but introduces latency. Non-blocking until Phase 6.

2. **Landing page hosting model** — Option A (one Vercel project per client, pages as routes) is simplest. Default to this.

3. **Figma template ownership** — Phase 6 targets Figma API creation (fully automated). Until then: designer creates once from `figma-template-spec.md` agent output.

4. **Multi-campaign management** — Content calendar in Phase 7 partially solves. Full solution may require campaign object in `core/`.

5. **Client data isolation at Tier 2** — Handled by Phase 12 multi-tenant architecture. Each client = own GitHub repo + own Supabase `client_id`. Database-level isolation is native to this model.
