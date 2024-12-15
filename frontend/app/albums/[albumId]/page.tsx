// app/albums/[albumId]/page.tsx

interface PageParams {
  params: Promise<{ albumId: string }>;
}

export default async function AlbumPage({ params }: PageParams) {
  const albumId = (await params).albumId;
  return <div>My Post: {albumId}</div>;
}
