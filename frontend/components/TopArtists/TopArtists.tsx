import React from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TopArtistCard from "./TopArtistCard";

const TopArtists = () => {
  const artists = [
    {
      name: "Billie Eilish",
      genres: "Pop",
    },
    {
      name: "Billie Eilish",
      genres: "Pop",
    },

    {
      name: "Billie Eilish",
      genres: "Pop",
    },
    {
      name: "Billie Eilish",
      genres: "Pop",
    },
    {
      name: "Billie Eilish",
      genres: "Pop",
    },
    {
      name: "Billie Eilish",
      genres: "Pop",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mx: "20px",
      }}
    >
      <Accordion
        sx={{
          pl: 2,
          pr: 2,
          maxWidth: { xs: "full", sm: "848px", md: "1264px" },
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
          {artists.map((artist, i) => (
            <TopArtistCard key={i} name={artist.name} genres={artist.genres} />
          ))}
        </Stack>
      </Accordion>
    </Box>
  );
};

export default TopArtists;
