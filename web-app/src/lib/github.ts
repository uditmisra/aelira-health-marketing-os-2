import { Octokit } from "@octokit/rest";
import { getActiveRepoConfig } from "./clients";

function getOctokit() {
  return new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
}

// ─── Read ─────────────────────────────────────────────────

export async function getFile(path: string): Promise<string | null> {
  const { owner, repo, branch } = await getActiveRepoConfig();
  const octokit = getOctokit();
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if ("content" in data) {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    return null;
  } catch (e: any) {
    if (e.status === 404) return null;
    throw e;
  }
}

export async function listDirectory(path: string): Promise<{ name: string; path: string; type: string }[]> {
  const { owner, repo, branch } = await getActiveRepoConfig();
  const octokit = getOctokit();
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if (!Array.isArray(data)) return [];
    return data.map((f) => ({ name: f.name, path: f.path, type: f.type }));
  } catch {
    return [];
  }
}

// ─── Write ────────────────────────────────────────────────

export async function writeFile(path: string, content: string, message: string): Promise<void> {
  const { owner, repo, branch } = await getActiveRepoConfig();
  const octokit = getOctokit();
  let sha: string | undefined;
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if ("sha" in data) sha = data.sha;
  } catch {
    // file doesn't exist yet — that's fine
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch,
    sha,
  });
}

export async function appendToFile(path: string, appendContent: string, message: string): Promise<void> {
  const existing = (await getFile(path)) ?? "";
  await writeFile(path, existing + "\n" + appendContent, message);
}

// ─── Staleness ────────────────────────────────────────────

export interface StalenessEntry {
  path: string;
  label: string;
  lastModified: Date;
  daysSince: number;
  thresholdDays: number;
  isStale: boolean;
}

async function getLastCommitDate(path: string): Promise<Date | null> {
  const { owner, repo } = await getActiveRepoConfig();
  const octokit = getOctokit();
  try {
    const { data } = await octokit.repos.listCommits({
      owner, repo, path, per_page: 1,
    });
    if (data.length === 0) return null;
    const dateStr = data[0].commit.committer?.date ?? data[0].commit.author?.date;
    return dateStr ? new Date(dateStr) : null;
  } catch {
    return null;
  }
}

export async function getCoreFileStaleness(): Promise<StalenessEntry[]> {
  const now = new Date();

  const fixedFiles: { path: string; label: string; thresholdDays: number }[] = [
    { path: "core/brand/messaging-pillars.md",  label: "messaging-pillars.md",  thresholdDays: 90 },
    { path: "core/icp/primary-icp.md",          label: "primary-icp.md",         thresholdDays: 90 },
  ];

  const competitorDir = await listDirectory("core/competitive");
  const competitorFiles = competitorDir
    .filter((f) => f.type === "file" && f.name.startsWith("competitor-") && f.name.endsWith(".md"))
    .map((f) => ({ path: f.path, label: f.name, thresholdDays: 60 }));

  const allFiles = [...fixedFiles, ...competitorFiles];
  const dates = await Promise.all(allFiles.map((f) => getLastCommitDate(f.path)));

  return allFiles
    .map((f, i) => {
      const lastModified = dates[i];
      if (!lastModified) return null;
      const daysSince = Math.floor((now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
      return {
        path: f.path,
        label: f.label,
        lastModified,
        daysSince,
        thresholdDays: f.thresholdDays,
        isStale: daysSince >= f.thresholdDays,
      };
    })
    .filter((e): e is StalenessEntry => e !== null && e.isStale);
}

// ─── Core tree ────────────────────────────────────────────

export interface CoreTreeItem {
  path: string;
  type: "blob" | "tree";
}

export async function getCoreTree(): Promise<CoreTreeItem[]> {
  const { owner, repo, branch } = await getActiveRepoConfig();
  const octokit = getOctokit();
  const { data } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: branch,
    recursive: "1",
  });

  return data.tree
    .filter((item) => !!item.path && item.path.startsWith("core/") && !!item.type)
    .map((item) => ({ path: item.path!, type: item.type as "blob" | "tree" }));
}

// ─── Workflow helpers ──────────────────────────────────────

export interface WorkflowYaml {
  name: string;
  version: string;
  description: string;
  system: string;
  trigger: string;
  inputs?: WorkflowInput[];
  steps: WorkflowStep[];
}

export interface WorkflowInput {
  name: string;
  description: string;
  required: boolean;
  default?: string;
  example?: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  agent?: string;
  gate?: { type: string; present_as?: string };
}

export interface WorkflowEntry {
  path: string;
  kind: "yaml" | "prose";
  yaml: WorkflowYaml;
}

function inferSystem(path: string): string {
  if (path.startsWith("growth-marketing")) return "growth-marketing";
  if (path.startsWith("client-setup")) return "client-setup";
  if (path.startsWith("system-intelligence")) return "system-intelligence";
  return "product-marketing";
}

function parseProse(content: string, path: string): WorkflowYaml | null {
  const nameMatch = content.match(/^#\s+(.+)$/m);
  if (!nameMatch) return null;
  const name = nameMatch[1].trim();

  const purposeMatch = content.match(/##\s+Purpose\s*\n+([\s\S]*?)(?=\n##|\n---|\n$|$)/);
  const description = purposeMatch
    ? purposeMatch[1].trim().split(/\n\n/)[0].replace(/\n/g, " ").trim()
    : "";

  return {
    name,
    description,
    system: inferSystem(path),
    version: "",
    trigger: "manual",
    steps: [],
  };
}

export async function getAllWorkflows(): Promise<WorkflowEntry[]> {
  const jsyaml = (await import("js-yaml")).default;
  const systems = [
    "client-setup/workflows",
    "growth-marketing/workflows",
    "product-marketing/market-intelligence/workflows",
    "product-marketing/positioning/workflows",
    "product-marketing/launches/workflows",
    "product-marketing/sales-enablement/workflows",
    "product-marketing/customer-intelligence/workflows",
    "product-marketing/narrative/workflows",
    "product-marketing/pricing/workflows",
    "system-intelligence/workflows",
  ];

  const results: WorkflowEntry[] = [];
  const seenNames = new Set<string>();

  for (const dir of systems) {
    const files = await listDirectory(dir);
    for (const file of files) {
      if (file.name.endsWith(".yaml")) {
        const content = await getFile(file.path);
        if (content) {
          try {
            const parsed = jsyaml.load(content) as WorkflowYaml;
            if (parsed?.name) {
              results.push({ path: file.path, kind: "yaml", yaml: parsed });
              seenNames.add(parsed.name.toLowerCase());
            }
          } catch {
            // malformed YAML — skip
          }
        }
      }
    }
  }

  for (const dir of systems) {
    const files = await listDirectory(dir);
    for (const file of files) {
      if (file.name.endsWith(".md")) {
        const content = await getFile(file.path);
        if (content) {
          const parsed = parseProse(content, file.path);
          if (parsed && !seenNames.has(parsed.name.toLowerCase())) {
            results.push({ path: file.path, kind: "prose", yaml: parsed });
            seenNames.add(parsed.name.toLowerCase());
          }
        }
      }
    }
  }

  return results;
}

export async function getRunHistory(workflowName?: string): Promise<RunSummary[]> {
  const { workspaceCreatedAt } = await getActiveRepoConfig();
  const runDirs: RunSummary[] = [];

  const workflowDirs = await listDirectory("runs");
  for (const wf of workflowDirs) {
    if (wf.type !== "dir") continue;
    if (workflowName && wf.name !== workflowName) continue;
    const runs = await listDirectory(wf.path);
    for (const run of runs) {
      if (run.type !== "dir") continue;
      // Filter out runs that predate this workspace — inherited from the template repo.
      if (workspaceCreatedAt) {
        const runDate = run.name.slice(0, 10); // YYYY-MM-DD
        const createdDate = workspaceCreatedAt.slice(0, 10);
        if (runDate < createdDate) continue;
      }
      const summary = await getFile(`${run.path}/run-summary.md`);
      runDirs.push({
        workflow: wf.name,
        runId: run.name,
        path: run.path,
        summary: summary ?? null,
      });
    }
  }

  return runDirs.sort((a, b) => b.runId.localeCompare(a.runId));
}

export interface RunSummary {
  workflow: string;
  runId: string;
  path: string;
  summary: string | null;
}

// ─── Repo URL helper ──────────────────────────────────────
// Use this to build "View on GitHub" links in the UI.

export async function getRepoWebUrl(): Promise<string> {
  const { owner, repo, branch } = await getActiveRepoConfig();
  return `https://github.com/${owner}/${repo}/tree/${branch}`;
}
