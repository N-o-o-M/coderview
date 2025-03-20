import { SignedIn, SignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashBoardBtn from "./DashBoardBtn";
import ModeToggle from "./modeToggle";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-4xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent font-bold">
            CoderView
          </span>
        </Link>
        {/* Links */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DashBoardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
