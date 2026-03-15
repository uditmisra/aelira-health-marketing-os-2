import React from "react";
import { getRunHistory, getFile } from "@/lib/github";
import Link from "next/link";

export const revalidate = 60;

interface Asset {
  type: "doc" | "sheet" | "html";
  url: string;
  workflow: string;
  runId: string;
  runPath: string;
  date: string;
}

interface ImageAsset {
  url: string;
  template: string;
  imageSize: string;
  generatedAt: string;
  workflow: string;
  runId: string;
  runPath: string;
}

const DOC_RE   = /\*\*Google Doc:\*\*\s*(https:\/\/docs\.google\.com\/document\/d\/[^\s\n]+)/g;
const SHEET_RE = /\*\*Google Sheet:\*\*\s*(https:\/\/docs\.google\.com\/spreadsheets\/d\/[^\s\n]+)/g;

function parseRunDate(runId: string): string {
  // runId format: YYYY-MM-DD-HHMMSS
  const m = runId.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!m) return runId;
  return new Date(m[1]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatWorkflowName(name: string): string {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function DocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500 flex-shrink-0">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 flex-shrink-0">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
      <line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 flex-shrink-0">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

type SectionKey = "Documents" | "Spreadsheets" | "HTML Emails";

const SECTION_CONFIG: Record<SectionKey, {
  icon: () => React.ReactElement;
  accent: string;
  emptyText: string;
}> = {
  Documents: {
    icon: DocIcon,
    accent: "text-indigo-600",
    emptyText: "No Google Docs created yet.",
  },
  Spreadsheets: {
    icon: SheetIcon,
    accent: "text-emerald-600",
    emptyText: "No Google Sheets created yet.",
  },
  "HTML Emails": {
    icon: EmailIcon,
    accent: "text-amber-600",
    emptyText: "No HTML email outputs found.",
  },
};

export default async function AssetsPage() {
  const runs = await getRunHistory();

  const assets: Asset[] = [];
  const imageAssets: ImageAsset[] = [];

  for (const run of runs) {
    if (!run.summary) continue;

    // Extract Google Doc URLs
    const docMatches = [...run.summary.matchAll(DOC_RE)];
    for (const m of docMatches) {
      assets.push({
        type: "doc",
        url: m[1].trim(),
        workflow: run.workflow,
        runId: run.runId,
        runPath: run.path,
        date: parseRunDate(run.runId),
      });
    }

    // Extract Google Sheet URLs
    const sheetMatches = [...run.summary.matchAll(SHEET_RE)];
    for (const m of sheetMatches) {
      assets.push({
        type: "sheet",
        url: m[1].trim(),
        workflow: run.workflow,
        runId: run.runId,
        runPath: run.path,
        date: parseRunDate(run.runId),
      });
    }

    // HTML emails — inferred from summary mentioning .html output
    if (/\.html\b/.test(run.summary)) {
      assets.push({
        type: "html",
        url: `/runs/${run.path}`,
        workflow: run.workflow,
        runId: run.runId,
        runPath: run.path,
        date: parseRunDate(run.runId),
      });
    }
  }

  // Load generated images from recent runs (last 20 to avoid too many API calls)
  const recentRuns = runs.slice(0, 20);
  await Promise.all(
    recentRuns.map(async (run) => {
      try {
        const imagesJson = await getFile(`${run.path}/images.json`);
        if (!imagesJson) return;
        const manifest = JSON.parse(imagesJson) as { images: { url: string; template: string; imageSize: string; generatedAt: string }[] };
        for (const img of manifest.images ?? []) {
          imageAssets.push({
            url: img.url,
            template: img.template,
            imageSize: img.imageSize,
            generatedAt: img.generatedAt,
            workflow: run.workflow,
            runId: run.runId,
            runPath: run.path,
          });
        }
      } catch { /* no images.json for this run */ }
    })
  );

  const sections: Record<SectionKey, Asset[]> = {
    Documents: assets.filter((a) => a.type === "doc"),
    Spreadsheets: assets.filter((a) => a.type === "sheet"),
    "HTML Emails": assets.filter((a) => a.type === "html"),
  };

  const totalAssets = assets.length + imageAssets.length;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asset Library</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            All delivered outputs across every run.{" "}
            {totalAssets > 0 ? (
              <span className="text-gray-600">{totalAssets} asset{totalAssets !== 1 ? "s" : ""} found.</span>
            ) : (
              <span>Run a workflow and create Google Docs or Sheets to see them here.</span>
            )}
          </p>
        </div>
      </div>

      {totalAssets === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-12 text-center">
          <p className="text-sm text-gray-500">No delivered assets yet.</p>
          <p className="text-xs text-gray-400 mt-1">
            After running a workflow, use the &ldquo;Create Google Doc&rdquo; or &ldquo;Create Google Sheet&rdquo; buttons in Run History to generate deliverables that appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Generated Images */}
          {imageAssets.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-500 flex-shrink-0">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <h2 className="text-sm font-semibold text-violet-600">Generated Images</h2>
                <span className="text-xs text-gray-400 ml-1">{imageAssets.length} image{imageAssets.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {imageAssets.map((img, i) => (
                  <div key={`${img.url}-${i}`} className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.template}
                      className="w-full object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                      <div className="w-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium capitalize mb-1">
                          {img.template.replace(/-/g, " ")}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link href={`/runs/${img.runPath}`} className="text-white/70 text-xs hover:text-white">
                            {img.runId}
                          </Link>
                          <a
                            href={img.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 bg-white text-gray-900 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(Object.entries(sections) as [SectionKey, Asset[]][]).map(([section, sectionAssets]) => {
            const config = SECTION_CONFIG[section];
            const Icon = config.icon;

            return (
              <div key={section}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon />
                  <h2 className={`text-sm font-semibold ${config.accent}`}>{section}</h2>
                  <span className="text-xs text-gray-400 ml-1">
                    {sectionAssets.length > 0 ? `${sectionAssets.length} item${sectionAssets.length !== 1 ? "s" : ""}` : ""}
                  </span>
                </div>

                {sectionAssets.length === 0 ? (
                  <p className="text-sm text-gray-400 pl-5">{config.emptyText}</p>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Name</th>
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Workflow</th>
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Date</th>
                          <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Run</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectionAssets.map((asset, idx) => (
                          <tr
                            key={`${asset.runId}-${idx}`}
                            className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors`}
                          >
                            <td className="px-4 py-3">
                              {asset.type === "html" ? (
                                <Link
                                  href={asset.url}
                                  className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium"
                                >
                                  HTML Email Preview
                                  <ExternalLinkIcon />
                                </Link>
                              ) : (
                                <a
                                  href={asset.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1.5 font-medium ${
                                    asset.type === "doc"
                                      ? "text-indigo-600 hover:text-indigo-700"
                                      : "text-emerald-600 hover:text-emerald-700"
                                  }`}
                                >
                                  {asset.type === "doc" ? "Google Doc" : "Google Sheet"}
                                  <ExternalLinkIcon />
                                </a>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {formatWorkflowName(asset.workflow)}
                            </td>
                            <td className="px-4 py-3 text-gray-500">{asset.date}</td>
                            <td className="px-4 py-3">
                              <Link
                                href={`/runs/${asset.runPath}`}
                                className="text-xs text-gray-400 hover:text-gray-600 font-mono"
                              >
                                {asset.runId}
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
