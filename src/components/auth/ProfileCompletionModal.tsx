"use client";

import { useState, useEffect, useRef } from "react";
import { INDIAN_STATES } from "@/data/indian-states";

interface ProfileCompletionModalProps {
  userEmail: string;
  onComplete: (data: { collegeName: string; city: string; state: string }) => void;
}

interface CollegeSuggestion {
  name: string;
  city: string;
  state: string;
}

export function ProfileCompletionModal({ userEmail, onComplete }: ProfileCompletionModalProps) {
  const [collegeName, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<CollegeSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allColleges, setAllColleges] = useState<CollegeSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all colleges on mount
  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        if (data.colleges) {
          setAllColleges(data.colleges.map((c: any) => ({
            name: c.name,
            city: c.city,
            state: c.state,
          })));
        }
      })
      .catch((err) => console.error("Failed to fetch colleges:", err));
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (collegeName.trim().length >= 2) {
      const filtered = allColleges
        .filter((college) =>
          college.name.toLowerCase().includes(collegeName.toLowerCase())
        )
        .slice(0, 5); // Show max 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [collegeName, allColleges]);

  const handleCollegeSelect = (college: CollegeSuggestion) => {
    setCollegeName(college.name);
    setCity(college.city);
    setState(college.state);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!collegeName.trim() || !city.trim() || !state) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Get auth token from localStorage (Privy stores it there)
      const authToken = localStorage.getItem("privy:token");
      
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ collegeName, city, state }),
      });

      const data = await response.json();

      if (response.ok) {
        onComplete({ collegeName, city, state });
      } else {
        setError(data.error || "Failed to save profile");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tell us about your college to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* College Name with Autocomplete */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              College Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              onFocus={() => collegeName.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Start typing your college name..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              autoComplete="off"
            />
            
            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                {suggestions.map((college, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCollegeSelect(college)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {college.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {college.city}, {college.state}
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              {collegeName.length < 2 ? `Email: ${userEmail}` : `Type at least 2 characters to see suggestions`}
            </p>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              required
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>

        {/* Footer Note */}
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          This information helps us personalize your experience and voting strength
        </p>
      </div>
    </div>
  );
}
