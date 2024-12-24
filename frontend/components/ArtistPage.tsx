"use client";
import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopSongsTable from "./Tables/TopSongsTable";
import { ArtistInterface } from "./TopArtists/TopArtists";
import { useAuth } from "./AuthContext";
import LoadingBar from "./LoadingBar";

const ArtistPage = ({ artistId }: { artistId: String }) => {
  const { accessToken } = useAuth();
  const [artist, setArtist] = useState<ArtistInterface | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
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
              "Error al obtener el top de artistas:",
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

    fetchTopArtists();
  }, [accessToken]);

  return (
    <>
      {artist ? (
        <Box
          sx={{
            maxWidth: { xs: "full", sm: "848px", md: "1264px" },
            mt: "50px",
            mx: "auto",
            px: "20px",
            width: "full",
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              mb: 10,
            }}
          >
            <Paper
              elevation={12}
              sx={{
                width: 200,
                height: 200,
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <img
                className=" object-cover  w-full h-full"
                src={artist.images[0].url}
              />
            </Paper>
            <Box>
              <Box>
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
                sx={{ letterSpacing: "1px", my: "20px" }}
              >
                105,222,860 Monthly Listeners
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px", my: "20px" }}
          >
            Search Results
          </Typography>
          <TopSongsTable />
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
