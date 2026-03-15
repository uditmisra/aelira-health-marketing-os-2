import { NextResponse } from "next/server";

const HS_BASE = "https://api.hubapi.com";

async function hsPost(path: string, body: object) {
  const res = await fetch(`${HS_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { revalidate: 300 }, // cache 5 min
  });
  if (!res.ok) throw new Error(`HubSpot ${path} → ${res.status}`);
  return res.json();
}

async function hsGet(path: string) {
  const res = await fetch(`${HS_BASE}${path}`, {
    headers: { Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`HubSpot ${path} → ${res.status}`);
  return res.json();
}

function thirtyDaysAgoMs() {
  return Date.now() - 30 * 24 * 60 * 60 * 1000;
}

export async function GET() {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    return NextResponse.json({ connected: false });
  }

  try {
    const sinceMs = thirtyDaysAgoMs().toString();

    const [mqlData, sqlData, dealData, totalDealsData] = await Promise.all([
      // MQLs created in last 30 days
      hsPost("/crm/v3/objects/contacts/search", {
        filterGroups: [{
          filters: [
            { propertyName: "lifecyclestage", operator: "EQ", value: "marketingqualifiedlead" },
            { propertyName: "createdate", operator: "GTE", value: sinceMs },
          ],
        }],
        limit: 1,
        properties: ["createdate"],
      }),
      // SQLs created in last 30 days
      hsPost("/crm/v3/objects/contacts/search", {
        filterGroups: [{
          filters: [
            { propertyName: "lifecyclestage", operator: "EQ", value: "salesqualifiedlead" },
            { propertyName: "createdate", operator: "GTE", value: sinceMs },
          ],
        }],
        limit: 1,
        properties: ["createdate"],
      }),
      // Open pipeline (non-closed deals) — sum amount
      hsPost("/crm/v3/objects/deals/search", {
        filterGroups: [{
          filters: [
            { propertyName: "closedate", operator: "GTE", value: sinceMs },
            { propertyName: "dealstage", operator: "NOT_IN", values: ["closedwon", "closedlost"] },
          ],
        }],
        limit: 100,
        properties: ["amount", "dealstage"],
      }),
      // New deals in last 30 days
      hsPost("/crm/v3/objects/deals/search", {
        filterGroups: [{
          filters: [
            { propertyName: "createdate", operator: "GTE", value: sinceMs },
          ],
        }],
        limit: 1,
        properties: ["createdate"],
      }),
    ]);

    const openPipeline = (dealData.results ?? []).reduce(
      (sum: number, d: { properties: { amount?: string } }) =>
        sum + parseFloat(d.properties.amount ?? "0"),
      0
    );

    return NextResponse.json({
      connected: true,
      mqls: mqlData.total ?? 0,
      sqls: sqlData.total ?? 0,
      openPipeline,
      newDeals: totalDealsData.total ?? 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ connected: true, error: message }, { status: 500 });
  }
}
