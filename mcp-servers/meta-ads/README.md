# Meta Ads MCP Server

Query Meta campaign performance, spending data, and ad effectiveness directly inside Claude Desktop — no switching to Ads Manager.

Replicates the approach from Anthropic's internal growth marketing case study: "created an MCP server integrated with Meta Ads API to query campaign performance, spending data, and ad effectiveness directly within the Claude Desktop app."

---

## Setup

### 1. Get a Meta Ads API access token

**Option A — System User token (recommended for ongoing use):**
1. Go to [Meta Business Manager](https://business.facebook.com)
2. **Settings → Users → System Users → Add**
3. Name it `marketing-os`, role: **Admin**
4. Click the system user → **Add Assets** → select your Ad Account → assign **Analyze & Advertise** role
5. Click **Generate New Token** → select your app → check `ads_read` and `ads_management` scopes
6. Copy the token — it doesn't expire unless manually revoked

**Option B — User access token (for testing):**
Use the [Meta Graph API Explorer](https://developers.facebook.com/tools/explorer/) — select your app, generate a token with `ads_read` scope. Valid for 60 days.

### 2. Get your Ad Account ID

1. In Meta Ads Manager, click the account name in the top left
2. Copy the **Account ID** (numbers only, e.g. `1234567890`)

### 3. Install and build

```bash
cd mcp-servers/meta-ads
npm install
npm run build
```

### 4. Configure Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-servers/meta-ads/dist/index.js"],
      "env": {
        "META_ADS_ACCESS_TOKEN": "your_token_here",
        "META_ADS_ACCOUNT_ID": "1234567890"
      }
    }
  }
}
```

Restart Claude Desktop. The Meta Ads tools will appear in the tools panel.

---

## Available tools

| Tool | What it returns |
|---|---|
| `get_account_overview` | Total spend, impressions, clicks, leads, CPL, ROAS for a date range |
| `get_campaign_performance` | Per-campaign breakdown sorted by spend/CTR/clicks |
| `get_ad_performance` | Ad-level metrics — spend, CTR, CPM, leads. Filter by campaign. |
| `get_top_performing_ads` | Top N ads sorted by any metric. Use for creative winner identification. |
| `get_spending_by_campaign` | Budget allocation view — spend per campaign + % of total |

All tools accept a `days` parameter (default 30). Example usage in Claude:

> "How did our Meta campaigns perform last week?"
> "Which ads had the highest CTR in the last 30 days?"
> "Show me spend breakdown by campaign for the last 7 days"
> "What are our top 5 ads by CPL this month?"

---

## Connection to Marketing OS

The Meta Ads MCP gives the `weekly-performance-review` workflow live data without a file upload step. When this MCP is connected, Claude can pull Meta performance data directly during the workflow rather than requiring a CSV export.

For the `ad-copy-generation` workflow, use `get_top_performing_ads` to understand which creative frames are winning before briefing a new batch — this feeds directly into the hypothesis memory system (`core/system-intelligence/ad-hypotheses.md`).

---

## Troubleshooting

**"Invalid OAuth access token"** — Token has expired (user tokens expire after 60 days) or has been revoked. Generate a new one. Use a System User token for long-lived access.

**"Object with ID does not exist"** — The Ad Account ID is wrong or the token doesn't have access to that account. Check the account ID in Ads Manager and verify the system user has the right asset access.

**No data returned** — The account may have no active campaigns in the date range. Try a longer `days` value.
