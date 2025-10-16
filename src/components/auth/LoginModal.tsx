"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { INDIAN_STATES, COLLEGE_CATEGORIES } from "@/data/indian-states";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, authenticated, user } = usePrivy();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please try again.");
    }
  };

  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const email = user?.email?.address;
      if (!email || !email.endsWith(".edu.in")) {
        setError("Please use a valid .edu.in email address");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          collegeName,
          city,
          state,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to register");
        setIsSubmitting(false);
        return;
      }

      // Success - close modal and refresh
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to complete registration. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Check if user is authenticated and needs profile setup
  useEffect(() => {
    if (authenticated && user?.email?.address) {
      // Check if user exists in database
      fetch("/api/auth/user", {
        headers: { "x-user-email": user.email.address },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.user) {
            // User not in database, show profile setup
            setShowProfileSetup(true);
          } else {
            // User exists, close modal
            onClose();
          }
        })
        .catch((err) => {
          console.error("Error checking user:", err);
          setShowProfileSetup(true);
        });
    }
  }, [authenticated, user?.email?.address]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[85vh] overflow-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl z-50 p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {showProfileSetup ? "Complete Your Profile" : "Welcome to Graddit"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {showProfileSetup
                  ? "Tell us about your college"
                  : "Sign in with your .edu.in email"}
              </p>
            </div>
            <Dialog.Close asChild>
              <button className="p-1 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {!showProfileSetup ? (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <strong>Note:</strong> You must use a valid <strong>.edu.in</strong> email
                  address to sign up and vote.
                </p>
              </div>

              <button
                onClick={handleLogin}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Sign In / Sign Up
              </button>

              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg p-3">
                  <p className="text-sm text-red-900 dark:text-red-300">{error}</p>
                </div>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By signing in, you agree to our terms and conditions
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileSetup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g., IIT Delhi"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must match your email domain
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Delhi"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg p-3">
                  <p className="text-sm text-red-900 dark:text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Profile..." : "Complete Profile"}
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
