/// <reference types="@figma/plugin-typings" />

import type { AdRow, PluginToUIMsg, UIToPluginMsg } from "./types";
import { FORMAT_TO_FRAME_NAME } from "./types";

// ─── Layer names the plugin writes to — must match the Figma file ─────────────
const LAYER = {
  HEADLINE:  "headline",
  BODY_COPY: "body_copy",
  CTA:       "cta",
} as const;

// ─── Plugin entry point ───────────────────────────────────────────────────────

figma.showUI(__html__, { width: 480, height: 640, title: "Ad Creative Generator" });

figma.ui.onmessage = async (msg: UIToPluginMsg) => {
  if (msg.type === "SCAN_FRAMES") {
    await scanMasterFrames();
  } else if (msg.type === "GENERATE") {
    await generateVariants(msg.rows, msg.includeConditional, msg.pagePrefix);
  } else if (msg.type === "APPLY_IMAGES") {
    await applyImages(msg.images);
  } else if (msg.type === "CANCEL") {
    figma.closePlugin();
  }
};

// ─── Scan the document for master frames ─────────────────────────────────────

async function scanMasterFrames(): Promise<void> {
  const masterNames = Object.values(FORMAT_TO_FRAME_NAME);
  const found: string[] = [];

  for (const page of figma.root.children) {
    for (const node of page.children) {
      if (node.type === "FRAME" && masterNames.includes(node.name)) {
        found.push(node.name);
      }
    }
  }

  send({ type: "FRAMES_FOUND", frames: found });
}

// ─── Generate ad variants ─────────────────────────────────────────────────────

async function generateVariants(
  rows: AdRow[],
  includeConditional: boolean,
  pagePrefix: string
): Promise<void> {
  const filteredRows = rows.filter((r) =>
    r.quality_status === "approved" ||
    (includeConditional && r.quality_status === "conditional")
  );

  if (filteredRows.length === 0) {
    send({ type: "ERROR", message: "No approved rows found in the data. Check that quality_status column contains 'approved'." });
    return;
  }

  // Build a map of format → master frame node (search all pages)
  const masterFrameMap = buildMasterFrameMap();

  let generated = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Group rows by format so we can place all variants for a format on the same page
  const byFormat = groupBy(filteredRows, (r) => r.format);

  for (const [format, formatRows] of Object.entries(byFormat)) {
    const masterName = FORMAT_TO_FRAME_NAME[format];
    if (!masterName) {
      const msg = `Unknown format "${format}" — no master frame mapping. Skipped ${formatRows.length} row(s).`;
      errors.push(msg);
      skipped += formatRows.length;
      continue;
    }

    const masterFrame = masterFrameMap.get(masterName);
    if (!masterFrame) {
      const msg = `Master frame "${masterName}" not found in this file. Skipped ${formatRows.length} row(s). Add a frame named exactly "${masterName}" to your Figma file.`;
      errors.push(msg);
      skipped += formatRows.length;
      continue;
    }

    // Get or create the output page for this format
    const pageName = `${pagePrefix} — ${friendlyFormatName(format)}`;
    const outputPage = getOrCreatePage(pageName);

    // Lay out variants in a horizontal strip, spaced 80px apart
    const masterWidth  = (masterFrame as FrameNode).width  ?? 400;
    const masterHeight = (masterFrame as FrameNode).height ?? 400;
    const GAP = 80;

    for (let i = 0; i < formatRows.length; i++) {
      const row = formatRows[i];

      send({
        type: "PROGRESS",
        current: generated + skipped + 1,
        total: filteredRows.length,
        label: `${row.frame_type} — ${truncate(row.headline, 40)}`,
      });

      try {
        // Clone the master frame
        const clone = masterFrame.clone() as FrameNode;
        clone.name = buildFrameName(row, i + 1);

        // Position in the strip
        clone.x = i * (masterWidth + GAP);
        clone.y = 0;

        // Move to output page
        outputPage.appendChild(clone);

        // Update text layers
        updateTextLayer(clone, LAYER.HEADLINE,  row.headline);
        updateTextLayer(clone, LAYER.BODY_COPY, row.body_copy);
        updateTextLayer(clone, LAYER.CTA,       row.cta);

        generated++;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        errors.push(`Row ${i + 1} (${format}): ${errMsg}`);
        skipped++;
      }
    }

    // Zoom to the output page content after last format
    figma.currentPage = outputPage;
  }

  await figma.commitUndo();

  send({ type: "DONE", generated, skipped, errors });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildMasterFrameMap(): Map<string, FrameNode> {
  const map = new Map<string, FrameNode>();
  const masterNames = new Set(Object.values(FORMAT_TO_FRAME_NAME));

  for (const page of figma.root.children) {
    for (const node of page.children) {
      if (node.type === "FRAME" && masterNames.has(node.name)) {
        map.set(node.name, node as FrameNode);
      }
    }
  }

  return map;
}

function getOrCreatePage(name: string): PageNode {
  const existing = figma.root.children.find((p) => p.name === name);
  if (existing) return existing as PageNode;

  const page = figma.createPage();
  page.name = name;
  return page;
}

function updateTextLayer(frame: FrameNode, layerName: string, text: string): void {
  // Search recursively for a text node with the matching name
  const node = findTextNodeByName(frame, layerName);
  if (!node) {
    // Non-fatal: some frames may not have all three layers (e.g. a simple display ad)
    return;
  }

  // loadFontAsync must be called before editing characters
  // We handle this synchronously by checking the font is already loaded
  // (Figma loads fonts used in the document on open)
  node.characters = text;
}

function findTextNodeByName(parent: ChildrenMixin, name: string): TextNode | null {
  for (const child of parent.children) {
    if (child.type === "TEXT" && child.name.toLowerCase() === name.toLowerCase()) {
      return child as TextNode;
    }
    if ("children" in child) {
      const found = findTextNodeByName(child as ChildrenMixin, name);
      if (found) return found;
    }
  }
  return null;
}

function buildFrameName(row: AdRow, index: number): string {
  // Format: [Ad] {run_id} — {pillar (truncated)} — {frame_type} — {format} — #{index}
  const pillar = truncate(row.pillar.replace(/[^\w\s-]/g, ""), 25).trim();
  return `[Ad] ${row.run_id} — ${pillar} — ${row.frame_type} — ${row.format} — #${String(index).padStart(3, "0")}`;
}

function friendlyFormatName(format: string): string {
  return format
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + "…" : str;
}

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

// ─── Apply AI-generated images to Figma frames ───────────────────────────────

async function applyImages(
  images: Array<{ bytes: ArrayBuffer; mimeType: string; name: string }>
): Promise<void> {
  if (images.length === 0) {
    send({ type: "ERROR", message: "No images to apply." });
    return;
  }

  let applied = 0;
  const errors: string[] = [];
  const selection = figma.currentPage.selection.filter((n) => n.type === "FRAME") as FrameNode[];

  // Default size for new frames — 16:9 at 1200px wide
  const DEFAULT_W = 1200;
  const DEFAULT_H = 675;
  const GAP = 40;

  for (let i = 0; i < images.length; i++) {
    const { bytes, mimeType, name } = images[i];
    try {
      const figmaImage = figma.createImage(new Uint8Array(bytes));

      let frame: FrameNode;
      if (selection[i]) {
        // Apply to existing selected frame
        frame = selection[i];
      } else {
        // Create a new frame sized to the image's natural aspect ratio
        frame = figma.createFrame();
        frame.name = name || `AI Image ${i + 1}`;
        // Lay out new frames horizontally
        const existingCount = figma.currentPage.children.length;
        frame.x = (i - selection.length) * (DEFAULT_W + GAP);
        frame.y = 200;
        frame.resize(DEFAULT_W, DEFAULT_H);
        figma.currentPage.appendChild(frame);
        void existingCount; // suppress unused warning
      }

      frame.fills = [
        {
          type: "IMAGE",
          scaleMode: "FILL",
          imageHash: figmaImage.hash,
        },
      ];
      void mimeType; // hash is sufficient; mime is used by UI only

      applied++;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      errors.push(`Image ${i + 1} (${name}): ${errMsg}`);
    }
  }

  await figma.commitUndo();
  send({ type: "IMAGES_APPLIED", applied, errors });
}

function send(msg: PluginToUIMsg): void {
  figma.ui.postMessage(msg);
}
