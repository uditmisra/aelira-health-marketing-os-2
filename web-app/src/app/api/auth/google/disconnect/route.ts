import { auth } from "@/lib/auth";
import { deleteGoogleTokens } from "@/lib/google-kv";
import { redirect } from "next/navigation";

export async function POST() {
  const session = await auth();
  if (!session?.user?.email) {
    return redirect("/login");
  }

  await deleteGoogleTokens(session.user.email);
  return redirect("/settings?google=disconnected");
}
