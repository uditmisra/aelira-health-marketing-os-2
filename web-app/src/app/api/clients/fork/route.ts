import { auth } from "@/lib/auth";
import { getOrCreateClientRecord, buildClientCookie, CLIENT_COOKIE } from "@/lib/clients";
import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const TEMPLATE_OWNER = process.env.GITHUB_REPO_OWNER!;
const TEMPLATE_REPO = process.env.GITHUB_REPO_NAME!;

interface ForkRequestBody {
  clientName: string;
  websiteUrl?: string;
  description?: string;
  category?: string;
}

function buildClientConfigSection(
  clientName: string,
  websiteUrl: string,
  description: string,
  category: string
): string {
  return `## Client Configuration

> Populated during onboarding. Complete remaining fields via the Core Editor.

### Company
- **Company name:** ${clientName}
- **Product name:** ${clientName}
- **One-line description:** ${description || "TBD"}
- **Category:** ${category || "TBD"}
- **Stage:** TBD
- **Primary website:** ${websiteUrl || "TBD"}

### Market Position
- **Primary competitor:** TBD
- **Secondary competitor:** TBD
- **Key differentiator:** TBD — run new-positioning-sprint to develop
- **Primary value proposition:** TBD — run new-positioning-sprint to develop

### ICP
- **Primary ICP:** TBD
- **Primary buyer persona:** TBD
- **Secondary buyer persona:** TBD
- **End user persona:** TBD
- **Key pain:** TBD
- **Key trigger:** TBD

### Brand Voice
- **Tone:** TBD — run brand-bootstrap to extract
- **What to avoid:** TBD
- **Voice reference:** see \`core/brand/voice-and-tone.md\`

### Tech Stack (Marketing)
- **CRM:** TBD
- **Marketing automation:** TBD
- **Email platform:** TBD
- **Paid search:** TBD
- **Paid social:** TBD
- **Analytics:** TBD
- **Design:** TBD

### Goals (Current Quarter)
- **Growth marketing goal:** TBD
- **Product marketing goal:** TBD
- **Key metric:** TBD`;
}

/**
 * Fetches the CLAUDE.md from the new repo and replaces the Client Configuration
 * section with the client's actual data. Non-blocking — logs errors but does not
 * throw, so a CLAUDE.md write failure never blocks workspace creation.
 */
async function writeCustomizedClaudeMd(
  octokit: Octokit,
  repoOwner: string,
  repoName: string,
  clientName: string,
  websiteUrl: string,
  description: string,
  category: string
): Promise<void> {
  // Fetch the existing CLAUDE.md from the newly created repo
  const { data: existing } = await octokit.repos.getContent({
    owner: repoOwner,
    repo: repoName,
    path: "CLAUDE.md",
  });

  // getContent returns an object with sha and content when path is a file
  const fileData = existing as { sha: string; content: string; encoding: string };
  const sha = fileData.sha;
  const templateContent = Buffer.from(fileData.content, "base64").toString("utf-8");

  const newClientConfig = buildClientConfigSection(clientName, websiteUrl, description, category);

  // Replace the Client Configuration section.
  // The section starts at "## Client Configuration" and ends just before the
  // next "---\n## " heading (the "## How This System Is Organized" section).
  const updatedContent = templateContent.replace(
    /## Client Configuration[\s\S]*?(?=\n---\n## )/,
    newClientConfig + "\n"
  );

  await octokit.repos.createOrUpdateFileContents({
    owner: repoOwner,
    repo: repoName,
    path: "CLAUDE.md",
    message: `[onboarding] configure CLAUDE.md for ${clientName}`,
    content: Buffer.from(updatedContent).toString("base64"),
    sha,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!session.accessToken) return NextResponse.json({ error: "GitHub access token not available — re-login" }, { status: 401 });

  const body = await req.json() as ForkRequestBody;
  const { clientName, websiteUrl = "", description = "", category = "" } = body;

  if (!clientName?.trim()) return NextResponse.json({ error: "clientName is required" }, { status: 400 });

  const octokit = new Octokit({ auth: session.accessToken });

  const forkName = clientName.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") + "-marketing-os";

  // Get the authenticated user's login so we can build the correct repo URL.
  // createUsingTemplate doesn't return owner.login reliably in all Octokit versions.
  const { data: viewer } = await octokit.users.getAuthenticated();

  try {
    const { data: repo } = await octokit.repos.createUsingTemplate({
      template_owner: TEMPLATE_OWNER,
      template_repo: TEMPLATE_REPO,
      name: forkName,
      include_all_branches: false,
      private: false,
    });

    const githubRepo = repo.full_name ?? `${viewer.login}/${forkName}`;
    const repoOwner = githubRepo.split("/")[0];
    const repoName = githubRepo.split("/")[1];

    const client = await getOrCreateClientRecord(clientName.trim(), githubRepo);

    const jar = await cookies();
    jar.set(CLIENT_COOKIE, buildClientCookie(client), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    // Write customized CLAUDE.md — non-blocking. GitHub template repos may take
    // a few seconds to fully initialize, so we attempt this after record creation
    // but do not fail the request if it errors.
    try {
      // GitHub template creation is async; the repo files may not be ready
      // immediately. We make one attempt — if it fails the user can re-trigger
      // from the Core Editor later.
      await writeCustomizedClaudeMd(
        octokit,
        repoOwner,
        repoName,
        clientName.trim(),
        websiteUrl,
        description,
        category
      );
    } catch (claudeErr: unknown) {
      const errMsg = claudeErr instanceof Error ? claudeErr.message : String(claudeErr);
      console.error(`[fork/route] CLAUDE.md write failed for ${githubRepo} — ${errMsg}. Continuing.`);
    }

    return NextResponse.json({ client, githubRepo, forkUrl: repo.html_url }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create workspace repo";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
