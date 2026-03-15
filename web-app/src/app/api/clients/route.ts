import { auth } from "@/lib/auth";
import { getClients, createClientRecord, buildClientCookie, CLIENT_COOKIE } from "@/lib/clients";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const clients = await getClients();
  return NextResponse.json({ clients });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, githubRepo } = await req.json() as { name: string; githubRepo: string };
  if (!name?.trim() || !githubRepo?.trim()) {
    return NextResponse.json({ error: "name and githubRepo are required" }, { status: 400 });
  }
  if (!githubRepo.includes("/")) {
    return NextResponse.json({ error: "githubRepo must be in owner/repo format" }, { status: 400 });
  }

  try {
    const client = await createClientRecord(name.trim(), githubRepo.trim());

    const jar = await cookies();
    jar.set(CLIENT_COOKIE, buildClientCookie(client), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return NextResponse.json({ client }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create client";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
