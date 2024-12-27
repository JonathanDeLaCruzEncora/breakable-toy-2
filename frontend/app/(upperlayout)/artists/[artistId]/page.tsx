import ArtistPage from "@/components/ArtistPage";

interface PageParams {
  params: Promise<{ artistId: string }>;
}

export default async function page({ params }: PageParams) {
  const artistId = (await params).artistId;

  return (
    <>
      <ArtistPage artistId={artistId} />
    </>
  );
}
