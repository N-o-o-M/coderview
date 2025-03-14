"use client";

import Navbar from "@/components/Navbar";
import ConvexClerkProvider from "@/components/providers/convexClerkProvider";
import { ThemeProvider } from "@/components/providers/themeProvider";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Homepage from "../components/homepage";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function ThemeTransition() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  if (!theme) return null; // Prevent hydration mismatch

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
        transition={{ duration: 10, ease: "easeInOut" }}
        className="fixed inset-0 w-full h-full bg-white dark:bg-black z-[-1]"
      />
    </AnimatePresence>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeTransition />
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main className="px-4 sm:px-6 lg:px-8">{children}</main>
              </div>
            </SignedIn>

            <SignedOut>
              <Homepage />
            </SignedOut>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
