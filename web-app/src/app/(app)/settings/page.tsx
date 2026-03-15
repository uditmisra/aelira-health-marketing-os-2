import { auth } from "@/lib/auth";
import { getGoogleTokens } from "@/lib/google-kv";
import { getIntegrationToken } from "@/lib/integration-kv";
import { SettingsContent } from "./SettingsContent";
import type { NextSearchParams } from "@/lib/types";

export const revalidate = 0;

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) {
  const { google: googleStatus } = await searchParams;
  const session = await auth();
  const userEmail = session?.user?.email ?? "";
  const userName = session?.user?.name ?? "";
  const userImage = session?.user?.image ?? null;

  let googleConnectedAs: string | null = null;
  let hubspotConnected = false;
  let linkedinConnected = false;
  let geminiConnected = false;
  let kvConfigured = true;

  try {
    const [googleTokens, hubspotToken, linkedinToken, geminiToken] = await Promise.all([
      userEmail ? getGoogleTokens(userEmail) : null,
      userEmail ? getIntegrationToken(userEmail, "hubspot") : null,
      userEmail ? getIntegrationToken(userEmail, "linkedin") : null,
      userEmail ? getIntegrationToken(userEmail, "gemini") : null,
    ]);
    googleConnectedAs = googleTokens?.email ?? null;
    hubspotConnected = !!hubspotToken;
    linkedinConnected = !!linkedinToken;
    geminiConnected = !!geminiToken;
  } catch {
    kvConfigured = false;
  }

  const repo = `${process.env.GITHUB_REPO_OWNER ?? "—"}/${process.env.GITHUB_REPO_NAME ?? "—"}`;
  const branch = process.env.GITHUB_REPO_BRANCH ?? "main";
  const pluginApiKey = process.env.PLUGIN_API_KEY ?? null;

  return (
    <SettingsContent
      googleStatus={googleStatus as string | undefined}
      googleConnectedAs={googleConnectedAs}
      hubspotConnected={hubspotConnected}
      linkedinConnected={linkedinConnected}
      falConnected={geminiConnected}
      kvConfigured={kvConfigured}
      userEmail={userEmail}
      userName={userName}
      userImage={userImage}
      repo={repo}
      branch={branch}
      pluginApiKey={pluginApiKey}
    />
  );
}
