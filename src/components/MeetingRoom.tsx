import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState != CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={35}
        minSize={25}
        maxSize={100}
        className="relative"
      >
        {/* Video layout */}
        <div className="absolute inset-8">
          {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
          {/* Participants list overlay */}
          {showParticipants && (
            <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
              <CallParticipantsList
                onClose={() => setShowParticipants(false)}
              />
            </div>
          )}
        </div>
        {/* Video Controls */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center px-4">
              <CallControls onLeave={() => router.push("/")} />
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-10">
                      <LayoutListIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLayout("grid")}>
                      Grid View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLayout("speaker")}>
                      Speaker View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65} minSize={25}>
        <h1>code Editor will go here</h1>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default MeetingRoom;
