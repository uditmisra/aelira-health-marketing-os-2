import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getIntegrationToken } from "@/lib/integration-kv";

// LinkedIn Marketing API — requires:
//   LINKEDIN_ADS_ACCOUNT_ID  (env — numeric ID of the Sponsored Account, e.g. 123456789)
// Plus a LinkedIn OAuth token with r_ads + r_ads_reporting scopes,
// stored in Supabase under integration_id = "linkedin".

const ACCOUNT_ID = process.env.LINKEDIN_ADS_ACCOUNT_ID;
const LI_BASE = "https://api.linkedin.com/v2";

function dateRange(): { start: string; end: string } {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - 30);
  return {
    start: start.toISOString().slice(0, 10),
    end:   end.toISOString().slice(0, 10),
  };
}

export async function GET() {
  if (!ACCOUNT_ID) {
    return NextResponse.json({ connected: false });
  }

  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  if (!userEmail) {
    return NextResponse.json({ connected: false, error: "Not authenticated" });
  }

  const token = await getIntegrationToken(userEmail, "linkedin");
  if (!token) {
    return NextResponse.json({ connected: false });
  }

  try {
    const { start, end } = dateRange();
    const [sy, sm, sd] = start.split("-").map(Number);
    const [ey, em, ed] = end.split("-").map(Number);

    const params = new URLSearchParams({
      q: "analytics",
      pivot: "ACCOUNT",
      "dateRange.start.year":  String(sy),
      "dateRange.start.month": String(sm),
      "dateRange.start.day":   String(sd),
      "dateRange.end.year":    String(ey),
      "dateRange.end.month":   String(em),
      "dateRange.end.day":     String(ed),
      fields: "costInLocalCurrency,impressions,clicks,leads,conversions",
      accounts: `urn:li:sponsoredAccount:${ACCOUNT_ID}`,
    });

    const res = await fetch(`${LI_BASE}/adAnalyticsV2?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "LinkedIn-Version": "202404",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ connected: true, error: `LinkedIn API ${res.status}: ${err.slice(0, 200)}` }, { status: 500 });
    }

    const data = await res.json();
    const elements: {
      costInLocalCurrency?: string;
      impressions?: number;
      clicks?: number;
      leads?: number;
      conversions?: number;
    }[] = data.elements ?? [];

    const totals = elements.reduce(
      (acc: { spend: number; impressions: number; clicks: number; leads: number; conversions: number }, el) => ({
        spend:       acc.spend       + parseFloat(el.costInLocalCurrency ?? "0"),
        impressions: acc.impressions + (el.impressions ?? 0),
        clicks:      acc.clicks      + (el.clicks ?? 0),
        leads:       acc.leads       + (el.leads ?? 0),
        conversions: acc.conversions + (el.conversions ?? 0),
      }),
      { spend: 0, impressions: 0, clicks: 0, leads: 0, conversions: 0 }
    );

    const cpl = totals.leads > 0 ? totals.spend / totals.leads : null;
    const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;

    return NextResponse.json({
      connected: true,
      spend:       totals.spend,
      impressions: totals.impressions,
      clicks:      totals.clicks,
      leads:       totals.leads,
      cpl,
      ctr,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ connected: true, error: message }, { status: 500 });
  }
}
