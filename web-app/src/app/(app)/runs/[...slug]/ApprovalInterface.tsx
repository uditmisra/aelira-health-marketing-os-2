"use client";

import { useState } from "react";

interface Props {
  runPath: string;
  existingDecision: "approved" | "rejected" | "changes_requested" | null;
  existingNote: string | null;
  decidedBy: string | null;
  decidedAt: string | null;
}

const DECISION_STYLES = {
  approved: {
    container: "bg-green-50 border-green-200",
    badge: "text-green-700 bg-green-100 border-green-300",
    label: "Approved",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    ),
  },
  rejected: {
    container: "bg-red-50 border-red-200",
    badge: "text-red-700 bg-red-100 border-red-300",
    label: "Rejected",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    ),
  },
  changes_requested: {
    container: "bg-amber-50 border-amber-200",
    badge: "text-amber-700 bg-amber-100 border-amber-300",
    label: "Changes Requested",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
  },
};

export function ApprovalInterface({ runPath, existingDecision, existingNote, decidedBy, decidedAt }: Props) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState(existingDecision);
  const [savedNote, setSavedNote] = useState(existingNote);
  const [savedBy, setSavedBy] = useState(decidedBy);
  const [savedAt, setSavedAt] = useState(decidedAt);

  const submit = async (d: "approved" | "rejected" | "changes_requested") => {
    setLoading(d);
    setError(null);
    try {
      const res = await fetch("/api/runs/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runPath, decision: d, note: note.trim() || undefined }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save decision");
        return;
      }
      setDecision(d);
      setSavedNote(note.trim() || null);
      setSavedBy("you");
      setSavedAt(new Date().toLocaleString());
      setNote("");
    } catch {
      setError("Network error — check your connection");
    } finally {
      setLoading(null);
    }
  };

  if (decision) {
    const style = DECISION_STYLES[decision];
    return (
      <div className={`border rounded-xl px-5 py-4 ${style.container}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style.badge}`}>
              {style.icon}
              {style.label}
            </span>
            {savedBy && savedAt && (
              <span className="text-xs text-gray-500">by {savedBy} · {savedAt}</span>
            )}
          </div>
          <span className="text-xs text-gray-400">Written to GitHub</span>
        </div>
        {savedNote && (
          <p className="text-sm text-gray-600 mt-2 pl-1">{savedNote}</p>
        )}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span className="text-sm font-medium text-gray-700">Output Review</span>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional) — visible in the run record"
        rows={2}
        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 placeholder-gray-300 resize-none mb-3"
      />

      {error && (
        <p className="text-xs text-red-600 mb-3">{error}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => submit("approved")}
          disabled={!!loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {loading === "approved" ? "Saving…" : "Approve"}
        </button>
        <button
          onClick={() => submit("changes_requested")}
          disabled={!!loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {loading === "changes_requested" ? "Saving…" : "Request Changes"}
        </button>
        <button
          onClick={() => submit("rejected")}
          disabled={!!loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-red-300 text-red-600 bg-white text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          {loading === "rejected" ? "Saving…" : "Reject"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">Decision is written to <code className="bg-gray-100 px-1 rounded">approval.md</code> in the run directory. Claude checks it on the next run.</p>
    </div>
  );
}
