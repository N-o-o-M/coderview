import React from "react";
import Navbar from "./Navbar";
import { SignIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import ModeToggle from "./modeToggle";
import { TextAnimate } from "./magicui/text-animate";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-300">
      <TextAnimate
        animation="blurIn"
        duration={3}
        by="character"
        className="text-4xl font-bold"
      >
        Welcome to CoderView
      </TextAnimate>
      <p className="text-lg text-gray-600 mb-4">
        The best platform for interviews
      </p>
      <div className="flex space-x-4">
        <SignInButton>
          <button className="px-6 py-2 bg-blue-400 rounded-lg hover:bg-amber-200">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="px-6 py-2 bg-blue-200  rounded-lg hover:bg-amber-400">
            Sign Up
          </button>
        </SignUpButton>
        <ModeToggle />
      </div>
    </div>
  );
}
