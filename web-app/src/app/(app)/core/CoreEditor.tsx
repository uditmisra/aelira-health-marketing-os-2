"use client";

import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import type { CoreTreeItem } from "@/lib/github";

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "dir";
  children: TreeNode[];
}

function buildTree(items: CoreTreeItem[]): TreeNode[] {
  const root: TreeNode = { name: "core", path: "core", type: "dir", children: [] };
  for (const item of items) {
    const parts = item.path.split("/");
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const partPath = parts.slice(0, i + 1).join("/");
      const isLast = i === parts.length - 1;
      let child = node.children.find((c) => c.name === part);
      if (!child) {
        child = { name: part, path: partPath, type: isLast && item.type === "blob" ? "file" : "dir", children: [] };
        node.children.push(child);
      }
      node = child;
    }
  }
  function sortChildren(n: TreeNode) {
    n.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    n.children.forEach(sortChildren);
  }
  sortChildren(root);
  return root.children;
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-gray-400">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" fill={open ? "#e5e7eb" : "none"}/>
    </svg>
  );
}

function FileIcon({ name }: { name: string }) {
  const isMarkdown = name.endsWith(".md");
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={isMarkdown ? "#6366f1" : "#9ca3af"} strokeWidth="1.5"/>
      <polyline points="14 2 14 8 20 8" stroke={isMarkdown ? "#6366f1" : "#9ca3af"} strokeWidth="1.5"/>
    </svg>
  );
}

function TreeNodeRow({ node, depth, selectedPath, openDirs, onSelectFile, onToggleDir, dirtyPaths }: {
  node: TreeNode; depth: number; selectedPath: string | null; openDirs: Set<string>;
  onSelectFile: (path: string) => void; onToggleDir: (path: string) => void; dirtyPaths: Set<string>;
}) {
  const isOpen = openDirs.has(node.path);
  const isSelected = node.path === selectedPath;
  const isDirty = dirtyPaths.has(node.path);

  if (node.type === "dir") {
    return (
      <>
        <button onClick={() => onToggleDir(node.path)}
          className="w-full flex items-center gap-1.5 py-1 px-2 hover:bg-gray-100 rounded text-left transition-colors"
          style={{ paddingLeft: `${8 + depth * 14}px` }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className={`flex-shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`}>
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <FolderIcon open={isOpen} />
          <span className="text-xs text-gray-600 truncate">{node.name}</span>
        </button>
        {isOpen && node.children.map((child) => (
          <TreeNodeRow key={child.path} node={child} depth={depth + 1} selectedPath={selectedPath}
            openDirs={openDirs} onSelectFile={onSelectFile} onToggleDir={onToggleDir} dirtyPaths={dirtyPaths} />
        ))}
      </>
    );
  }

  const isEditable = node.name.endsWith(".md");
  return (
    <button onClick={() => isEditable && onSelectFile(node.path)} disabled={!isEditable}
      className={`w-full flex items-center gap-1.5 py-1 px-2 rounded text-left transition-colors ${
        isSelected ? "bg-indigo-50 text-indigo-700" : isEditable ? "hover:bg-gray-100 text-gray-700" : "text-gray-400 cursor-default"
      }`}
      style={{ paddingLeft: `${8 + depth * 14}px` }}
      title={isEditable ? node.path : `${node.name} (read-only)`}>
      <FileIcon name={node.name} />
      <span className="text-xs truncate flex-1">{node.name}</span>
      {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />}
    </button>
  );
}

const OPEN_DIRS_KEY = "core-editor-open-dirs";

export function CoreEditor({ tree: rawTree }: { tree: CoreTreeItem[] }) {
  const tree = buildTree(rawTree);
  const defaultOpen = new Set(tree.filter((n) => n.type === "dir").map((n) => n.path));

  const [openDirs, setOpenDirs] = useState<Set<string>>(defaultOpen);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [loadedContent, setLoadedContent] = useState<Record<string, string>>({});
  const [editContent, setEditContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "error" | null>(null);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  // Restore open dirs from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(OPEN_DIRS_KEY);
      if (stored) setOpenDirs(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, []);

  function persistOpenDirs(next: Set<string>) {
    setOpenDirs(next);
    try { localStorage.setItem(OPEN_DIRS_KEY, JSON.stringify([...next])); } catch { /* quota */ }
  }

  function toggleDir(path: string) {
    const next = new Set(openDirs);
    if (next.has(path)) { next.delete(path); } else { next.add(path); }
    persistOpenDirs(next);
  }

  const loadFile = useCallback(async (path: string) => {
    if (loadedContent[path] !== undefined) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/core/file?path=${encodeURIComponent(path)}`);
      const { content } = await res.json();
      setLoadedContent((prev) => ({ ...prev, [path]: content ?? "" }));
    } finally {
      setLoading(false);
    }
  }, [loadedContent]);

  function selectFile(path: string) {
    setSelectedPath(path);
    setSaveStatus(null);
    loadFile(path);
  }

  const currentContent = selectedPath ? (editContent[selectedPath] ?? loadedContent[selectedPath] ?? "") : "";
  const isDirty = selectedPath !== null && editContent[selectedPath] !== undefined && editContent[selectedPath] !== (loadedContent[selectedPath] ?? "");
  const dirtyPaths = new Set(Object.entries(editContent).filter(([k, v]) => v !== (loadedContent[k] ?? "")).map(([k]) => k));

  async function handleSave() {
    if (!selectedPath || !isDirty) return;
    setSaving(true);
    try {
      const res = await fetch("/api/core/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: selectedPath, content: currentContent }),
      });
      if (res.ok) {
        setLoadedContent((prev) => ({ ...prev, [selectedPath]: currentContent }));
        setEditContent((prev) => { const n = { ...prev }; delete n[selectedPath!]; return n; });
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  }

  function handleOpenInClaude() {
    const prompt = `Please review and improve this file from my Marketing OS repository.\n\nFile: ${selectedPath}\n\n---\n${currentContent}\n---\n\nImprove clarity, fix any inconsistencies, and ensure it aligns with the brand voice and ICP defined in core/.`;
    navigator.clipboard.writeText(prompt).catch(() => {});
    window.open("https://claude.ai", "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (isDirty) handleSave();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const fileName = selectedPath?.split("/").pop() ?? "";
  const folderPath = selectedPath?.split("/").slice(1, -1).join(" / ") ?? "";

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <h1 className="text-sm font-semibold text-gray-900">Core Editor</h1>
          <p className="text-xs text-gray-400 mt-0.5">Shared intelligence layer</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 px-1">
          {tree.map((node) => (
            <TreeNodeRow key={node.path} node={node} depth={0} selectedPath={selectedPath}
              openDirs={openDirs} onSelectFile={selectFile} onToggleDir={toggleDir} dirtyPaths={dirtyPaths} />
          ))}
        </nav>
        {dirtyPaths.size > 0 && (
          <div className="px-4 py-2 border-t border-gray-100 flex-shrink-0">
            <p className="text-xs text-orange-500">{dirtyPaths.size} unsaved file{dirtyPaths.size !== 1 ? "s" : ""}</p>
          </div>
        )}
      </div>

      {/* Editor */}
      {selectedPath ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-100 bg-white flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              {loading ? <span className="text-xs text-gray-400">Loading…</span> : (
                <>
                  {folderPath && <span className="text-xs text-gray-400 truncate">{folderPath} /</span>}
                  <span className="text-sm font-medium text-gray-800 font-mono truncate">{fileName}</span>
                  {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setTab("edit")} className={`px-2.5 py-1 text-xs font-medium transition-colors ${tab === "edit" ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"}`}>Edit</button>
                <button onClick={() => setTab("preview")} className={`px-2.5 py-1 text-xs font-medium transition-colors ${tab === "preview" ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"}`}>Preview</button>
              </div>
              {saveStatus === "saved" && <span className="text-xs text-green-600 font-medium">Saved</span>}
              {saveStatus === "error" && <span className="text-xs text-red-500 font-medium">Save failed</span>}
              <button onClick={handleOpenInClaude} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Open in Claude
              </button>
              <button onClick={handleSave} disabled={!isDirty || saving}
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Cmd+S">
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>

          {tab === "edit" ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/10 flex-shrink-0">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Markdown</span>
                <span className="text-xs text-gray-600">{currentContent.length.toLocaleString()} chars</span>
              </div>
              <textarea value={currentContent}
                onChange={(e) => { if (selectedPath) setEditContent((prev) => ({ ...prev, [selectedPath]: e.target.value })); }}
                className="flex-1 resize-none text-sm font-mono text-gray-200 bg-transparent p-4 focus:outline-none leading-relaxed"
                spellCheck={false} placeholder={loading ? "Loading…" : "File is empty."} />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {currentContent
                ? <div className="prose prose-sm max-w-3xl"><ReactMarkdown>{currentContent}</ReactMarkdown></div>
                : <p className="text-gray-300 text-sm">Nothing to preview.</p>
              }
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-gray-50">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">Select a file to edit</p>
          <p className="text-xs text-gray-400">Only <code className="font-mono">.md</code> files are editable</p>
        </div>
      )}
    </div>
  );
}
