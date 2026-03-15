"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ForkStatusBanner({ forkUrl }: { forkUrl: string }) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  function dismiss() {
    router.replace("/dashboard");
  }

  if (done) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-5 py-3.5 mb-5">
        <div className="flex items-center gap-2.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span className="text-sm font-medium text-green-800">Fork is ready</span>
          <a
            href={forkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-700 hover:underline"
          >
            View on GitHub ↗
          </a>
        </div>
        <button onClick={dismiss} className="text-xs text-green-600 hover:text-green-800 ml-4">Dismiss</button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5 mb-5">
      <div className="flex items-center gap-2.5">
        <div className="w-3.5 h-3.5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin flex-shrink-0" />
        <span className="text-sm font-medium text-blue-800">GitHub is creating your fork</span>
        <span className="text-xs text-blue-500 hidden sm:inline">— ready in ~{secondsLeft}s</span>
        <a
          href={forkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-700 hover:underline"
        >
          Check status on GitHub ↗
        </a>
      </div>
      <button onClick={dismiss} className="text-xs text-blue-500 hover:text-blue-700 ml-4">Dismiss</button>
    </div>
  );
}
