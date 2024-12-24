import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TopArtistCard from "./TopArtistCard";
import { useAuth } from "../AuthContext";

export interface ArtistInterface {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

const TopArtists = () => {
  const { accessToken } = useAuth();
  const [topArtists, setTopArtists] = useState<ArtistInterface[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      if (accessToken) {
        console.log(accessToken);
        try {
          const response = await fetch("http://localhost:8080/me/top/artists", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            console.error(
              "Error al obtener el top de artistas:",
              response.statusText
            );
            return;
          }
          const data = await response.json();
          setTopArtists([...data.items]);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchTopArtists();
  }, [accessToken]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mx: "20px",
      }}
    >
      {
        <Accordion
          defaultExpanded
          sx={{
            pl: 2,
            pr: 2,
            width: "100%",
            maxWidth: { xs: "100%", sm: "848px", md: "1264px" },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMore
                sx={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "32px",
                  maxHeight: "32px",
                  aspectRatio: "1/1",
                }}
              />
            }
            aria-controls="top-artists-content"
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", letterSpacing: "1px" }}
            >
              Top Artists
            </Typography>
          </AccordionSummary>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            useFlexGap
            direction="row"
            sx={{ mb: 2, flexWrap: "wrap", justifyContent: "center" }}
          >
            {topArtists.length ? (
              topArtists.map((artist, i) => (
                <TopArtistCard key={i} artist={artist} />
              ))
            ) : (
              <Typography sx={{ textAlign: "center", py: 8 }}>
                You don't seem to have any artists yet,
                <br /> keep listening so that you can showcase them here
              </Typography>
            )}
          </Stack>
        </Accordion>
      }
    </Box>
  );
};

export default TopArtists;
