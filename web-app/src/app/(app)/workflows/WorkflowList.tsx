"use client";

import { useState } from "react";
import Link from "next/link";
import type { WorkflowEntry } from "@/lib/github";

interface Props {
  grouped: Record<string, WorkflowEntry[]>;
  activePath: string | undefined;
}

const SYSTEM_LABELS: Record<string, string> = {
  "client-setup": "Client Setup",
  "growth-marketing": "Growth Marketing",
  "product-marketing": "Product Marketing",
  "system-intelligence": "System Intelligence",
};

export function WorkflowList({ grouped, activePath }: Props) {
  const [query, setQuery] = useState("");

  const filtered: typeof grouped = {};
  for (const [system, wfs] of Object.entries(grouped)) {
    const matches = query
      ? wfs.filter((w) => w.yaml.name.toLowerCase().includes(query.toLowerCase()))
      : wfs;
    if (matches.length > 0) filtered[system] = matches;
  }

  return (
    <div className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find workflow..."
            className="text-sm text-gray-700 bg-transparent placeholder-gray-400 outline-none w-full"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {Object.keys(filtered).length === 0 && (
          <p className="px-4 py-6 text-sm text-gray-400 text-center">No workflows match.</p>
        )}
        {Object.entries(filtered).map(([system, wfs]) => (
          <div key={system} className="mb-4">
            <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {SYSTEM_LABELS[system] ?? system}
            </p>
            {wfs.map((wf) => {
              const active = activePath === wf.path;
              return (
                <Link
                  key={wf.path}
                  href={"/workflows?run=" + encodeURIComponent(wf.path)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors group ${active ? "bg-gray-50" : ""}`}
                >
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={active ? "#374151" : "#d1d5db"} strokeWidth="1.7"
                    className="flex-shrink-0 shrink-0"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <p className={`text-sm leading-snug truncate flex-1 min-w-0 ${active ? "font-medium text-gray-900" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {wf.yaml.name}
                  </p>
                  {wf.kind === "prose" && (
                    <span className="flex-shrink-0 text-xs text-gray-300 ml-1">md</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}
