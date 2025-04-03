"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { TextAnimate } from "./magicui/text-animate";
import ModeToggle from "./modeToggle";

export default function Homepage() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-center">
        <div className="max-w-3xl mx-auto">
          <TextAnimate
            animation="blurInUp"
            duration={2}
            by="character"
            className="text-5xl font-bold mb-6 bg-clip-text  bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            Welcome to CoderView
          </TextAnimate>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10">
            The best platform for technical interviews
          </p>

          <div className="flex items-center justify-center gap-4">
            <SignInButton>
              <button className="px-6 py-3 bg-blue-400 rounded-lg hover:bg-amber-200 text-white dark:text-gray-800 font-medium transition-all">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="px-6 py-3 bg-blue-200 rounded-lg hover:bg-amber-400 text-gray-800 font-medium transition-all">
                Sign Up
              </button>
            </SignUpButton>

            <ModeToggle />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-100 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} CoderView. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
