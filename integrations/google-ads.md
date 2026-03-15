# Integration: Google Ads

## What this enables

Google Ads is the primary paid search channel. Connecting it gives agents access to campaign performance data, keyword-level metrics, Quality Score data, search term reports, and conversion data needed for bid optimization, keyword expansion, and creative testing.

**Workflows that require this integration:**
- `growth-marketing/workflows/weekly-performance-review.md`
- `growth-marketing/workflows/campaign-brief-to-launch.md`
- `growth-marketing/workflows/paid-search-audit.md` (if built)

---

## Setup

### Authentication

Google Ads uses **OAuth 2.0** via a **Manager Account (MCC)** service account (recommended for agent access).

**Service Account setup (recommended for server-to-server):**
1. Go to [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
2. Create a **Service Account** — name it `marketing-os`
3. Download the JSON key file
4. In Google Ads: **Admin → Access and security → API Center**
5. Enable the Google Ads API
6. In your MCC (or individual account): link the service account email as a user with **Read-only** access
7. Note your **Customer ID** (with dashes removed for API calls): `123-456-7890` → `1234567890`
8. Store credentials:
   ```
   GOOGLE_ADS_DEVELOPER_TOKEN=xxxx  # From API Center in Google Ads
   GOOGLE_ADS_CLIENT_ID=xxxx        # OAuth client ID
   GOOGLE_ADS_CLIENT_SECRET=xxxx
   GOOGLE_ADS_REFRESH_TOKEN=xxxx    # Generated via OAuth flow
   GOOGLE_ADS_CUSTOMER_ID=1234567890
   GOOGLE_ADS_LOGIN_CUSTOMER_ID=9876543210  # MCC account ID (if using MCC)
   ```

**Developer token note:** New developer tokens start at **Basic access** (10,000 operations/day). Apply for Standard access if you need higher volume.

### MCP server configuration

```json
{
  "mcpServers": {
    "google-ads": {
      "command": "npx",
      "args": ["-y", "@google-ads/mcp-server"],
      "env": {
        "GOOGLE_ADS_DEVELOPER_TOKEN": "${GOOGLE_ADS_DEVELOPER_TOKEN}",
        "GOOGLE_ADS_CLIENT_ID": "${GOOGLE_ADS_CLIENT_ID}",
        "GOOGLE_ADS_CLIENT_SECRET": "${GOOGLE_ADS_CLIENT_SECRET}",
        "GOOGLE_ADS_REFRESH_TOKEN": "${GOOGLE_ADS_REFRESH_TOKEN}",
        "GOOGLE_ADS_CUSTOMER_ID": "${GOOGLE_ADS_CUSTOMER_ID}",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID": "${GOOGLE_ADS_LOGIN_CUSTOMER_ID}"
      }
    }
  }
}
```

> For custom REST integration, see `integrations/custom-api.md`. Google Ads API base: `https://googleads.googleapis.com/v17/`

### Required access level

| Access | Why |
|---|---|
| **Read-only** | Campaign metrics, keyword data, search terms, Quality Scores |
| **Standard** | Only needed if an agent creates/modifies campaigns or ad groups |

Always start with Read-only. Elevate only when an agent explicitly requires write access.

---

## Available data / actions

### Key resources and fields

**Campaigns**
- `campaign.id`, `campaign.name`, `campaign.status`, `campaign.advertising_channel_type`
- `campaign.bidding_strategy_type`, `campaign_budget.amount_micros`

**Ad Groups**
- `ad_group.id`, `ad_group.name`, `ad_group.status`, `ad_group.type`
- `ad_group.cpc_bid_micros`

**Keywords**
- `ad_group_criterion.keyword.text`, `ad_group_criterion.keyword.match_type`
- `ad_group_criterion.quality_info.quality_score` (1-10)
- `ad_group_criterion.quality_info.creative_quality_score`
- `ad_group_criterion.quality_info.post_click_quality_score`
- `ad_group_criterion.quality_info.search_predicted_ctr`

**Ads**
- `ad_group_ad.ad.responsive_search_ad.headlines[]`
- `ad_group_ad.ad.responsive_search_ad.descriptions[]`
- `ad_group_ad.ad.final_urls[]`

**Metrics (all segmentable by date)**
- `metrics.impressions`, `metrics.clicks`, `metrics.cost_micros`
- `metrics.ctr`, `metrics.average_cpc`
- `metrics.conversions`, `metrics.cost_per_conversion`
- `metrics.search_impression_share`, `metrics.search_top_impression_share`
- `metrics.quality_score` (campaign level)

**Search Terms Report** (what people actually typed)
- `search_term_view.search_term`
- All standard metrics above

### GAQL queries for agents

**Campaign performance (last 30 days):**
```sql
SELECT campaign.name, campaign.status,
       metrics.impressions, metrics.clicks, metrics.cost_micros,
       metrics.ctr, metrics.average_cpc, metrics.conversions, metrics.cost_per_conversion
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
```

**Keyword Quality Score audit:**
```sql
SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
       ad_group_criterion.quality_info.quality_score,
       ad_group_criterion.quality_info.search_predicted_ctr,
       ad_group_criterion.quality_info.creative_quality_score,
       ad_group_criterion.quality_info.post_click_quality_score,
       metrics.impressions, metrics.clicks, metrics.conversions
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
  AND ad_group_criterion.status = 'ENABLED'
ORDER BY ad_group_criterion.quality_info.quality_score ASC
```

**Search terms (expansion/negative opportunities):**
```sql
SELECT search_term_view.search_term, search_term_view.status,
       metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
ORDER BY metrics.impressions DESC
LIMIT 500
```

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `campaign-analytics-agent` | Campaign metrics (spend, conversions, CPA) |
| `keyword-expansion-agent` | Search term report, keyword Quality Scores |
| `creative-intelligence-agent` | Ad-level CTR and conversion data |
| `weekly-performance-review` | Campaign-level spend, CPA, impression share |
| `asset-quality-gate` | Historical CTR benchmarks for RSA headline scoring |

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `DEVELOPER_TOKEN_NOT_APPROVED` | Token at Basic level only | Apply for Standard access in Google Ads API Center; Basic still works for test/dev |
| `OAUTH_TOKEN_EXPIRED` | Refresh token invalidated | Re-run OAuth flow to generate new refresh token |
| `CUSTOMER_NOT_FOUND` | Customer ID wrong format | Remove dashes: `123-456-7890` → `1234567890` |
| `USER_PERMISSION_DENIED` | Service account not linked to account | Add service account email in Google Ads → Admin → Access and security |
| Quality Score shows `null` | Keyword has insufficient impressions | Quality Score requires ~1,000 impressions to calculate; new keywords won't have it |
| Search terms report empty | Broad match disabled or no traffic | Check that campaigns use broad or phrase match keywords; exact match only won't generate search term data |
