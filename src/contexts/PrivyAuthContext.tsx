"use client";

import { createContext, useContext, ReactNode } from "react";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";

const PrivyAuthContext = createContext<any>(null);

export function PrivyAuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cmbi8jxhs000zju0mbg0xx3v3"}
      config={{
        loginMethods: ["google", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://www.graddit.xyz/gradditlogo.png",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export function useAuth() {
  return usePrivy();
}
