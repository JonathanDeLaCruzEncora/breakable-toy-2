"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Box, LinearProgress, Typography } from "@mui/material";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, router, isLoading]);

  if (isLoading || !isAuthenticated) {
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
      </Box>
    ); // Muestra un loader mientras redirige
  }

  return <>{children}</>;
};

export default ProtectedRoute;
