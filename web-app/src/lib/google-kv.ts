/**
 * Google OAuth token storage via Supabase.
 * Tokens are keyed by the user's email address from their GitHub session.
 *
 * Requires env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Table: google_tokens
 *   user_email  text PRIMARY KEY
 *   tokens      jsonb NOT NULL
 *   updated_at  timestamptz DEFAULT now()
 */

import { supabase } from "./supabase";

export interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
  email?: string; // the Google account email
}

export async function storeGoogleTokens(
  userEmail: string,
  tokens: GoogleTokens
): Promise<void> {
  const { error } = await supabase
    .from("google_tokens")
    .upsert({ user_email: userEmail, tokens, updated_at: new Date().toISOString() });
  if (error) throw new Error(`storeGoogleTokens: ${error.message}`);
}

export async function getGoogleTokens(
  userEmail: string
): Promise<GoogleTokens | null> {
  const { data, error } = await supabase
    .from("google_tokens")
    .select("tokens")
    .eq("user_email", userEmail)
    .single();
  if (error?.code === "PGRST116") return null; // no rows
  if (error) throw new Error(`getGoogleTokens: ${error.message}`);
  return (data?.tokens as GoogleTokens) ?? null;
}

export async function deleteGoogleTokens(userEmail: string): Promise<void> {
  const { error } = await supabase
    .from("google_tokens")
    .delete()
    .eq("user_email", userEmail);
  if (error) throw new Error(`deleteGoogleTokens: ${error.message}`);
}

export async function getValidAccessToken(
  userEmail: string
): Promise<string | null> {
  const tokens = await getGoogleTokens(userEmail);
  if (!tokens) return null;

  // If token expires in more than 5 minutes, use it as-is
  if (tokens.expiry_date > Date.now() + 5 * 60 * 1000) {
    return tokens.access_token;
  }

  // Refresh
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    // Token may have been revoked — clean up
    await deleteGoogleTokens(userEmail);
    return null;
  }

  const data = await res.json();
  const updated: GoogleTokens = {
    ...tokens,
    access_token: data.access_token,
    expiry_date: Date.now() + data.expires_in * 1000,
  };
  await storeGoogleTokens(userEmail, updated);
  return updated.access_token;
}
