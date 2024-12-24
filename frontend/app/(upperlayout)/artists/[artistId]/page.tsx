import ArtistPage from "@/components/ArtistPage";
import { useAuth } from "@/components/AuthContext";
import SearchBar from "@/components/SearchBar";
import TopSongsTable from "@/components/Tables/TopSongsTable";
import { ArtistInterface } from "@/components/TopArtists/TopArtists";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

interface PageParams {
  params: Promise<{ artistId: string }>;
}

export default async function AlbumPage({ params }: PageParams) {
  const artistId = (await params).artistId;

  return (
    <>
      <ArtistPage artistId={artistId} />
    </>
  );
}
