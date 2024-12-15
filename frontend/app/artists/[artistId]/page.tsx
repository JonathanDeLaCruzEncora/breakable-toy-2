interface PageParams {
  params: Promise<{ artistId: string }>;
}

export default async function AlbumPage({ params }: PageParams) {
  const artistId = (await params).artistId;
  return <div>My Post: {artistId}</div>;
}
