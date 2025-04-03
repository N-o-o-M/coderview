"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUserRole } from "@/hooks/userUserRole";

function DashBoardBtn() {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
      <Button
        variant="default"
        className="relative px-6 py-3 font-semibold text-white transition-all duration-300 
                  bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md 
                  hover:from-amber-400 hover:to-amber-500 hover:-translate-y-1 
                  active:scale-95 active:shadow-lg"
      >
        <span className="relative z-10">Dashboard</span>
        <div className="absolute inset-0 bg-white opacity-10 rounded-lg"></div>
      </Button>
    </Link>
  );
}

export default DashBoardBtn;
