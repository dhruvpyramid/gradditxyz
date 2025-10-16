"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export function CollegeHeader() {
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [totalColleges, setTotalColleges] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    const loadCounts = async () => {
      try {
        const res = await fetch("/api/colleges", { cache: "no-store" });
        const data = await res.json();
        if (!mounted || !res.ok || !Array.isArray(data.colleges)) return;
        const colleges = data.colleges as Array<{ voteCount?: number }>; 
        const votes = colleges.reduce((sum, c) => sum + (c.voteCount || 0), 0);
        setTotalColleges(colleges.length);
        setTotalVotes(votes);
      } catch (e) {
        // silent fail
      }
    };

    loadCounts();
    const id = setInterval(loadCounts, 15000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <div className="text-center max-w-3xl mx-auto relative">
      <div className="absolute inset-x-0 top-6 -bottom-6 bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent dark:from-pink-500/[0.07] dark:via-purple-500/[0.03] dark:to-transparent blur-2xl -z-10 rounded-[100%]" />
      <div className="relative">
        <h2
          className="hero-title text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-[1.15]"
          style={{ ['--hl-bg' as any]: '#FCC75B' }}
        >
          Welcome to Reddit, but <mark className="hl">for Colleges</mark>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
          Help others find their dream college through credibility judged by you — the student community.
        </p>

        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 dark:from-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {totalVotes}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Votes
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 dark:from-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {totalColleges}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Colleges Listed
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 justify-center">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-white/[0.04] transition-all duration-200 shadow-sm">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">How It Works</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-2xl">
              <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-2">How Graddit Works</Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A quick overview of the flow and the purpose.
              </Dialog.Description>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div>• Login with your <span className="font-medium">.edu.in</span> email (or owner access).</div>
                <div>• Pick a college and cast an <span className="font-medium">upvote</span> or <span className="font-medium">downvote</span>.</div>
                <div>• Votes are <span className="font-medium">weighted</span>: same college (1.5x), same state (1.2x), others (1.0x).</div>
                <div>• <span className="font-medium">Anti‑spam</span> checks and limits ensure credibility.</div>
                <div>• Rankings update in near real-time based on community input.</div>
              </div>
              <div className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 text-xs text-gray-700 dark:text-gray-300">
{`Student → Login → Choose College → Vote (+1/−1)
             ↳ Weight applied (1.5× / 1.2× / 1.0×)
             ↳ Score updates → Rankings refresh`}
              </div>
              <div className="mt-6 flex justify-end">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm">Got it</button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      {/* Scoped highlight styles */}
      <style jsx>{`
        .hero-title {
          line-height: 1.1;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans,
            "Apple Color Emoji", "Segoe UI Emoji";
        }
        .hero-title, .hero-title .hl {
          color: #0f172a; /* slate-900 */
        }
        .hero-title .hl {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          background: none;
        }
        .hero-title .hl::before {
          content: "";
          position: absolute;
          z-index: -1;
          left: -0.15em;
          right: -0.1em;
          bottom: -0.05em; /* sit slightly below baseline */
          height: 0.35em;  /* slimmer underline-style highlight */
          background: var(--hl-bg, #FCC75B);
          border-radius: 2px;
          transform: skewX(-14deg);
          transform-origin: left bottom;
          box-shadow: 0 0 0.5em rgba(0,0,0,0.05);
        }
        :global(.dark) .hero-title {
          --hl-bg: rgba(255,255,255,0.35);
          color: #ffffff;
        }
        :global(.dark) .hero-title .hl {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
