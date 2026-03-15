# Integration: Meta Ads

## What this enables

Meta Ads (Facebook + Instagram) is a primary paid social channel. Connecting it gives agents access to campaign performance data, creative-level metrics, audience insights, and A/B test results needed for creative iteration, budget optimization, and competitive creative intelligence.

**Workflows that require this integration:**
- `growth-marketing/workflows/weekly-performance-review.md` (campaign performance)
- `growth-marketing/workflows/creative-intelligence-sprint.md` (creative scoring by format)
- `growth-marketing/workflows/campaign-brief-to-launch.md` (campaign setup)

---

## Setup

### Authentication

Meta Ads uses **OAuth 2.0 via a System User** (recommended for agent access — does not expire on password change).

**System User setup (recommended):**
1. Go to **Business Settings → Users → System Users**
2. Create a System User with **Admin** or **Analyst** role (Analyst for read-only)
3. Click **Add Assets** → assign relevant Ad Accounts
4. Click **Generate New Token**
5. Select permissions: see below
6. Store as env var: `META_ACCESS_TOKEN=EAAxxxx`
7. Note your **Ad Account ID**: `META_AD_ACCOUNT_ID=act_123456789`

**Do not** use personal user tokens — they expire when the user's password changes and break all agents.

### MCP server configuration

```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "npx",
      "args": ["-y", "@meta/ads-mcp-server"],
      "env": {
        "META_ACCESS_TOKEN": "${META_ACCESS_TOKEN}",
        "META_AD_ACCOUNT_ID": "${META_AD_ACCOUNT_ID}"
      }
    }
  }
}
```

> If no official MCP server is available, use the generic REST wrapper pattern in `integrations/custom-api.md` with Meta's Graph API base URL: `https://graph.facebook.com/v19.0/`

### Required permissions (token scopes)

| Permission | Why |
|---|---|
| `ads_read` | Read campaign, ad set, ad, and creative data |
| `ads_management` | Required even for read operations on some endpoints |
| `business_management` | Access Business Manager assets |
| `read_insights` | Access performance metrics (impressions, clicks, spend, conversions) |

For read-only agent access, `ads_read` + `read_insights` is sufficient. Add `ads_management` only if an agent will create or modify campaigns.

---

## Available data / actions

### Key objects and metrics

**Campaigns**
- `campaign_id`, `name`, `objective`, `status`, `daily_budget`, `lifetime_budget`
- `start_time`, `stop_time`

**Ad Sets**
- `adset_id`, `name`, `targeting`, `bid_amount`, `bid_strategy`
- Targeting includes: `age_min`, `age_max`, `genders`, `geo_locations`, `interests`, `custom_audiences`, `lookalike_audiences`

**Ads**
- `ad_id`, `name`, `creative`, `status`

**Creative**
- `creative_id`, `title`, `body`, `image_url`, `video_id`, `call_to_action`

**Insights (performance metrics)**
- `impressions`, `reach`, `clicks`, `spend`
- `cpc` (cost per click), `cpm` (cost per 1,000 impressions), `ctr` (click-through rate)
- `actions` — conversions by action type (leads, purchases, landing page views)
- `cost_per_action_type` — CPL, CPA
- `frequency` — average times an impression was served to each person
- `video_avg_time_watched_actions`, `video_p25_watched_actions` through `video_p100_watched_actions`

### Common API calls for agents

**Campaign performance (last 30 days):**
```
GET /{ad_account_id}/insights
params:
  level=campaign
  date_preset=last_30d
  fields=campaign_name,impressions,clicks,spend,cpc,ctr,actions,cost_per_action_type
```

**Creative performance breakdown:**
```
GET /{ad_account_id}/insights
params:
  level=ad
  date_preset=last_30d
  fields=ad_name,creative{title,body,image_url},impressions,clicks,spend,ctr,actions
  breakdowns=impression_device
```

**Audience performance:**
```
GET /{ad_account_id}/insights
params:
  level=adset
  date_preset=last_30d
  fields=adset_name,targeting,spend,cpc,actions,cost_per_action_type
```

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `campaign-analytics-agent` | Campaign and ad set insights (spend, CPC, conversions) |
| `creative-intelligence-agent` | Ad-level creative + metrics (CTR, CPL by format/hook) |
| `asset-quality-gate` | Historical CTR benchmarks to score new creative against |
| `weekly-performance-review` | Campaign-level spend and conversion data |
| `audience-expansion-agent` | Adset targeting + performance for lookalike and interest testing |

---

## Format-specific benchmarks (populate after 30 days live)

Track these per format to give creative-intelligence-agent calibration data:

| Format | Benchmark CTR | Benchmark CPL | Notes |
|---|---|---|---|
| Static image (feed) | `[ TBD ]` | `[ TBD ]` | |
| Single video (feed) | `[ TBD ]` | `[ TBD ]` | |
| Carousel | `[ TBD ]` | `[ TBD ]` | |
| Stories / Reels | `[ TBD ]` | `[ TBD ]` | |
| DPA (dynamic) | `[ TBD ]` | `[ TBD ]` | Retargeting only |

Fill these in after first 30 days of data. Store in `core/measurement/channel-benchmarks.md`.

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `(#200) Requires ads_read permission` | Token missing scope | Regenerate System User token with `ads_read` and `read_insights` |
| `(#100) Invalid parameter` on insights call | Unsupported field combination | Check Meta Marketing API changelog — fields change between API versions |
| Token expired (`190`) | Using user token, not System User token | Switch to System User token — does not expire |
| No conversion data in insights | Pixel not firing or conversion event not configured | Verify Meta Pixel is installed and conversion events are verified in Events Manager |
| Data sampled (small numbers) | Audience or date range too narrow | Widen date range to 30+ days; audience size > 1,000 for reliable data |
| Rate limit (`17`) | Too many calls per hour | Meta allows ~200 calls/hour per ad account; batch requests using `batch` endpoint |
