import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { getClients, getActiveClientFromCookie } from "@/lib/clients";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [clients, activeClient] = await Promise.all([
    getClients(),
    getActiveClientFromCookie(),
  ]);

  const activeClientId = activeClient?.id ?? null;

  return (
    <div className="flex h-full">
      <Sidebar clients={clients} activeClientId={activeClientId} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
