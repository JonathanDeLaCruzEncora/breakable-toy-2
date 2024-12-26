"use client";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import SearchBar from "@/components/Search/SearchBar";
import UserMenu from "@/components/utils/UserMenu";
import { Box, Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import Link from "next/link";

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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: "grey.900",
              color: "grey.300",
              borderColor: "grey.600",
              textTransform: "capitalize",
              ":hover": {
                bgcolor: "#0f0f0f",
                borderColor: "primary.light",
                color: "primary.light",
              },
            }}
          >
            Home
          </Button>
        </Link>
        <UserMenu />
      </Box>
      <SearchBar searchQuery="" />
      {children}
    </ProtectedRoute>
  );
}

export default layout;
