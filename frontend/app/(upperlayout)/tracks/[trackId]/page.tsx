import TrackPage from "@/components/TrackPage";
import React from "react";

interface PageParams {
  params: Promise<{ trackId: string }>;
}

export default async function page({ params }: PageParams) {
  const trackId = (await params).trackId;
  return (
    <>
      <TrackPage trackId={trackId} />
    </>
  );
}
