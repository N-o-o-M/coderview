import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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

  const createMeeting = async () => {};
  const joinMeeting = async () => {};
  const handleStart = async () => {};

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
              className="bg-red-400 hover:bg-slate-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingurl.trim()}
              className="bg-blue-400 hover:bg-amber-300"
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
