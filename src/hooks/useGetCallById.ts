import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const streamClient = useStreamVideoClient();
  useEffect(() => {
    if (!streamClient) return;
    const fetchCall = async () => {
      try {
        const { calls } = await streamClient.queryCalls({
          filter_conditions: { id },
        });
        if (calls.length > 0) {
          setCall(calls[0]);
        }
      } catch (error) {
        console.error(error);
        setCall(undefined);
      } finally {
        setIsCallLoading(false);
      }
    };
    fetchCall();
  }, [streamClient, id]);
  return { call, isCallLoading };
};

export default useGetCallById;
