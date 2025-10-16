import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { PrivyAuthProviderWrapper } from "@/contexts/PrivyAuthContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graddit - College Rankings by Students",
  description: "Vote for your college and help create fair, student-driven rankings across India",
  icons: {
    icon: [{ url: "/favico.png", sizes: "any" }],
    apple: [{ url: "/favico.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Graddit - College Rankings by Students",
    description: "Vote for your college and help create fair, student-driven rankings across India",
    images: [
      {
        url: "/socialpreview.jpg",
        width: 1200,
        height: 630,
        alt: "Graddit Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graddit - College Rankings by Students",
    description: "Vote for your college and help create fair, student-driven rankings across India",
    images: ["/socialpreview.jpg"],
    creator: "@graddit_in",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script defer data-domain="graddit.in" src="/js/script.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
          }}
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <PrivyAuthProviderWrapper>
            <div className="relative min-h-screen antialiased bg-background text-foreground">
              {children}
              <Footer />
            </div>
          </PrivyAuthProviderWrapper>
        </ThemeProvider>
        <Toaster
          richColors
          position="top-center"
          expand={true}
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(8px)",
            },
            className: "text-sm font-medium rounded-xl",
          }}
        />
      </body>
    </html>
  );
}
