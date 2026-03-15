import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RootPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-tight">Marketing OS</span>
        </div>
        <Link
          href="/login"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Sign in →
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-20 pb-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          Built for B2B SaaS marketing teams
        </div>

        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
          A marketing system that gets<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            sharper every week
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Marketing OS runs your growth and product marketing workflows end-to-end —
          producing final, branded outputs, not drafts. Every run feeds a shared
          intelligence layer that makes the next run better.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="bg-white text-black rounded-lg px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Get started
          </Link>
          <a
            href="https://github.com/uditmisra/work-os"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </section>

      {/* Value props */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              ),
              accent: "text-indigo-400",
              title: "Final outputs, not drafts",
              body: "HTML email ready to send. Google Sheet ready for Figma. Battlecard in a Google Doc shared with sales. Every workflow produces something usable immediately.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              ),
              accent: "text-emerald-400",
              title: "Live data, no copy-paste",
              body: "Pulls from HubSpot, Google Ads, LinkedIn, and Meta directly. Performance reviews start with real numbers. No CSV exports, no manual data entry.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              ),
              accent: "text-amber-400",
              title: "Compounds over time",
              body: "Every run logs what worked. Ad hypotheses are confirmed or refuted by performance data. After 90 days, your agents are measurably shaped by what converts for your ICP.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/[0.03] border border-white/8 rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
            >
              <div className={`${card.accent} mb-4`}>{card.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow grid */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-2">10 production workflows</h2>
          <p className="text-sm text-gray-500">From ad copy to launches to competitive intelligence — every output goes to the right tool.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Ad Copy Generation",        deliver: "Google Sheets → Figma",       system: "Growth" },
            { name: "Weekly Performance Review",  deliver: "Google Doc + Slack",          system: "Growth" },
            { name: "Email Sequence Build",       deliver: "HubSpot draft sequence",      system: "Growth" },
            { name: "Creative Intelligence Sprint", deliver: "Google Doc",               system: "Growth" },
            { name: "New Competitor Battlecard",  deliver: "Google Doc",                  system: "PMM" },
            { name: "New Positioning Sprint",     deliver: "Google Doc",                  system: "PMM" },
            { name: "Weekly Competitive Pulse",   deliver: "Google Doc + Slack",          system: "PMM" },
            { name: "L2 Launch Playbook",         deliver: "Google Doc",                  system: "PMM" },
            { name: "Quarterly Win/Loss Review",  deliver: "Google Doc",                  system: "PMM" },
            { name: "Weekly System Review",       deliver: "GitHub (internal)",           system: "Intelligence" },
          ].map((wf) => (
            <div
              key={wf.name}
              className="flex items-center justify-between bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                  wf.system === "Growth"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : wf.system === "PMM"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-gray-500/10 text-gray-400"
                }`}>
                  {wf.system}
                </span>
                <span className="text-sm text-white truncate">{wf.name}</span>
              </div>
              <span className="text-xs text-gray-600 flex-shrink-0 ml-4">{wf.deliver}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-2">How it works</h2>
          <p className="text-sm text-gray-500">No API key management. No AI infrastructure. Runs on Claude Max.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Connect your repo",
              body: "Fork this repo. Connect it to a Claude Project via GitHub MCP. Your brand, ICP, and competitive intelligence live in core/ — agents read from it on every run.",
            },
            {
              step: "02",
              title: "Run workflows",
              body: "Open the web app, pick a workflow, fill in any inputs, and click Run. It opens Claude with a pre-formatted prompt. Claude executes the full workflow and writes outputs back to GitHub.",
            },
            {
              step: "03",
              title: "System gets sharper",
              body: "Every run archives to GitHub. The system intelligence layer reads performance data, identifies patterns, and proposes updates to agent files. You approve. Outputs improve.",
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-4xl font-bold text-white/5 mb-4 font-mono">{item.step}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-8 pb-24 max-w-3xl mx-auto text-center">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-12">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to set up your system?</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-lg mx-auto">
            Sign in with GitHub to access the web app. You'll need a GitHub repo with this system
            and a Claude Max subscription to run workflows.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-black rounded-lg px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Sign in with GitHub
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 pb-8 max-w-6xl mx-auto flex items-center justify-between border-t border-white/5 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="text-xs text-gray-600">Marketing OS</span>
        </div>
        <p className="text-xs text-gray-700">Powered by Claude Max · No API billing</p>
      </footer>
    </div>
  );
}
