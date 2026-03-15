# Supabase Setup

Marketing OS uses Supabase (free tier) to store OAuth tokens and integration API keys. This is the only backend storage outside GitHub.

---

## Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Choose any region close to your users
3. Set a database password (save it — you won't need it again but keep it safe)
4. Wait ~2 minutes for the project to provision

---

## Step 2 — Create the tables

In your Supabase project: **SQL Editor** → paste and run:

```sql
-- Google OAuth tokens (one row per user — keyed by GitHub login email)
create table if not exists google_tokens (
  user_email   text primary key,
  tokens       jsonb not null,
  updated_at   timestamptz default now()
);

-- Integration tokens: HubSpot, LinkedIn Ads, etc.
create table if not exists integration_tokens (
  user_email      text not null,
  integration_id  text not null,  -- "hubspot" | "linkedin"
  token           text not null,
  updated_at      timestamptz default now(),
  primary key (user_email, integration_id)
);
```

---

## Step 3 — Get your credentials

In your Supabase project: **Settings → API**

You need two values:
- **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
- **service_role key** (under "Project API keys" — use the `service_role` key, not `anon`)

---

## Step 4 — Set Vercel env vars

**Always use `printf`, never `echo` — trailing newlines corrupt the values.**

```bash
printf "https://xxxxxxxxxxxx.supabase.co" | vercel env add SUPABASE_URL production
printf "eyJ..." | vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

Then pull to verify:

```bash
vercel env pull .env.local
grep SUPABASE .env.local
```

Both values should appear without a trailing `\n`.

---

## What's stored

| Table | Key | Value |
|---|---|---|
| `google_tokens` | `user_email` (GitHub login email) | `tokens` JSONB: `access_token`, `refresh_token`, `expiry_date`, `email` |
| `integration_tokens` | `(user_email, integration_id)` | `token` text — API key or access token |

---

## Notes

- The `service_role` key bypasses Row Level Security. It stays server-side only — never exposed to the browser.
- Free tier is 500MB — more than enough for any number of clients.
- No RLS rules are needed because access is always via the server-side service role client.
