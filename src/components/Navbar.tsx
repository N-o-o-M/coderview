import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashBoardBtn from "./DashBoardBtn";
import ModeToggle from "./modeToggle";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-3xl mr-6 font-mono hover:opacity-80 transition-transform duration-300 hover:scale-105"
        >
          <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent font-bold">
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
