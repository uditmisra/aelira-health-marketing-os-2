import { auth } from "@/lib/auth";
import { getFile } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path");

  if (!path || !path.startsWith("core/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const content = await getFile(path);
  return NextResponse.json({ content });
}
