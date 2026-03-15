import { auth } from "@/lib/auth";
import { getClients, buildClientCookie, CLIENT_COOKIE } from "@/lib/clients";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const clients = await getClients();
  const client = clients.find((c) => c.id === id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const jar = await cookies();
  jar.set(CLIENT_COOKIE, buildClientCookie(client), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ ok: true, client });
}
