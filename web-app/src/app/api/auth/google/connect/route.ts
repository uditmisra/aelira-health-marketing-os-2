import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

const SCOPES = [
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return redirect("/login");
  }

  const appUrl = process.env.NEXTAUTH_URL ?? `https://${req.headers.get("host")}`;
  const callbackUrl = `${appUrl}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: callbackUrl,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent", // always request refresh token
    state: Buffer.from(session.user.email).toString("base64"),
  });

  return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
