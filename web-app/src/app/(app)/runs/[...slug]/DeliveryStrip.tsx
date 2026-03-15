"use client";

import { useState } from "react";

interface Props {
  runPath: string;
  workflowName: string;
  googleConnected: boolean;
  existingDocUrl: string | null;
  existingSheetUrl: string | null;
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1 -mt-0.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1.5 -mt-0.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function SheetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1.5 -mt-0.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
      <line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  );
}

type DeliveryType = "doc" | "sheet";

interface ItemState {
  url: string | null;
  loading: boolean;
  error: string | null;
}

const isAdCopyWorkflow = (name: string) =>
  name.toLowerCase().includes("ad-copy") || name.toLowerCase().includes("ad copy");

export function DeliveryStrip({
  runPath,
  workflowName,
  googleConnected,
  existingDocUrl,
  existingSheetUrl,
}: Props) {
  const showSheet = isAdCopyWorkflow(workflowName);

  const [doc, setDoc] = useState<ItemState>({
    url: existingDocUrl,
    loading: false,
    error: null,
  });
  const [sheet, setSheet] = useState<ItemState>({
    url: existingSheetUrl,
    loading: false,
    error: null,
  });

  async function create(type: DeliveryType) {
    const setState = type === "doc" ? setDoc : setSheet;
    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const res = await fetch("/api/google/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runPath, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create document");
      setState({ url: data.url, loading: false, error: null });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setState((s) => ({ ...s, loading: false, error: msg }));
    }
  }

  if (!googleConnected) {
    return (
      <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500">
        <DocIcon />
        <span>
          <a href="/settings" className="text-indigo-600 hover:underline">Connect Google</a>
          {" "}to create Google Docs and Sheets from this run.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-xl">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mr-1">Deliver</span>

      {/* Google Doc */}
      {doc.url ? (
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          <DocIcon />
          View in Google Docs
          <ExternalLinkIcon />
        </a>
      ) : (
        <button
          onClick={() => create("doc")}
          disabled={doc.loading}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DocIcon />
          {doc.loading ? "Creating…" : "Create Google Doc"}
        </button>
      )}

      {/* Google Sheet — only for ad copy runs */}
      {showSheet && (
        sheet.url ? (
          <a
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            <SheetIcon />
            View in Google Sheets
            <ExternalLinkIcon />
          </a>
        ) : (
          <button
            onClick={() => create("sheet")}
            disabled={sheet.loading}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SheetIcon />
            {sheet.loading ? "Creating…" : "Create Google Sheet"}
          </button>
        )
      )}

      {doc.error && <p className="text-xs text-red-500 w-full mt-1">{doc.error}</p>}
      {sheet.error && <p className="text-xs text-red-500 w-full mt-1">{sheet.error}</p>}
    </div>
  );
}
