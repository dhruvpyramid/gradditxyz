"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { ProfileCompletionModal } from "./ProfileCompletionModal";
import { OnboardingTour } from "../tour/OnboardingTour";

export function AuthHandler() {
  const { authenticated, user, getAccessToken } = usePrivy();
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [showOnboardingTour, setShowOnboardingTour] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (authenticated && user?.email?.address) {
      setUserEmail(user.email.address);
      
      // Check if user profile is completed
      fetch("/api/auth/user", {
        headers: { "x-user-email": user.email.address },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.user) {
            // New user - show profile completion
            setShowProfileCompletion(true);
          } else if (!data.user.profileCompleted) {
            // Existing user but profile not completed - force completion
            setShowProfileCompletion(true);
          } else if (!data.user.hasSeenOnboarding) {
            // User has completed profile but not seen onboarding tour
            // Wait a bit for the page to load before showing tour
            setTimeout(() => {
              setShowOnboardingTour(true);
            }, 1000);
          }
        })
        .catch((err) => {
          console.error("Error checking user:", err);
        });
    }
  }, [authenticated, user?.email?.address]);

  const handleProfileComplete = async (profileData: {
    collegeName: string;
    city: string;
    state: string;
  }) => {
    setShowProfileCompletion(false);
    
    // Show onboarding tour after profile completion
    setTimeout(() => {
      setShowOnboardingTour(true);
    }, 1500);
  };

  const handleTourComplete = async () => {
    setShowOnboardingTour(false);
    
    // Save to database that user has completed onboarding
    try {
      const authToken = localStorage.getItem("privy:token");
      await fetch("/api/user/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
    } catch (err) {
      console.error("Failed to save onboarding status:", err);
    }
  };

  return (
    <>
      {showProfileCompletion && (
        <ProfileCompletionModal
          userEmail={userEmail}
          onComplete={handleProfileComplete}
        />
      )}
      
      {showOnboardingTour && (
        <OnboardingTour onComplete={handleTourComplete} />
      )}
    </>
  );
}
