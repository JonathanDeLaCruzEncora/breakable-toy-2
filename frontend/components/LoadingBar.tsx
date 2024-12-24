import { Box, LinearProgress } from "@mui/material";
import React from "react";

const LoadingBar = () => {
  return (
    <Box sx={{ width: { xs: "80%", md: "50%" } }}>
      <LinearProgress />
    </Box>
  );
};

export default LoadingBar;
