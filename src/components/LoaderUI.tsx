import { Loader2Icon } from "lucide-react";

function LoaderUI() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black-300">
      <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default LoaderUI;
