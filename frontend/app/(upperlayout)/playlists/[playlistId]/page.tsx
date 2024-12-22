interface PageParams {
  params: Promise<{ playlistId: string }>;
}

export default async function AlbumPage({ params }: PageParams) {
  const playlistId = (await params).playlistId;
  return <div>My Post: {playlistId}</div>;
}
