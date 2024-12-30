import PlaylistPage from "@/components/PlaylistPage";

interface PageParams {
  params: Promise<{ playlistId: string }>;
}

export default async function page({ params }: PageParams) {
  const playlistId = (await params).playlistId;
  return (
    <>
      <PlaylistPage playlistId={playlistId} />
    </>
  );
}
