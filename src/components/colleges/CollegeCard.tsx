"use client";

import { useState } from "react";
import { MapPin, Globe, ExternalLink } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";

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
  userVote?: "up" | "down" | null;
}

interface CollegeCardProps {
  college: College;
  onVote?: () => void;
}

export function CollegeCard({ college, onVote }: CollegeCardProps) {
  const { authenticated, user, login } = usePrivy();
  const [isVoting, setIsVoting] = useState(false);
  const [localUserVote, setLocalUserVote] = useState(college.userVote);
  const [localScore, setLocalScore] = useState(college.score);
  const [localVoteCount, setLocalVoteCount] = useState(college.voteCount);
  const [isHovered, setIsHovered] = useState(false);
  const [voteAnimation, setVoteAnimation] = useState<'up' | 'down' | null>(null);
  const [scoreAnimation, setScoreAnimation] = useState(false);

  const handleVote = async (voteType: 1 | -1) => {
    if (!authenticated || !user?.email?.address) {
      toast.error("Please login to vote");
      login();
      return;
    }

    setIsVoting(true);

    try {
      console.log("Voting:", { email: user.email.address, collegeId: college.id, voteType });
      
      const response = await fetch("/api/colleges/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email.address,
          collegeId: college.id,
          voteType,
        }),
      });

      const data = await response.json();
      console.log("Vote response:", data);

      if (!response.ok) {
        console.error("Vote failed:", data);
        toast.error(data.error || "Failed to vote");
        setIsVoting(false);
        return;
      }

      // Trigger vote animation
      setVoteAnimation(voteType === 1 ? 'up' : 'down');
      setTimeout(() => setVoteAnimation(null), 600);
      
      // Update local state
      setLocalUserVote(voteType === 1 ? "up" : "down");
      
      // Animate score change
      setScoreAnimation(true);
      setTimeout(() => setScoreAnimation(false), 500);
      
      // Update score and vote count if available, otherwise refresh
      if (data.college) {
        setLocalScore(data.college.score);
        setLocalVoteCount(data.college.voteCount);
      }
      
      // Haptic feedback (mobile)
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      toast.success(voteType === 1 ? "Upvoted! 🎉" : "Downvoted", {
        duration: 2000,
      });
      
      // Always trigger refresh to get latest data
      if (onVote) onVote();
    } catch (err) {
      console.error("Vote error:", err);
      toast.error("Failed to submit vote");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div
      data-tour="college-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}
    >
      {/* Animated glow border effect */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.5), rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5), rgba(96, 165, 250, 0.5))',
          backgroundSize: '300% 100%',
          animation: isHovered ? 'gradientShift 3s ease infinite' : 'none',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          filter: 'blur(4px)',
        }}
      />

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-500/20">
          {college.category}
        </span>
      </div>

      <div className="p-6">
        {/* College Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pr-24 leading-tight">
          {college.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <MapPin size={16} className="flex-shrink-0" />
          <span>{college.city}, {college.state}</span>
        </div>

        {/* Description */}
        {college.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
            {college.description}
          </p>
        )}

        {/* Links */}
        {college.website && (
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4"
          >
            <Globe size={14} />
            <span>Visit Website</span>
            <ExternalLink size={12} />
          </a>
        )}

        {/* Voting Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-white/[0.08]">
          <div className="flex flex-col relative">
            <span className={`text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent transition-all duration-300 ${
              scoreAnimation ? 'scale-125' : 'scale-100'
            }`}>
              {localScore.toFixed(1)}
            </span>
            {voteAnimation && (
              <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-2xl font-bold animate-voteFloat ${
                voteAnimation === 'up' ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {voteAnimation === 'up' ? '+1' : '-1'}
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {localVoteCount} {localVoteCount === 1 ? 'vote' : 'votes'}
            </span>
          </div>

          <div className="flex items-center gap-2" data-tour="vote-buttons">
            <button
              onClick={() => handleVote(1)}
              disabled={isVoting}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden ${
                localUserVote === "up"
                  ? "bg-emerald-100 dark:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30 dark:ring-emerald-500/50"
                  : "bg-white dark:bg-white/[0.05] text-emerald-600/60 dark:text-emerald-400/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10"
              } ${isVoting && "cursor-not-allowed opacity-50"} ${
                voteAnimation === 'up' ? 'animate-votePulse' : ''
              }`}
            >
              {voteAnimation === 'up' && (
                <span className="absolute inset-0 bg-emerald-400/30 animate-ripple" />
              )}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            <button
              onClick={() => handleVote(-1)}
              disabled={isVoting}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden ${
                localUserVote === "down"
                  ? "bg-red-100 dark:bg-red-500/30 text-red-700 dark:text-red-300 ring-1 ring-red-500/30 dark:ring-red-500/50"
                  : "bg-white dark:bg-white/[0.05] text-red-600/60 dark:text-red-400/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/10"
              } ${isVoting && "cursor-not-allowed opacity-50"} ${
                voteAnimation === 'down' ? 'animate-votePulse' : ''
              }`}
            >
              {voteAnimation === 'down' && (
                <span className="absolute inset-0 bg-red-400/30 animate-ripple" />
              )}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes voteFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -30px) scale(1.5);
          }
        }
        @keyframes votePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .animate-voteFloat {
          animation: voteFloat 0.6s ease-out forwards;
        }
        .animate-votePulse {
          animation: votePulse 0.3s ease-in-out;
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
