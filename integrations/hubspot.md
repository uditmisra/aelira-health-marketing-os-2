# Integration: HubSpot

## What this enables

HubSpot is the primary CRM and marketing automation source for deal data, contact/company attributes, email performance, and pipeline analytics. Connecting it gives agents access to the closed-won/closed-lost record set needed for win/loss analysis, the contact database needed for ICP validation, and email engagement metrics needed for sequence optimization.

**Workflows that require this integration:**
- `growth-marketing/workflows/weekly-performance-review.md` (email metrics)
- `product-marketing/market-intelligence/workflows/quarterly-win-loss-review.md` (deal outcomes)
- `product-marketing/customer-intelligence/workflows/customer-interview-pipeline.md` (contact pull)

---

## Setup

### Authentication

HubSpot uses **Private App tokens** (recommended since 2022 — legacy API keys are deprecated).

1. In HubSpot, go to **Settings → Integrations → Private Apps**
2. Click **Create a private app**
3. Name it `marketing-os` (or similar)
4. Under **Scopes**, select the minimum required scopes (see below)
5. Click **Create app** — copy the access token immediately (shown once)
6. Store as environment variable: `HUBSPOT_ACCESS_TOKEN=pat-na1-xxxx`

Never commit the token to this repo. Reference it via env var in all agent and MCP configs.

### MCP server configuration

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
      }
    }
  }
}
```

> **Alternative:** If using a self-hosted or custom MCP wrapper, see `integrations/custom-api.md` for the generic pattern.

### Required permissions (minimum scopes)

| Scope | Why |
|---|---|
| `crm.objects.deals.read` | Win/loss analysis, pipeline data |
| `crm.objects.contacts.read` | ICP validation, interview candidate pull |
| `crm.objects.companies.read` | Company-level ICP matching |
| `marketing.emails.read` | Email performance metrics |
| `crm.schemas.deals.read` | Read custom deal properties (e.g., `competitor_name`) |

Do **not** request write permissions unless an agent specifically requires them. Most Marketing OS agents are read-only.

---

## Available data / actions

### Key objects and fields

**Deals** (primary source for win/loss)
- `dealname` — deal name
- `amount` — deal value
- `dealstage` — current or final stage
- `closedate` — date closed
- `hs_deal_stage_probability` — probability at close
- `closed_lost_reason` — why deal was lost (populate this field — agents depend on it)
- `competitor_name` — custom property: which competitor was in the deal (create this property if it doesn't exist)
- `hs_analytics_source` — first-touch channel

**Contacts**
- `firstname`, `lastname`, `email`, `jobtitle`, `company`
- `hs_analytics_source` — how they entered the funnel
- `lifecyclestage` — lead / MQL / SQL / customer
- `hs_persona` — persona bucket (if using HubSpot personas)

**Companies**
- `name`, `domain`, `industry`, `annualrevenue`, `numberofemployees`
- `hs_lead_status`

**Email performance**
- `hs_email_open_rate`, `hs_email_click_rate`, `hs_email_reply_rate` (per sequence enrollment)

### Common queries for agents

**Win/loss pull (last 90 days):**
```
GET /crm/v3/objects/deals/search
filter: dealstage IN [closedwon, closedlost]
filter: closedate > [90 days ago]
properties: dealname, amount, dealstage, closedate, closed_lost_reason, competitor_name, hs_analytics_source
```

**ICP cohort pull (closed-won by company size):**
```
GET /crm/v3/objects/companies/search
filter: associated deal dealstage = closedwon
properties: name, industry, annualrevenue, numberofemployees, hs_lead_status
```

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `win-loss-analyst` | Deals (won/lost), closed_lost_reason, competitor_name |
| `icp-refinement-agent` | Contacts + Companies from closed-won deals |
| `email-performance-analyst` | Email engagement metrics per sequence |
| `campaign-analytics-agent` | Deals + hs_analytics_source for attribution |
| `email-strategist` | Sequence enrollment and reply rate data |
| `field-feedback-synthesizer` | Deal notes and activity log |

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `401 Unauthorized` | Token expired or scopes missing | Regenerate token in HubSpot Private Apps; verify scopes include all required |
| `competitor_name` field always empty | Custom property not created or not being filled by sales | Create property: Settings → Properties → Deals → New Property. Train sales to fill it. |
| `closed_lost_reason` sparse | Field not required in deal close workflow | Make it required in pipeline settings: Deals → Pipeline → Edit stages → Require reason on loss |
| Win/loss data skewed | Time range too short | Win/loss analysis needs minimum 90-day window; 6 months preferred for statistical significance |
| Rate limit errors (429) | Too many API calls in burst | HubSpot allows 100 req/10 sec on free; 150 on paid. Add 100ms sleep between batch calls. |
