"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { LoginModal } from "./LoginModal";

export function ProfileSetupChecker() {
  const { authenticated, user } = usePrivy();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (authenticated && user?.email?.address) {
      // Check if user exists in database
      fetch("/api/auth/user", {
        headers: { "x-user-email": user.email.address },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.user) {
            // User authenticated with Privy but not in database
            setShowModal(true);
          }
        })
        .catch((err) => {
          console.error("Error checking user:", err);
        });
    }
  }, [authenticated, user?.email?.address]);

  return <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />;
}
