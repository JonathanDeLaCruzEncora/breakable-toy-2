"use client";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import VarietyCard from "./../utils/VarietyCard";
import SearchResultsCategory from "./SearchResultsCategory";
import { SearchResultsInterface } from "@/types/spotify";
import { useAuth } from "../Auth/AuthContext";

const options = ["artists", "albums", "tracks", "playlists"];

const SearchResults = () => {
  const { searchResults } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "848px", md: "1264px" },
          mt: "50px",
          mb: "100px",
          mx: "auto",
          px: "20px",
          width: "100%",
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            gap: 4,
            mb: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px" }}
          >
            Search Results
          </Typography>
          <SearchResultsCategory {...{ selectedIndex, setSelectedIndex }} />
        </Box>
        <Stack
          direction="row"
          useFlexGap
          sx={{
            mx: "auto",
            width: { sm: "100%", md: "100%", lg: "100%" },
            display: "flex",
            justifyContent: { xs: "center", md: "center" },
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {searchResults ? (
            selectedIndex == 0 && searchResults.artists ? (
              searchResults.artists.items
                .filter((item) => item !== null)
                .slice(0, 12)
                .map((artist, i) => (
                  <VarietyCard
                    key={i}
                    imgSrc={
                      artist.images.length
                        ? artist.images[artist.images.length - 1].url
                        : ""
                    }
                    mainText={artist.name}
                    secondText={artist.genres.slice(0, 3).join(", ")}
                    thirdText=""
                    link={`/artists/${artist.id}`}
                  />
                ))
            ) : selectedIndex == 1 && searchResults.albums ? (
              searchResults.albums.items
                .filter((item) => item !== null)
                .slice(0, 12)
                .map((album, i) => (
                  <VarietyCard
                    key={i}
                    imgSrc={
                      album.images.length
                        ? album.images[album.images.length - 1].url
                        : ""
                    }
                    mainText={album.name}
                    secondText={album.artists[0].name}
                    thirdText={album.release_date.split("-")[0]}
                    link={`/albums/${album.id}`}
                  />
                ))
            ) : selectedIndex == 2 && searchResults.tracks ? (
              searchResults.tracks.items
                .filter((item) => item !== null)
                .slice(0, 12)
                .map((track, i) => (
                  <VarietyCard
                    key={i}
                    imgSrc={
                      track.album.images.length
                        ? track.album.images[track.album.images.length - 1].url
                        : ""
                    }
                    mainText={track.name}
                    secondText={track.artists
                      .map(({ name }) => name)
                      .join(", ")}
                    thirdText={track.album.release_date.split("-")[0]}
                    link={`/tracks/${track.id}`}
                  />
                ))
            ) : selectedIndex == 3 && searchResults.playlists ? (
              searchResults.playlists.items
                .filter((item) => item !== null)
                .slice(0, 12)
                .map((playlist, i) => (
                  <VarietyCard
                    key={i}
                    imgSrc={
                      playlist.images.length
                        ? playlist.images[playlist.images.length - 1].url
                        : ""
                    }
                    mainText={playlist.name}
                    secondText={`By: ${playlist.owner.display_name}`}
                    thirdText={`${playlist.tracks.total} Tracks`}
                    link={`/playlists/${playlist.id}`}
                  />
                ))
            ) : (
              <>No Results</>
            )
          ) : (
            <>No Results</>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default SearchResults;
