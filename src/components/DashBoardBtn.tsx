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
        variant="ghost"
        className="gap-2 font-medium bg-blue-400 hover:bg-amber-300"
      >
        Dashboard
      </Button>
    </Link>
  );
}

export default DashBoardBtn;
