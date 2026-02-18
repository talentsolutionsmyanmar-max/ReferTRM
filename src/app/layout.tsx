import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { PWAInstallPrompt } from "@/components/pwa-install";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const padauk = localFont({
  src: [
    {
      path: "../../public/fonts/Padauk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Padauk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-padauk",
  display: "swap",
  fallback: ["Pyidaungsu", "sans-serif"],
});

export const metadata: Metadata = {
  title: "ReferTRM - Myanmar's #1 Referral Hiring Platform",
  description: "Refer friends, earn rewards. Connect talent with opportunities in Myanmar. သူငယ်ချင်းများကို ရည်ညွှန်းပါ၊ ဆုကြေးရယူပါ။",
  keywords: ["ReferTRM", "Myanmar", "jobs", "referral", "hiring", "KPay", "Yangon", "အလုပ်", "ရည်ညွှန်း", "မြန်မာ"],
  authors: [{ name: "Talent Solutions Myanmar" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#14B8A6" },
    { media: "(prefers-color-scheme: dark)", color: "#14B8A6" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ReferTRM",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "ReferTRM - Myanmar's #1 Referral Hiring Platform",
    description: "Refer friends and earn up to 500,000 MMK via KPay. Companies pay only 50,000 MMK flat success fee.",
    url: "https://refertrm.com",
    siteName: "ReferTRM",
    type: "website",
    locale: "my_MM",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReferTRM - Myanmar's #1 Referral Hiring Platform",
    description: "Refer friends and earn up to 500,000 MMK via KPay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="my" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${padauk.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <Providers>
          {children}
          <Toaster />
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
