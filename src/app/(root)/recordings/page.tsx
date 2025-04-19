"use client";

import useGetCalls from "@/hooks/useGetCalls";

function RecordingPage() {
  const { calls, isLoading } = useGetCalls();
  return <div>RecordingPage</div>;
}

export default RecordingPage;
