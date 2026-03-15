import { getRunHistory } from "@/lib/github";
import { RunsTable } from "./RunsTable";

export const revalidate = 60;

export default async function RunsPage() {
  const runs = await getRunHistory();

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Run History</h1>
          <p className="text-sm text-gray-400 mt-0.5">Audit log of all executed workflows.</p>
        </div>
      </div>

      <RunsTable runs={runs} />
    </div>
  );
}
