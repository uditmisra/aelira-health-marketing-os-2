/**
 * Supabase client — server-side only (service role key).
 * Do NOT import this in client components.
 *
 * Requires env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — check Vercel env vars"
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
