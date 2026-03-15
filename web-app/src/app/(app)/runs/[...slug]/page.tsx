import { auth } from "@/lib/auth";
import { getGoogleTokens } from "@/lib/google-kv";
import { getIntegrationToken } from "@/lib/integration-kv";
import { getFile, listDirectory } from "@/lib/github";
import { DeliveryStrip } from "./DeliveryStrip";
import { ApprovalInterface } from "./ApprovalInterface";
import { Day1PackView, type Day1PackTab } from "./Day1PackView";
import { RunCreativeGenerator } from "./RunCreativeGenerator";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const revalidate = 30;

function parseRunStatus(summary: string): "complete" | "partial" | "failed" {
  const lower = summary.toLowerCase();
  if (lower.includes("status: complete")) return "complete";
  if (lower.includes("status: failed") || lower.includes("status: error")) return "failed";
  return "partial";
}

function extractSection(markdown: string, heading: string): string | null {
  const lines = markdown.split("\n");
  const startIdx = lines.findIndex(
    (l) => l.toLowerCase().replace(/#/g, "").trim() === heading.toLowerCase()
  );
  if (startIdx === -1) return null;

  const result: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ") || lines[i].startsWith("# ")) break;
    result.push(lines[i]);
  }
  return result.join("\n").trim() || null;
}

function StatusBadge({ status }: { status: "complete" | "partial" | "failed" }) {
  const map = {
    complete: { color: "text-green-600 bg-green-50 border-green-200", label: "Complete" },
    partial:  { color: "text-amber-600 bg-amber-50 border-amber-200",  label: "Partial"  },
    failed:   { color: "text-red-600 bg-red-50 border-red-200",        label: "Failed"   },
  };
  const { color, label } = map[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
}

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const runPath = slug.join("/");

  const [summary, files, approvalMd] = await Promise.all([
    getFile(`${runPath}/run-summary.md`),
    listDirectory(runPath),
    getFile(`${runPath}/approval.md`),
  ]);

  const stepFiles = files
    .filter((f) => f.name.startsWith("step-") && f.name.endsWith(".md"))
    .sort((a, b) => a.name.localeCompare(b.name));

  const stepContents = await Promise.all(
    stepFiles.map(async (f) => ({
      name: f.name.replace(/^step-\d+-/, "").replace(".md", "").replace(/-/g, " "),
      filename: f.name,
      content: await getFile(f.path),
    }))
  );

  const runId = slug[slug.length - 1];
  const workflowSlug = slug[slug.length - 2] ?? "";
  const workflowName = workflowSlug ? workflowSlug.replace(/-/g, " ") : "Unknown Workflow";
  const status = summary ? parseRunStatus(summary) : "partial";

  // ── Day 1 Pack tabbed view ──────────────────────────────────────────────────
  const isDay1Pack = workflowSlug === "day-one-pack";

  let day1PackTabs: Day1PackTab[] = [];
  if (isDay1Pack) {
    // Fetch all Day 1 Pack output files in parallel
    const [research, websiteCopy, blogPosts, narrative, icpContent, adCopyDir, emailDir, battlecardsDir] = await Promise.all([
      getFile(`${runPath}/raw-research.md`),
      getFile(`${runPath}/website-copy.md`),
      getFile(`${runPath}/blog-posts.md`),
      getFile(`${runPath}/product-narrative.md`),
      getFile("core/icp/primary-icp.md").catch(() => null),
      listDirectory(`${runPath}/ad-copy`).catch(() => []),
      listDirectory(`${runPath}/email-sequence`).catch(() => []),
      listDirectory(`${runPath}/battlecards`).catch(() => []),
    ]);

    // Read directory contents — join all .md files in each directory
    async function readDir(entries: { name: string; path: string }[]): Promise<string | null> {
      const mdFiles = entries.filter((e) => e.name.endsWith(".md"));
      if (mdFiles.length === 0) return null;
      const contents = await Promise.all(mdFiles.map((e) => getFile(e.path)));
      return contents.filter(Boolean).join("\n\n---\n\n") || null;
    }

    const [adCopyContent, emailContent, battlecardsContent] = await Promise.all([
      readDir(adCopyDir as { name: string; path: string }[]),
      readDir(emailDir as { name: string; path: string }[]),
      readDir(battlecardsDir as { name: string; path: string }[]),
    ]);

    day1PackTabs = [
      { id: "research",   label: "Research",       icon: "🔍", content: research,           isEmpty: !research },
      { id: "icp",        label: "Core Intel",     icon: "🎯", content: icpContent,         isEmpty: !icpContent },
      { id: "narrative",  label: "Narrative",      icon: "📖", content: narrative,           isEmpty: !narrative },
      { id: "website",    label: "Website Copy",   icon: "🌐", content: websiteCopy,        isEmpty: !websiteCopy },
      { id: "blogs",      label: "Blog Posts",     icon: "✍️", content: blogPosts,          isEmpty: !blogPosts },
      { id: "ads",        label: "Ads",            icon: "📣", content: adCopyContent,      isEmpty: !adCopyContent },
      { id: "email",      label: "Email Sequence", icon: "📧", content: emailContent,       isEmpty: !emailContent },
      { id: "battlecards",label: "Battlecards",    icon: "⚔️", content: battlecardsContent, isEmpty: !battlecardsContent },
    ];
  }

  // Parse approval decision from approval.md (if it exists)
  const approvalDecision = approvalMd
    ? (approvalMd.match(/^Status: (approved|rejected|changes_requested)/m)?.[1] as "approved" | "rejected" | "changes_requested" | null) ?? null
    : null;
  const approvalNote = approvalMd ? approvalMd.match(/^Note: (.+)/m)?.[1] ?? null : null;
  const approvalBy = approvalMd ? approvalMd.match(/^Decision by: (.+)/m)?.[1] ?? null : null;
  const approvalAt = approvalMd ? approvalMd.match(/^Date: (.+)/m)?.[1] ?? null : null;

  // Detect HTML email output files in the run directory
  const htmlFiles = files.filter((f) => f.name.endsWith(".html"));

  const actionsSection = summary ? extractSection(summary, "Immediate actions outstanding") : null;
  const deliverablesSection = summary ? extractSection(summary, "Deliverables") : null;
  const deliveryNote = summary ? extractSection(summary, "Delivery note") : null;

  // Google delivery state + FAL connection
  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  let googleConnected = false;
  let falConnected = false;
  try {
    const [tokens, falToken] = await Promise.all([
      userEmail ? getGoogleTokens(userEmail) : null,
      userEmail ? getIntegrationToken(userEmail, "fal") : null,
    ]);
    googleConnected = !!tokens;
    falConnected = !!falToken;
  } catch { /* KV unavailable */ }

  // Brand DNA and saved images for creative generator
  const [brandDna, imagesJson] = await Promise.all([
    getFile("core/brand/brand-dna.md").catch(() => null),
    getFile(`${runPath}/images.json`).catch(() => null),
  ]);

  interface SavedImage {
    url: string; width: number; height: number;
    prompt: string; template: string; imageSize: string; generatedAt: string;
  }
  const savedImages: SavedImage[] = imagesJson
    ? ((JSON.parse(imagesJson) as { images: SavedImage[] }).images ?? [])
    : [];

  const existingDocUrl =
    summary?.match(/\*\*Google Doc:\*\*\s*(https:\/\/docs\.google\.com\/document\/d\/[^\s\n]+)/)?.[1] ?? null;
  const existingSheetUrl =
    summary?.match(/\*\*Google Sheet:\*\*\s*(https:\/\/docs\.google\.com\/spreadsheets\/d\/[^\s\n]+)/)?.[1] ?? null;

  const githubUrl = `https://github.com/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/tree/${process.env.GITHUB_REPO_BRANCH ?? "main"}/${runPath}`;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <Link href="/runs" className="hover:text-gray-600">Run History</Link>
          <span>›</span>
          <span className="capitalize">{workflowName}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 capitalize">{workflowName}</h1>
            <p className="text-sm font-mono text-gray-400 mt-0.5">{runId}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              GitHub
            </a>
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Delivery strip */}
      <div className="mb-5">
        <DeliveryStrip
          runPath={runPath}
          workflowName={workflowName}
          googleConnected={googleConnected}
          existingDocUrl={existingDocUrl}
          existingSheetUrl={existingSheetUrl}
        />
      </div>

      {/* Approval interface */}
      <div className="mb-5">
        <ApprovalInterface
          runPath={runPath}
          existingDecision={approvalDecision}
          existingNote={approvalNote}
          decidedBy={approvalBy}
          decidedAt={approvalAt}
        />
      </div>

      {/* Day 1 Pack tabbed asset view */}
      {isDay1Pack && day1PackTabs.length > 0 && (
        <Day1PackView tabs={day1PackTabs} />
      )}

      {/* Creative image generator — only for ad copy and Day 1 Pack runs */}
      {(workflowSlug === "ad-copy-generation" || isDay1Pack) && (
        <RunCreativeGenerator
          runPath={runPath}
          brandDna={brandDna}
          falConnected={falConnected}
          savedImages={savedImages}
        />
      )}

      {/* HTML email preview */}
      {htmlFiles.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Email Preview</h2>
          {htmlFiles.map(async (f) => {
            const html = await getFile(f.path);
            return html ? (
              <details key={f.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-3">
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span className="text-sm font-medium text-gray-700">{f.name.replace(".html", "").replace(/-/g, " ")}</span>
                  </div>
                  <span className="text-xs text-gray-400">click to preview</span>
                </summary>
                <div className="border-t border-gray-100">
                  <iframe
                    srcDoc={html}
                    className="w-full"
                    style={{ height: "600px", border: "none" }}
                    sandbox="allow-same-origin"
                    title={f.name}
                  />
                </div>
              </details>
            ) : null;
          })}
        </div>
      )}

      {/* No data state */}
      {!summary && stepContents.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-400 text-sm">No output files found for this run.</p>
          <p className="text-gray-300 text-xs mt-1">
            Outputs are written to the repo by Claude after each step.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {/* Actions outstanding — show first if present */}
        {actionsSection && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h2 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-3">
              Actions Outstanding
            </h2>
            <div className="prose prose-sm max-w-none text-amber-800 [&_li]:marker:text-amber-400">
              <ReactMarkdown>{actionsSection}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Deliverables */}
        {deliverablesSection && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Deliverables
            </h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReactMarkdown>{deliverablesSection}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Delivery note / fallback notice */}
        {deliveryNote && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-xs text-gray-500">
            <span className="font-medium text-gray-700 mr-1">Delivery note:</span>
            {deliveryNote}
          </div>
        )}

        {/* Step outputs */}
        {stepContents.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Step Outputs
            </h2>
            <div className="space-y-3">
              {stepContents.map((step, i) => (
                <details key={step.filename} className="bg-white border border-gray-200 rounded-xl group" open={i === 0}>
                  <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none hover:bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700 capitalize">{step.name}</span>
                    </div>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="text-gray-300 transition-transform group-open:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                    {step.content ? (
                      <div className="prose prose-sm max-w-none text-gray-600">
                        <ReactMarkdown>{step.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Output not yet written.</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Raw summary fallback — if no structured sections were extracted */}
        {summary && !actionsSection && !deliverablesSection && stepContents.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Run Summary</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
