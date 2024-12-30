"use client";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import SearchBar from "@/components/Search/SearchBar";
import SearchResults from "@/components/Search/SearchResults";
import TopArtists from "@/components/TopArtists/TopArtists";
import UserMenu from "@/components/utils/UserMenu";
import { SearchResultsInterface } from "@/types/spotify";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [searchResults, setSearchResults] =
    useState<SearchResultsInterface | null>(null);
  return (
    <ProtectedRoute>
      <div className="">
        <Box
          sx={{
            maxWidth: { xs: "full", sm: "848px", md: "1264px" },
            mt: "50px",
            mx: "auto",
            px: "20px",
            width: "full",
            display: "flex",
            justifyContent: { xs: "center", sm: "end" },
            alignItems: "center",
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: 2,
          }}
        >
          <UserMenu />
        </Box>
        <SearchBar />
        <TopArtists />

        <SearchResults />
      </div>
    </ProtectedRoute>
  );
}
