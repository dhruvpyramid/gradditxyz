"use client";

import { useState, useEffect } from "react";
import { CollegeCard } from "./CollegeCard";
import { CollegeHeader } from "../ecosystem/CollegeHeader";
import { INDIAN_STATES, COLLEGE_CATEGORIES } from "@/data/indian-states";

interface College {
  id: number;
  name: string;
  email?: string;
  website?: string;
  twitter?: string;
  description?: string;
  category: string;
  city: string;
  state: string;
  score: number;
  voteCount: number;
}

export function CollegeDashboard() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score" | "name" | "latest">("score");

  const fetchColleges = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedState !== "all") params.append("state", selectedState);
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      params.append("sortBy", sortBy);

      const response = await fetch(`/api/colleges?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setColleges(data.colleges);
      }
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllColleges = async () => {
    try {
      const response = await fetch('/api/colleges');
      const data = await response.json();
      if (response.ok) {
        setAllColleges(data.colleges);
      }
    } catch (error) {
      console.error("Failed to fetch all colleges:", error);
    }
  };

  useEffect(() => {
    fetchAllColleges();
  }, []);

  useEffect(() => {
    fetchColleges();
  }, [selectedState, selectedCategory, sortBy]);

  const getCategoryCount = (category: string) => {
    return allColleges.filter((c) => c.category === category).length;
  };

  const getStateCount = (state: string) => {
    return allColleges.filter((c) => c.state === state).length;
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <CollegeHeader />

      <div className="space-y-8">
        {/* Filters */}
        <div className="flex flex-col gap-4">
          {/* Category Filter - Original Style */}
          <div className="flex flex-wrap gap-2" data-tour="college-categories">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-sm"
                  : "bg-white/80 dark:bg-white/[0.05] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.08] border border-gray-200/50 dark:border-white/[0.08]"
              }`}
            >
              <span>All</span>
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                selectedCategory === "all" ? "bg-white/20" : "bg-black/5 dark:bg-white/10"
              }`}>
                {allColleges.length}
              </span>
            </button>
            {COLLEGE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-sm"
                    : "bg-white/80 dark:bg-white/[0.05] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.08] border border-gray-200/50 dark:border-white/[0.08]"
                }`}
              >
                <span>{category}</span>
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                  selectedCategory === category ? "bg-white/20" : "bg-black/5 dark:bg-white/10"
                }`}>
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>

          {/* State Filter - Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3" data-tour="state-filter">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by State:
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-xl text-sm font-medium bg-white/80 dark:bg-white/[0.05] text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.12] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer sm:min-w-[200px]"
            >
              <option value="all">All States ({allColleges.length})</option>
              {INDIAN_STATES.map((state) => {
                const count = getStateCount(state);
                return (
                  <option key={state} value={state}>
                    {state} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sort Controls - Original Style */}
          <div className="flex justify-center sm:justify-end" data-tour="sort-options">
            <div className="inline-flex gap-1 p-1 bg-white/80 dark:bg-white/[0.03] rounded-lg border border-gray-200/80 dark:border-white/[0.06]">
              <button
                onClick={() => setSortBy("score")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  sortBy === "score"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm"
                    : "bg-gray-50 dark:bg-white/[0.04] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.08]"
                }`}
              >
                Score
              </button>
              <button
                onClick={() => setSortBy("name")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  sortBy === "name"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm"
                    : "bg-gray-50 dark:bg-white/[0.04] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.08]"
                }`}
              >
                A-Z
              </button>
              <button
                onClick={() => setSortBy("latest")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  sortBy === "latest"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm"
                    : "bg-gray-50 dark:bg-white/[0.04] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.08]"
                }`}
              >
                Latest
              </button>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading colleges...</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No colleges found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} onVote={fetchColleges} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
