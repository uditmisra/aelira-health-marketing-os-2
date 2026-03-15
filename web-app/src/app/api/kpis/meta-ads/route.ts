import { NextResponse } from "next/server";

// Meta Marketing API — requires:
//   META_ADS_ACCESS_TOKEN   (env — system user token from Meta Business Manager)
//   META_ADS_ACCOUNT_ID     (env — ad account ID, e.g. "act_123456789")
// See integrations/meta-ads.md for setup instructions.

const ACCESS_TOKEN = process.env.META_ADS_ACCESS_TOKEN;
const ACCOUNT_ID   = process.env.META_ADS_ACCOUNT_ID?.startsWith("act_")
  ? process.env.META_ADS_ACCOUNT_ID
  : process.env.META_ADS_ACCOUNT_ID
    ? `act_${process.env.META_ADS_ACCOUNT_ID}`
    : undefined;

const META_API_VERSION = "v19.0";
const META_BASE = `https://graph.facebook.com/${META_API_VERSION}`;

function last30DaysRange(): { since: string; until: string } {
  const until = new Date();
  const since = new Date(until);
  since.setDate(since.getDate() - 30);
  return {
    since: since.toISOString().slice(0, 10),
    until: until.toISOString().slice(0, 10),
  };
}

export async function GET() {
  if (!ACCESS_TOKEN || !ACCOUNT_ID) {
    return NextResponse.json({ connected: false });
  }

  try {
    const { since, until } = last30DaysRange();

    const params = new URLSearchParams({
      fields: "spend,impressions,clicks,cpm,ctr,actions,action_values",
      time_range: JSON.stringify({ since, until }),
      level: "account",
      access_token: ACCESS_TOKEN,
    });

    const res = await fetch(`${META_BASE}/${ACCOUNT_ID}/insights?${params}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const message = err?.error?.message ?? `Meta API ${res.status}`;
      return NextResponse.json({ connected: true, error: message }, { status: 500 });
    }

    const data = await res.json();
    const row = data.data?.[0];

    if (!row) {
      // No data in this period
      return NextResponse.json({
        connected: true,
        spend: 0, impressions: 0, clicks: 0, leads: 0, cpl: null, roas: null, ctr: 0,
      });
    }

    const spend       = parseFloat(row.spend ?? "0");
    const impressions = parseInt(row.impressions ?? "0");
    const clicks      = parseInt(row.clicks ?? "0");
    const ctr         = parseFloat(row.ctr ?? "0");

    // Extract lead count from actions array
    const actions: { action_type: string; value: string }[] = row.actions ?? [];
    const leads = actions
      .filter((a) => a.action_type === "lead" || a.action_type === "offsite_conversion.fb_pixel_lead")
      .reduce((sum, a) => sum + parseFloat(a.value ?? "0"), 0);

    // Extract purchase value for ROAS
    const purchaseValue = (row.action_values ?? [] as { action_type: string; value: string }[])
      .filter((a: { action_type: string }) => a.action_type === "purchase")
      .reduce((sum: number, a: { value: string }) => sum + parseFloat(a.value ?? "0"), 0);

    const cpl  = leads > 0  ? spend / leads : null;
    const roas = spend > 0 && purchaseValue > 0 ? purchaseValue / spend : null;

    return NextResponse.json({
      connected: true,
      spend,
      impressions,
      clicks,
      leads: Math.round(leads),
      cpl,
      roas,
      ctr,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ connected: true, error: message }, { status: 500 });
  }
}
