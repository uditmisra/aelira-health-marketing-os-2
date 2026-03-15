-- ============================================================
-- Phase 12: Multi-Tenant Schema Migration
-- Run in Supabase SQL Editor when onboarding client #2.
-- Safe to create tables now (zero risk to existing data).
-- ============================================================

-- ── Step 1: Create clients table ─────────────────────────────
-- One row per GitHub repo / client workspace.

create table if not exists clients (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  github_repo  text not null unique,  -- e.g. "org/marketing-os-fork"
  created_at   timestamptz default now()
);

-- ── Step 2: Create client_members table ──────────────────────
-- Maps GitHub OAuth users (by email) to client workspaces.
-- role: 'admin' | 'member'

create table if not exists client_members (
  client_id   uuid references clients on delete cascade,
  user_email  text not null,
  role        text not null default 'member',
  primary key (client_id, user_email)
);

-- ── Step 3: Create github_installations table ─────────────────
-- Stores GitHub App installation IDs (one per client).
-- Populated when the client installs the GitHub App during onboarding.
-- personal_access_token is the PAT bridge (used until GitHub App is ready).

create table if not exists github_installations (
  client_id              uuid references clients on delete cascade primary key,
  installation_id        bigint unique,              -- GitHub App installation ID
  personal_access_token  text,                       -- PAT bridge (nullable)
  created_at             timestamptz default now()
);

-- ── Step 4: Backfill existing client (SpotDraft) ─────────────
-- Insert the first client row for SpotDraft using the existing env vars.
-- Update github_repo to match your actual GITHUB_REPO_OWNER/GITHUB_REPO_NAME.

insert into clients (name, github_repo)
values ('SpotDraft', 'uditmisra/work-os')  -- update if repo name differs
on conflict (github_repo) do nothing;

-- Backfill the SpotDraft admin — update to your actual login email.
insert into client_members (client_id, user_email, role)
select id, 'your-email@example.com', 'admin'  -- update to your GitHub email
from clients
where github_repo = 'uditmisra/work-os'
on conflict do nothing;

-- Backfill PAT for SpotDraft (the existing GITHUB_TOKEN env var value).
-- Only run this if you want PAT stored in DB (not required for single-tenant).
-- insert into github_installations (client_id, personal_access_token)
-- select id, '[YOUR_GITHUB_PAT]'
-- from clients where github_repo = 'uditmisra/work-os';

-- ── Step 5: Add client_id FK to existing token tables ─────────
-- Non-breaking: nullable first. Backfill, then make required.
-- Only run steps 5-7 when ready to do the full github.ts refactor.

-- alter table google_tokens
--   add column if not exists client_id uuid references clients;

-- alter table integration_tokens
--   add column if not exists client_id uuid references clients;

-- ── Step 6: Backfill client_id on existing token rows ─────────
-- update google_tokens
-- set client_id = (select id from clients where github_repo = 'uditmisra/work-os')
-- where client_id is null;

-- update integration_tokens
-- set client_id = (select id from clients where github_repo = 'uditmisra/work-os')
-- where client_id is null;

-- ── Step 7: Make client_id required (run after backfill) ───────
-- alter table google_tokens
--   alter column client_id set not null;

-- alter table integration_tokens
--   alter column client_id set not null;

-- ============================================================
-- NOTES
-- ─────
-- Steps 1-4: Run now. Zero risk. Existing code is unaffected.
-- Steps 5-7: Run when beginning the github.ts refactor (Phase 12 build).
--
-- After running steps 1-4, update the backfill values:
--   - 'uditmisra/work-os' → your actual GitHub repo path
--   - 'your-email@example.com' → your GitHub OAuth login email
--
-- Trigger for Phase 12 full build: onboarding client #2.
-- ============================================================
