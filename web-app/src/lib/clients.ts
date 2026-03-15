/**
 * Client workspace management.
 *
 * A "client" is a Marketing OS workspace — one GitHub repo per client.
 * The active client is stored in a cookie so all server-side GitHub calls
 * route to the right repo without a Supabase lookup in the hot path.
 *
 * Cookie format: base64url-encoded JSON { id, name, owner, repo, createdAt }
 *
 * Requires: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (for client list management)
 *           Falls back to env vars if the clients table doesn't exist yet.
 */

import { cookies } from "next/headers";
import { supabase } from "./supabase";

export const CLIENT_COOKIE = "mkt_os_active_client";
const DEFAULT_BRANCH = process.env.GITHUB_REPO_BRANCH ?? "main";

export interface ClientRecord {
  id: string;
  name: string;
  github_repo: string; // "owner/repo"
  created_at: string;
}

interface CookiePayload {
  id: string;
  name: string;
  owner: string;
  repo: string;
  createdAt?: string; // ISO — used to filter out template runs inherited at workspace creation
}

function encode(p: CookiePayload): string {
  return Buffer.from(JSON.stringify(p)).toString("base64url");
}

function decode(val: string): CookiePayload | null {
  try {
    return JSON.parse(Buffer.from(val, "base64url").toString("utf-8")) as CookiePayload;
  } catch {
    return null;
  }
}

export async function getActiveClientFromCookie(): Promise<CookiePayload | null> {
  try {
    const jar = await cookies();
    const val = jar.get(CLIENT_COOKIE)?.value;
    if (!val) return null;
    return decode(val);
  } catch {
    return null;
  }
}

export async function getActiveRepoConfig(): Promise<{
  owner: string;
  repo: string;
  branch: string;
  clientName: string;
  workspaceCreatedAt?: string;
}> {
  const fallback = {
    owner: process.env.GITHUB_REPO_OWNER!,
    repo: process.env.GITHUB_REPO_NAME!,
    branch: DEFAULT_BRANCH,
    clientName: process.env.GITHUB_REPO_NAME ?? "workspace",
  };
  const client = await getActiveClientFromCookie();
  if (!client) return fallback;
  return {
    owner: client.owner,
    repo: client.repo,
    branch: DEFAULT_BRANCH,
    clientName: client.name,
    workspaceCreatedAt: client.createdAt,
  };
}

export async function getClients(): Promise<ClientRecord[]> {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("id, name, github_repo, created_at")
      .order("created_at", { ascending: true });
    if (error?.code === "42P01") return []; // table doesn't exist yet — not an error
    if (error) throw error;
    return (data as ClientRecord[]) ?? [];
  } catch {
    return [];
  }
}

export async function createClientRecord(
  name: string,
  githubRepo: string
): Promise<ClientRecord> {
  const { data, error } = await supabase
    .from("clients")
    .insert({ name, github_repo: githubRepo })
    .select("id, name, github_repo, created_at")
    .single();
  if (error) throw new Error(error.message);
  return data as ClientRecord;
}

export async function getOrCreateClientRecord(
  name: string,
  githubRepo: string
): Promise<ClientRecord> {
  // If the fork already exists in our DB (e.g. retry after partial failure), return it.
  const { data: existing } = await supabase
    .from("clients")
    .select("id, name, github_repo, created_at")
    .eq("github_repo", githubRepo)
    .single();
  if (existing) return existing as ClientRecord;
  return createClientRecord(name, githubRepo);
}

export function buildClientCookie(client: ClientRecord): string {
  const [owner, repo] = client.github_repo.split("/");
  return encode({ id: client.id, name: client.name, owner, repo, createdAt: client.created_at });
}
