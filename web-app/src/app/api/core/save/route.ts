import { auth } from "@/lib/auth";
import { writeFile } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";

function isAllowed(path: string): boolean {
  return (
    typeof path === "string" &&
    path.startsWith("core/") &&
    path.endsWith(".md") &&
    !path.includes("..") &&
    !path.includes("//")
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path, content } = await req.json();

  if (typeof path !== "string" || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isAllowed(path)) {
    return NextResponse.json({ error: "Path not allowed" }, { status: 403 });
  }

  try {
    await writeFile(
      path,
      content,
      `[core] update ${path.split("/").pop()} via web app`
    );
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
