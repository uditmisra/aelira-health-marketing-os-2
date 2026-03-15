"use client";

import { useState, useRef } from "react";

interface UploadedFile {
  name: string;
  size: number;
  content: string | null;
  hint: string;
  hintLabel: string;
}

const BINARY_EXTENSIONS = [".xlsx", ".xls", ".pdf", ".docx"];
const SUPPORTED_EXTENSIONS = [".csv", ".tsv", ".txt", ".json", ".md", ".xlsx", ".xls", ".pdf"];

const HINT_LABELS: Record<string, string> = {
  ad_performance: "Ad Performance",
  crm_export: "CRM Export",
  call_transcript: "Call Transcript",
  survey_results: "Survey Results",
  competitor_intel: "Competitor Intel",
  web_analytics: "Web Analytics",
  win_loss: "Win / Loss",
  auto: "Auto-detect",
};

function detectDataTypeHint(filename: string, content: string | null): string {
  const lower = filename.toLowerCase();
  if (lower.includes("ad") || lower.includes("campaign") || lower.includes("google_ads") || lower.includes("linkedin_ads")) return "ad_performance";
  if (lower.includes("crm") || lower.includes("deal") || lower.includes("hubspot") || lower.includes("salesforce")) return "crm_export";
  if (lower.includes("transcript") || lower.includes("gong") || lower.includes("call")) return "call_transcript";
  if (lower.includes("survey") || lower.includes("nps")) return "survey_results";
  if (lower.includes("competitor") || lower.includes("competitive")) return "competitor_intel";
  if (lower.includes("analytics") || lower.includes("ga4") || lower.includes("sessions")) return "web_analytics";
  if (lower.includes("win") || lower.includes("loss") || lower.includes("winloss")) return "win_loss";
  if (content) {
    const header = content.split("\n")[0].toLowerCase();
    if (header.includes("campaign") || header.includes("impressions") || header.includes("ctr") || header.includes("spend")) return "ad_performance";
    if (header.includes("deal") || header.includes("stage") || header.includes("close date") || header.includes("amount")) return "crm_export";
    if (header.includes("sessions") || header.includes("bounce") || header.includes("conversions")) return "web_analytics";
  }
  return "auto";
}

async function readFileContent(file: File): Promise<string | null> {
  const ext = "." + file.name.split(".").pop()!.toLowerCase();
  if (BINARY_EXTENSIONS.includes(ext)) return null;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string ?? null);
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
}

function buildIngestionPrompt(file: UploadedFile): string {
  const lines: string[] = [
    `Please ingest the following data file using the Marketing OS data-ingestion-agent.`,
    ``,
    `## File Details`,
    `Filename: ${file.name}`,
    `Detected data type: ${file.hint}`,
    `Size: ${Math.round(file.size / 1024)}KB`,
    ``,
    `## Instructions`,
    `1. Read CLAUDE.md from the connected GitHub repo — your master configuration`,
    `2. Load the agent definition from \`system-intelligence/agents/data-ingestion-agent.md\` via GitHub MCP`,
    `3. Run the data-ingestion-agent on the file content below`,
    `4. The agent will: identify data type → extract and normalize → route to correct core/ location → produce an ingestion summary`,
    `5. Write the ingestion output to the correct \`core/\` location via GitHub MCP`,
    `6. Append to \`core/system-intelligence/changelog.md\``,
    ``,
  ];

  if (file.content) {
    lines.push("## File Content");
    lines.push("```");
    const fileLines = file.content.split("\n");
    const truncated = fileLines.length > 500;
    lines.push(fileLines.slice(0, 500).join("\n"));
    if (truncated) lines.push(`\n... [truncated — ${fileLines.length - 500} more rows. Full file has ${fileLines.length} rows total.]`);
    lines.push("```");
  } else {
    lines.push("## File");
    lines.push("This file is a binary format (Excel/PDF). Upload it directly in the claude.ai conversation using the attachment button, then paste this prompt.");
  }

  return lines.join("\n");
}

export function DataUploadPanel() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [overrideHint, setOverrideHint] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const ext = "." + (file.name.split(".").pop() ?? "").toLowerCase();
    if (!SUPPORTED_EXTENSIONS.includes(ext)) return;
    const content = await readFileContent(file);
    const hint = detectDataTypeHint(file.name, content);
    setUploadedFile({ name: file.name, size: file.size, content, hint, hintLabel: HINT_LABELS[hint] ?? hint });
    setOverrideHint(hint);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleLaunch = async () => {
    if (!uploadedFile) return;
    const effective = { ...uploadedFile, hint: overrideHint || uploadedFile.hint };
    const prompt = buildIngestionPrompt(effective);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silent */ }
    window.open("https://claude.ai/new", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploadedFile && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl px-8 py-12 text-center transition-colors ${
          uploadedFile
            ? "border-gray-200 cursor-default"
            : isDragging
            ? "border-orange-400 bg-orange-50 cursor-pointer"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
        }`}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {Math.round(uploadedFile.size / 1024)}KB
                  {uploadedFile.content === null && " · binary — upload directly in Claude"}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setUploadedFile(null); setOverrideHint(""); }}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Remove file"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Drop your data file here</p>
            <p className="text-xs text-gray-400 mt-1">or <span className="text-orange-600 font-medium">browse</span> to upload</p>
            <p className="text-xs text-gray-300 mt-2">CSV · TSV · XLSX · PDF · JSON · TXT</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.tsv,.txt,.json,.md,.xlsx,.xls,.pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {/* Data type override + launch */}
      {uploadedFile && (
        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Data type</label>
            <select
              value={overrideHint}
              onChange={(e) => setOverrideHint(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
            >
              {Object.entries(HINT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">Auto-detected from filename and headers. Override if wrong.</p>
          </div>

          <div className="pt-1">
            <button
              onClick={handleLaunch}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
              {copied ? "Copied — paste in Claude" : "Ingest in Claude"}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Copies a data-ingestion-agent prompt and opens claude.ai
            </p>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="border border-gray-100 rounded-xl p-5">
        <p className="text-sm font-medium text-gray-700 mb-3">How it works</p>
        <ol className="space-y-2.5">
          {[
            ["Upload", "Drop any CSV, XLSX, PDF, or transcript from your ad platform, CRM, or call tool"],
            ["Auto-detect", "System identifies the data type from filename and headers"],
            ["Ingest", "Click \"Ingest in Claude\" — a data-ingestion-agent prompt is copied and claude.ai opens"],
            ["Route", "Claude extracts and normalizes the data, then writes it to the correct core/ location"],
            ["Signal", "The data is now available to the pattern analyst on next weekly review"],
          ].map(([title, desc], i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
              <div>
                <span className="text-sm font-medium text-gray-800">{title}</span>
                <span className="text-sm text-gray-400"> — {desc}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            <strong className="text-gray-600">No ad platform API required.</strong> Every platform has a native export (Google Ads → Reports → Schedule; LinkedIn → Sheets export). Download the CSV, upload here.
          </p>
        </div>
      </div>
    </div>
  );
}
