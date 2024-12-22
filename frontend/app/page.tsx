"use client";
import { useAuth } from "@/components/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import TopArtists from "@/components/TopArtists/TopArtists";
import UserMenu from "@/components/UserMenu";
import VarietyCard from "@/components/VarietyCard";
import { ThemeProvider } from "@emotion/react";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
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
        <SearchBar searchQuery="" />
        <TopArtists />

        <SearchResults />
      </div>
    </ProtectedRoute>
  );
}
