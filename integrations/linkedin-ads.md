# Integration: LinkedIn Ads

## What this enables

LinkedIn Ads is the primary B2B paid social channel for reaching buyers by job title, seniority, company size, and industry. Connecting it gives agents access to campaign performance, demographic breakdowns, lead gen form data, and message ad metrics needed for B2B audience optimization and creative testing.

**Workflows that require this integration:**
- `growth-marketing/workflows/weekly-performance-review.md`
- `growth-marketing/workflows/campaign-brief-to-launch.md`
- `growth-marketing/workflows/creative-intelligence-sprint.md`

---

## Setup

### Authentication

LinkedIn Marketing API uses **OAuth 2.0** with a **3-legged flow** (requires a LinkedIn user to authorize) or a **Service App** (server-to-server, preferred for agents).

**Service App setup (recommended):**
1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com) → Create App
2. Associate with your Company Page
3. Under **Auth** tab, note Client ID and Client Secret
4. Request access to: **Marketing Developer Platform** (requires LinkedIn approval — apply via app)
5. Generate an access token via OAuth 2.0 flow for a user with **Campaign Manager admin** access
6. Store credentials:
   ```
   LINKEDIN_CLIENT_ID=xxxx
   LINKEDIN_CLIENT_SECRET=xxxx
   LINKEDIN_ACCESS_TOKEN=xxxx        # Long-lived via refresh token rotation
   LINKEDIN_REFRESH_TOKEN=xxxx
   LINKEDIN_AD_ACCOUNT_ID=urn:li:sponsoredAccount:123456789
   ```

**Access token lifecycle:** LinkedIn access tokens expire after 60 days. Implement refresh token rotation or re-authorize every 60 days.

**Marketing Developer Platform approval:** LinkedIn requires formal application for Marketing API access. Approval typically takes 1-2 weeks. Apply early in onboarding.

### MCP server configuration

```json
{
  "mcpServers": {
    "linkedin-ads": {
      "command": "npx",
      "args": ["-y", "@linkedin/ads-mcp-server"],
      "env": {
        "LINKEDIN_ACCESS_TOKEN": "${LINKEDIN_ACCESS_TOKEN}",
        "LINKEDIN_AD_ACCOUNT_ID": "${LINKEDIN_AD_ACCOUNT_ID}"
      }
    }
  }
}
```

> If using generic REST, see `integrations/custom-api.md`. LinkedIn Marketing API base: `https://api.linkedin.com/v2/`

### Required permissions (OAuth scopes)

| Scope | Why |
|---|---|
| `r_ads` | Read campaign, ad group, ad data |
| `r_ads_reporting` | Access analytics and performance metrics |
| `r_organization_social` | Read Company Page data (if needed) |
| `w_member_social` | Only if an agent posts organic content |

For read-only agent access: `r_ads` + `r_ads_reporting` is sufficient.

---

## Available data / actions

### Key objects and fields

**Campaigns**
- `id`, `name`, `status`, `type` (SPONSORED_UPDATES, TEXT_AD, DYNAMIC, MESSAGE)
- `totalBudget`, `dailyBudget`, `costType` (CPM, CPC, CPL)
- `targetingCriteria` — includes job functions, seniorities, industries, company sizes

**Ad Groups (Campaign Groups)**
- `id`, `name`, `status`, `totalBudget`

**Ads (Creatives)**
- `id`, `status`, `type`
- `variables.data` — contains headline, body, image, CTA

**Analytics (via adAnalytics endpoint)**

Segmented by: `CAMPAIGN`, `CREATIVE`, `ACCOUNT`, plus demographic pivots

Key metrics:
- `impressions`, `clicks`, `costInLocalCurrency`, `leadGenerationMailContactInfoShares`
- `externalWebsiteConversions`, `externalWebsitePostClickConversions`
- `approximateUniqueImpressions` (reach)
- `videoViews`, `videoCompletions` (for video ads)
- `opens`, `sends` (for Message/InMail)

**Demographic breakdowns** (LinkedIn-specific advantage):
- `MEMBER_JOB_TITLE` — actual job titles of people who saw/clicked
- `MEMBER_SENIORITY` — C-suite, VP, Director, etc.
- `MEMBER_INDUSTRY`
- `MEMBER_COMPANY_SIZE`
- `MEMBER_GEOGRAPHY`

### Common API calls for agents

**Campaign performance (last 30 days):**
```
GET /v2/adAnalytics
params:
  q=analytics
  pivot=CAMPAIGN
  dateRange.start.year=YYYY, dateRange.start.month=MM, dateRange.start.day=DD
  dateRange.end.year=YYYY, dateRange.end.month=MM, dateRange.end.day=DD
  accounts=urn:li:sponsoredAccount:123456789
  fields=impressions,clicks,costInLocalCurrency,externalWebsiteConversions,leadGenerationMailContactInfoShares
```

**Demographic breakdown (who is clicking):**
```
GET /v2/adAnalytics
params:
  q=analytics
  pivot=MEMBER_JOB_TITLE  # or MEMBER_SENIORITY, MEMBER_COMPANY_SIZE
  [same date range and account as above]
  fields=impressions,clicks,costInLocalCurrency
```

**Lead Gen Form submissions:**
```
GET /v2/leadGenerationForms/{formId}/submissions
```

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `campaign-analytics-agent` | Campaign metrics (spend, CPL, conversions) |
| `audience-expansion-agent` | Demographic breakdowns (titles, seniorities clicking) |
| `creative-intelligence-agent` | Creative-level CTR and CPL by ad format |
| `weekly-performance-review` | Campaign spend, lead volume, CPL |
| `icp-refinement-agent` | Demographic data — confirms or challenges ICP targeting assumptions |

---

## LinkedIn-specific notes for agents

**CPL on LinkedIn is high by default.** $50-200 CPL for B2B SaaS is normal. Agents should benchmark against this range, not Google/Meta benchmarks.

**Demographic data is the differentiator.** After 30+ days, pull the job title and seniority breakdown. If the people clicking are not your ICP, the targeting needs adjustment — not the creative.

**Lead Gen Forms vs. landing pages.** LinkedIn Lead Gen Forms typically convert at 3-5x higher rate than landing page traffic. If conversion rate is low and sending to external URL, test a Lead Gen Form.

**Message Ads (InMail).** Open rate benchmark: ~30-40%. Reply rate: ~2-5%. These metrics are tracked via `opens`, `sends`, `clicks` on the adAnalytics endpoint with `pivot=CREATIVE` for Message type.

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `ACCESS_DENIED` on analytics | Token missing `r_ads_reporting` scope | Re-generate token with correct scope |
| Token expired (60-day limit) | No refresh token rotation implemented | Implement refresh token rotation or calendar reminder to re-authorize every 55 days |
| Marketing API not approved | App not approved for Marketing Developer Platform | Submit application at LinkedIn Developer Portal; allow 1-2 weeks |
| Demographic data shows `null` | Campaign has < 300 unique members in segment | LinkedIn suppresses demographics for small audiences (privacy threshold) — increase reach |
| Conversions not tracking | LinkedIn Insight Tag not installed | Install Insight Tag on all landing pages; verify in Campaign Manager → Account Assets → Insight Tag |
| Lead Gen Form data not pulling | Form URN format wrong | Use exact URN from Campaign Manager: `urn:li:leadGenerationForm:123456` |
