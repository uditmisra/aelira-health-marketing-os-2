import { storeGoogleTokens } from "@/lib/google-kv";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error || !code || !state) {
    return redirect("/settings?google=error");
  }

  // Decode the user email we stashed in state
  let userEmail: string;
  try {
    userEmail = Buffer.from(state, "base64").toString("utf-8");
  } catch {
    return redirect("/settings?google=error");
  }

  const appUrl = process.env.NEXTAUTH_URL ?? `https://${req.headers.get("host")}`;
  const callbackUrl = `${appUrl}/api/auth/google/callback`;

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: callbackUrl,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return redirect("/settings?google=error");
  }

  const tokenData = await tokenRes.json();

  // Get the Google account email
  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userInfo = userInfoRes.ok ? await userInfoRes.json() : {};

  await storeGoogleTokens(userEmail, {
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: Date.now() + tokenData.expires_in * 1000,
    email: userInfo.email,
  });

  return redirect("/settings?google=connected");
}
