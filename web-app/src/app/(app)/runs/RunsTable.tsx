"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { RunSummary } from "@/lib/github";

function parseRunId(runId: string): { date: string; time: string | null } {
  // Format: YYYY-MM-DD-HHMMSS or YYYY-MM-DD-NNNNNN
  const parts = runId.split("-");
  if (parts.length < 3) return { date: runId, time: null };

  const [year, month, day, seq] = parts;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthName = months[parseInt(month, 10) - 1] ?? month;
  const date = `${monthName} ${parseInt(day, 10)}, ${year}`;

  // If 4th segment looks like a time (6 digits), format it
  let time: string | null = null;
  if (seq && seq.length === 6 && !isNaN(Number(seq))) {
    const h = seq.slice(0, 2);
    const m = seq.slice(2, 4);
    time = parseInt(h) > 0 || parseInt(m) > 0 ? `${h}:${m}` : null;
  }

  return { date, time };
}

function parseStatus(summary: string | null): "complete" | "partial" | "failed" {
  if (!summary) return "partial";
  const lower = summary.toLowerCase();
  if (lower.includes("status: complete")) return "complete";
  if (lower.includes("status: failed") || lower.includes("status: error")) return "failed";
  return "partial";
}

function StatusBadge({ status }: { status: "complete" | "partial" | "failed" }) {
  if (status === "complete") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2"/>
          <polyline points="9 12 11 14 15 10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Complete
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-500">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2"/>
        <line x1="12" y1="8" x2="12" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12.01" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      Partial
    </span>
  );
}

const PAGE_SIZE = 15;

export function RunsTable({ runs }: { runs: RunSummary[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return runs;
    const q = query.toLowerCase();
    return runs.filter(
      (r) =>
        r.workflow.toLowerCase().includes(q) ||
        r.runId.toLowerCase().includes(q)
    );
  }, [runs, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRuns = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(val: string) {
    setQuery(val);
    setPage(1);
  }

  if (runs.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-400 text-sm">No runs yet.</p>
        <Link href="/workflows" className="text-sm text-gray-600 hover:text-gray-900 mt-2 inline-block">
          Go to Workflows →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 bg-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 flex-shrink-0">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search workflow or run ID..."
              className="bg-transparent outline-none text-gray-700 placeholder-gray-300 w-full text-sm"
            />
            {query && (
              <button onClick={() => handleSearch("")} className="text-gray-300 hover:text-gray-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {filtered.length !== runs.length ? (
            <><span className="font-medium text-gray-700">{filtered.length}</span> matches</>
          ) : (
            <><span className="font-medium text-gray-700">{runs.length}</span> total runs</>
          )}
        </p>
      </div>

      {/* Table */}
      {pageRuns.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-400">No runs match &ldquo;{query}&rdquo;</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-32">Run ID</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Workflow</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-32">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-44">Date</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide w-20">Outputs</th>
            </tr>
          </thead>
          <tbody>
            {pageRuns.map((run) => {
              const { date, time } = parseRunId(run.runId);
              const status = parseStatus(run.summary);
              return (
                <tr key={run.runId + run.workflow} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{run.runId.slice(-6)}</td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/runs/${run.path}`}
                      className="font-medium text-gray-800 group-hover:text-gray-900 capitalize hover:underline"
                    >
                      {run.workflow.replace(/-/g, " ")}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">
                    {date}
                    {time && <span className="text-gray-300 ml-1">{time}</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    {run.summary ? (
                      <Link
                        href={`/runs/${run.path}`}
                        className="text-xs text-gray-400 hover:text-gray-700"
                        title="View outputs"
                      >
                        View →
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Page <span className="font-medium text-gray-700">{page}</span> of{" "}
            <span className="font-medium text-gray-700">{totalPages}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
