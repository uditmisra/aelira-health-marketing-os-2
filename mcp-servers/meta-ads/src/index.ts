#!/usr/bin/env node
/**
 * Meta Ads MCP Server
 *
 * Exposes Meta Marketing API data as MCP tools so Claude Desktop can query
 * campaign performance, spending, and ad effectiveness directly in conversation.
 *
 * Mirrors the approach described in Anthropic's internal growth marketing
 * case study: "created an MCP server integrated with Meta Ads API to query
 * campaign performance, spending data, and ad effectiveness directly within
 * the Claude Desktop app."
 *
 * Setup: see mcp-servers/meta-ads/README.md
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ─── Config ───────────────────────────────────────────────────────────────────

const ACCESS_TOKEN = process.env.META_ADS_ACCESS_TOKEN;
const RAW_ACCOUNT_ID = process.env.META_ADS_ACCOUNT_ID ?? "";
const ACCOUNT_ID = RAW_ACCOUNT_ID.startsWith("act_") ? RAW_ACCOUNT_ID : `act_${RAW_ACCOUNT_ID}`;
const API_VERSION = "v19.0";
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

if (!ACCESS_TOKEN || !RAW_ACCOUNT_ID) {
  process.stderr.write(
    "ERROR: META_ADS_ACCESS_TOKEN and META_ADS_ACCOUNT_ID environment variables are required.\n" +
    "See mcp-servers/meta-ads/README.md for setup instructions.\n"
  );
  process.exit(1);
}

// ─── Meta API helper ──────────────────────────────────────────────────────────

async function metaGet(path: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("access_token", ACCESS_TOKEN!);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err?.error?.message ?? `Meta API ${res.status} at ${path}`);
  }
  return res.json();
}

function defaultDateRange(daysBack = 30): { since: string; until: string } {
  const until = new Date();
  const since = new Date(until);
  since.setDate(since.getDate() - daysBack);
  return {
    since: since.toISOString().slice(0, 10),
    until: until.toISOString().slice(0, 10),
  };
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ─── Tool implementations ─────────────────────────────────────────────────────

async function getAccountOverview(args: { days?: number }): Promise<string> {
  const { since, until } = defaultDateRange(args.days ?? 30);

  const data = await metaGet(`/${ACCOUNT_ID}/insights`, {
    fields: "spend,impressions,clicks,cpm,ctr,actions,action_values,reach",
    time_range: JSON.stringify({ since, until }),
    level: "account",
  }) as { data?: { spend?: string; impressions?: string; clicks?: string; cpm?: string; ctr?: string; reach?: string; actions?: { action_type: string; value: string }[]; action_values?: { action_type: string; value: string }[] }[] };

  const row = data.data?.[0];
  if (!row) return `No data available for the last ${args.days ?? 30} days.`;

  const spend = parseFloat(row.spend ?? "0");
  const impressions = parseInt(row.impressions ?? "0");
  const clicks = parseInt(row.clicks ?? "0");
  const reach = parseInt(row.reach ?? "0");
  const cpm = parseFloat(row.cpm ?? "0");
  const ctr = parseFloat(row.ctr ?? "0");

  const actions = row.actions ?? [];
  const leads = actions
    .filter((a) => a.action_type === "lead" || a.action_type === "offsite_conversion.fb_pixel_lead")
    .reduce((s, a) => s + parseFloat(a.value), 0);

  const purchaseValue = (row.action_values ?? [])
    .filter((a) => a.action_type === "purchase")
    .reduce((s, a) => s + parseFloat(a.value), 0);

  const cpl = leads > 0 ? spend / leads : null;
  const roas = spend > 0 && purchaseValue > 0 ? purchaseValue / spend : null;

  return [
    `## Meta Ads Account Overview — Last ${args.days ?? 30} Days`,
    `**Period:** ${since} to ${until}`,
    ``,
    `| Metric | Value |`,
    `|---|---|`,
    `| Spend | ${formatCurrency(spend)} |`,
    `| Reach | ${reach.toLocaleString()} |`,
    `| Impressions | ${impressions.toLocaleString()} |`,
    `| Clicks | ${clicks.toLocaleString()} |`,
    `| CPM | ${formatCurrency(cpm)} |`,
    `| CTR | ${ctr.toFixed(2)}% |`,
    `| Leads | ${Math.round(leads)} |`,
    `| CPL | ${cpl ? formatCurrency(cpl) : "—"} |`,
    `| Purchase value | ${purchaseValue > 0 ? formatCurrency(purchaseValue) : "—"} |`,
    `| ROAS | ${roas ? `${roas.toFixed(2)}x` : "—"} |`,
  ].join("\n");
}

async function getCampaignPerformance(args: { days?: number; sort_by?: string }): Promise<string> {
  const { since, until } = defaultDateRange(args.days ?? 30);

  const data = await metaGet(`/${ACCOUNT_ID}/insights`, {
    fields: "campaign_name,spend,impressions,clicks,ctr,actions",
    time_range: JSON.stringify({ since, until }),
    level: "campaign",
    sort: `[{"field":"${args.sort_by ?? "spend"}","direction":"descending"}]`,
    limit: "20",
  }) as { data?: { campaign_name?: string; spend?: string; impressions?: string; clicks?: string; ctr?: string; actions?: { action_type: string; value: string }[] }[] };

  const rows = data.data ?? [];
  if (rows.length === 0) return "No campaign data for this period.";

  const lines = [
    `## Campaign Performance — Last ${args.days ?? 30} Days`,
    ``,
    `| Campaign | Spend | Impressions | Clicks | CTR | Leads |`,
    `|---|---|---|---|---|---|`,
  ];

  for (const row of rows) {
    const leads = (row.actions ?? [])
      .filter((a) => a.action_type === "lead" || a.action_type === "offsite_conversion.fb_pixel_lead")
      .reduce((s, a) => s + parseFloat(a.value), 0);

    lines.push(
      `| ${row.campaign_name ?? "—"} | ${formatCurrency(parseFloat(row.spend ?? "0"))} | ${parseInt(row.impressions ?? "0").toLocaleString()} | ${parseInt(row.clicks ?? "0").toLocaleString()} | ${parseFloat(row.ctr ?? "0").toFixed(2)}% | ${Math.round(leads)} |`
    );
  }

  return lines.join("\n");
}

async function getAdPerformance(args: { days?: number; campaign_id?: string }): Promise<string> {
  const { since, until } = defaultDateRange(args.days ?? 30);

  const path = args.campaign_id
    ? `/${args.campaign_id}/insights`
    : `/${ACCOUNT_ID}/insights`;

  const data = await metaGet(path, {
    fields: "ad_name,adset_name,campaign_name,spend,impressions,clicks,ctr,actions,cpm",
    time_range: JSON.stringify({ since, until }),
    level: "ad",
    sort: `[{"field":"spend","direction":"descending"}]`,
    limit: "25",
  }) as { data?: { ad_name?: string; adset_name?: string; campaign_name?: string; spend?: string; impressions?: string; clicks?: string; ctr?: string; cpm?: string; actions?: { action_type: string; value: string }[] }[] };

  const rows = data.data ?? [];
  if (rows.length === 0) return "No ad-level data for this period.";

  const lines = [
    `## Ad Performance — Last ${args.days ?? 30} Days`,
    ``,
    `| Ad | Campaign | Spend | CTR | CPM | Leads |`,
    `|---|---|---|---|---|---|`,
  ];

  for (const row of rows) {
    const leads = (row.actions ?? [])
      .filter((a) => a.action_type === "lead" || a.action_type === "offsite_conversion.fb_pixel_lead")
      .reduce((s, a) => s + parseFloat(a.value), 0);

    lines.push(
      `| ${row.ad_name ?? "—"} | ${row.campaign_name ?? "—"} | ${formatCurrency(parseFloat(row.spend ?? "0"))} | ${parseFloat(row.ctr ?? "0").toFixed(2)}% | ${formatCurrency(parseFloat(row.cpm ?? "0"))} | ${Math.round(leads)} |`
    );
  }

  return lines.join("\n");
}

async function getTopPerformingAds(args: { days?: number; metric?: string; limit?: number }): Promise<string> {
  const { since, until } = defaultDateRange(args.days ?? 30);
  const metric = args.metric ?? "ctr";
  const limit = args.limit ?? 10;

  const data = await metaGet(`/${ACCOUNT_ID}/insights`, {
    fields: "ad_name,campaign_name,spend,impressions,clicks,ctr,cpm,actions",
    time_range: JSON.stringify({ since, until }),
    level: "ad",
    sort: `[{"field":"${metric}","direction":"descending"}]`,
    limit: String(limit),
    filtering: `[{"field":"spend","operator":"GREATER_THAN","value":"1"}]`,
  }) as { data?: { ad_name?: string; campaign_name?: string; spend?: string; clicks?: string; ctr?: string; cpm?: string; actions?: { action_type: string; value: string }[] }[] };

  const rows = data.data ?? [];
  if (rows.length === 0) return `No ads with spend found for the last ${args.days ?? 30} days.`;

  const lines = [
    `## Top ${limit} Ads by ${metric.toUpperCase()} — Last ${args.days ?? 30} Days`,
    ``,
  ];

  rows.forEach((row, i) => {
    const leads = (row.actions ?? [])
      .filter((a) => a.action_type === "lead" || a.action_type === "offsite_conversion.fb_pixel_lead")
      .reduce((s, a) => s + parseFloat(a.value), 0);
    const cpl = leads > 0 ? parseFloat(row.spend ?? "0") / leads : null;

    lines.push(
      `${i + 1}. **${row.ad_name ?? "Unnamed ad"}**`,
      `   Campaign: ${row.campaign_name ?? "—"}`,
      `   Spend: ${formatCurrency(parseFloat(row.spend ?? "0"))} · CTR: ${parseFloat(row.ctr ?? "0").toFixed(2)}% · CPM: ${formatCurrency(parseFloat(row.cpm ?? "0"))} · Leads: ${Math.round(leads)}${cpl ? ` · CPL: ${formatCurrency(cpl)}` : ""}`,
      ``
    );
  });

  return lines.join("\n");
}

async function getSpendingByCampaign(args: { days?: number }): Promise<string> {
  const { since, until } = defaultDateRange(args.days ?? 30);

  const data = await metaGet(`/${ACCOUNT_ID}/insights`, {
    fields: "campaign_name,spend,objective",
    time_range: JSON.stringify({ since, until }),
    level: "campaign",
    sort: `[{"field":"spend","direction":"descending"}]`,
  }) as { data?: { campaign_name?: string; spend?: string; objective?: string }[] };

  const rows = data.data ?? [];
  if (rows.length === 0) return "No spending data for this period.";

  const totalSpend = rows.reduce((s, r) => s + parseFloat(r.spend ?? "0"), 0);

  const lines = [
    `## Spending by Campaign — Last ${args.days ?? 30} Days`,
    `**Total:** ${formatCurrency(totalSpend)}`,
    ``,
    `| Campaign | Objective | Spend | % of Budget |`,
    `|---|---|---|---|`,
  ];

  for (const row of rows) {
    const spend = parseFloat(row.spend ?? "0");
    const pct = totalSpend > 0 ? ((spend / totalSpend) * 100).toFixed(1) : "0.0";
    lines.push(`| ${row.campaign_name ?? "—"} | ${row.objective ?? "—"} | ${formatCurrency(spend)} | ${pct}% |`);
  }

  return lines.join("\n");
}

// ─── MCP server ───────────────────────────────────────────────────────────────

const server = new Server(
  { name: "marketing-os-meta-ads", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_account_overview",
      description: "Get a summary of Meta Ads account performance: total spend, impressions, clicks, leads, CPL, and ROAS for a date range.",
      inputSchema: {
        type: "object",
        properties: {
          days: { type: "number", description: "Number of days to look back (default: 30)" },
        },
      },
    },
    {
      name: "get_campaign_performance",
      description: "Get performance metrics for all campaigns: spend, impressions, clicks, CTR, and lead count.",
      inputSchema: {
        type: "object",
        properties: {
          days:    { type: "number", description: "Number of days to look back (default: 30)" },
          sort_by: { type: "string", description: "Sort campaigns by: spend | impressions | clicks | ctr (default: spend)" },
        },
      },
    },
    {
      name: "get_ad_performance",
      description: "Get ad-level performance breakdown. Optionally filter to a specific campaign.",
      inputSchema: {
        type: "object",
        properties: {
          days:        { type: "number", description: "Number of days to look back (default: 30)" },
          campaign_id: { type: "string", description: "Filter to a specific campaign ID (optional)" },
        },
      },
    },
    {
      name: "get_top_performing_ads",
      description: "Get the top N ads sorted by a performance metric. Useful for identifying creative winners.",
      inputSchema: {
        type: "object",
        properties: {
          days:   { type: "number", description: "Number of days to look back (default: 30)" },
          metric: { type: "string", description: "Sort by: ctr | spend | impressions | clicks (default: ctr)" },
          limit:  { type: "number", description: "Number of ads to return (default: 10)" },
        },
      },
    },
    {
      name: "get_spending_by_campaign",
      description: "Get spend breakdown by campaign with percentage of total budget. Useful for budget allocation review.",
      inputSchema: {
        type: "object",
        properties: {
          days: { type: "number", description: "Number of days to look back (default: 30)" },
        },
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const a = (args ?? {}) as Record<string, unknown>;

  try {
    let text: string;

    if (name === "get_account_overview") {
      text = await getAccountOverview({ days: a.days as number | undefined });
    } else if (name === "get_campaign_performance") {
      text = await getCampaignPerformance({ days: a.days as number | undefined, sort_by: a.sort_by as string | undefined });
    } else if (name === "get_ad_performance") {
      text = await getAdPerformance({ days: a.days as number | undefined, campaign_id: a.campaign_id as string | undefined });
    } else if (name === "get_top_performing_ads") {
      text = await getTopPerformingAds({ days: a.days as number | undefined, metric: a.metric as string | undefined, limit: a.limit as number | undefined });
    } else if (name === "get_spending_by_campaign") {
      text = await getSpendingByCampaign({ days: a.days as number | undefined });
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }

    return { content: [{ type: "text", text }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
