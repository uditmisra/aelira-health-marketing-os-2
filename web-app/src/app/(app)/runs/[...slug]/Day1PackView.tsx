"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export interface Day1PackTab {
  id: string;
  label: string;
  icon: string;
  content: string | null;
  isEmpty: boolean;
}

interface Props {
  tabs: Day1PackTab[];
}

export function Day1PackView({ tabs }: Props) {
  const firstPopulated = tabs.find((t) => !t.isEmpty);
  const [activeId, setActiveId] = useState(firstPopulated?.id ?? tabs[0]?.id ?? "");

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className="mb-5">
      {/* Tab bar */}
      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeId === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : tab.isEmpty
                ? "text-gray-300 cursor-default"
                : "text-gray-500 hover:text-gray-700"
            }`}
            disabled={tab.isEmpty}
          >
            <span>{tab.icon}</span>
            {tab.label}
            {tab.isEmpty && (
              <span className="text-gray-300 font-normal">—</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active && !active.isEmpty && active.content ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="prose prose-sm max-w-none text-gray-700 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:text-gray-600 [&_h3]:uppercase [&_h3]:tracking-wide [&_table]:text-xs [&_code]:text-xs [&_pre]:bg-gray-50 [&_pre]:rounded-lg [&_pre]:text-xs">
            <ReactMarkdown>{active.content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-10 text-center">
          <p className="text-sm text-gray-400">
            {active?.isEmpty
              ? `${active.label} not yet generated — still running or not part of this run.`
              : "No content."}
          </p>
        </div>
      )}
    </div>
  );
}
