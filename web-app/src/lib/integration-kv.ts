/**
 * Storage for third-party integration tokens (HubSpot, LinkedIn Ads, etc.)
 * Keyed by user email + integration ID in Supabase.
 *
 * Requires env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Table: integration_tokens
 *   user_email      text NOT NULL
 *   integration_id  text NOT NULL
 *   token           text NOT NULL
 *   updated_at      timestamptz DEFAULT now()
 *   PRIMARY KEY (user_email, integration_id)
 */

import { supabase } from "./supabase";

export type IntegrationId = "hubspot" | "linkedin" | "fal" | "gemini";

export async function getIntegrationToken(
  userEmail: string,
  id: IntegrationId
): Promise<string | null> {
  const { data, error } = await supabase
    .from("integration_tokens")
    .select("token")
    .eq("user_email", userEmail)
    .eq("integration_id", id)
    .single();
  if (error?.code === "PGRST116") return null; // no rows
  if (error) throw new Error(`getIntegrationToken: ${error.message}`);
  return data?.token ?? null;
}

export async function setIntegrationToken(
  userEmail: string,
  id: IntegrationId,
  token: string
): Promise<void> {
  const { error } = await supabase.from("integration_tokens").upsert({
    user_email: userEmail,
    integration_id: id,
    token,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(`setIntegrationToken: ${error.message}`);
}

export async function deleteIntegrationToken(
  userEmail: string,
  id: IntegrationId
): Promise<void> {
  const { error } = await supabase
    .from("integration_tokens")
    .delete()
    .eq("user_email", userEmail)
    .eq("integration_id", id);
  if (error) throw new Error(`deleteIntegrationToken: ${error.message}`);
}
