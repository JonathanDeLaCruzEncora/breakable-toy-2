"use client";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopSongsTable from "./Tables/TopSongsTable";
import { useAuth } from "./Auth/AuthContext";
import LoadingBar from "./utils/LoadingBar";
import {
  Album,
  AlbumDetails,
  Artist,
  ArtistDetailsInterface,
  Track,
} from "@/types/spotify";
import VarietyCard from "./utils/VarietyCard";
import ListOfSongs from "./utils/ListOfSongs";

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
  const [artist, setArtist] = useState<ArtistDetailsInterface | null>(null);
  const [MoreFromArtist, setMoreFromArtist] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (accessToken) {
        try {
          const response = await fetch(
            `http://localhost:8080/albums/${albumId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(
              "Error al obtener los detalles del album: ",
              response.statusText
            );
            return;
          }
          const data = await response.json();
          setAlbum(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAlbumDetails();
  }, [accessToken]);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (accessToken && album) {
        try {
          const response = await fetch(
            `http://localhost:8080/artists/${album.artists[0].id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(
              "Error al obtener los detalles del artista: ",
              response.statusText
            );
            return;
          }
          const data = await response.json();
          console.log(data);
          setArtist(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchArtistAlbums = async () => {
      if (accessToken && album) {
        try {
          const response = await fetch(
            `http://localhost:8080/artists/${album.artists[0].id}/albums`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(
              "Error al obtener artistas relacionados: ",
              response.json()
            );
            return;
          }
          const data = await response.json();
          console.log(data);
          setMoreFromArtist([...data.items]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchArtistAlbums();
    fetchArtistDetails();
  }, [album]);

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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "left" },
              textAlign: { xs: "center", md: "left" },
              alignContent: "center",
              gap: 4,
              mb: 10,
              position: "relative",
            }}
          >
            <Box
              component={"img"}
              src={album.images[0].url}
              sx={{
                position: "absolute",
                zIndex: -1,
                top: "50%",
                transform: "translate(-200px,-50%)",
                opacity: "50%",
                filter: "blur(150px)",
              }}
            ></Box>
            <Paper
              elevation={12}
              sx={{
                width: 200,
                minWidth: 200,
                height: 200,
                minHeight: 200,
                mx: { xs: "auto", md: "0" },
                overflow: "hidden",
                borderRadius: 2,
                position: "relative",
              }}
            >
              <img
                className=" object-cover  w-full h-full"
                src={album.images[0].url}
              />
            </Paper>
            <Box>
              <Box sx={{ width: "fit-content", mx: { xs: "auto", md: "0" } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    mt: "5px",
                    mb: "4px",
                  }}
                >
                  {album?.name}
                </Typography>
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    width: "100%",
                    height: "2px",
                    borderRadius: 0,
                  }}
                ></Box>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  textTransform: "capitalize",
                  letterSpacing: "2px",
                  my: "20px",
                }}
              >
                {`${album.release_date.split("-")[0]}`}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ letterSpacing: "2px", my: "20px" }}
              >
                {`${album?.total_tracks} Track${
                  album?.total_tracks == 1 ? "" : "s"
                }`}
                {album?.total_tracks
                  ? ` - ${getTotalMinutes(album?.tracks.items)} min`
                  : ""}
              </Typography>
              <Typography variant="subtitle2" sx={{ letterSpacing: "2px" }}>
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
                      <Avatar src={artist.images[0].url} />
                      <Typography> {artist.name}</Typography>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Typography>
            </Box>
          </Box>
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
                    imgSrc={album.images[0].url}
                    mainText={album.name}
                    secondText={`${album.total_tracks} track(s)`}
                    thirdText={`${album.release_date.split("-")[0]}`}
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
