"use client";

import { useState } from "react";

function buildDay1PackPrompt(websiteUrl: string): string {
  return [
    `Please run the Day 1 Pack workflow for a new client.`,
    ``,
    `## Workflow`,
    `Name: Day 1 Pack`,
    `Path: client-setup/workflows/day-one-pack.yaml`,
    ``,
    `## Inputs`,
    `- **website_url**: ${websiteUrl}`,
    ``,
    `## Instructions`,
    `1. Read CLAUDE.md from the connected GitHub repo — your master configuration`,
    `2. Read the full workflow definition at: \`client-setup/workflows/day-one-pack.yaml\` via GitHub MCP`,
    `3. Execute all phases in order following the YAML spec, reading agent files from the repo as you go`,
    `4. Write all outputs to \`runs/day-one-pack/\` via GitHub MCP`,
    `5. Pause at the positioning approval gate (between Phase 2 and Phase 3) — present the positioning summary and wait for approve / modify / reject before continuing to generate growth assets`,
    `6. On completion, write run-summary.md listing every asset produced`,
  ].join("\n");
}

export function Day1PackLauncher() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "copied">("idle");

  const trimmed = url.trim();
  const normalised = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  const isValid = trimmed.length > 4 && (() => {
    try { new URL(normalised); return true; } catch { return false; }
  })();

  async function launch() {
    if (!isValid) return;
    const prompt = buildDay1PackPrompt(normalised);
    try { await navigator.clipboard.writeText(prompt); } catch { /* clipboard unavailable */ }
    setState("copied");
    setTimeout(() => setState("idle"), 4000);
    window.open("https://claude.ai", "_blank");
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-7 mb-7 text-white">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-white/80">System not yet set up</span>
          </div>
          <h2 className="text-xl font-semibold mb-1">Build your marketing system</h2>
          <p className="text-sm text-white/60 max-w-lg">
            Enter your website URL. In ~90 minutes: ICP, competitive landscape, brand voice,
            blog posts, ads, email sequence, battlecards, and homepage copy — all generated from scratch.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && launch()}
            placeholder="https://yourcompany.com"
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
          />
        </div>
        <button
          onClick={launch}
          disabled={!isValid}
          className="px-5 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center gap-2"
        >
          {state === "copied" ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Prompt copied — claude.ai opening
            </>
          ) : (
            <>
              Build marketing system
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-white/30 mt-3">
        Copies the Day 1 Pack prompt to your clipboard and opens claude.ai — paste and run.
        One human approval gate between positioning and asset generation.
      </p>
    </div>
  );
}
