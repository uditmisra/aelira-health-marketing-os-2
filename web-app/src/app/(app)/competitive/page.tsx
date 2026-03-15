import { listDirectory, getFile } from "@/lib/github";
import Link from "next/link";

export const revalidate = 300;

interface CompetitorCard {
  name: string;
  path: string;
  positioning?: string;
  market?: string;
  pricing?: string;
  strengths: string[];
  weaknesses: string[];
  narrative?: string;
  lastUpdated?: string;
  daysSinceUpdate?: number;
}

function extractBullets(section: string, max: number): string[] {
  return section
    .split("\n")
    .filter((l) => l.trimStart().startsWith("-"))
    .map((l) => {
      const boldMatch = l.match(/\*\*([^*]+)\*\*/);
      if (boldMatch) return boldMatch[1].trim();
      return l.replace(/^\s*-\s+/, "").split(" — ")[0].split(":")[0].trim().slice(0, 90);
    })
    .filter(Boolean)
    .slice(0, max);
}

function parseCard(content: string, path: string): CompetitorCard {
  const nameMatch = content.match(/^#\s+Competitor:\s*(.+)$/m);
  const name = nameMatch?.[1]?.trim()
    ?? path.split("/").pop()?.replace(/^competitor-/, "").replace(/\.md$/, "").replace(/-/g, " ") ?? "Unknown";

  const lastUpdatedMatch = content.match(/>\s*Last updated:\s*(\d{4}-\d{2}-\d{2})/);
  const lastUpdated = lastUpdatedMatch?.[1] ?? undefined;
  const daysSinceUpdate = lastUpdated
    ? Math.floor((Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
    : undefined;

  const positioningMatch = content.match(/\*\*Positioning:\*\*\s*(.+)/);
  const marketMatch = content.match(/\*\*Primary market:\*\*\s*(.+)/);
  const pricingMatch = content.match(/\*\*Pricing model:\*\*\s*(.+)/);

  const narrativeSection = content.match(/##\s+Their narrative\s*\n+([\s\S]*?)(?=\n##|\n---)/)?.[1] ?? "";
  const narrative = narrativeSection.split("\n\n")[0]?.trim().slice(0, 250) || undefined;

  const strengthsSection = content.match(/##\s+Strengths[^\n]*\n+([\s\S]*?)(?=\n##)/)?.[1] ?? "";
  const weaknessesSection = content.match(/##\s+Weaknesses[^\n]*\n+([\s\S]*?)(?=\n##)/)?.[1] ?? "";

  return {
    name,
    path,
    positioning: positioningMatch?.[1]?.trim(),
    market: marketMatch?.[1]?.trim(),
    pricing: pricingMatch?.[1]?.trim(),
    strengths: extractBullets(strengthsSection, 3),
    weaknesses: extractBullets(weaknessesSection, 3),
    narrative,
    lastUpdated,
    daysSinceUpdate,
  };
}

export default async function CompetitivePage() {
  const dir = await listDirectory("core/competitive");
  const cardFiles = dir.filter(
    (f) => f.type === "file" && f.name.startsWith("competitor-") && f.name.endsWith(".md")
  );

  const cards: CompetitorCard[] = (
    await Promise.all(
      cardFiles.map(async (f) => {
        const content = await getFile(f.path);
        return content ? parseCard(content, f.path) : null;
      })
    )
  ).filter((c): c is CompetitorCard => c !== null);

  // Sort: most recently updated first, never-updated last
  cards.sort((a, b) => {
    if (!a.daysSinceUpdate && !b.daysSinceUpdate) return 0;
    if (!a.daysSinceUpdate) return 1;
    if (!b.daysSinceUpdate) return -1;
    return a.daysSinceUpdate - b.daysSinceUpdate;
  });

  const landscape = await getFile("core/competitive/landscape-overview.md");
  const staleCount = cards.filter((c) => c.daysSinceUpdate !== undefined && c.daysSinceUpdate > 60).length;

  const landscapeSnippet = landscape
    ? (landscape.match(/##\s+White\s+Space[\s\S]*?\n+([\s\S]*?)(?=\n##)/)?.[1]?.trim().slice(0, 300) ??
       landscape.match(/##\s+Recommended[\s\S]*?\n+([\s\S]*?)(?=\n##)/)?.[1]?.trim().slice(0, 300))
    : null;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Competitive Intelligence</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {cards.length} competitor{cards.length !== 1 ? "s" : ""} tracked.
            {staleCount > 0 && (
              <span className="text-orange-500 ml-1.5">
                {staleCount} card{staleCount !== 1 ? "s" : ""} stale (&gt;60 days).
              </span>
            )}
          </p>
        </div>
        <Link
          href={"/workflows?run=" + encodeURIComponent("product-marketing/market-intelligence/workflows/weekly-competitive-pulse.yaml")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Run Competitive Pulse →
        </Link>
      </div>

      {landscapeSnippet && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1.5">Landscape Overview</p>
              <p className="text-sm text-blue-800 leading-relaxed">{landscapeSnippet}{landscapeSnippet.length >= 300 ? "…" : ""}</p>
            </div>
            <Link
              href="/core"
              className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap flex-shrink-0 border border-blue-200 rounded px-2 py-1"
            >
              Full overview →
            </Link>
          </div>
        </div>
      )}

      {cards.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-12 text-center">
          <p className="text-sm text-gray-500">No competitor cards found.</p>
          <p className="text-xs text-gray-400 mt-1">
            Run the Day 1 Pack to auto-generate cards, or add files to{" "}
            <span className="font-mono">core/competitive/</span> manually.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {cards.map((card) => {
            const isStale = card.daysSinceUpdate !== undefined && card.daysSinceUpdate > 60;
            return (
              <div key={card.path} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-gray-900 capitalize">{card.name}</h2>
                    {card.positioning && (
                      <p className="text-sm text-gray-500 mt-0.5 italic truncate">
                        &ldquo;{card.positioning.replace(/^[""]|[""]$/g, "")}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    {card.lastUpdated && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${
                          isStale
                            ? "text-orange-600 bg-orange-50 border-orange-200"
                            : "text-gray-400 bg-gray-50 border-gray-100"
                        }`}
                      >
                        {isStale ? `${card.daysSinceUpdate}d old` : card.lastUpdated}
                      </span>
                    )}
                    <Link
                      href="/core"
                      className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>

                {/* Body — 3-column grid */}
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  <div className="px-5 py-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Market &amp; Pricing</p>
                    {card.market ? (
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">{card.market}</p>
                    ) : null}
                    {card.pricing ? (
                      <p className="text-xs text-gray-500 leading-relaxed">{card.pricing}</p>
                    ) : null}
                    {!card.market && !card.pricing && (
                      <p className="text-xs text-gray-300">Not populated.</p>
                    )}
                  </div>

                  <div className="px-5 py-4">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Why They Win</p>
                    {card.strengths.length > 0 ? (
                      <ul className="space-y-1.5">
                        {card.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-green-400 flex-shrink-0 mt-0.5">+</span>
                            <span className="text-xs text-gray-600 leading-snug">{s}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-300">Not populated.</p>
                    )}
                  </div>

                  <div className="px-5 py-4">
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Why They Lose</p>
                    {card.weaknesses.length > 0 ? (
                      <ul className="space-y-1.5">
                        {card.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-400 flex-shrink-0 mt-0.5">−</span>
                            <span className="text-xs text-gray-600 leading-snug">{w}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-300">Not populated.</p>
                    )}
                  </div>
                </div>

                {/* Narrative */}
                {card.narrative && (
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {card.narrative}{card.narrative.length >= 250 ? "…" : ""}
                    </p>
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
