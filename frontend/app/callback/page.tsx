"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const Callback = () => {
  const code = useSearchParams().get("code");
  const { setAccessToken, setLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (code) {
      setLoggedIn(false);
      fetch("http://localhost:8080/auth/spotify/callback?code=" + code)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.access_token && data.refresh_token) {
            const expirationTime = Date.now() + data.expires_in * 1000;

            // Guarda en el contexto y localStorage
            setAccessToken(data.access_token);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("token_expiration", expirationTime.toString());

            // Redirige al dashboard
            setLoggedIn(true);
            router.push("/");
          } else {
            console.error("No se recibieron los tokens");
            router.push("/login");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          router.push("/login");
        });
    }
  }, [code]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ width: { xs: "80%", md: "50%" } }}>
        <LinearProgress />
      </Box>
      <Typography variant="h6" sx={{ color: "grey.300" }}>
        {" "}
        Authenticating...
      </Typography>
    </Box>
  );
};

export default Callback;
