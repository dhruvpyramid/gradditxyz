export function CollegeHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto relative">
      <div className="absolute inset-x-0 top-6 -bottom-6 bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent dark:from-pink-500/[0.07] dark:via-purple-500/[0.03] dark:to-transparent blur-2xl -z-10 rounded-[100%]" />
      <div className="relative">
        <h2 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-[1.15] relative inline-block">
          {/* Animated gradient background */}
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 via-indigo-500 to-pink-500 dark:from-pink-400 dark:via-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]" />
          
          {/* Glowing effect */}
          <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400 opacity-50 animate-pulse" />
          
          {/* Main text */}
          <span className="relative bg-gradient-to-r from-pink-500 via-purple-500 via-indigo-500 to-pink-500 dark:from-pink-400 dark:via-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
            College Rankings
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
          Vote for colleges using your{" "}
          <span className="text-gray-900 dark:text-white font-medium">
            .edu.in email
          </span>{" "}
          and help create fair, student-driven rankings across India
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
    </div>
  );
}
