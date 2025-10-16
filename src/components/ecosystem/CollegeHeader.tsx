export function CollegeHeader() {
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
              0
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Votes
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 dark:from-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
              0
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Colleges Listed
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 justify-center">
        <button className="flex flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-white/[0.04] transition-all duration-200 shadow-sm">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            How It Works
          </span>
        </button>
      </div>
      {/* Scoped highlight styles */}
      <style jsx>{`
        .hero-title {
          line-height: 1.1;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans,
            "Apple Color Emoji", "Segoe UI Emoji";
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
        }
      `}</style>
    </div>
  );
}
