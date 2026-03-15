import { getAllWorkflows, getFile } from "@/lib/github";
import { getActiveRepoConfig } from "@/lib/clients";
import { WorkflowRunner } from "./WorkflowRunner";
import { WorkflowList } from "./WorkflowList";

export const revalidate = 60;


export default async function WorkflowsPage({
  searchParams,
}: {
  searchParams: Promise<{ run?: string }>;
}) {
  const { run: autoRunPath } = await searchParams;
  const workflows = await getAllWorkflows();

  const grouped: Record<string, typeof workflows> = {};
  for (const wf of workflows) {
    const system = wf.yaml.system ?? "other";
    if (!grouped[system]) grouped[system] = [];
    grouped[system].push(wf);
  }

  const activeWorkflow = workflows.find((w) => w.path === autoRunPath);
  const rawYaml = autoRunPath ? await getFile(autoRunPath) : null;
  const { owner, repo } = await getActiveRepoConfig();
  const githubRepo = `${owner}/${repo}`;

  return (
    <div className="flex h-full">
      <WorkflowList grouped={grouped} activePath={autoRunPath} />

      {/* Right: runner */}
      <div className="flex-1 overflow-hidden bg-white">
        {autoRunPath ? (
          <WorkflowRunner path={autoRunPath} kind={activeWorkflow?.kind ?? "yaml"} workflow={activeWorkflow?.yaml ?? null} rawYaml={rawYaml} githubRepo={githubRepo} />
        ) : (
          <div className="flex items-center justify-center h-full text-center p-12">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M5.93 4.93a10 10 0 0 0 0 14.14"/></svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Select a workflow</p>
              <p className="text-xs text-gray-300 mt-1">Choose from the list to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
