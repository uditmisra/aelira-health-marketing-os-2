import { auth } from "@/lib/auth";
import { setIntegrationToken, deleteIntegrationToken } from "@/lib/integration-kv";
import type { IntegrationId } from "@/lib/integration-kv";
import { NextRequest, NextResponse } from "next/server";

const VALID_IDS: IntegrationId[] = ["hubspot", "linkedin", "gemini"];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, token } = await req.json();

  if (!VALID_IDS.includes(id) || typeof token !== "string" || !token.trim()) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await setIntegrationToken(session.user.email, id, token.trim());
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!VALID_IDS.includes(id)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await deleteIntegrationToken(session.user.email, id);
  return NextResponse.json({ ok: true });
}
