/**
 * GET /api/runs/images?runPath=...&owner=...&repo=...&branch=...
 *
 * Returns the images.json manifest from a workflow run directory.
 * Used by the Figma plugin to fetch generated images without a browser session.
 *
 * Auth: x-plugin-key header or ?key= query param checked against PLUGIN_API_KEY env var.
 */

import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function GET(req: NextRequest) {
  const key =
    req.headers.get("x-plugin-key") ?? req.nextUrl.searchParams.get("key");
  if (!process.env.PLUGIN_API_KEY || key !== process.env.PLUGIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const runPath = searchParams.get("runPath");
  if (!runPath) {
    return NextResponse.json({ error: "runPath is required" }, { status: 400 });
  }

  const owner = searchParams.get("owner") ?? process.env.GITHUB_REPO_OWNER!;
  const repo = searchParams.get("repo") ?? process.env.GITHUB_REPO_NAME!;
  const branch =
    searchParams.get("branch") ?? process.env.GITHUB_REPO_BRANCH ?? "main";

  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const path = `${runPath}/images.json`;

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (!("content" in data)) {
      return NextResponse.json({ images: [] });
    }

    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (e: unknown) {
    if ((e as { status?: number }).status === 404) {
      return NextResponse.json({ images: [] });
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch images" },
      { status: 500 }
    );
  }
}
