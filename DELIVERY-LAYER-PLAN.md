# Delivery Layer Build Plan

## The Problem

Every workflow currently produces markdown files in GitHub. This is correct for system intelligence (runs are archived for the pattern analyst). It is wrong as the final output — marketers don't work in GitHub.

The fix is a **delivery layer**: after every workflow archives its run to GitHub, it also writes the output to the tool the marketer actually uses.

## Architecture

```
workflow runs
  → ALWAYS: archive to GitHub runs/  (system intelligence, audit trail)
  → ALWAYS: deliver to marketer's tool  (where the work actually happens)
```

The two destinations are independent. GitHub failing never blocks delivery. Delivery tool unavailable never loses the run archive.

---

## Build Phases

### Phase 1 — Google Workspace output (Docs + Sheets)
**Priority:** P0 — blocks all other delivery work
**MCP required:** Google Workspace MCP (Docs + Sheets)
**Effort:** ~1 day

**What gets built:**

1. `growth-marketing/agents/ad-assembler-agent.md` (new)
   - Takes approved headline+copy pairs from quality gate
   - Assembles complete ad units — one row per ad, all elements, char counts verified
   - Produces a Sheets-ready table with exact column headers: `platform | format | headline | body_copy | cta | headline_chars | body_chars | pillar | frame_type | status`

2. Update `growth-marketing/workflows/ad-copy-generation.yaml`
   - Add assembly step after quality gate (step 4)
   - Add `deliver_to: google_sheets` in output block
   - Sheet name: "SpotDraft Ad Copy — {{run_id}}"
   - Fallback: copy-paste instructions if Sheets MCP not connected

3. `product-marketing/sales-enablement/agents/battlecard-formatter.md` (new)
   - Takes approved battlecard markdown
   - Reformats as a structured Google Doc (sections, headers, proper formatting)
   - Delivers to Google Doc via Docs MCP

4. Update `product-marketing/sales-enablement/workflows/new-competitor-battlecard.yaml`
   - Add `deliver_to: google_doc` in output block
   - Doc name: "{{competitor_name}} Battlecard — {{run_id}}"

5. Update `growth-marketing/workflows/weekly-performance-review.yaml`
   - Add `deliver_to: google_doc` (CMO report format)

6. Update `product-marketing/positioning/workflows/new-positioning-sprint.yaml`
   - Add `deliver_to: google_doc` (living positioning document)

**Test:** Run ad-copy-generation → verify Sheet is created with one row per ad → open Sheet → paste into Figma template.

---

### Phase 2 — HubSpot email delivery
**Priority:** P1 — high value for email workflow
**MCP required:** HubSpot MCP
**Effort:** ~0.5 days

**What gets built:**

1. `growth-marketing/agents/hubspot-sequence-builder.md` (new)
   - Takes approved email sequence (subject lines + body copy per email)
   - Creates a draft sequence directly in HubSpot via HubSpot MCP
   - Sets send cadence, exit conditions from the workflow brief
   - Returns HubSpot sequence URL

2. Update `growth-marketing/workflows/email-sequence-build.yaml`
   - Add `deliver_to: hubspot_sequence` in output block
   - Sequence name: "{{sequence_goal}} — {{run_id}}"
   - Fallback: formatted markdown ready to copy into HubSpot manually

**Test:** Run email-sequence-build → verify draft sequence appears in HubSpot → check subject lines, send cadence, exit conditions match the brief.

---

### Phase 3 — Slack notifications
**Priority:** P2 — high value for weekly cadence workflows
**MCP required:** Slack MCP
**Effort:** ~0.5 days

**What gets built:**

1. `integrations/slack.md` — Slack MCP setup guide

2. Update `product-marketing/market-intelligence/workflows/weekly-competitive-pulse.yaml`
   - Add `deliver_to: slack` notification after competitive monitor step
   - Channel: `#competitive-intel` (configurable)
   - Format: brief signal summary with link to full Google Doc

3. Update `system-intelligence/workflows/weekly-system-review.yaml`
   - Add Slack notification if broken loops detected or agents degraded
   - Channel: `#marketing-os-alerts`

**Test:** Run weekly-competitive-pulse → verify Slack message appears in configured channel with signal summary.

---

### Phase 4 — Figma automation script
**Priority:** P2 — unlocks full creative production pipeline
**MCP/API required:** Figma REST API (personal access token)
**Effort:** ~1 day

**What gets built:**

1. `integrations/figma.md` — Figma API setup + plugin approach guide
   - Option A: Manual (Figma "Google Sheets Sync" plugin reads the Sheet)
   - Option B: Automated (Claude Code script using Figma REST API)

2. `growth-marketing/scripts/figma-populate-frames.md` — Claude Code runbook
   - Reads assembled ads from Google Sheet (by Sheet ID)
   - For each row: duplicates a master frame in the Figma template
   - Sets `headline`, `body_copy`, `cta` text layers to the row values
   - Returns export URLs for all generated frames
   - Can generate up to 100 variations per batch (matches Anthropic doc spec)

3. Update `growth-marketing/workflows/ad-copy-generation.yaml`
   - Add optional Figma step after Sheets delivery
   - Requires: Figma file URL + Figma PAT in settings
   - Skips gracefully if not configured

**Test:** Run ad-copy-generation end-to-end → Sheet populated → Figma script runs → 10+ frame variants generated → export assets.

---

## Delivery Layer YAML Schema

Add `deliver_to` to every workflow YAML output block:

```yaml
output:
  archive:
    path: "runs/{{workflow}}/{{run_id}}/"
  deliver_to:
    type: google_sheets              # google_sheets | google_doc | hubspot_sequence | slack | figma | none
    name: "{{workflow}} — {{run_id}}" # name of doc/sheet/sequence to create
    format: assembled_ad_table       # format key — tells the delivery step how to structure the output
    mcp_required: google-workspace
    fallback: |
      [Instructions for manual delivery if MCP not connected]
```

### Format keys

| Format key | Delivery type | Structure |
|---|---|---|
| `assembled_ad_table` | Google Sheets | Columns: platform, format, headline, body_copy, cta, headline_chars, body_chars, pillar, frame_type, status |
| `battlecard_doc` | Google Doc | H1: Competitor name. Sections per battlecard template. |
| `positioning_doc` | Google Doc | H1: Positioning. Sections: statement, alternatives, attributes, implications. |
| `cmo_report` | Google Doc | H1: Weekly Report. Sections: summary, channel performance, decisions, next week. |
| `email_sequence` | HubSpot | Sequence with N emails, send cadence, exit conditions. |
| `competitive_digest` | Google Doc + Slack | Doc: full analysis. Slack: 3-line summary + link. |
| `exec_presentation` | Google Slides | Title slide + key findings + recommendations. |

---

## Google Sheets Column Structure (Ad Copy)

This is the canonical column structure for `assembled_ad_table`. All downstream tools (Figma plugin, ad platform upload) read this structure.

| Column | Description | Example |
|---|---|---|
| `platform` | Ad platform | LinkedIn Ads |
| `format` | Ad format | Single Image |
| `headline` | Final headline (char-limit verified) | Your legal team isn't slow. Your contracts are. |
| `body_copy` | Full body copy | SpotDraft gets CLM teams live in days... |
| `cta` | CTA text | See SpotDraft in action |
| `cta_url` | Destination URL | https://spotdraft.com/demo |
| `headline_chars` | Character count | 68 |
| `body_chars` | Character count | 148 |
| `pillar` | Messaging pillar | Pillar 1 — Speed Without Sacrifice |
| `frame_type` | Creative frame | Problem-led |
| `quality_status` | Gate result | ✅ Pass |
| `run_id` | Run reference | 2026-03-12-140000 |

Figma layer names in the template must match: `headline`, `body_copy`, `cta` (case-sensitive).

---

## MCP Setup Order (for client onboarding)

1. GitHub MCP — required for everything (already done)
2. Google Workspace MCP — unlocks Docs + Sheets output (Phase 1)
3. HubSpot MCP — unlocks email delivery (Phase 2)
4. Slack MCP — unlocks notifications (Phase 3)
5. Figma PAT — unlocks automated creative production (Phase 4)

Each MCP is independently optional — the system degrades gracefully without any single one, falling back to GitHub archive + manual instructions.

---

## Build Sequence

```
Today:
  [ ] Add Google Workspace MCP to claude-ai-project-setup.md
  [ ] Write ad-assembler-agent.md
  [ ] Update ad-copy-generation.yaml (add assembly step + deliver_to)
  [ ] Write battlecard-formatter.md
  [ ] Update new-competitor-battlecard.yaml (add deliver_to)
  [ ] Update weekly-performance-review.yaml (add deliver_to)
  [ ] Update new-positioning-sprint.yaml (add deliver_to)
  [ ] Push and test end-to-end in Claude project

This week:
  [ ] Write hubspot-sequence-builder.md
  [ ] Update email-sequence-build.yaml (add deliver_to)
  [ ] Write integrations/slack.md
  [ ] Update weekly-competitive-pulse.yaml (add Slack notify)

Next week:
  [ ] Write integrations/figma.md
  [ ] Write growth-marketing/scripts/figma-populate-frames.md
  [ ] Update ad-copy-generation.yaml (add optional Figma step)
  [ ] Test full pipeline: brief → Sheets → Figma → export
```
