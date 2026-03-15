# Setting Up Your Marketing OS Claude Project

## What You're Building

A Claude Project on claude.ai that is connected to your Marketing OS GitHub repo and your marketing tool integrations. When configured, this becomes the interface for running all Marketing OS workflows — no terminal, no Claude Code.

**Time to complete:** ~30–60 minutes

---

## Prerequisites

- Claude Max subscription (required — the free plan doesn't support Projects with MCP servers)
- GitHub account with your Marketing OS repo forked and private
- Admin access to your marketing tools (HubSpot, Google Ads, etc.)

---

## Step 1: Create the Claude Project

1. Go to [claude.ai](https://claude.ai)
2. Click **Projects** in the left sidebar
3. Click **New Project**
4. Name it: `Marketing OS — [Your Company Name]`
5. Add a project description: "Marketing OS — AI-driven marketing system. Connected to our GitHub repo and marketing tools."

---

## Step 2: Connect GitHub via MCP

This is the most important step. GitHub MCP gives Claude the ability to read and write your repo — so it can access agent files, YAML schemas, `core/` data, and write outputs back.

### Install the GitHub MCP server

1. In your Claude Project, click **Settings** (gear icon) → **MCP Servers**
2. Click **Add MCP Server**
3. Add the GitHub MCP server configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT_HERE"
      }
    }
  }
}
```

### Create a GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token**
3. Name: `marketing-os-claude`
4. Expiration: 1 year (set a calendar reminder to rotate)
5. Scopes: select `repo` (full repo access — needed to read and write files)
6. Click **Generate token** — copy it immediately
7. Paste it into the `GITHUB_PERSONAL_ACCESS_TOKEN` field above

### Test the connection

After adding the MCP server, start a new conversation in the project and type:
```
List the files in the root of [your-github-org]/[your-repo-name]
```

Claude should respond with the file list. If it does, GitHub MCP is working.

---

## Step 3: Connect Marketing Tool MCP Servers

Connect the tools your workflows read data from and deliver output to. Add each one to your Project's MCP Servers config.

**Priority order:**
1. **GitHub MCP** — required. Everything depends on this.
2. **HubSpot** — unlocks email sequence delivery and CRM data for win/loss analysis.
3. Ad platform MCPs (Google Ads, LinkedIn) — needed for live performance data pull. Can be replaced by file upload in the short term.

**Google Docs + Sheets — no MCP required:**
Claude generates Google Doc and Google Sheets outputs as native artifacts in the claude.ai conversation. Click "Open in Google Docs" on any artifact — the document opens live in your Google account. No setup, no credentials, no Cloud Console. See `integrations/google-workspace.md` for details.

---

### HubSpot MCP

Required for: win/loss analysis, email performance, pipeline data.

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "YOUR_HUBSPOT_PRIVATE_APP_TOKEN"
      }
    }
  }
}
```

Setup: see `integrations/hubspot.md` for how to create the Private App token and which scopes to select.

### Google Ads MCP

Required for: weekly performance review, paid search data.

```json
{
  "mcpServers": {
    "google-ads": {
      "command": "npx",
      "args": ["-y", "@google-ads/mcp-server"],
      "env": {
        "GOOGLE_ADS_DEVELOPER_TOKEN": "YOUR_DEVELOPER_TOKEN",
        "GOOGLE_ADS_CLIENT_ID": "YOUR_CLIENT_ID",
        "GOOGLE_ADS_CLIENT_SECRET": "YOUR_CLIENT_SECRET",
        "GOOGLE_ADS_REFRESH_TOKEN": "YOUR_REFRESH_TOKEN",
        "GOOGLE_ADS_CUSTOMER_ID": "YOUR_CUSTOMER_ID"
      }
    }
  }
}
```

Setup: see `integrations/google-ads.md`

### LinkedIn Ads MCP

Required for: LinkedIn campaign performance, demographic breakdowns.

```json
{
  "mcpServers": {
    "linkedin-ads": {
      "command": "npx",
      "args": ["-y", "@linkedin/ads-mcp-server"],
      "env": {
        "LINKEDIN_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN",
        "LINKEDIN_AD_ACCOUNT_ID": "YOUR_AD_ACCOUNT_URN"
      }
    }
  }
}
```

Setup: see `integrations/linkedin-ads.md`

### Gong MCP

Required for: win/loss analysis, customer voice extraction, competitive intelligence from calls.

```json
{
  "mcpServers": {
    "gong": {
      "command": "npx",
      "args": ["-y", "@gong/mcp-server"],
      "env": {
        "GONG_ACCESS_KEY": "YOUR_ACCESS_KEY",
        "GONG_ACCESS_KEY_SECRET": "YOUR_ACCESS_KEY_SECRET"
      }
    }
  }
}
```

Setup: see `integrations/gong.md`

### Semrush MCP

Required for: SEO audit, keyword gap analysis, competitive research.

```json
{
  "mcpServers": {
    "semrush": {
      "command": "npx",
      "args": ["-y", "@semrush/mcp-server"],
      "env": {
        "SEMRUSH_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Setup: see `integrations/semrush.md`

**Connect integrations in priority order.** GitHub is required. HubSpot and one ad platform are the most valuable for early workflows. You can add others as you use those workflows.

---

## Step 4: Set the Project System Prompt

The project system prompt tells Claude who it is and how to behave. This is the most important configuration after GitHub MCP.

Go to your Project → **Edit Project** → **Instructions** and paste the contents of:

```
client-setup/spotdraft-project-system-prompt.md
```

This file is pre-filled for SpotDraft. Copy everything between the triple-dashes in that file — it includes the repo reference, startup sequence, company context, workflow execution rules, quality gate behavior, and workflow quick reference.

**Onboarding a different client?** Use the generic template below.

<details>
<summary>Generic system prompt template (click to expand)</summary>

```
You are the Marketing OS AI for [Company Name].

Your GitHub repo is: [github-org]/[repo-name] (branch: main)

At the start of every conversation:
1. Read CLAUDE.md from the repo — this is your master configuration
2. Read core/brand/voice-and-tone.md and core/icp/primary-icp.md
3. Note any staleness warnings in core/system-intelligence/health-dashboard.md

When asked to run a workflow:
1. Find and read the workflow's YAML file from the repo
2. Execute it step by step, following the schema exactly
3. Write all outputs to the repo under the appropriate runs/ directory
4. Present each gate to the user and wait for approval before proceeding
5. Write the run-summary.md to the repo when complete

When asked to update core/ data:
1. Read the current file from the repo
2. Make the update
3. Write it back with commit message: "[core] update [filename] — [brief reason]"
4. Append to core/system-intelligence/changelog.md

Produce deliverables, not commentary. Lead with the output.
Do not ask for information already in core/. If core/ is incomplete, flag exactly which fields are missing.

Company context:
[Paste the Client Configuration section from CLAUDE.md here]
```
</details>

---

## Step 5: Test the Setup End-to-End

Run this test sequence to verify everything is working:

### Test 1: Repo access
```
Read the file core/icp/primary-icp.md from my repo and summarize who our primary ICP is.
```
Expected: Claude reads the file and summarizes your ICP. If it can't find it, check GitHub MCP connection.

### Test 2: Write access
```
Append a test entry to core/system-intelligence/changelog.md with today's date.
```
Expected: Claude reads the file, appends the test entry, and commits to the repo. Verify in GitHub that the commit appears.

### Test 3: Workflow execution
```
Run the ad-copy-generation workflow. I need a LinkedIn Ads batch for a campaign targeting General Counsels at Series B tech companies. Goal: demo requests. Funnel stage: Conversion. Pillar focus: Pillar 1 (Speed Without Sacrifice).
```
Expected: Claude finds the YAML, validates the inputs, runs the headline agent (generating headlines in your brand voice), presents Gate 1 for your approval, then proceeds to copy generation and quality gate.

---

## Running Workflows

### Method 1: Natural language
```
Run the weekly competitive pulse workflow
```
Claude will find `product-marketing/market-intelligence/workflows/weekly-competitive-pulse.yaml`, confirm inputs with you, and execute.

### Method 2: Explicit command with inputs
```
/run ad-copy-generation
campaign_brief: Goal is demo requests, Series B SaaS companies, targeting GC/VP Legal, CTA is "See SpotDraft in action"
platforms: LinkedIn Ads, Google Ads
pillar_focus: Pillar 1 — Speed Without Sacrifice
```

### Method 3: From the web app (once built)
Click "Run in Claude" from the Workflows page in the web app — claude.ai opens with the prompt pre-filled.

### Gate responses
When Claude presents a gate and asks for your decision:
- Type `approve` to proceed to the next step
- Type `reject: [your specific feedback]` to send it back for revision
- Type `modify: [your specific change]` to apply a targeted edit and re-score

---

## Workflow Reference Card

Paste this somewhere accessible (Notion, Slack pinned message, or the web app's workflow list):

| I want to... | Say this |
|---|---|
| Generate ad creative | "Run ad-copy-generation workflow" |
| Review performance this week | "Run weekly-performance-review workflow" |
| Build a competitive battlecard | "Run new-competitor-battlecard workflow for [competitor name]" |
| Run positioning sprint | "Run new-positioning-sprint workflow" |
| See win/loss patterns | "Run quarterly-win-loss-review workflow" |
| Analyze SEO gaps | "Run seo-audit-sprint workflow" |
| Build an email sequence | "Run email-sequence-build workflow for [segment/goal]" |
| Check competitive landscape | "Run weekly-competitive-pulse workflow" |
| Prepare for a product launch | "Classify and plan launch for [feature name]" |
| Update ICP based on recent customers | "Run icp-quarterly-review workflow" |

---

## Troubleshooting

**Claude says it can't find the repo**
- Verify the GitHub PAT has `repo` scope
- Check the repo name in the MCP config matches exactly (case-sensitive)
- Restart the Claude Project (close and reopen)

**Claude reads files but can't write**
- The PAT needs `repo` scope (not just `read:repo`)
- Check that the repo isn't locked or protected on the branch you're targeting

**MCP server not connecting**
- Verify `npx` is available in your environment (if running MCP locally)
- Check for typos in the MCP server config JSON
- Try the alternative: use the Anthropic desktop app with MCP support instead of the web browser

**Claude is producing generic output that doesn't mention SpotDraft**
- `core/` files may not be populated yet — run through `client-setup/onboarding-checklist.md` Step 2
- Check that the project system prompt is saved and includes the company context

**GitHub commit doesn't appear after Claude says it wrote the file**
- The write may have failed silently — ask Claude: "Did the write to [file] succeed? Can you verify by reading it back?"
- Check Claude's tool call results for any GitHub API error messages
