"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/userUserRole";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import LoaderUI from "@/components/LoaderUI";
import MeetingModal from "@/components/MeetingModal";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  const { user } = useUser();
  const updateUserRole = useMutation(api.users.updateUserRole);
  const [roleLoading, setRoleLoading] = useState(false);

  const currentRole = isInterviewer ? "interviewer" : "candidate";

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`${title.toLowerCase()}`);
    }
  };

  const handleRoleChange = async (role: "candidate" | "interviewer") => {
    if (!user || currentRole === role) return;
    setRoleLoading(true);
    try {
      await updateUserRole({ clerkId: user.id, role });
      toast.success(`${role}`);
    } finally {
      setRoleLoading(false);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <Button
            variant="outline"
            className={`px-3 py-1 rounded border hover:-translate-y-1 transition-all duration-300 hover:scale-105 ${currentRole === "candidate" ? "bg-blue-500 text-white" : "bg-white text-black"} ${roleLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={roleLoading || currentRole === "candidate"}
            onClick={() => handleRoleChange("candidate")}
          >
            Candidate
          </Button>
          <Button
            variant="outline"
            className={`px-3 py-1 rounded border hover:-translate-y-1 transition-all duration-300 hover:scale-105  ${currentRole === "interviewer" ? "bg-blue-500 text-white" : "bg-white text-black"} ${roleLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={roleLoading || currentRole === "interviewer"}
            onClick={() => handleRoleChange("interviewer")}
          >
            Interviewer
          </Button>
          {roleLoading && (
            <span className="ml-2 text-sm text-muted-foreground">
              Updating...
            </span>
          )}
        </div>
      </div>
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10 justify-center items-center flex flex-col">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>
          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
