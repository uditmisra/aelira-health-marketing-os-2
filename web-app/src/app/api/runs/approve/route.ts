import { auth } from "@/lib/auth";
import { writeFile, getFile } from "@/lib/github";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { runPath, decision, note } = body as {
    runPath: string;
    decision: "approved" | "rejected" | "changes_requested";
    note?: string;
  };

  if (!runPath || !decision) {
    return NextResponse.json({ error: "runPath and decision are required" }, { status: 400 });
  }

  // Validate runPath — must look like runs/<workflow>/<run-id>
  if (!runPath.startsWith("runs/") || runPath.includes("..") || runPath.includes("//")) {
    return NextResponse.json({ error: "Invalid run path" }, { status: 400 });
  }

  const approvalPath = `${runPath}/approval.md`;

  // Check if already decided — prevent overwriting an existing approval
  const existing = await getFile(approvalPath);
  if (existing && existing.includes("Status: approved")) {
    return NextResponse.json(
      { error: "This run has already been approved. Approvals cannot be changed." },
      { status: 409 }
    );
  }

  const content = [
    `# Approval Decision`,
    ``,
    `Status: ${decision}`,
    `Decision by: ${session.user.email}`,
    `Date: ${new Date().toISOString()}`,
    note ? `Note: ${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await writeFile(
    approvalPath,
    content,
    `[web-app] ${decision} run output — ${runPath.split("/").pop()}`
  );

  return NextResponse.json({ success: true, decision });
}
