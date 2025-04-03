import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingActions from "@/hooks/useMeetingActions";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

function MeetingModal({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: MeetingModalProps) {
  const [meetingurl, setMeetingurl] = useState("");
  const { createInstanceMeeting, joinInstanceMeeting } = useMeetingActions();

  const handleStart = () => {
    if (isJoinMeeting) {
      const meetingId = meetingurl.split("/").pop();
      if (meetingId) joinInstanceMeeting(meetingId);
    } else {
      createInstanceMeeting();
    }
    setMeetingurl("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="Paste Meeting link here..."
              value={meetingurl}
              onChange={(e) => setMeetingurl(e.target.value)}
            />
          )}
          <div className="flex justify-end gap-3">
            <Button
              variant="destructive"
              className="bg-slate-400 hover:bg-red-300 hover:-translate-y-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingurl.trim()}
              className="bg-blue-400 hover:bg-amber-300 hover:-translate-y-2"
            >
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;
