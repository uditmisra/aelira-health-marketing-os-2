# Integration: Semrush

## What this enables

Semrush is the primary SEO and competitive intelligence data source. Connecting it gives agents access to keyword rankings, organic traffic estimates, backlink profiles, competitor keyword gaps, site audit data, and ad creative intelligence needed for SEO strategy, content prioritization, and competitive analysis.

**Workflows that require this integration:**
- `growth-marketing/workflows/seo-audit-sprint.md`
- `growth-marketing/workflows/weekly-performance-review.md` (organic channel)
- `product-marketing/market-intelligence/workflows/competitive-monitor.md`

---

## Setup

### Authentication

Semrush uses an **API key** (no OAuth — simpler than most integrations).

1. In Semrush: **Profile → Subscription info → API units**
2. Copy your **API key**
3. Store as env var: `SEMRUSH_API_KEY=xxxx`
4. Note your **API unit balance** — Semrush charges per API call. Monitor usage.

**API unit costs (approximate):**
- Domain overview: 10 units/call
- Keyword overview: 10 units/keyword
- Keyword rankings: 10 units/call
- Site audit: based on pages crawled
- Backlink data: 10 units/call

Budget API units carefully if on a limited plan. Agents should batch requests rather than making individual calls per keyword.

### MCP server configuration

```json
{
  "mcpServers": {
    "semrush": {
      "command": "npx",
      "args": ["-y", "@semrush/mcp-server"],
      "env": {
        "SEMRUSH_API_KEY": "${SEMRUSH_API_KEY}"
      }
    }
  }
}
```

> For generic REST integration, see `integrations/custom-api.md`. Semrush API base: `https://api.semrush.com/`

### Required plan level

| Feature | Minimum plan |
|---|---|
| Keyword rankings / organic research | Pro |
| Competitor keyword gap | Pro |
| Backlink analytics | Pro |
| Site audit API | Pro |
| Historical data (beyond 6 months) | Guru |
| API access | Pro (1,000 units/day) or Guru (3,000 units/day) |

---

## Available data / actions

### Key reports and fields

**Domain Overview**
- `Organic search traffic` (estimated monthly visits)
- `Organic keywords` (number of ranking keywords)
- `Domain authority score`
- `Paid traffic` (estimated)

**Organic Research — Keyword Rankings**
- `keyword` — ranking keyword
- `position` — current rank (1-100)
- `search_volume` — monthly searches
- `cpc` — commercial value proxy
- `traffic_share` — % of domain's organic traffic from this keyword
- `url` — which page ranks

**Keyword Gap Analysis** (your domain vs. competitors)
- Keywords you rank for, competitors rank for, both rank for, or neither
- Volume and difficulty for each

**Backlink Analytics**
- `total_backlinks`, `referring_domains`, `authority_score`
- `new_lost_backlinks` (trend)
- Individual backlink data: source URL, anchor text, follow/nofollow

**Site Audit**
- Crawl errors, page speed issues, duplicate content, missing meta tags
- Issue severity: Errors / Warnings / Notices

**Advertising Research** (competitor paid ads)
- Keywords competitors are bidding on
- Estimated ad spend
- Ad copy samples

### Common API calls for agents

**Domain organic keywords (your site):**
```
GET https://api.semrush.com/
params:
  type=domain_organic
  key={SEMRUSH_API_KEY}
  domain={your-domain}
  database=us
  display_limit=100
  export_columns=Ph,Po,Nq,Cp,Tr
  display_sort=tr_desc
```

**Keyword gap (you vs. competitor):**
```
GET https://api.semrush.com/
params:
  type=phrase_all
  key={SEMRUSH_API_KEY}
  domain={your-domain}
  domains={competitor-domain}
  database=us
  display_limit=200
  export_columns=Ph,Po,Np,Cp,Ur,Tr
```

**Competitor organic overview:**
```
GET https://api.semrush.com/
params:
  type=domain_rank
  key={SEMRUSH_API_KEY}
  domain={competitor-domain}
  database=us
  export_columns=Dn,Rk,Or,Ot,Oc,Ad
```

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `seo-content-strategist` | Keyword rankings, search volume, keyword difficulty, topic gaps |
| `gbp-category-auditor` | Local keyword rankings and visibility |
| `competitive-monitor` | Competitor organic footprint, new ranking keywords, traffic trends |
| `weekly-performance-review` | Organic traffic trend, position changes |
| `keyword-expansion-agent` | Keyword gap data, related keyword clusters |

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `API_KEY_UNKNOWN` or `ERROR 50` | API key invalid or not active | Verify key in Semrush Profile → Subscription. Key resets if plan lapses. |
| `ERROR 135` — not enough units | API unit balance depleted | Check remaining units in Profile → API units. Upgrade plan or wait for reset. |
| Traffic data looks very low | Domain is new or has low authority | Semrush estimates organic traffic — accuracy improves for sites with 50+ ranking keywords |
| Keyword gap returns no data | Domain has no organic presence | Domain must have indexed pages to appear in organic reports |
| `database=us` returns no results | Wrong database for target market | Change `database` parameter: `uk`, `ca`, `au`, `de`, etc. |
| Site audit API not available | Plan doesn't include Site Audit API | Guru plan required for Site Audit API access |
