# GitHub MCP Setup for claude.ai Web

This guide sets up the GitHub MCP server so claude.ai (web) can read and write to the `work-os` repo when running workflows. Required for writing outputs back to `runs/` automatically.

---

## Prerequisites

- A GitHub Personal Access Token with `repo` scope
  - Already stored as `GITHUB_ACCESS_TOKEN` in `.env.local`
  - Create one at: github.com → Settings → Developer settings → Personal access tokens
- A Railway account (free tier is sufficient): railway.app

---

## Step 1 — Deploy GitHub MCP server to Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy a Docker Image**
2. Image: `ghcr.io/github/github-mcp-server:latest`
3. Once the service is created, go to **Settings → Start Command** and set:
   ```
   github-mcp-server --transport streamable-http --port $PORT
   ```
4. Go to **Variables** and add:
   ```
   GITHUB_PERSONAL_ACCESS_TOKEN = <your GitHub PAT>
   ```
5. Railway will provision a public URL like `https://your-service.up.railway.app`
   - Copy this URL — you'll need it in Step 2

---

## Step 2 — Add to claude.ai as a custom connector

1. Go to [claude.ai](https://claude.ai) → **Settings** → **Integrations**
2. Scroll to the bottom → click **"Add custom integration"**
3. Enter your Railway URL from Step 1
4. Click **Add**

No OAuth needed — authentication is handled by the PAT stored in the Railway environment.

---

## Step 3 — Enable per conversation

Before running a workflow from the web app:
1. In claude.ai, click the **+** button in the chat input
2. Select **Connectors**
3. Toggle on the GitHub MCP connector

Claude can now read agent definitions, `core/` context files, and write run outputs back to the repo.

---

## Notes

- The `api.githubcopilot.com/mcp/` endpoint also works but requires a GitHub Copilot subscription
- The Railway free tier is sufficient for personal use — the server only handles requests when a workflow is running
- If the Railway URL changes (e.g. after redeployment), update the URL in claude.ai Integrations settings
