"use client";

import { Box, Button, Typography } from "@mui/material";
import { FaSpotify } from "react-icons/fa";

export default function Login() {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8080/auth/spotify";
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Welcome!</Typography>
        <Box sx={{ borderColor: "primary.main", p: 5 }}>
          <Button
            variant="contained"
            onClick={handleSpotifyLogin}
            endIcon={<FaSpotify size={30} />}
            size="large"
          >
            <Typography variant="h6" sx={{ textTransform: "none" }}>
              Login using Spotify
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}
