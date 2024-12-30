"use client";
import { Avatar, Box, Link, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopSongsTable from "./utils/ListOfSongsWithImages";
import { useAuth } from "./Auth/AuthContext";
import LoadingBar from "./utils/LoadingBar";
import { Album, AlbumDetails, Artist, Track } from "@/types/spotify";
import VarietyCard from "./utils/VarietyCard";
import ListOfSongs from "./utils/ListOfSongs";
import fetchData from "@/utils/fetchData";
import ImageAndTitle from "./utils/ImageAndTitle";

const getMinutes = (timeMs: number) => {
  const min = Math.floor(timeMs / 60000);
  const sec = Math.floor((timeMs % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")} `;
};

const getTotalMinutes = (list: Track[]) => {
  return getMinutes(list.reduce((acc, val) => acc + val.duration_ms, 0));
};

const AlbumPage = ({ albumId }: { albumId: string }) => {
  const { accessToken } = useAuth();
  const [album, setAlbum] = useState<AlbumDetails | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [MoreFromArtist, setMoreFromArtist] = useState<Album[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!accessToken) return;

      try {
        if (!album) {
          const albumData = await fetchData(`/albums/${albumId}`, accessToken);
          setAlbum(albumData);
          console.log(albumData);
        }

        if (album) {
          const artistData = await fetchData(
            `/artists/${album.artists[0].id}`,
            accessToken
          );
          setArtist(artistData);

          const moreData = await fetchData(
            `/artists/${album.artists[0].id}/albums`,
            accessToken
          );
          setMoreFromArtist(moreData.items || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [accessToken, album]);

  return (
    <>
      {album ? (
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
            bgSrc={album.images[album.images.length - 1].url}
            mainSrc={album.images[1].url}
            title={album?.name}
            subtitle1={<>{`${album.release_date.split("-")[0]}`}</>}
            subtitle2={
              <>
                {`${album?.total_tracks} Track${
                  album?.total_tracks == 1 ? "" : "s"
                }`}
                {album?.total_tracks
                  ? ` - ${getTotalMinutes(album?.tracks.items)} min`
                  : ""}
              </>
            }
            subtitle3={
              <>
                {artist ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "left" },
                        alignItems: "center",

                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={artist.images[artist.images.length - 1].url}
                      />
                      <Link
                        href={`/artists/${artist.id}`}
                        color="inherit"
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography variant="subtitle2">
                          {" "}
                          {artist.name}
                        </Typography>
                      </Link>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </>
            }
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px", my: "40px" }}
          >
            Tracks
          </Typography>
          <ListOfSongs songs={album.tracks.items} />
          {MoreFromArtist.length ? (
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
                More from {artist?.name}
              </Typography>
              <Stack
                direction={"row"}
                rowGap={1}
                columnGap={1}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {MoreFromArtist.slice(0, 8).map((album, i) => (
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

export default AlbumPage;
