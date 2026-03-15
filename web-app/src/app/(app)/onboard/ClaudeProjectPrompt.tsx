"use client";

import { useState } from "react";

interface Props {
  clientName: string;
  githubRepo: string; // "owner/repo"
}

function buildSystemPrompt(clientName: string, githubRepo: string): string {
  return `You are the Marketing OS AI for ${clientName}.

## GitHub Repo
This workspace lives at: \`${githubRepo}\`

When running workflows:
1. Connect your GitHub MCP to \`${githubRepo}\` — this is the authoritative source for all agent definitions, workflow YAMLs, and core/ data.
2. Always read \`CLAUDE.md\` from this repo first — it contains the master configuration for this client.
3. Write all workflow outputs to \`runs/\` in this repo via GitHub MCP.
4. Read core/ context files before producing any deliverable — do not ask for information already in core/.

## What You Do
- Execute Marketing OS workflows step by step, following the YAML orchestration schemas in this repo
- Produce deliverables (copy, battlecards, positioning docs, reports) — not summaries or notes
- Pause at every \`gate: human_approval\` step and wait for explicit approval before continuing
- Write outputs to the correct \`runs/[workflow]/[run_id]/\` path in the GitHub repo

## What You Don't Do
- Don't improvise workflow steps — follow the YAML exactly
- Don't ask for information already in \`core/\` — read it
- Don't produce generic output — if core/ context is missing, name exactly what's needed
- Don't update \`core/\` without logging the change in \`core/system-intelligence/changelog.md\``.trim();
}

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

export function ClaudeProjectPrompt({ clientName, githubRepo }: Props) {
  const prompt = buildSystemPrompt(clientName, githubRepo);
  const projectName = `${clientName} — Marketing OS`;

  return (
    <div className="mt-5 space-y-4">
      <p className="text-sm font-semibold text-gray-800">Next: set up your claude.ai Project</p>

      {/* Step 1 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium flex-shrink-0">1</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">Create a claude.ai Project</p>
            <p className="text-xs text-gray-500 mt-0.5">
              In claude.ai, create a new Project named below. Then open Project settings and click <strong>Set a system prompt</strong> — paste the prompt shown here.
            </p>
          </div>
        </div>
        <div className="px-4 py-3 space-y-3 bg-white">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Project name</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-700">
                {projectName}
              </code>
              <CopyButton value={projectName} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">System prompt</p>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs text-gray-500">Paste into Project settings → Set a system prompt</span>
                <CopyButton value={prompt} />
              </div>
              <pre className="px-4 py-3 text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap bg-white max-h-40 overflow-y-auto">
                {prompt}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium flex-shrink-0">2</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">Add the GitHub MCP</p>
            <p className="text-xs text-gray-500 mt-0.5">
              In your Project settings, go to <strong>Add MCP → GitHub</strong>. When prompted for a repo, enter the path below and approve read + write access.
            </p>
          </div>
        </div>
        <div className="px-4 py-3 bg-white">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Repo path</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-700">
              {githubRepo}
            </code>
            <CopyButton value={githubRepo} />
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-medium flex-shrink-0">3</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">You're ready</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Open the Project in claude.ai and start a conversation. Come back here to launch workflows — the prompts will reference this repo automatically.
            </p>
          </div>
        </div>
        <div className="px-4 py-3 bg-white">
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Open claude.ai
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
