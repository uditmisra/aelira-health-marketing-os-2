import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getValidAccessToken } from "@/lib/google-kv";

// Google Ads REST API — requires:
//   GOOGLE_ADS_DEVELOPER_TOKEN  (env — apply at developers.google.com/google-ads/api/docs/get-started/dev-token)
//   GOOGLE_ADS_CUSTOMER_ID      (env — 10-digit account ID, no dashes)
// Plus the user's Google OAuth refresh token already stored in Supabase (used for Authorization header).
// The user's Google account must have access to the Google Ads account.

const GADS_BASE = "https://googleads.googleapis.com/v17";
const DEV_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");

// GAQL query: account-level metrics for last 30 days
const QUERY = `
  SELECT
    metrics.cost_micros,
    metrics.clicks,
    metrics.impressions,
    metrics.conversions,
    metrics.average_cpc
  FROM customer
  WHERE segments.date DURING LAST_30_DAYS
`.trim();

export async function GET() {
  if (!DEV_TOKEN || !CUSTOMER_ID) {
    return NextResponse.json({ connected: false });
  }

  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  if (!userEmail) {
    return NextResponse.json({ connected: false, error: "Not authenticated" });
  }

  const accessToken = await getValidAccessToken(userEmail);
  if (!accessToken) {
    return NextResponse.json({ connected: false, error: "Google account not connected" });
  }

  try {
    const res = await fetch(`${GADS_BASE}/customers/${CUSTOMER_ID}/googleAds:search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": DEV_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ connected: true, error: `Google Ads API ${res.status}: ${err.slice(0, 200)}` }, { status: 500 });
    }

    const data = await res.json();
    const rows: { metrics: { costMicros?: string; clicks?: string; impressions?: string; conversions?: string; averageCpc?: string } }[] =
      data.results ?? [];

    const totals = rows.reduce(
      (acc, row) => ({
        costMicros:  acc.costMicros  + parseInt(row.metrics.costMicros  ?? "0"),
        clicks:      acc.clicks      + parseInt(row.metrics.clicks      ?? "0"),
        impressions: acc.impressions + parseInt(row.metrics.impressions ?? "0"),
        conversions: acc.conversions + parseFloat(row.metrics.conversions ?? "0"),
      }),
      { costMicros: 0, clicks: 0, impressions: 0, conversions: 0 }
    );

    const spendUsd = totals.costMicros / 1_000_000;
    const cpc = totals.clicks > 0 ? spendUsd / totals.clicks : 0;
    const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;

    return NextResponse.json({
      connected: true,
      spend:       spendUsd,
      clicks:      totals.clicks,
      impressions: totals.impressions,
      conversions: Math.round(totals.conversions),
      cpc,
      ctr,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ connected: true, error: message }, { status: 500 });
  }
}
