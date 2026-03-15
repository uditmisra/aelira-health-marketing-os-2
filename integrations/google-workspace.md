# Google Workspace Integration Guide

## How Google Docs + Sheets Delivery Works

Marketing OS delivers Google Docs and Google Sheets outputs without requiring any API setup or MCP configuration in Tier 0.

**Tier 0 — claude.ai (zero setup):**

Claude generates every document or spreadsheet as a native **artifact** in the claude.ai conversation. When the workflow's delivery step runs, you'll see an artifact panel appear with the formatted document. Click "Open in Google Docs" (or "Open in Google Sheets") and the document opens live in your Google account — already formatted, ready to share.

No Cloud Console. No OAuth setup. No MCP server. No credentials. It works the moment you start using claude.ai.

After opening the document, paste the URL back into the conversation once:
```
Here's the doc URL: [paste URL]
```
Claude writes it to `run-summary.md` so the web app can show "View in Google Docs" in run history.

**Tier 1 — Web App (automatic URL tracking):**

When the web app is live, it handles Google OAuth with a standard "Connect Google" button in Settings. After connecting, the web app calls the Google Docs/Sheets API directly to create documents server-side and capture their URLs — no user action required. URLs appear automatically in run history.

---

## What Each Workflow Creates

| Workflow | Artifact type | Name pattern |
|---|---|---|
| ad-copy-generation | Google Sheet | `[Company] Ad Copy — [run_id]` |
| new-competitor-battlecard | Google Doc | `[Competitor] Battlecard — [run_id]` |
| new-positioning-sprint | Google Doc | `[Company] Positioning — [run_id]` |
| weekly-performance-review | Google Doc | `Marketing Performance — Week of [run_id]` |
| weekly-competitive-pulse | Google Doc | `Competitive Intelligence — [date]` |
| quarterly-win-loss-review | Google Doc | `Win/Loss Review — [quarter]` |
| creative-intelligence-sprint | Google Doc | `Creative Direction — [period]` |
| campaign-brief-to-launch | Google Doc + Google Sheet | `[Campaign] — Brief + UTM Tracker` |

---

## Organizing Outputs in Drive

Documents created via artifact open into your Drive root by default. To keep things tidy:

1. Create a folder in Drive: `Marketing OS Outputs`
2. Move each document into the folder after opening (drag in Drive, or use "Move to")
3. Or tell Claude at the start of a session: "Save all new documents to the 'Marketing OS Outputs' folder in my Drive" — Claude will include this instruction in the artifact creation step

---

## Google Drive Connector (Optional — for reading existing files)

If you want Claude to read and reference existing Drive files (past docs, uploaded reports, competitor research), connect the native Google Drive integration:

1. claude.ai → Settings → Integrations → Google Drive → Connect
2. Authorize with your Google account

This gives Claude read access to your Drive files. It does not affect artifact creation — that works regardless.

---

## Troubleshooting

**"I don't see an artifact panel after the delivery step"**
- Make sure you're using claude.ai (not the API or a third-party client)
- The delivery step must use `doc-formatter-agent.md` or `ad-assembler-agent.md` — if a workflow is running from a `.md` prose file instead of a `.yaml` schema, it may not trigger artifact creation. Ask: "Produce the output as a Google Doc artifact."

**"The document opened but it's missing some sections"**
- The `doc-formatter-agent` uses `[Update needed]` placeholders for any sections it can't fill from context — this is intentional. Fill them in directly in the Google Doc.

**"I want to use the Google Workspace MCP instead of artifacts"**
- This is supported for advanced setups (e.g., Claude Desktop with local MCP configuration). See the archived setup guide in `integrations/google-workspace-mcp-setup.md` if you need it. For most users, artifacts are simpler and require no setup.
