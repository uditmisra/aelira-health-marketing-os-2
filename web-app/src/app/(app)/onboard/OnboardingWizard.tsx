"use client";

import { useState } from "react";
import { ClaudeProjectPrompt } from "./ClaudeProjectPrompt";

type Step = "name" | "basics" | "repo" | "forking" | "done";
type RepoOption = "fork" | "connect";

interface CreatedClient {
  id: string;
  name: string;
  github_repo: string;
  forkUrl?: string;
}

export function OnboardingWizard() {
  const [step, setStep] = useState<Step>("name");
  const [clientName, setClientName] = useState("");
  // Basics step fields
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [basicsSkipped, setBasicsSkipped] = useState(false);

  const [repoOption, setRepoOption] = useState<RepoOption>("fork");
  const [existingRepo, setExistingRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedClient | null>(null);

  function handleAdvanceToBasics() {
    if (clientName.trim()) setStep("basics");
  }

  function handleAdvanceToRepo() {
    setStep("repo");
  }

  function handleSkipBasics() {
    setBasicsSkipped(true);
    setWebsiteUrl("");
    setDescription("");
    setCategory("");
    setStep("repo");
  }

  async function handleCreateFork() {
    setLoading(true);
    setStep("forking");
    setError(null);
    try {
      const body: {
        clientName: string;
        websiteUrl?: string;
        description?: string;
        category?: string;
      } = { clientName };

      if (!basicsSkipped) {
        if (websiteUrl.trim()) body.websiteUrl = websiteUrl.trim();
        if (description.trim()) body.description = description.trim();
        if (category.trim()) body.category = category.trim();
      }

      const res = await fetch("/api/clients/fork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let data: { client?: CreatedClient; forkUrl?: string; error?: string } = {};
      try { data = await res.json(); } catch { /* non-JSON response */ }
      if (!res.ok) {
        setError(data.error ?? `Server error (${res.status})`);
        setStep("repo");
        return;
      }
      setCreated({ ...data.client!, forkUrl: data.forkUrl });
      setStep("done");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Network error — check your connection");
      setStep("repo");
    } finally {
      setLoading(false);
    }
  }

  async function handleConnectExisting() {
    if (!existingRepo.includes("/")) {
      setError("Repo must be in owner/repo format (e.g. acme/marketing-os)");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: clientName, githubRepo: existingRepo }),
      });
      let data: { client?: CreatedClient; error?: string } = {};
      try { data = await res.json(); } catch { /* non-JSON response */ }
      if (!res.ok) {
        setError(data.error ?? `Server error (${res.status})`);
        return;
      }
      setCreated(data.client!);
      setStep("done");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Network error — check your connection");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitRepo() {
    if (repoOption === "fork") {
      await handleCreateFork();
    } else {
      await handleConnectExisting();
    }
  }

  if (step === "done" && created) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">{created.name} workspace created</h2>
            <p className="text-sm text-gray-500">GitHub: <span className="font-mono">{created.github_repo}</span></p>
          </div>
        </div>

        <ClaudeProjectPrompt clientName={created.name} githubRepo={created.github_repo} />

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => {
              const dest = created.forkUrl
                ? `/dashboard?fork=${encodeURIComponent(created.forkUrl)}`
                : "/dashboard";
              window.location.assign(dest);
            }}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to dashboard →
          </button>
          <button
            onClick={() => {
              setStep("name");
              setClientName("");
              setWebsiteUrl("");
              setDescription("");
              setCategory("");
              setBasicsSkipped(false);
              setExistingRepo("");
              setCreated(null);
              setError(null);
            }}
            className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Add another client
          </button>
        </div>
      </div>
    );
  }

  if (step === "forking") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-700 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium text-gray-700">Forking template repository…</p>
        <p className="text-xs text-gray-400 mt-1">This takes a few seconds.</p>
      </div>
    );
  }

  // Determine which step number each panel shows (for display purposes)
  const isBasicsActive = step === "basics";
  const isRepoActive = step === "repo";
  const isNameLocked = step === "basics" || step === "repo";
  const isBasicsLocked = step === "repo";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Step 1: Client name */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">1</span>
          <h2 className="text-sm font-semibold text-gray-900">Client name</h2>
        </div>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && clientName.trim() && handleAdvanceToBasics()}
          placeholder="e.g. Acme Corp, SpotDraft, Aelira Health"
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-300"
          disabled={isNameLocked}
        />
        {step === "name" && (
          <button
            onClick={handleAdvanceToBasics}
            disabled={!clientName.trim()}
            className="mt-3 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Continue →
          </button>
        )}
        {isNameLocked && (
          <button
            onClick={() => {
              setStep("name");
              setBasicsSkipped(false);
            }}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600"
          >
            ← Edit name
          </button>
        )}
      </div>

      {/* Step 2: Company basics */}
      {(isBasicsActive || isBasicsLocked) && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">2</span>
            <h2 className="text-sm font-semibold text-gray-900">Company basics</h2>
            {isBasicsLocked && basicsSkipped && (
              <span className="text-xs text-gray-400 ml-1">(skipped)</span>
            )}
          </div>

          {isBasicsActive && (
            <>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Website URL</label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://acmecorp.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">One-line description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="One sentence: what the company does"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. CLM, HR Tech, Sales Enablement"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdvanceToRepo}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue →
                </button>
                <button
                  onClick={handleSkipBasics}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </>
          )}

          {isBasicsLocked && !basicsSkipped && (
            <div className="text-xs text-gray-500 space-y-0.5">
              {websiteUrl && <p><span className="font-medium text-gray-700">Website:</span> {websiteUrl}</p>}
              {description && <p><span className="font-medium text-gray-700">Description:</span> {description}</p>}
              {category && <p><span className="font-medium text-gray-700">Category:</span> {category}</p>}
              <button
                onClick={() => setStep("basics")}
                className="mt-2 text-xs text-gray-400 hover:text-gray-600"
              >
                ← Edit basics
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Repo choice */}
      {isRepoActive && (
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">3</span>
            <h2 className="text-sm font-semibold text-gray-900">GitHub repository</h2>
          </div>

          <div className="space-y-3 mb-5">
            <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${repoOption === "fork" ? "border-gray-800 bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}>
              <input
                type="radio"
                name="repoOption"
                value="fork"
                checked={repoOption === "fork"}
                onChange={() => setRepoOption("fork")}
                className="mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Create from Marketing OS template</p>
                <p className="text-xs text-gray-500 mt-0.5">Creates a fresh repo under your GitHub account. Recommended for new clients.</p>
              </div>
            </label>

            <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${repoOption === "connect" ? "border-gray-800 bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}>
              <input
                type="radio"
                name="repoOption"
                value="connect"
                checked={repoOption === "connect"}
                onChange={() => setRepoOption("connect")}
                className="mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Connect an existing repo</p>
                <p className="text-xs text-gray-500 mt-0.5">You already have a fork. Provide the repo path.</p>
              </div>
            </label>
          </div>

          {repoOption === "connect" && (
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Repository path</label>
              <input
                type="text"
                value={existingRepo}
                onChange={(e) => setExistingRepo(e.target.value)}
                placeholder="owner/repo-name"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 font-mono placeholder-gray-300"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 mb-3">{error}</p>
          )}

          <button
            onClick={handleSubmitRepo}
            disabled={loading || (repoOption === "connect" && !existingRepo.trim())}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating…" : repoOption === "fork" ? "Create workspace" : "Connect repo"}
          </button>
        </div>
      )}
    </div>
  );
}
