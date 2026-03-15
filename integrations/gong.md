# Integration: Gong

## What this enables

Gong is the call recording and revenue intelligence platform. Connecting it gives agents access to call transcripts, deal interaction data, objection patterns, and buyer language needed for win/loss analysis, messaging validation, competitive intelligence, and sales enablement content.

**This is the richest qualitative data source in the system.** Customer voice from Gong calls directly improves: ad copy (use their exact words), battlecard objection responses, positioning validation, and persona refinement.

**Workflows that require this integration:**
- `product-marketing/market-intelligence/workflows/quarterly-win-loss-review.md`
- `product-marketing/customer-intelligence/workflows/customer-interview-pipeline.md`
- `product-marketing/sales-enablement/workflows/new-competitor-battlecard.md` (competitive mentions)
- `growth-marketing/workflows/creative-intelligence-sprint.md` (customer language for copy)

---

## Setup

### Authentication

Gong uses **API key + API secret** (basic authentication pattern).

1. In Gong: **Company Settings → API** (admin access required)
2. Click **Generate API keys**
3. Copy **Access Key** and **Access Key Secret**
4. Store as env vars:
   ```
   GONG_ACCESS_KEY=xxxx
   GONG_ACCESS_KEY_SECRET=xxxx
   ```
5. Base URL: `https://api.gong.io/v2/`
6. Authentication: HTTP Basic — `Authorization: Basic base64(access_key:access_key_secret)`

**Data residency note:** If your Gong instance is EU-hosted, the base URL may differ. Check Settings → API for your instance URL.

### MCP server configuration

```json
{
  "mcpServers": {
    "gong": {
      "command": "npx",
      "args": ["-y", "@gong/mcp-server"],
      "env": {
        "GONG_ACCESS_KEY": "${GONG_ACCESS_KEY}",
        "GONG_ACCESS_KEY_SECRET": "${GONG_ACCESS_KEY_SECRET}"
      }
    }
  }
}
```

> For generic REST integration, see `integrations/custom-api.md`. Gong REST API base: `https://api.gong.io/v2/`

### Required permissions

The API key inherits the permissions of the user who generated it, plus API-specific scope settings.

| Permission | Why |
|---|---|
| `api:calls:read:transcript` | Read full call transcripts (text) |
| `api:calls:read:basic` | Read call metadata (participants, duration, date) |
| `api:calls:read:media` | Read call recordings (audio) — only if agents need audio |
| `api:stats:read` | Read call statistics and deal signals |
| `api:crm:read` | Read CRM-linked deal data within Gong |

Transcripts are the primary input for marketing agents. Media access is not required unless building audio analysis.

---

## Available data / actions

### Key objects and fields

**Calls**
- `callId` — unique identifier
- `started` — ISO timestamp
- `duration` — seconds
- `title` — call title
- `direction` — INBOUND / OUTBOUND / CONFERENCE
- `primaryUserId` — Gong user ID of call owner (rep)
- `parties[]` — participant names, emails, speaker IDs
- `meetingUrl` — Zoom/Meet link if present

**Transcripts** (from `/v2/calls/transcript`)
- `callId`
- `transcript[]` — array of sentences with:
  - `speakerId` — maps to party in call
  - `topic` — Gong-classified topic
  - `sentences[]` — text, start time, end time

**Extensive data** (from `/v2/calls/extensive`)
- `content.trackers[]` — keyword/topic trackers that fired in the call
- `content.keyMoments[]` — Gong-flagged moments (objections, questions, competitor mentions)
- `spotlight.keyPoints[]` — AI-generated key points
- `spotlight.callOutcome` — Gong's classification of call outcome
- `interaction.speakers[]` — talk time per speaker

**Call stats** (deal signals)
- Patience, engagement, questions, filler words per speaker

### Common API calls for agents

**Pull calls by date range (last 30 days):**
```
POST /v2/calls
body: {
  "filter": {
    "fromDateTime": "2026-02-10T00:00:00Z",
    "toDateTime": "2026-03-12T23:59:59Z"
  },
  "contentSelector": {
    "context": "Overview",
    "exposedFields": {
      "interaction": true,
      "content": true
    }
  }
}
```

**Get transcript for a specific call:**
```
GET /v2/calls/{callId}/transcript
```

**Bulk transcript pull with filters:**
```
POST /v2/calls/extensive
body: {
  "filter": {
    "fromDateTime": "2026-02-10T00:00:00Z",
    "toDateTime": "2026-03-12T23:59:59Z",
    "workspaceId": "optional-workspace-id"
  },
  "contentSelector": {
    "context": "Extended",
    "exposedFields": {
      "collaboration": false,
      "content": true,
      "interaction": true,
      "media": false
    }
  }
}
```

**Search for competitor mentions** (use transcript text search):
```
GET /v2/calls?filter.trackerIds=TRACKER_ID_FOR_COMPETITOR
```
> Create a Tracker in Gong for each competitor name. Tracked calls surface in filtered API responses.

---

## Which agents use this

| Agent | What it reads |
|---|---|
| `win-loss-analyst` | Transcripts from closed-won/lost deals; objection patterns |
| `field-feedback-synthesizer` | Rep language, buyer objections, questions asked |
| `competitive-monitor` | Competitor mentions in calls (via trackers) |
| `interview-synthesizer` | Customer interview transcripts |
| `battlecard-agent` | Competitive call data — what buyers say when comparing |
| `creative-headline-agent` | Customer language from transcripts (exact phrases) |

---

## Getting the most from Gong data

**Set up Trackers before running agents.** In Gong: Insights → Trackers. Create trackers for:
- Each competitor name
- Key pain point phrases (e.g., "we're spending too much time on")
- Pricing objection phrases (e.g., "too expensive," "budget")
- Churn risk phrases (if you have CS calls in Gong)

**Tag calls with deal stage.** Agents can filter calls by deal stage if Gong is synced with your CRM. Discovery calls, demos, and close calls each yield different data.

**Pull 90+ days for pattern analysis.** Single calls are noise. Patterns across 50+ calls are signal. The `win-loss-analyst` and `field-feedback-synthesizer` agents need a minimum corpus.

---

## Troubleshooting

| Issue | Likely cause | Fix |
|---|---|---|
| `401 Unauthorized` | Wrong credential encoding | Basic auth requires `base64(access_key + ":" + access_key_secret)` — not just the key |
| `403 Forbidden` on transcripts | `api:calls:read:transcript` scope not enabled | Enable scope in Gong Company Settings → API → Manage access |
| Transcripts return empty | Call was not transcribed (e.g., low audio quality, recording disabled) | Check call recording settings; not all calls are transcribed |
| Rate limit (429) | Burst too fast | Gong allows 3 requests/second; add 400ms sleep between calls |
| Calls missing from date range | Timezone offset issue | Use UTC timestamps explicitly in `fromDateTime`/`toDateTime` |
| Competitor mentions not surfacing | No Tracker configured | Create Trackers in Gong UI for each competitor before querying |
