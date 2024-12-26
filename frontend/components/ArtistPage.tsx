"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopSongsTable from "./Tables/TopSongsTable";
import { useAuth } from "./Auth/AuthContext";
import LoadingBar from "./utils/LoadingBar";
import { Album, ArtistDetailsInterface, Track } from "@/types/spotify";
import VarietyCard from "./utils/VarietyCard";

const ArtistPage = ({ artistId }: { artistId: String }) => {
  const { accessToken } = useAuth();
  const [artist, setArtist] = useState<ArtistDetailsInterface | null>(null);
  const [topSongs, setTopSongs] = useState<Track[]>([]);
  const [discography, setDiscography] = useState<Album[]>([]);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (accessToken) {
        try {
          const response = await fetch(
            `http://localhost:8080/artists/${artistId}`,
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
              "Error al obtener los detalles de los artistas: ",
              response.statusText
            );
            return;
          }
          const data = await response.json();
          setArtist(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchArtistTopSongs = async () => {
      if (accessToken) {
        try {
          const response = await fetch(
            `http://localhost:8080/artists/${artistId}/top-tracks`,
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
              "Error al obtener el top de canciones del artista: ",
              response.statusText
            );
            return;
          }
          const data = await response.json();
          setTopSongs([...data.tracks]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchArtistAlbums = async () => {
      if (accessToken) {
        try {
          const response = await fetch(
            `http://localhost:8080/artists/${artistId}/albums`,
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
          setDiscography([...data.items]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchArtistDetails();
    fetchArtistTopSongs();
    fetchArtistAlbums();
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
              src={artist.images[0].url}
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
                src={artist.images[0].url}
              />
            </Paper>
            <Box>
              <Box sx={{ width: "fit-content", mx: { xs: "auto", md: "0" } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    mt: "20px",
                    mb: "4px",
                  }}
                >
                  {artist?.name}
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
                {`Genres: ${artist.genres.join(", ")}`}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ letterSpacing: "2px", my: "20px" }}
              >
                {`${artist.followers.total.toLocaleString()} Followers`}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px", my: "40px" }}
          >
            Search Results
          </Typography>
          <TopSongsTable songs={topSongs.slice(0, 10)} />
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

export default ArtistPage;
