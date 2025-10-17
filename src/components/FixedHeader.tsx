"use client";

import { useState, useRef, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { LoginModal } from "./auth/LoginModal";
import { ThemeToggle } from "./ThemeToggle";

export function FixedHeader() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { authenticated, user, logout } = usePrivy();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 dark:border-white/[0.08] shadow-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Brand */}
              <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                <img 
                  src="/gradditlogo.png" 
                  alt="Graddit Logo" 
                  className="h-8 w-auto object-contain"
                />
              </a>

              {/* Right side - Actions */}
              <div className="flex items-center gap-3">
                {authenticated && user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user.email?.address?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <svg 
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-72 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-xl shadow-2xl p-4">
                          <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Signed in as</div>
                          <div className="text-sm font-medium text-white mb-3 break-all">
                            {user.email?.address}
                          </div>
                          
                          <div className="space-y-2">
                            <a
                              href="/admin"
                              className="block w-full px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all text-sm font-medium border border-blue-500/20 text-center"
                            >
                              Admin Panel
                            </a>
                            <button
                              onClick={() => {
                                logout();
                                setIsDropdownOpen(false);
                              }}
                              className="w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all text-sm font-medium border border-red-500/20"
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                  >
                    Login / Sign Up
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                )}

                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
