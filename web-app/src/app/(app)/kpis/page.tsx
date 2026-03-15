import { CsvUpload } from "./CsvUpload";

export const revalidate = 300;

// ─── Types ────────────────────────────────────────────────────────────────────

interface HubSpotMetrics {
  connected: boolean; error?: string;
  mqls?: number; sqls?: number; openPipeline?: number; newDeals?: number;
}
interface GoogleAdsMetrics {
  connected: boolean; error?: string;
  spend?: number; clicks?: number; impressions?: number; conversions?: number; cpc?: number; ctr?: number;
}
interface LinkedInAdsMetrics {
  connected: boolean; error?: string;
  spend?: number; impressions?: number; clicks?: number; leads?: number; cpl?: number | null; ctr?: number;
}
interface MetaAdsMetrics {
  connected: boolean; error?: string;
  spend?: number; impressions?: number; clicks?: number; leads?: number; cpl?: number | null; roas?: number | null; ctr?: number;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

async function fetchJson<T>(path: string): Promise<T> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}${path}`, { next: { revalidate: 300 } });
    return res.json();
  } catch {
    return { connected: false, error: "Failed to fetch" } as T;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

// ─── Components ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | null;
  sublabel?: string;
  connected: boolean;
  connectHref?: string;
  accentColor: string;
}

function MetricCard({ label, value, sublabel, connected, connectHref, accentColor }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      {connected && value !== null ? (
        <>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight">{value}</p>
          {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
        </>
      ) : (
        <div>
          <p className="text-3xl font-semibold text-gray-200">—</p>
          <p className="text-xs text-gray-400 mt-1">
            Not connected
            {connectHref && <a href={connectHref} className="ml-1 text-indigo-500 hover:underline">· Connect</a>}
          </p>
        </div>
      )}
    </div>
  );
}

interface SectionHeaderProps {
  logo: React.ReactNode;
  name: string;
  connected: boolean;
  error?: string;
  liveLabel?: string;
  connectHref?: string;
}

function SectionHeader({ logo, name, connected, error, liveLabel, connectHref }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {logo}
      <h2 className="text-sm font-medium text-gray-600">{name}</h2>
      {!connected && (
        <a href={connectHref ?? "/settings"} className="text-xs text-indigo-500 hover:underline">· Connect in Settings</a>
      )}
      {connected && !error && (
        <span className="text-xs text-green-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          {liveLabel ?? "Live · last 30 days"}
        </span>
      )}
      {connected && error && (
        <span className="text-xs text-red-500">· Error: {error}</span>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function KPIsPage() {
  const [hs, gads, li, meta] = await Promise.all([
    fetchJson<HubSpotMetrics>("/api/kpis/hubspot"),
    fetchJson<GoogleAdsMetrics>("/api/kpis/google-ads"),
    fetchJson<LinkedInAdsMetrics>("/api/kpis/linkedin-ads"),
    fetchJson<MetaAdsMetrics>("/api/kpis/meta-ads"),
  ]);

  const isOk = (m: { connected: boolean; error?: string }) => m.connected && !m.error;

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">KPI Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Live metrics from connected integrations.</p>
        </div>
        <a
          href="/settings"
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Manage integrations
        </a>
      </div>

      {/* ── HubSpot ── */}
      <div className="mb-6">
        <SectionHeader
          logo={<div className="w-5 h-5 rounded bg-orange-100 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-orange-600">H</span></div>}
          name="HubSpot CRM"
          connected={hs.connected}
          error={hs.error}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="MQLs"         value={hs.mqls !== undefined ? String(hs.mqls) : null}                sublabel="Marketing qualified leads"   connected={isOk(hs)} connectHref="/settings" accentColor="#f97316" />
          <MetricCard label="SQLs"         value={hs.sqls !== undefined ? String(hs.sqls) : null}                sublabel="Sales qualified leads"      connected={isOk(hs)} connectHref="/settings" accentColor="#22c55e" />
          <MetricCard label="Open Pipeline" value={hs.openPipeline !== undefined ? formatCurrency(hs.openPipeline) : null} sublabel="Non-closed deals" connected={isOk(hs)} connectHref="/settings" accentColor="#6366f1" />
          <MetricCard label="New Deals"    value={hs.newDeals !== undefined ? String(hs.newDeals) : null}        sublabel="Created in last 30 days"    connected={isOk(hs)} connectHref="/settings" accentColor="#3b82f6" />
        </div>
      </div>

      {/* ── Google Ads ── */}
      <div className="mb-6">
        <SectionHeader
          logo={<div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-blue-600">G</span></div>}
          name="Google Ads"
          connected={gads.connected}
          error={gads.error}
          connectHref="/settings"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Spend"       value={gads.spend !== undefined ? formatCurrency(gads.spend) : null}          sublabel="Last 30 days"             connected={isOk(gads)} connectHref="/settings" accentColor="#4285f4" />
          <MetricCard label="Clicks"      value={gads.clicks !== undefined ? formatNum(gads.clicks) : null}              sublabel="Total clicks"             connected={isOk(gads)} connectHref="/settings" accentColor="#34a853" />
          <MetricCard label="CPC"         value={gads.cpc !== undefined ? formatCurrency(gads.cpc) : null}               sublabel="Avg cost per click"       connected={isOk(gads)} connectHref="/settings" accentColor="#fbbc05" />
          <MetricCard label="Conversions" value={gads.conversions !== undefined ? String(gads.conversions) : null}       sublabel="Last 30 days"             connected={isOk(gads)} connectHref="/settings" accentColor="#ea4335" />
        </div>
      </div>

      {/* ── LinkedIn Ads ── */}
      <div className="mb-6">
        <SectionHeader
          logo={<div className="w-5 h-5 rounded bg-blue-700 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-white">in</span></div>}
          name="LinkedIn Ads"
          connected={li.connected}
          error={li.error}
          connectHref="/settings"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Spend"       value={li.spend !== undefined ? formatCurrency(li.spend) : null}               sublabel="Last 30 days"             connected={isOk(li)} connectHref="/settings" accentColor="#0077b5" />
          <MetricCard label="Leads"       value={li.leads !== undefined ? String(li.leads) : null}                       sublabel="Form submissions"         connected={isOk(li)} connectHref="/settings" accentColor="#00b0f0" />
          <MetricCard label="CPL"         value={li.cpl != null ? formatCurrency(li.cpl) : (li.connected ? "—" : null)}  sublabel="Cost per lead"            connected={isOk(li)} connectHref="/settings" accentColor="#0a66c2" />
          <MetricCard label="CTR"         value={li.ctr !== undefined ? `${li.ctr.toFixed(2)}%` : null}                  sublabel="Click-through rate"       connected={isOk(li)} connectHref="/settings" accentColor="#57a9d9" />
        </div>
      </div>

      {/* ── Meta Ads ── */}
      <div className="mb-6">
        <SectionHeader
          logo={<div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-indigo-600">M</span></div>}
          name="Meta Ads"
          connected={meta.connected}
          error={meta.error}
          connectHref="/settings"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Spend"  value={meta.spend !== undefined ? formatCurrency(meta.spend) : null}                sublabel="Last 30 days"             connected={isOk(meta)} connectHref="/settings" accentColor="#1877f2" />
          <MetricCard label="Leads"  value={meta.leads !== undefined ? String(meta.leads) : null}                        sublabel="Lead gen conversions"     connected={isOk(meta)} connectHref="/settings" accentColor="#42b72a" />
          <MetricCard label="CPL"    value={meta.cpl != null ? formatCurrency(meta.cpl) : (meta.connected ? "—" : null)} sublabel="Cost per lead"            connected={isOk(meta)} connectHref="/settings" accentColor="#e4405f" />
          <MetricCard label="ROAS"   value={meta.roas != null ? `${meta.roas.toFixed(2)}x` : (meta.connected ? "—" : null)} sublabel="Return on ad spend"    connected={isOk(meta)} connectHref="/settings" accentColor="#ff6600" />
        </div>
      </div>

      {/* CSV upload */}
      <CsvUpload />
    </div>
  );
}
