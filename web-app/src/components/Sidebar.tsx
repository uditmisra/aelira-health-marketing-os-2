"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  LayoutGrid,
  GitBranch,
  History,
  FileEdit,
  LineChart,
  Settings,
  Search,
  Upload,
  Archive,
  Shield,
  ChevronDown,
  Plus,
} from "lucide-react";

interface ClientRecord {
  id: string;
  name: string;
  github_repo: string;
  created_at: string;
}

interface Props {
  clients: ClientRecord[];
  activeClientId: string | null;
}

const nav = [
  { label: "Dashboard",     href: "/dashboard",   icon: LayoutGrid },
  { label: "Workflows",     href: "/workflows",   icon: GitBranch  },
  { label: "Run History",   href: "/runs",        icon: History    },
  { label: "Competitive",   href: "/competitive", icon: Shield     },
  { label: "Core Editor",   href: "/core",        icon: FileEdit   },
  { label: "KPI Dashboard", href: "/kpis",        icon: LineChart  },
  { label: "Assets",        href: "/assets",      icon: Archive    },
  { label: "Data Input",    href: "/data",        icon: Upload     },
  { label: "Settings",      href: "/settings",    icon: Settings   },
];

function ClientSwitcher({ clients, activeClientId }: { clients: ClientRecord[]; activeClientId: string | null }) {
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState<string | null>(null);
  const router = useRouter();

  const active = clients.find((c) => c.id === activeClientId);
  const label = active?.name ?? (clients.length > 0 ? clients[0].name : "Default workspace");

  async function activate(clientId: string) {
    setSwitching(clientId);
    setOpen(false);
    try {
      await fetch(`/api/clients/${clientId}/activate`, { method: "PUT" });
      router.refresh();
    } finally {
      setSwitching(null);
    }
  }

  // If no clients in DB, show a simple label using env var fallback
  if (clients.length === 0) {
    return (
      <div className="px-3 mb-3">
        <Link
          href="/onboard"
          className="flex items-center justify-between w-full px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="text-xs text-gray-400 truncate">Default workspace</span>
          <Plus size={12} className="text-gray-500 flex-shrink-0" />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-3 mb-3 relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="text-xs text-white font-medium truncate">{label}</span>
        <ChevronDown size={12} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-3 right-3 top-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => activate(c.id)}
              disabled={switching === c.id}
              className={`w-full text-left px-3 py-2.5 text-xs transition-colors flex items-center justify-between gap-2 hover:bg-white/10 ${
                c.id === activeClientId ? "text-white font-medium" : "text-gray-300"
              }`}
            >
              <span className="truncate">{c.name}</span>
              {c.id === activeClientId && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              )}
              {switching === c.id && (
                <span className="text-gray-500 flex-shrink-0">…</span>
              )}
            </button>
          ))}
          <div className="border-t border-white/10">
            <Link
              href="/onboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Plus size={11} />
              Add client
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ clients, activeClientId }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <aside className="w-52 shrink-0 bg-[#111111] flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 flex items-center gap-2.5">
        <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0">
          <LayoutGrid size={14} className="text-[#111111]" />
        </div>
        <span className="font-semibold text-sm text-white tracking-tight">Marketing OS</span>
      </div>

      {/* Client switcher */}
      <ClientSwitcher clients={clients} activeClientId={activeClientId} />

      {/* Search */}
      <div className="px-3 mb-3">
        <div className="flex items-center gap-2 bg-white/10 rounded-md px-3 py-1.5">
          <Search size={13} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
          />
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 flex-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-2">Overview</p>
        <nav className="space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={15} strokeWidth={active ? 2 : 1.7} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User */}
      <div className="px-3 py-3 border-t border-white/10">
        <Link href="/api/auth/signout" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
            {user?.image ? (
              <img src={user.image} alt={initials} className="w-7 h-7 rounded-full" />
            ) : (
              <span className="text-xs font-medium text-white">{initials}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.name ?? "User"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email ?? ""}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
