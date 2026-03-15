# Integration: Salesforce

## What this enables

Salesforce is the enterprise CRM source for opportunity data, account attributes, contact records, and pipeline analytics. When HubSpot is not the CRM, Salesforce fills the same role: win/loss analysis, ICP validation from closed-won accounts, and pipeline-to-revenue attribution.

**Workflows that require this integration:**
- `product-marketing/market-intelligence/workflows/quarterly-win-loss-review.md`
- `product-marketing/customer-intelligence/workflows/customer-interview-pipeline.md`
- `growth-marketing/workflows/weekly-performance-review.md` (if Salesforce is the revenue source)

---

## Setup

### Authentication

Salesforce uses **Connected App OAuth 2.0** (recommended) or **Username-Password flow** (simpler but less secure — avoid in production).

**Connected App setup (recommended):**
1. In Salesforce: **Setup → App Manager → New Connected App**
2. Enable **OAuth Settings**
3. Callback URL: `https://login.salesforce.com/services/oauth2/callback` (or your server URL)
4. Selected OAuth scopes: see below
5. Save — note the **Consumer Key** (Client ID) and **Consumer Secret**
6. Store as env vars:
   ```
   SALESFORCE_CLIENT_ID=3MVG...
   SALESFORCE_CLIENT_SECRET=...
   SALESFORCE_USERNAME=api-user@company.com
   SALESFORCE_PASSWORD=...
   SALESFORCE_SECURITY_TOKEN=...
   SALESFORCE_INSTANCE_URL=https://yourcompany.my.salesforce.com
   ```

**JWT Bearer flow (for server-to-server, preferred for agents):**
1. Generate RSA key pair
2. Upload certificate to Connected App
3. Use JWT grant type — no interactive OAuth redirect needed
4. See Salesforce docs: "OAuth 2.0 JWT Bearer Flow"

### MCP server configuration

```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SALESFORCE_CLIENT_ID": "${SALESFORCE_CLIENT_ID}",
        "SALESFORCE_CLIENT_SECRET": "${SALESFORCE_CLIENT_SECRET}",
        "SALESFORCE_INSTANCE_URL": "${SALESFORCE_INSTANCE_URL}",
        "SALESFORCE_USERNAME": "${SALESFORCE_USERNAME}",
        "SALESFORCE_PASSWORD": "${SALESFORCE_PASSWORD}",
        "SALESFORCE_SECURITY_TOKEN": "${SALESFORCE_SECURITY_TOKEN}"
      }
    }
  }
}
```

> If using a generic REST wrapper instead of an official MCP server, see `integrations/custom-api.md`.

### Required permissions (minimum)

Create a dedicated **API-only Salesforce user** with a custom Profile:

| Permission | Why |
|---|---|
| `Read` on Opportunity | Win/loss analysis |
| `Read` on Account | ICP validation |
| `Read` on Contact | Interview candidate pull |
| `Read` on Lead | Funnel analysis |
| `API Enabled` | Required for all API access |
| `View All Data` | Only if user cannot see all records by default; prefer proper sharing rules |

Do not grant write permissions to the integration user unless a specific agent requires it.

---

## Available data / actions

### Key objects and fields

**Opportunity** (primary source for win/loss)
- `Name` — opportunity name
- `Amount` — deal value
- `StageName` — current/final stage
- `CloseDate` — date closed
- `IsClosed`, `IsWon` — boolean flags
- `LostReason__c` — custom field: why deal was lost (create if not present)
- `Competitor__c` — custom field: primary competitor in deal (create if not present)
- `LeadSource` — first-touch attribution
- `Type` — New Business / Expansion / Renewal

**Account**
- `Name`, `Industry`, `AnnualRevenue`, `NumberOfEmployees`, `BillingCountry`
- `Type` — Prospect / Customer / Partner

**Contact**
- `FirstName`, `LastName`, `Email`, `Title`, `AccountId`
- `LeadSource`

### SOQL queries for agents

**Win/loss pull (last 90 days):**
```sql
SELECT Name, Amount, StageName, CloseDate, IsWon, LostReason__c, Competitor__c, LeadSource
FROM Opportunity
WHERE IsClosed = true
AND CloseDate >= LAST_90_DAYS
ORDER BY CloseDate DESC
```

**Closed-won account profile (ICP cohort):**
```sql
SELECT a.Name, a.Industry, a.AnnualRevenue, a.NumberOfEmployees, a.BillingCountry
FROM Account a
WHERE a.Id IN (
  SELECT AccountId FROM Opportunity WHERE IsWon = true AND CloseDate >= LAST_N_DAYS:365
)
```

**Competitive deal exposure:**
```sql
SELECT Competitor__c, COUNT(Id) total, SUM(CASE WHEN IsWon = true THEN 1 ELSE 0 END) won
FROM Opportunity
WHERE IsClosed = true AND Competitor__c != null AND CloseDate >= LAST_90_DAYS
GROUP BY Competitor__c
```

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `win-loss-analyst` | Opportunity (IsWon, LostReason__c, Competitor__c) |
| `icp-refinement-agent` | Account fields from closed-won Opportunities |
| `field-feedback-synthesizer` | Opportunity notes and Activity history |
| `campaign-analytics-agent` | Opportunity.LeadSource for attribution |
| `customer-interview-pipeline` | Contact pull from closed-won accounts |

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `INSUFFICIENT_ACCESS` on query | Profile missing Read on object | Add Read permission to the API user's Profile |
| `LostReason__c` field not found | Custom field not created | Setup → Object Manager → Opportunity → Fields & Relationships → New |
| Security Token required but unknown | Password changed, token invalidated | Reset token: My Settings → Personal → Reset My Security Token |
| Query returns 0 records | Sharing rules restrict visibility | Enable "View All" on Opportunity for API profile, or adjust OWD sharing |
| Instance URL wrong | Sandbox vs. production mismatch | Production: `https://login.salesforce.com`; Sandbox: `https://test.salesforce.com` |
