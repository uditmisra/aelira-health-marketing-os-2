"use client";

import { useState, useRef } from "react";
import type { WorkflowYaml } from "@/lib/github";

type WorkflowKind = "yaml" | "prose";

interface AttachedFile {
  name: string;
  type: string;
  size: number;
  content: string | null; // null for binary files that can't be inlined
  hint: string; // data_type_hint for data-ingestion-agent
}

const BINARY_EXTENSIONS = [".xlsx", ".xls", ".pdf", ".docx", ".doc", ".pptx"];
const SUPPORTED_EXTENSIONS = [".csv", ".tsv", ".txt", ".json", ".md", ".xlsx", ".xls", ".pdf"];

function detectDataTypeHint(filename: string, content: string | null): string {
  const lower = filename.toLowerCase();
  if (lower.includes("ad") || lower.includes("campaign") || lower.includes("google_ads") || lower.includes("linkedin")) return "ad_performance";
  if (lower.includes("crm") || lower.includes("deal") || lower.includes("hubspot") || lower.includes("salesforce")) return "crm_export";
  if (lower.includes("transcript") || lower.includes("gong") || lower.includes("call")) return "call_transcript";
  if (lower.includes("survey") || lower.includes("nps")) return "survey_results";
  if (lower.includes("competitor") || lower.includes("competitive")) return "competitor_intel";
  if (lower.includes("analytics") || lower.includes("ga4") || lower.includes("sessions")) return "web_analytics";
  if (lower.includes("win") || lower.includes("loss") || lower.includes("winloss")) return "win_loss";
  // Try content sniffing for CSV/TSV
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

interface Props {
  path: string;
  kind: WorkflowKind;
  workflow: WorkflowYaml | null;
  rawYaml: string | null;
  githubRepo: string; // "owner/repo" — tells Claude exactly which repo to read from
}

const SYSTEM_LABELS: Record<string, string> = {
  "growth-marketing": "Growth Marketing",
  "product-marketing": "Product Marketing",
  "system-intelligence": "System Intelligence",
};

function buildClaudePrompt(
  path: string,
  workflow: WorkflowYaml,
  rawYaml: string | null,
  inputs: Record<string, string>,
  githubRepo: string,
  attachedFile?: AttachedFile | null
): string {
  const lines: string[] = [
    `Please run the following Marketing OS workflow.`,
    ``,
    `## Workflow`,
    `Name: ${workflow.name}`,
    `Path: ${path}`,
    ``,
  ];

  if (rawYaml) {
    lines.push("## Workflow Definition (YAML)");
    lines.push("```yaml");
    lines.push(rawYaml.trim());
    lines.push("```");
    lines.push("");
  }

  if (workflow.inputs && workflow.inputs.length > 0) {
    lines.push("## Inputs Provided");
    for (const input of workflow.inputs) {
      const value = inputs[input.name] || input.default || "(not provided)";
      lines.push(`- **${input.name}**: ${value}`);
    }
    lines.push("");
  }

  if (attachedFile) {
    lines.push("## Attached Data File");
    lines.push(`File: ${attachedFile.name}`);
    lines.push(`Detected data type: ${attachedFile.hint}`);
    lines.push(`Size: ${Math.round(attachedFile.size / 1024)}KB`);
    lines.push("");
    if (attachedFile.content) {
      lines.push("The file content is included below. Pass it to `data-ingestion-agent` before running the main workflow steps, or use it directly as the data input for the relevant step.");
      lines.push("```");
      // Truncate very large files to avoid prompt overflow — first 500 lines
      const fileLines = attachedFile.content.split("\n");
      const truncated = fileLines.length > 500;
      lines.push(fileLines.slice(0, 500).join("\n"));
      if (truncated) lines.push(`\n... [truncated — ${fileLines.length - 500} more rows. Full file has ${fileLines.length} rows total.]`);
      lines.push("```");
    } else {
      lines.push("This file is a binary format (Excel/PDF) and cannot be inlined in this prompt.");
      lines.push("**Action required:** Upload this file directly in the claude.ai conversation using the attachment button, then proceed with the workflow.");
    }
    lines.push("");
  }

  lines.push("## Instructions");
  lines.push(`1. GitHub repo for this workspace: \`${githubRepo}\` — use this repo in your GitHub MCP connection. Read \`CLAUDE.md\` from this repo as your master configuration.`);
  lines.push("2. The full workflow YAML is embedded above — use it as your execution spec");
  lines.push("3. Read the context files listed under `global_context` in the YAML via GitHub MCP (if connected)");
  if (attachedFile) {
    lines.push("4. If a data file is attached above: run `data-ingestion-agent` on it first to extract and route the data before executing the main workflow steps");
    lines.push("5. Execute each step in order, following the agent definitions in the repo");
    lines.push("6. Write outputs to `runs/` directory via GitHub MCP if connected; otherwise present outputs inline");
    lines.push("7. Pause at any `gate: human_approval` step and wait for explicit approval before continuing");
  } else {
    lines.push("4. Execute each step in order, following the agent definitions in the repo");
    lines.push("5. Write outputs to `runs/` directory via GitHub MCP if connected; otherwise present outputs inline");
    lines.push("6. Pause at any `gate: human_approval` step and wait for explicit approval before continuing");
  }
  return lines.join("\n");
}

function buildProsePrompt(path: string, workflow: WorkflowYaml, githubRepo: string, attachedFile?: AttachedFile | null): string {
  const lines: string[] = [
    `Please run the following Marketing OS workflow.`,
    ``,
    `## Workflow`,
    `Name: ${workflow.name}`,
    `Path: ${path}`,
    ``,
    `## Instructions`,
    `1. GitHub repo for this workspace: \`${githubRepo}\` — use this repo in your GitHub MCP connection. Read \`CLAUDE.md\` from this repo as your master configuration.`,
    `2. Read the full workflow definition at: \`${path}\` via GitHub MCP`,
    `3. Review the workflow steps and ask me for any required inputs before starting`,
    `4. Execute the workflow step by step, reading the relevant agent files from the repo as you go`,
    `5. Write outputs to the \`runs/\` directory via GitHub MCP if connected; otherwise present outputs inline`,
    `6. Pause at any approval gate and wait for my explicit approval before continuing`,
  ];

  if (attachedFile) {
    lines.push(``, `## Attached Data File`);
    lines.push(`File: ${attachedFile.name} · Detected type: ${attachedFile.hint}`);
    if (attachedFile.content) {
      lines.push(`Pass this to \`data-ingestion-agent\` before running the main workflow steps, or use it directly as data input.`);
      lines.push("```");
      const fileLines = attachedFile.content.split("\n");
      lines.push(fileLines.slice(0, 500).join("\n"));
      if (fileLines.length > 500) lines.push(`... [truncated — ${fileLines.length - 500} more rows]`);
      lines.push("```");
    } else {
      lines.push(`This file is binary (Excel/PDF) — upload it directly in claude.ai using the attachment button.`);
    }
  }

  return lines.join("\n");
}

export function WorkflowRunner({ path, kind, workflow, rawYaml, githubRepo }: Props) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [promptText, setPromptText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const ext = "." + file.name.split(".").pop()!.toLowerCase();
    if (!SUPPORTED_EXTENSIONS.includes(ext)) return;
    const content = await readFileContent(file);
    const hint = detectDataTypeHint(file.name, content);
    setAttachedFile({ name: file.name, type: file.type, size: file.size, content, hint });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full text-center p-12">
        <p className="text-gray-400 text-sm">Workflow not found.</p>
      </div>
    );
  }

  const handleBuildPrompt = async () => {
    const prompt = kind === "prose"
      ? buildProsePrompt(path, workflow, githubRepo, attachedFile)
      : buildClaudePrompt(path, workflow, rawYaml, inputValues, githubRepo, attachedFile);
    setPromptText(prompt);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silent */ }
  };

  const handleCopyAgain = async () => {
    if (!promptText) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silent */ }
  };

  const gates = workflow.steps.filter((s) => s.gate?.type === "human_approval");

  return (
    <div className="flex h-full">
      {/* Center: execution parameters */}
      <div className="flex-1 overflow-y-auto px-8 py-6 border-r border-gray-100">
        {/* Workflow header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M5.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{workflow.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{workflow.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button
              onClick={handleBuildPrompt}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
              {copied ? "Copied!" : promptText ? "Regenerate Prompt" : "Build Prompt"}
            </button>
          </div>
        </div>

        {/* Execution Parameters — YAML workflows only */}
        {kind === "yaml" && workflow.inputs && workflow.inputs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              <span className="text-sm font-medium text-gray-700">Execution Parameters</span>
            </div>
            <div className="space-y-4">
              {workflow.inputs.map((input) => (
                <div key={input.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {input.name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    {input.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {(input.example && input.example.length > 80) || input.default === "no_new_data" || input.default === "no_field_feedback" ? (
                    <textarea
                      rows={4}
                      value={inputValues[input.name] ?? ""}
                      onChange={(e) => setInputValues((prev) => ({ ...prev, [input.name]: e.target.value }))}
                      placeholder={input.example ?? input.description ?? ""}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 placeholder-gray-300 resize-y bg-white"
                    />
                  ) : (
                    <input
                      type="text"
                      value={inputValues[input.name] ?? ""}
                      onChange={(e) => setInputValues((prev) => ({ ...prev, [input.name]: e.target.value }))}
                      placeholder={input.example ?? input.description ?? ""}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 placeholder-gray-300 bg-white"
                    />
                  )}
                  {input.description && (
                    <p className="text-xs text-gray-400 mt-1">{input.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {kind === "prose" && (
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" className="flex-shrink-0 mt-0.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-700">Prose workflow</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Claude will read the workflow definition directly from the repo via GitHub MCP
                  and ask for any required inputs before starting. No pre-filled form needed.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-mono">{path}</p>
              </div>
            </div>
          </div>
        )}

        {kind === "yaml" && (!workflow.inputs || workflow.inputs.length === 0) && (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-400">No inputs required for this workflow.</p>
            <p className="text-xs text-gray-300 mt-1">Click "Run in Claude" to launch.</p>
          </div>
        )}

        {/* Prompt display */}
        {promptText && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
              <span className="text-sm font-medium text-gray-700">Prompt ready — copy and paste into Claude Desktop</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">Open Claude Desktop → your Marketing OS project → paste the prompt below.</p>
            <textarea
              readOnly
              value={promptText}
              rows={8}
              className="w-full px-3 py-2.5 text-xs font-mono text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-y leading-relaxed"
            />
            <button
              onClick={handleCopyAgain}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
              {copied ? "Copied!" : "Copy again"}
            </button>
          </div>
        )}

        {/* File attachment */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            <span className="text-sm font-medium text-gray-700">Attach Data File</span>
            <span className="text-xs text-gray-400">(optional)</span>
          </div>

          {attachedFile ? (
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 min-w-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span className="text-sm text-blue-800 font-medium truncate">{attachedFile.name}</span>
                <span className="text-xs text-blue-500 flex-shrink-0">
                  {attachedFile.hint !== "auto" ? attachedFile.hint.replace(/_/g, " ") : "type: auto-detect"}
                  {" · "}{Math.round(attachedFile.size / 1024)}KB
                  {attachedFile.content === null && " · upload in Claude"}
                </span>
              </div>
              <button
                onClick={() => setAttachedFile(null)}
                className="ml-2 flex-shrink-0 text-blue-400 hover:text-blue-600"
                aria-label="Remove attachment"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg px-4 py-4 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <p className="text-sm text-gray-400">Drop a file or <span className="text-orange-600 font-medium">browse</span></p>
              <p className="text-xs text-gray-300 mt-0.5">CSV, TSV, XLSX, PDF, JSON — passed to data-ingestion-agent</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.tsv,.txt,.json,.md,.xlsx,.xls,.pdf"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right: pipeline steps (YAML) or prose info */}
      <div className="w-72 shrink-0 overflow-y-auto px-5 py-6">
        {kind === "yaml" ? (
          <>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Pipeline Steps</p>
            <ol className="space-y-3">
              {workflow.steps.map((step, i) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-200 text-xs font-medium text-gray-400 flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm font-medium text-gray-800 leading-snug">{step.name}</p>
                    {step.agent && step.agent !== "none" && (
                      <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">{step.agent}</p>
                    )}
                    {step.gate?.type === "human_approval" && (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                        approval gate
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {gates.length > 0 && (
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400">{gates.length} approval {gates.length === 1 ? "gate" : "gates"} — Claude will pause and wait for your review.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">How it runs</p>
            <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
              <p>Claude reads the workflow definition live from the repo and runs it step by step.</p>
              <p>It will ask for any required inputs at the start of the conversation.</p>
              <p>Outputs are written to <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">runs/</span> in your GitHub repo.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
