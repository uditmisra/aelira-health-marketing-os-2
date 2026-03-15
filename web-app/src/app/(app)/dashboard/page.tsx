import { getFile, getRunHistory, getAllWorkflows, getCoreFileStaleness } from "@/lib/github";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Day1PackLauncher } from "./Day1PackLauncher";
import { ForkStatusBanner } from "./ForkStatusBanner";

export const revalidate = 300;

// ─── Overdue weekly workflows ──────────────────────────────────────────────────

const WEEKLY_WORKFLOWS = [
  { name: "weekly-performance-review", label: "Weekly Performance Review" },
  { name: "weekly-competitive-pulse",  label: "Competitive Pulse" },
  { name: "weekly-system-review",      label: "Weekly System Review" },
];

interface OverdueWorkflow {
  name: string;
  label: string;
  daysSince: number | null;
}

function getOverdueWorkflows(runs: { workflow: string; runId: string }[]): OverdueWorkflow[] {
  const overdue: OverdueWorkflow[] = [];
  const now = new Date();

  for (const wf of WEEKLY_WORKFLOWS) {
    const lastRun = runs.find((r) => r.workflow === wf.name);
    if (!lastRun) {
      overdue.push({ ...wf, daysSince: null });
      continue;
    }
    const datePart = lastRun.runId.slice(0, 10);
    const date = new Date(datePart);
    if (isNaN(date.getTime())) continue;
    const daysSince = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince >= 8) overdue.push({ ...wf, daysSince });
  }

  return overdue;
}

function formatRunDate(runId: string): string {
  const parts = runId.split("-");
  if (parts.length >= 3) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = months[parseInt(parts[1]) - 1] ?? parts[1];
    return `${month} ${parseInt(parts[2])}`;
  }
  return runId;
}

const QUICK_LAUNCH = [
  { label: "Weekly Performance Review", category: "Email",    path: "growth-marketing/workflows/weekly-performance-review.yaml",                          workflowName: "weekly-performance-review" },
  { label: "Competitive Pulse",         category: "Research", path: "product-marketing/market-intelligence/workflows/weekly-competitive-pulse.yaml",       workflowName: "weekly-competitive-pulse" },
  { label: "Ad Copy Variations",        category: "Ads",      path: "growth-marketing/workflows/ad-copy-generation.yaml",                                  workflowName: "ad-copy-generation" },
  { label: "Weekly System Review",      category: "System",   path: "system-intelligence/workflows/weekly-system-review.yaml",                             workflowName: "weekly-system-review" },
];

const WEEKLY_OUTPUT_WORKFLOWS = [
  { name: "weekly-performance-review", label: "Performance Review" },
  { name: "weekly-competitive-pulse",  label: "Competitive Pulse"  },
];

function extractFirstSection(summary: string): string | null {
  const lines = summary.split("\n");
  // Find first ## heading and return text up to the next heading or 200 chars
  const startIdx = lines.findIndex((l) => l.startsWith("## "));
  if (startIdx === -1) {
    // No headings — return first 200 chars of non-empty content
    const text = summary.trim().slice(0, 220);
    return text || null;
  }
  const result: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ") || lines[i].startsWith("# ")) break;
    if (result.join("\n").length > 300) break;
    result.push(lines[i]);
  }
  return result.join("\n").trim().slice(0, 300) || null;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ fork?: string }>;
}) {
  const { fork: forkUrl } = await searchParams;
  const session = await auth();
  const userEmail = session?.user?.email ?? "";

  const [healthDashboard, recentRuns, workflows, stalenessAlerts, brandAssets, messagingPillars] = await Promise.all([
    getFile("core/system-intelligence/health-dashboard.md"),
    getRunHistory(),
    getAllWorkflows(),
    getCoreFileStaleness(),
    getFile("core/brand/assets.md"),
    getFile("core/brand/messaging-pillars.md"),
  ]);

  const brandBootstrapNeeded = !brandAssets;
  const day1PackNeeded = !messagingPillars;

  // Last run date per workflow name
  const lastRunByWorkflow = new Map<string, { runId: string; path: string; summary: string | null }>();
  for (const run of recentRuns) {
    if (!lastRunByWorkflow.has(run.workflow)) {
      lastRunByWorkflow.set(run.workflow, { runId: run.runId, path: run.path, summary: run.summary });
    }
  }

  // Latest weekly output snippets
  const weeklyOutputs = WEEKLY_OUTPUT_WORKFLOWS.map((wf) => {
    const last = lastRunByWorkflow.get(wf.name);
    if (!last) return { ...wf, last: null };
    const snippet = last.summary ? extractFirstSection(last.summary) : null;
    return { ...wf, last: { ...last, snippet } };
  }).filter((w) => w.last !== null);

  const last10 = recentRuns.slice(0, 10);
  const approvalFiles = await Promise.all(
    last10.map((run) => getFile(`${run.path}/approval.md`))
  );
  const pendingApprovalRuns = last10.filter((_, i) => !approvalFiles[i]);

  const latestRuns = recentRuns.slice(0, 5);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const runsThisMonth = recentRuns.filter((r) => r.runId.startsWith(thisMonth)).length;
  const overdueWorkflows = getOverdueWorkflows(recentRuns);

  // Retention digest — show on Mondays when the system has been used in the last 30 days
  const now = new Date();
  const isMonday = now.getDay() === 1;
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const hasRecentRuns = recentRuns.some((r) => {
    const datePart = r.runId.slice(0, 10);
    const d = new Date(datePart);
    return !isNaN(d.getTime()) && d >= thirtyDaysAgo;
  });
  const showRetentionDigest = isMonday && hasRecentRuns && !day1PackNeeded;

  const retentionMailto = (() => {
    if (!showRetentionDigest) return null;
    const subject = encodeURIComponent("Marketing OS — Weekly Digest");
    const overdueLines = overdueWorkflows.length > 0
      ? `Overdue workflows:\n${overdueWorkflows.map((w) => `- ${w.label}: ${w.daysSince === null ? "never run" : `${w.daysSince} days ago`}`).join("\n")}`
      : "All weekly workflows are up to date.";
    const staleLines = stalenessAlerts.length > 0
      ? `\n\nStale core/ files:\n${stalenessAlerts.map((a) => `- ${a.label} (${a.daysSince}d old, max ${a.thresholdDays}d)`).join("\n")}`
      : "";
    const recentLine = `\nRuns this month: ${recentRuns.filter((r) => r.runId.startsWith(now.toISOString().slice(0, 7))).length}`;
    const body = encodeURIComponent(
      `Here's what's happening in your Marketing OS this week:\n\n${overdueLines}${staleLines}${recentLine}\n\nOpen your dashboard: ${typeof window !== "undefined" ? window.location.origin : ""}/dashboard`
    );
    return `mailto:${userEmail}?subject=${subject}&body=${body}`;
  })();

  const hasAlerts =
    brandBootstrapNeeded ||
    pendingApprovalRuns.length > 0 ||
    stalenessAlerts.length > 0 ||
    overdueWorkflows.length > 0;

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">System overview and quick actions.</p>
        </div>
        <Link
          href="/workflows"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          New Workflow
        </Link>
      </div>

      {/* Fork status — shown right after onboarding */}
      {forkUrl && <ForkStatusBanner forkUrl={decodeURIComponent(forkUrl)} />}

      {/* Day 1 Pack hero launcher — shown when system has never been set up */}
      {day1PackNeeded && <Day1PackLauncher />}

      {/* Retention digest — shown on Mondays when system has been used in last 30 days */}
      {showRetentionDigest && retentionMailto && (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3.5 mb-3">
          <div className="flex items-center gap-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.07 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span className="text-sm font-medium text-emerald-800">Monday digest ready</span>
            <span className="text-xs text-emerald-600 hidden sm:inline">
              — {overdueWorkflows.length > 0 ? `${overdueWorkflows.length} overdue workflow${overdueWorkflows.length > 1 ? "s" : ""}` : "all workflows up to date"}
              {stalenessAlerts.length > 0 ? ` · ${stalenessAlerts.length} stale file${stalenessAlerts.length > 1 ? "s" : ""}` : ""}
            </span>
          </div>
          <a
            href={retentionMailto}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-900 whitespace-nowrap ml-4"
          >
            Email digest to yourself →
          </a>
        </div>
      )}

      {hasAlerts && (
        <div className="flex flex-col gap-2.5 mb-7">

          {brandBootstrapNeeded && (
            <div className="flex items-center justify-between bg-violet-50 border border-violet-200 rounded-xl px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span className="text-sm font-medium text-violet-800">Brand assets not set up</span>
                <span className="text-xs text-violet-600 hidden sm:inline">— run Brand Bootstrap to extract colors, fonts, and build email + Figma templates</span>
              </div>
              <Link
                href={"/workflows?run=" + encodeURIComponent("client-setup/workflows/brand-bootstrap.yaml")}
                className="text-xs font-medium text-violet-700 hover:text-violet-900 whitespace-nowrap ml-4"
              >
                Set up now →
              </Link>
            </div>
          )}

          {pendingApprovalRuns.length > 0 && (
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <span className="text-sm font-medium text-amber-800">
                  {pendingApprovalRuns.length === 1
                    ? "1 run is awaiting your review"
                    : `${pendingApprovalRuns.length} runs are awaiting your review`}
                </span>
                <span className="text-xs text-amber-600 hidden sm:inline">
                  — {pendingApprovalRuns.slice(0, 3).map((r) => r.workflow.replace(/-/g, " ")).join(", ")}
                  {pendingApprovalRuns.length > 3 ? ` +${pendingApprovalRuns.length - 3} more` : ""}
                </span>
              </div>
              <Link href="/runs" className="text-xs font-medium text-amber-700 hover:text-amber-900 whitespace-nowrap ml-4">
                Review →
              </Link>
            </div>
          )}

          {stalenessAlerts.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-3.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span className="text-sm font-medium text-orange-800">
                    {stalenessAlerts.length === 1
                      ? "1 core/ file is past its freshness threshold"
                      : `${stalenessAlerts.length} core/ files are past their freshness threshold`}
                  </span>
                </div>
                <Link href="/core" className="text-xs font-medium text-orange-700 hover:text-orange-900 whitespace-nowrap ml-4">
                  Update in Core Editor →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {stalenessAlerts.map((alert) => (
                  <span
                    key={alert.path}
                    className="inline-flex items-center gap-1 text-xs text-orange-700 bg-orange-100 border border-orange-200 rounded px-2 py-0.5"
                  >
                    <span className="font-mono">{alert.label}</span>
                    <span className="text-orange-500">· {alert.daysSince}d (max {alert.thresholdDays}d)</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {overdueWorkflows.length > 0 && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-sm font-medium text-blue-800">
                  {overdueWorkflows.map((wf) =>
                    wf.daysSince === null
                      ? `${wf.label} has never been run`
                      : `${wf.label} last ran ${wf.daysSince}d ago`
                  ).join(" · ")}
                </span>
              </div>
              <Link href="/workflows" className="text-xs font-medium text-blue-700 hover:text-blue-900 whitespace-nowrap ml-4">
                Run now →
              </Link>
            </div>
          )}

        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-3">Workflows Available</p>
          <p className="text-3xl font-semibold text-gray-900">{workflows.length}</p>
          <p className="text-xs text-gray-400 mt-1">across all systems</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Runs This Month</p>
            <span className="w-2 h-2 rounded-full bg-blue-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">{runsThisMonth}</p>
          <p className="text-xs text-gray-400 mt-1">{recentRuns.length} total all time</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-3">System Health</p>
          {healthDashboard ? (
            <>
              <p className="text-3xl font-semibold text-gray-900">Active</p>
              <p className="text-xs text-gray-400 mt-1">dashboard present</p>
            </>
          ) : (
            <>
              <p className="text-3xl font-semibold text-gray-300">—</p>
              <p className="text-xs text-gray-400 mt-1">run weekly system review</p>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Launch</h2>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_LAUNCH.map((wf) => {
            const isOverdue = overdueWorkflows.some((o) => wf.path.includes(o.name));
            const lastRun = lastRunByWorkflow.get(wf.workflowName);
            const lastRunLabel = lastRun
              ? (() => {
                  const parts = lastRun.runId.split("-");
                  if (parts.length >= 3) {
                    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    const month = months[parseInt(parts[1]) - 1] ?? parts[1];
                    return `Last: ${month} ${parseInt(parts[2])}`;
                  }
                  return `Last: ${lastRun.runId}`;
                })()
              : "Never run";
            return (
              <Link
                key={wf.path}
                href={"/workflows?run=" + encodeURIComponent(wf.path)}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all group relative"
              >
                {isOverdue && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-400" />
                )}
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded px-1.5 py-0.5 mb-2">
                  {wf.category}
                </span>
                <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900 leading-snug">
                  {wf.label}
                </p>
                <p className={`text-xs mt-2 ${lastRun ? "text-gray-400" : "text-gray-300"}`}>
                  {lastRunLabel}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest weekly outputs */}
      {weeklyOutputs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Latest Weekly Outputs</h2>
          <div className="grid grid-cols-2 gap-4">
            {weeklyOutputs.map((wf) => {
              if (!wf.last) return null;
              const { runId, path, snippet } = wf.last;
              const dateParts = runId.split("-");
              const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              const dateLabel = dateParts.length >= 3
                ? `${months[parseInt(dateParts[1]) - 1] ?? dateParts[1]} ${parseInt(dateParts[2])}`
                : runId;
              return (
                <div key={wf.name} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">{wf.label}</p>
                    <span className="text-xs text-gray-400">{dateLabel}</span>
                  </div>
                  {snippet ? (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{snippet}</p>
                  ) : (
                    <p className="text-xs text-gray-300">No summary available.</p>
                  )}
                  <Link
                    href={`/runs/${path}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 mt-3"
                  >
                    View full output →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Runs</h2>
          {recentRuns.length > 5 && (
            <Link href="/runs" className="text-sm text-gray-400 hover:text-gray-700">View all →</Link>
          )}
        </div>

        {latestRuns.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="text-sm text-gray-400">No runs yet. Pick a workflow above to get started.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-40">Run ID</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Workflow</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-40">Review</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-32">Date</th>
                </tr>
              </thead>
              <tbody>
                {latestRuns.map((run, i) => {
                  const approvalContent = approvalFiles[i];
                  const decision = approvalContent?.match(/^Status: (approved|rejected|changes_requested)/m)?.[1];
                  const isPending = !approvalContent;

                  return (
                    <tr key={run.runId + run.workflow} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{run.runId}</td>
                      <td className="px-5 py-3.5">
                        <Link href={"/runs/" + run.path} className="font-medium text-gray-800 hover:text-gray-900 capitalize">
                          {run.workflow.replace(/-/g, " ")}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        {decision === "approved" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Approved
                          </span>
                        )}
                        {decision === "rejected" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />Rejected
                          </span>
                        )}
                        {decision === "changes_requested" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Changes requested
                          </span>
                        )}
                        {isPending && !decision && (
                          <Link href={"/runs/" + run.path} className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />Awaiting review
                          </Link>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-400">{formatRunDate(run.runId)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
