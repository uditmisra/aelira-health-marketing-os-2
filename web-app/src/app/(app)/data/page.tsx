import { DataUploadPanel } from "./DataUploadPanel";

export const metadata = { title: "Data Input — Marketing OS" };

export default function DataPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">Data Input</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload performance data from any source. The system identifies the data type and generates a prompt to ingest it via <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">data-ingestion-agent</code>.
          </p>
        </div>
        <DataUploadPanel />
      </div>
    </div>
  );
}
