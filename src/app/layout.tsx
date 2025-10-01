import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nipperlug.com'),
  title: "Nipperlug - Cabal Online Tools & Guides",
  description: "Cabal Online tools including build planner, tier lists, calculators, and more. Optimize your character builds and find game resources.",
  keywords: "Cabal Online, build planner, tier lists, calculators, mob table, character builder, build optimizer, equipment calculator, stats calculator, Cabal Online builds",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Nipperlug - Cabal Online Tools & Guides",
    description: "Cabal Online tools including build planner, tier lists, calculators, and more. Optimize your character builds and find game resources.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Nipperlug" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://nipperlug.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>
          {children}
        </MainLayout>

      </body>
    </html>
  );
}
