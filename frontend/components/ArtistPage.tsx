"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthContext";
import LoadingBar from "./utils/LoadingBar";
import { Album, Artist, Track } from "@/types/spotify";
import VarietyCard from "./utils/VarietyCard";
import ListOfSongsWithImages from "./utils/ListOfSongsWithImages";
import fetchData from "@/utils/fetchData";
import ImageAndTitle from "./utils/ImageAndTitle";

const ArtistPage = ({ artistId }: { artistId: string }) => {
  const { accessToken } = useAuth();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topSongs, setTopSongs] = useState<Track[]>([]);
  const [discography, setDiscography] = useState<Album[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!accessToken) return;
      try {
        const artistData = await fetchData(`/artists/${artistId}`, accessToken);
        setArtist(artistData);
        console.log(artistData);

        const topTracksData = await fetchData(
          `/artists/${artistId}/top-tracks`,
          accessToken
        );
        setTopSongs(topTracksData.tracks || []);

        const albumsData = await fetchData(
          `/artists/${artistId}/albums`,
          accessToken
        );
        setDiscography(albumsData.items || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [accessToken]);

  return (
    <>
      {artist ? (
        <Box
          sx={{
            maxWidth: { xs: "full", sm: "848px", md: "1264px" },
            mt: "50px",
            mb: "100px",
            mx: "auto",
            px: "20px",
            width: "full",
            py: 4,
          }}
        >
          <ImageAndTitle
            bgSrc={artist.images[artist.images.length - 1].url}
            mainSrc={artist.images[1].url}
            title={artist.name}
            subtitle1={<>{`Genres: ${artist.genres.join(", ")}`}</>}
            subtitle2={
              <>{`${artist.followers.total.toLocaleString()} Followers`}</>
            }
            subtitle3={<></>}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px", my: "40px" }}
          >
            Tracks
          </Typography>
          <ListOfSongsWithImages songs={topSongs.slice(0, 10)} />
          {discography.length ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  mt: "50px",
                  mb: "40px",
                }}
              >
                Discography
              </Typography>
              <Stack
                direction={"row"}
                rowGap={1}
                columnGap={1}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {discography.slice(0, 8).map((album, i) => (
                  <VarietyCard
                    key={i}
                    imgSrc={album.images[album.images.length - 1].url}
                    mainText={album.name}
                    secondText={`${album.total_tracks} track(s)`}
                    thirdText={`${album.release_date.split("-")[0]}`}
                    link={`/albums/${album.id}`}
                  />
                ))}
              </Stack>
            </>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 30 }}>
          <LoadingBar />
        </Box>
      )}
    </>
  );
};

export default ArtistPage;
