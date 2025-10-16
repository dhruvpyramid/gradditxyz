"use client";

import { FixedHeader } from "@/components/FixedHeader";
import { CollegeDashboard } from "@/components/colleges/CollegeDashboard";
import { ProfileSetupChecker } from "@/components/auth/ProfileSetupChecker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed Header */}
      <FixedHeader />

      {/* Auto-check for profile setup */}
      <ProfileSetupChecker />

      {/* Content Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-12 pb-24">
        <CollegeDashboard />
      </section>
    </div>
  );
}
