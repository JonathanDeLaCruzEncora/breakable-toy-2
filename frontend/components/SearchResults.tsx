import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import VarietyCard from "./VarietyCard";

const SearchResults = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: { xs: "full", sm: "848px", md: "1264px" },
          mt: "50px",
          mx: "auto",
          px: "20px",
          width: "full",
          py: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", letterSpacing: "1px", mb: "20px" }}
        >
          Search Results
        </Typography>
        <Stack
          direction="row"
          useFlexGap
          sx={{
            mx: "auto",
            width: { sm: "100%", md: "632px", lg: "964px" },
            display: "flex",
            justifyContent: { sm: "center", md: "start" },
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <VarietyCard />
          <VarietyCard />
          <VarietyCard />
          <VarietyCard />
          <VarietyCard />
          <VarietyCard />
          <VarietyCard />
        </Stack>
      </Box>
    </>
  );
};

export default SearchResults;
