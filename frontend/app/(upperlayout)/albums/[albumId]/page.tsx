import AlbumPage from "@/components/AlbumPage";

interface PageParams {
  params: Promise<{ albumId: string }>;
}

export default async function page({ params }: PageParams) {
  const albumId = (await params).albumId;
  return (
    <>
      <AlbumPage albumId={albumId} />
    </>
  );
}
