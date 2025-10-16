import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 mt-12 border-t border-border dark:border-white/10 pb-24 sm:pb-6">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-muted-foreground">
        <a
          href="https://github.com/dhruvpyramid/gradditxyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Open GitHub repository"
        >
          <Github size={18} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
        <span className="text-gray-600 dark:text-gray-400">
          © 2025 Graddit. Student-driven college rankings.
        </span>
      </div>
    </footer>
  );
}
