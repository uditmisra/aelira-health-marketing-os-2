"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const STORAGE_KEY = "kpi-csv-data";
const COLORS = ["#6366f1", "#f59e0b", "#22c55e", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"];

interface ParsedCsv {
  name: string;
  headers: string[];
  dateCol: string;
  metricCols: string[];
  rows: Record<string, string>[];
}

function parseCSV(text: string): ParsedCsv | null {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;

  // Handle both comma and tab separators
  const sep = lines[0].includes("\t") ? "\t" : ",";

  function splitRow(line: string): string[] {
    const result: string[] = [];
    let cur = "";
    let inQuote = false;
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === sep && !inQuote) { result.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    result.push(cur.trim());
    return result;
  }

  const headers = splitRow(lines[0]);
  const rows = lines.slice(1).map((l) => {
    const vals = splitRow(l);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = vals[i] ?? ""; });
    return row;
  });

  // Detect date column: first column that looks like a date/period
  const datePatterns = /^(date|period|week|month|day|time)/i;
  const looksLikeDate = (v: string) =>
    /^\d{4}[-/]\d{2}/.test(v) || /^\d{2}[-/]\d{2}/.test(v) || /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(v) || /^q[1-4]\s?\d{4}/i.test(v);

  const dateCol =
    headers.find((h) => datePatterns.test(h)) ??
    headers.find((h) => rows.slice(0, 3).some((r) => looksLikeDate(r[h] ?? ""))) ??
    headers[0];

  const metricCols = headers.filter((h) => {
    if (h === dateCol) return false;
    const sample = rows.slice(0, 5).map((r) => r[h] ?? "").filter(Boolean);
    return sample.length > 0 && sample.every((v) => !isNaN(parseFloat(v.replace(/[$,%]/g, ""))));
  });

  if (metricCols.length === 0) return null;

  return { name: "", headers, dateCol, metricCols, rows };
}

function formatValue(raw: string): number {
  return parseFloat(raw.replace(/[$,%]/g, "")) || 0;
}

interface StoredDataset {
  name: string;
  dateCol: string;
  metricCols: string[];
  rows: Record<string, string>[];
  uploadedAt: string;
}

export function CsvUpload() {
  const [datasets, setDatasets] = useState<StoredDataset[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeMetrics, setActiveMetrics] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredDataset[] = JSON.parse(stored);
        setDatasets(data);
        if (data[0]) setActiveMetrics(new Set(data[0].metricCols.slice(0, 3)));
      }
    } catch {
      // stale data — ignore
    }
  }, []);

  function saveDatasets(next: StoredDataset[]) {
    setDatasets(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* quota */ }
  }

  const processFile = useCallback((file: File) => {
    setError(null);
    if (!file.name.match(/\.(csv|tsv|txt)$/i)) {
      setError("Upload a .csv or .tsv file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      if (!parsed) {
        setError("Couldn't parse this file. Check it has a header row and numeric columns.");
        return;
      }
      const dataset: StoredDataset = {
        name: file.name.replace(/\.(csv|tsv|txt)$/i, ""),
        dateCol: parsed.dateCol,
        metricCols: parsed.metricCols,
        rows: parsed.rows,
        uploadedAt: new Date().toISOString(),
      };
      const next = [dataset, ...datasets.filter((d) => d.name !== dataset.name)].slice(0, 5);
      saveDatasets(next);
      setActiveIdx(0);
      setActiveMetrics(new Set(parsed.metricCols.slice(0, 3)));
    };
    reader.readAsText(file);
  }, [datasets]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const active = datasets[activeIdx];
  const chartData = active?.rows.map((row) => {
    const point: Record<string, string | number> = { label: row[active.dateCol] ?? "" };
    active.metricCols.forEach((col) => { point[col] = formatValue(row[col] ?? "0"); });
    return point;
  }) ?? [];

  function toggleMetric(col: string) {
    setActiveMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(col)) { next.delete(col); } else { next.add(col); }
      return next;
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Performance Data</h2>
          <p className="text-xs text-gray-400 mt-0.5">Upload a CSV or Sheets export to chart it here.</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload CSV
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.tsv,.txt"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }}
        />
      </div>

      {error && (
        <div className="mx-5 mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
          {error}
        </div>
      )}

      {datasets.length === 0 ? (
        // Drop zone
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`m-5 border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            dragging ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">Drop a CSV here, or click to upload</p>
          <p className="text-xs text-gray-400 mt-1">
            Exports from HubSpot, Google Sheets, LinkedIn Ads, or Google Ads. Needs a date column + numeric columns.
          </p>
        </div>
      ) : (
        <div className="p-5">
          {/* Dataset tabs */}
          {datasets.length > 1 && (
            <div className="flex items-center gap-1 mb-4 overflow-x-auto">
              {datasets.map((d, i) => (
                <button
                  key={d.name + i}
                  onClick={() => { setActiveIdx(i); setActiveMetrics(new Set(d.metricCols.slice(0, 3))); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    i === activeIdx
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {d.name}
                </button>
              ))}
              <button
                onClick={() => inputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-dashed border-gray-300 text-gray-400 hover:bg-gray-50 whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          )}

          {/* Metric toggles */}
          {active && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {active.metricCols.map((col, i) => {
                const on = activeMetrics.has(col);
                return (
                  <button
                    key={col}
                    onClick={() => toggleMetric(col)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      on
                        ? "border-transparent text-white"
                        : "border-gray-200 text-gray-400 bg-white hover:border-gray-300"
                    }`}
                    style={on ? { backgroundColor: COLORS[i % COLORS.length] } : {}}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          )}

          {/* Chart */}
          {active && chartData.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#f3f4f6" }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    labelStyle={{ color: "#374151", fontWeight: 500 }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={7}
                    wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  />
                  {active.metricCols
                    .filter((col) => activeMetrics.has(col))
                    .map((col, i) => (
                      <Line
                        key={col}
                        type="monotone"
                        dataKey={col}
                        stroke={COLORS[i % COLORS.length]}
                        strokeWidth={2}
                        dot={chartData.length < 20}
                        activeDot={{ r: 4 }}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-400">
              {active?.rows.length ?? 0} rows · uploaded {active ? new Date(active.uploadedAt).toLocaleDateString() : ""}
            </p>
            <button
              onClick={() => {
                const next = datasets.filter((_, i) => i !== activeIdx);
                saveDatasets(next);
                setActiveIdx(0);
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
