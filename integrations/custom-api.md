# Integration: Custom API or MCP Server

## What this enables

Use this guide when you need to connect a tool that:
- Does not have an official MCP server
- Has a REST or GraphQL API you want agents to call directly
- You want to wrap as a custom MCP server so agents can use it via the standard MCP protocol
- Is an internal system or data warehouse with no pre-built connector

---

## Option A: Call the API directly from an agent (no MCP)

The simplest approach. The agent receives credentials via environment variables and makes HTTP calls directly. No MCP server needed.

### When to use this
- One-off data pulls (not ongoing)
- APIs with simple REST patterns and stable auth
- You don't need tool-calling semantics — just data retrieval

### How to configure

1. Store credentials as env vars in your shell or `.env` file (never in agent `.md` files)
2. In the agent's **Inputs** section, document which env vars it expects
3. In the agent's **Process** section, specify the exact endpoint and request shape

**Example agent input documentation:**
```
## Inputs
- ENV: ACME_API_KEY — API key for Acme platform
- ENV: ACME_BASE_URL — base URL (e.g., https://api.acme.com/v1)
- The specific object type to query (passed by user or upstream workflow)
```

**Example request pattern in agent process:**
```
GET {ACME_BASE_URL}/reports/performance
Headers:
  Authorization: Bearer {ACME_API_KEY}
  Content-Type: application/json
Params:
  date_from=YYYY-MM-DD
  date_to=YYYY-MM-DD
  granularity=daily
```

---

## Option B: Wrap as a custom MCP server

The right choice when agents need to call the tool repeatedly, you want tool-calling semantics (structured inputs/outputs), or you want to share the integration across multiple agents cleanly.

### Minimal MCP server structure

An MCP server is a process that speaks the Model Context Protocol over stdio. You can write one in Node.js, Python, or any language with an MCP SDK.

**Node.js minimal example:**

```javascript
// mcp-servers/acme-api/index.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "acme-api", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

// Define tools (what the agent can call)
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "get_performance_report",
      description: "Fetch performance data from Acme for a date range",
      inputSchema: {
        type: "object",
        properties: {
          date_from: { type: "string", description: "Start date (YYYY-MM-DD)" },
          date_to:   { type: "string", description: "End date (YYYY-MM-DD)" },
          metric:    { type: "string", enum: ["impressions", "clicks", "conversions"] }
        },
        required: ["date_from", "date_to", "metric"]
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_performance_report") {
    const response = await fetch(
      `${process.env.ACME_BASE_URL}/reports/performance?` +
      `date_from=${args.date_from}&date_to=${args.date_to}&metric=${args.metric}`,
      { headers: { Authorization: `Bearer ${process.env.ACME_API_KEY}` } }
    );
    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

**Python minimal example:**

```python
# mcp-servers/acme-api/server.py
import os, json, httpx
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

app = Server("acme-api")

@app.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_performance_report",
            description="Fetch performance data from Acme for a date range",
            inputSchema={
                "type": "object",
                "properties": {
                    "date_from": {"type": "string"},
                    "date_to":   {"type": "string"},
                    "metric":    {"type": "string"}
                },
                "required": ["date_from", "date_to", "metric"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_performance_report":
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{os.environ['ACME_BASE_URL']}/reports/performance",
                params=arguments,
                headers={"Authorization": f"Bearer {os.environ['ACME_API_KEY']}"}
            )
        return [TextContent(type="text", text=resp.text)]

async def main():
    async with stdio_server() as (r, w):
        await app.run(r, w, app.create_initialization_options())

import asyncio; asyncio.run(main())
```

### Register the custom MCP server

Add to Claude Code's MCP config (`~/.claude.json` or the project-level config):

```json
{
  "mcpServers": {
    "acme-api": {
      "command": "node",
      "args": ["/path/to/mcp-servers/acme-api/index.js"],
      "env": {
        "ACME_API_KEY": "${ACME_API_KEY}",
        "ACME_BASE_URL": "${ACME_BASE_URL}"
      }
    }
  }
}
```

For Python:
```json
{
  "mcpServers": {
    "acme-api": {
      "command": "python",
      "args": ["/path/to/mcp-servers/acme-api/server.py"],
      "env": {
        "ACME_API_KEY": "${ACME_API_KEY}",
        "ACME_BASE_URL": "${ACME_BASE_URL}"
      }
    }
  }
}
```

Store the server files in `growth-marketing/mcp-servers/` or `product-marketing/mcp-servers/` depending on which system it serves.

---

## Option C: Use an existing generic MCP connector

Several community-built MCP servers provide generic REST/GraphQL access without requiring a custom server:

| Server | Use case |
|---|---|
| `@modelcontextprotocol/server-fetch` | Simple HTTP GET/POST with no auth |
| Generic REST MCP servers | Any REST API with API key auth |
| `@modelcontextprotocol/server-postgres` | Direct database queries (Postgres) |
| `@modelcontextprotocol/server-sqlite` | Local SQLite data |

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

With the fetch server, agents can call `fetch` with a URL and headers directly — useful for one-off API calls without writing a custom server.

---

## Integration file template

When adding a new tool integration to `integrations/`, copy this template:

```markdown
# Integration: [Tool Name]

## What this enables
[What workflows and agents use this; what data it provides]

## Setup
### Authentication
[Step-by-step; which env vars to set]

### MCP server configuration
[JSON block]

### Required permissions
[Table of scopes/permissions and why each is needed]

## Available data / actions
[Key objects, fields, and example API calls]

## Which agents use this
[Table: agent → what it reads]

## Troubleshooting
[Table: issue → cause → fix]
```

---

## Security checklist for any new integration

Before adding any integration to the system:

- [ ] Credentials stored as env vars — never hardcoded in agent `.md` files or committed to git
- [ ] Minimum required permissions only — no admin or write access unless explicitly needed
- [ ] Integration uses a **service account** or **system user**, not a personal account
- [ ] Token rotation or expiry handling documented (if token has TTL)
- [ ] Add the tool to the **Tech Stack** section of `CLAUDE.md` client config
- [ ] Document which agents use it in both this integration file and the agent's **Context to read** section
