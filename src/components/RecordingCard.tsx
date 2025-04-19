import { calculateRecordingDuration } from "@/lib/utils";
import { CallRecording } from "@stream-io/video-react-sdk";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

function RecordingCard({ recording }: { recording: CallRecording }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("Recording link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
    <TooltipProvider>
      <Card
        className="group hover:shadow-lg transition-all duration-300 border-border/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="space-y-2 pb-2">
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <CalendarIcon className="size-4 text-primary/80" />
                <span className="font-medium">{formattedStartTime}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <ClockIcon className="size-4 text-primary/80" />
                <span className="font-medium">{duration}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div
            className="w-full aspect-video bg-muted/30 rounded-lg flex items-center justify-center cursor-pointer group relative overflow-hidden"
            onClick={() => window.open(recording.url, "_blank")}
          >
            {isLoading && <Skeleton className="absolute inset-0" />}
            <div
              className={`size-16 rounded-full bg-background/90 flex items-center justify-center transition-all duration-300 ${
                isHovered ? "scale-110 bg-primary" : ""
              }`}
            >
              <PlayIcon
                className={`size-8 transition-colors duration-300 ${
                  isHovered
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-2 pt-2">
          <Button
            className="flex-1 h-10"
            onClick={() => window.open(recording.url, "_blank")}
            variant="default"
          >
            <PlayIcon className="size-4 mr-2" />
            Watch Recording
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                onClick={handleCopyLink}
                className="h-10"
              >
                <CopyIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy recording link</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}

export default RecordingCard;
