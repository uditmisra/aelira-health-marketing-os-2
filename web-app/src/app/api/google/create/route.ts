/**
 * POST /api/google/create
 *
 * Creates a Google Doc or Sheet from a workflow run output and writes
 * the URL back to run-summary.md in the GitHub repo.
 *
 * Body: { runPath: string, type: "doc" | "sheet", content?: string }
 *   runPath  — e.g. "runs/weekly-competitive-pulse/2026-03-13-120000"
 *   type     — "doc" creates a Google Doc; "sheet" creates a Sheet
 *   content  — optional override; defaults to run-summary.md content
 */

import { auth } from "@/lib/auth";
import { getValidAccessToken } from "@/lib/google-kv";
import { getFile, writeFile } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";

function docUrl(id: string) {
  return `https://docs.google.com/document/d/${id}/edit`;
}
function sheetUrl(id: string) {
  return `https://docs.google.com/spreadsheets/d/${id}/edit`;
}

// ── Google Docs ───────────────────────────────────────────────────────────────

async function createGoogleDoc(
  accessToken: string,
  title: string,
  markdown: string
): Promise<string> {
  // 1. Create empty doc
  const createRes = await fetch("https://docs.googleapis.com/v1/documents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Google Docs create failed: ${err}`);
  }
  const { documentId } = await createRes.json();

  // 2. Insert content
  const insertRes = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: markdown,
            },
          },
        ],
      }),
    }
  );
  if (!insertRes.ok) {
    const err = await insertRes.text();
    throw new Error(`Google Docs batchUpdate failed: ${err}`);
  }

  return docUrl(documentId);
}

// ── Google Sheets ─────────────────────────────────────────────────────────────

async function createGoogleSheet(
  accessToken: string,
  title: string,
  tsvContent: string
): Promise<string> {
  // 1. Create empty spreadsheet
  const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties: { title } }),
  });
  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Google Sheets create failed: ${err}`);
  }
  const { spreadsheetId } = await createRes.json();

  // 2. Parse TSV into rows
  const rows = tsvContent
    .trim()
    .split("\n")
    .map((line) => line.split("\t").map((cell) => cell.trim()));

  // 3. Write rows
  const updateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=RAW`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: rows }),
    }
  );
  if (!updateRes.ok) {
    const err = await updateRes.text();
    throw new Error(`Google Sheets values update failed: ${err}`);
  }

  return sheetUrl(spreadsheetId);
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { runPath, type, content: bodyContent } = await req.json();

  if (!runPath || !type || !["doc", "sheet"].includes(type)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Get a valid (auto-refreshed) Google access token
  const accessToken = await getValidAccessToken(session.user.email);
  if (!accessToken) {
    return NextResponse.json(
      { error: "Google not connected — go to Settings to connect" },
      { status: 400 }
    );
  }

  // Determine content — use provided content or fall back to run-summary.md
  const content =
    bodyContent ?? (await getFile(`${runPath}/run-summary.md`)) ?? "";

  // Derive a document title from the run path
  // e.g. "runs/weekly-competitive-pulse/2026-03-13-120000"
  const parts = runPath.split("/");
  const workflowSlug = parts[parts.length - 2] ?? "workflow";
  const runId = parts[parts.length - 1] ?? "run";
  const workflowName = workflowSlug
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const title = `${workflowName} — ${runId}`;

  // Create the document
  const url =
    type === "sheet"
      ? await createGoogleSheet(accessToken, title, content)
      : await createGoogleDoc(accessToken, title, content);

  // Write URL back to run-summary.md
  const summaryPath = `${runPath}/run-summary.md`;
  const existing = (await getFile(summaryPath)) ?? "";
  const deliveryTag = type === "sheet" ? "Google Sheet" : "Google Doc";

  // Only append if not already there
  if (!existing.includes(url)) {
    const updated =
      existing.trimEnd() +
      `\n\n## Delivery\n\n**${deliveryTag}:** ${url}\n`;
    await writeFile(
      summaryPath,
      updated,
      `[web-app] add ${deliveryTag} delivery URL — ${runId}`
    );
  }

  return NextResponse.json({ url });
}
