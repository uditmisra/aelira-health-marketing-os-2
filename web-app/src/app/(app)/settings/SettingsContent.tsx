"use client";

import { useState } from "react";
import Image from "next/image";

type Tab = "integrations" | "claude" | "profile";

interface Props {
  googleStatus?: string;
  googleConnectedAs: string | null;
  hubspotConnected: boolean;
  linkedinConnected: boolean;
  falConnected: boolean;
  kvConfigured: boolean;
  userEmail: string;
  userName: string;
  userImage: string | null;
  repo: string;
  branch: string;
  pluginApiKey: string | null;
}

// ─── Token input form ─────────────────────────────────────

function TokenForm({
  id,
  connected,
  label,
  placeholder,
  helpUrl,
  helpText,
  onSaved,
}: {
  id: string;
  connected: boolean;
  label: string;
  placeholder: string;
  helpUrl: string;
  helpText: string;
  onSaved: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    if (!token.trim()) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/settings/integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token }),
      });
      if (res.ok) {
        setStatus("saved");
        setToken("");
        setOpen(false);
        onSaved();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3000);
  }

  async function disconnect() {
    await fetch("/api/settings/integration", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onSaved();
  }

  if (connected) {
    return (
      <button
        onClick={disconnect}
        className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
      >
        Disconnect
      </button>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Connect
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder={placeholder}
        className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 w-56 focus:outline-none focus:ring-1 focus:ring-gray-400 font-mono"
        autoFocus
        onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") setOpen(false); }}
      />
      <button
        onClick={save}
        disabled={!token.trim() || status === "saving"}
        className="px-2.5 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-40 transition-colors"
      >
        {status === "saving" ? "Saving…" : "Save"}
      </button>
      <button onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-gray-600">
        Cancel
      </button>
      {status === "error" && <span className="text-xs text-red-500">Failed</span>}
      <a href={helpUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline whitespace-nowrap">
        {helpText} ↗
      </a>
    </div>
  );
}

// ─── Integration row ──────────────────────────────────────

function IntegrationRow({
  icon,
  name,
  description,
  connected,
  children,
  last,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  connected: boolean;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between px-5 py-4 ${!last ? "border-b border-gray-100" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className={`text-xs mt-0.5 flex items-center gap-1.5 ${connected ? "text-green-600" : "text-gray-400"}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${connected ? "bg-green-500" : "bg-gray-300"}`} />
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────

export function SettingsContent({
  googleStatus,
  googleConnectedAs,
  hubspotConnected: initialHubspot,
  linkedinConnected: initialLinkedin,
  falConnected: initialFal,
  kvConfigured,
  userEmail,
  userName,
  userImage,
  repo,
  branch,
  pluginApiKey,
}: Props) {
  const [tab, setTab] = useState<Tab>("integrations");
  const [hubspotConnected, setHubspotConnected] = useState(initialHubspot);
  const [linkedinConnected, setLinkedinConnected] = useState(initialLinkedin);
  const [falConnected, setFalConnected] = useState(initialFal);
  const [keyRevealed, setKeyRevealed] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "integrations", label: "Integrations" },
    { id: "claude", label: "Claude.ai Setup" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage integrations and workspace configuration.</p>
      </div>

      {/* Status banners */}
      {googleStatus === "connected" && (
        <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          Google connected. Workflow outputs can now create Google Docs and Sheets automatically.
        </div>
      )}
      {googleStatus === "error" && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Google connection failed. Check <code className="font-mono text-xs">GOOGLE_CLIENT_ID</code> and <code className="font-mono text-xs">GOOGLE_CLIENT_SECRET</code> in Vercel.
        </div>
      )}
      {!kvConfigured && (
        <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          Vercel KV not configured — integration tokens cannot be stored.{" "}
          <a href="https://vercel.com/docs/storage/vercel-kv" target="_blank" rel="noopener noreferrer" className="underline">Set up KV ↗</a>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sub-nav */}
        <div className="w-44 shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-left mb-0.5 transition-colors ${
                tab === t.id
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">

          {/* ── Integrations ── */}
          {tab === "integrations" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Connected Accounts</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                  {/* GitHub */}
                  <IntegrationRow
                    icon={
                      <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      </div>
                    }
                    name="GitHub"
                    description={`Connected · ${repo} (${branch})`}
                    connected={true}
                  >
                    <a
                      href={`https://github.com/${repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      View repo ↗
                    </a>
                  </IntegrationRow>

                  {/* Google */}
                  <IntegrationRow
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    }
                    name="Google Workspace"
                    description={googleConnectedAs ? `Connected as ${googleConnectedAs}` : "Not connected"}
                    connected={!!googleConnectedAs}
                  >
                    {googleConnectedAs ? (
                      <form action="/api/auth/google/disconnect" method="POST">
                        <button type="submit" className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                          Disconnect
                        </button>
                      </form>
                    ) : (
                      <a href="/api/auth/google/connect" className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Connect
                      </a>
                    )}
                  </IntegrationRow>

                  {/* HubSpot */}
                  <IntegrationRow
                    icon={
                      <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-500">H</span>
                      </div>
                    }
                    name="HubSpot"
                    description={hubspotConnected ? "Connected · private app token" : "Not connected — KPI dashboard uses this"}
                    connected={hubspotConnected}
                  >
                    <TokenForm
                      id="hubspot"
                      connected={hubspotConnected}
                      label="HubSpot"
                      placeholder="pat-na1-xxxxxxxx-xxxx-…"
                      helpUrl="https://developers.hubspot.com/docs/api/private-apps"
                      helpText="Get token"
                      onSaved={() => setHubspotConnected(!hubspotConnected)}
                    />
                  </IntegrationRow>

                  {/* LinkedIn */}
                  <IntegrationRow
                    icon={
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">in</span>
                      </div>
                    }
                    name="LinkedIn Ads"
                    description={linkedinConnected ? "Connected · access token" : "Not connected"}
                    connected={linkedinConnected}
                  >
                    <TokenForm
                      id="linkedin"
                      connected={linkedinConnected}
                      label="LinkedIn Ads"
                      placeholder="AQV…"
                      helpUrl="https://www.linkedin.com/developers/apps"
                      helpText="Get token"
                      onSaved={() => setLinkedinConnected(!linkedinConnected)}
                    />
                  </IntegrationRow>

                  {/* Gemini Image Generation (Nano Banana 2) */}
                  <IntegrationRow
                    icon={
                      <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    }
                    name="Gemini (Image Generation)"
                    description={falConnected ? "Connected · API key" : "Not connected — required for Generate Images"}
                    connected={falConnected}
                    last
                  >
                    <TokenForm
                      id="gemini"
                      connected={falConnected}
                      label="Gemini"
                      placeholder="AIza…"
                      helpUrl="https://aistudio.google.com/apikey"
                      helpText="Get API key"
                      onSaved={() => setFalConnected(!falConnected)}
                    />
                  </IntegrationRow>
                </div>
              </div>

              {/* Figma Plugin */}
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Figma Plugin</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                  <p className="text-sm text-gray-500">
                    The Marketing OS Figma plugin uses this key to fetch AI-generated images from your runs. Enter it in the plugin under <strong>AI Images → Plugin API Key</strong>.
                  </p>
                  {pluginApiKey ? (
                    <div className="flex items-center gap-3">
                      <code className="text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 select-all">
                        {keyRevealed ? pluginApiKey : "•".repeat(Math.min(pluginApiKey.length, 32))}
                      </code>
                      <button
                        onClick={() => setKeyRevealed((r) => !r)}
                        className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        {keyRevealed ? "Hide" : "Reveal"}
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <code className="font-mono">PLUGIN_API_KEY</code> not set in Vercel — run{" "}
                      <code className="font-mono">printf &quot;your-key&quot; | vercel env add PLUGIN_API_KEY production</code>
                    </p>
                  )}
                </div>
              </div>

              {/* GitHub MCP */}
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">GitHub MCP</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-600 space-y-2">
                  <p>Required for Claude to read/write the repo when running workflows on claude.ai web.</p>
                  <p className="text-gray-400 text-xs">
                    GitHub Copilot's built-in MCP only works in Claude Desktop, not claude.ai web. Deploy a self-hosted server.
                  </p>
                  <a
                    href="https://github.com/uditmisra/work-os/blob/main/client-setup/github-mcp-setup.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 font-medium hover:underline text-sm"
                  >
                    Setup guide → Railway deployment ↗
                  </a>
                </div>
              </div>
            </>
          )}

          {/* ── Claude.ai Setup ── */}
          {tab === "claude" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Claude.ai Project</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
                <p className="text-sm text-gray-500">
                  This app launches workflows in Claude.ai — no AI calls are made from this app. You need a Claude Project with the system prompt and GitHub MCP connected.
                </p>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Project setup</h3>
                  <ol className="space-y-3">
                    {[
                      { step: "1", text: <>Go to <strong>claude.ai → Projects</strong> and create a new project named "Marketing OS"</> },
                      { step: "2", text: <>Paste the system prompt from <code className="font-mono text-xs bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">client-setup/spotdraft-project-system-prompt.md</code></> },
                      { step: "3", text: <>Connect GitHub MCP — see the <a href="#" onClick={() => setTab("integrations")} className="text-indigo-600 hover:underline">Integrations tab</a> for the Railway deployment guide</> },
                      { step: "4", text: <>Verify by asking Claude: "List the files in my repo root"</> },
                    ].map(({ step, text }) => (
                      <li key={step} className="flex gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-gray-100 text-xs font-medium text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Connected repo</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium font-mono text-gray-800">{repo}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        branch: {branch}
                      </p>
                    </div>
                    <a
                      href={`https://github.com/${repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Open on GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Profile ── */}
          {tab === "profile" && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Profile</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-4 mb-5">
                  {userImage ? (
                    <Image src={userImage} alt={userName} width={48} height={48} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-medium">{userName.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{userName || "—"}</p>
                    <p className="text-xs text-gray-500">{userEmail || "—"}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-3">Authenticated via GitHub OAuth.</p>
                  <a
                    href="/api/auth/signout"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
