import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const streamClient = useStreamVideoClient();

  const createInstanceMeeting = async () => {
    if (!streamClient) {
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = streamClient.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            desription: "Instant Meeting",
          },
        },
      });
      router.push(`/meeting/${call.id}`);
      toast.success("Meeting Created 😊");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting");
    }
  };

  const joinInstanceMeeting = async (callId: string) => {
    if (!streamClient) {
      toast.error("Client not found!!!");
      return;
    }
    try {
      router.push(`/meeting/${callId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to join meeting");
    }
  };

  return { createInstanceMeeting, joinInstanceMeeting };
};

export default useMeetingActions;
