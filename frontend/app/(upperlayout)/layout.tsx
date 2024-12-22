"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import SearchBar from "@/components/SearchBar";
import UserMenu from "@/components/UserMenu";
import { Box } from "@mui/material";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
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
        }}
      >
        <UserMenu />
      </Box>
      <SearchBar searchQuery="" />
      {children}
    </ProtectedRoute>
  );
}

export default layout;
