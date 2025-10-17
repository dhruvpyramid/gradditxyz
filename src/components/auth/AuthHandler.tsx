"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { ProfileSetupModal } from "./ProfileSetupModal";

export function AuthHandler() {
  const { authenticated, user } = usePrivy();
  const [showProfileSetup, setShowProfileSetup] = useState(false);

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
          }
        })
        .catch((err) => {
          console.error("Error checking user:", err);
          setShowProfileSetup(true);
        });
    }
  }, [authenticated, user?.email?.address]);

  return (
    <ProfileSetupModal
      isOpen={showProfileSetup}
      onClose={() => setShowProfileSetup(false)}
    />
  );
}
