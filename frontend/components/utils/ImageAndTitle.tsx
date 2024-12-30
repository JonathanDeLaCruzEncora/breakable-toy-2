import { Avatar, Box, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface ComponentProps {
  bgSrc: string;
  mainSrc: string;
  title: string;
  subtitle1: ReactNode;
  subtitle2: ReactNode;
  subtitle3: ReactNode;
}

const ImageAndTitle = ({
  bgSrc,
  mainSrc,
  title,
  subtitle1,
  subtitle2,
  subtitle3,
}: ComponentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "left" },
        textAlign: { xs: "center", md: "left" },
        alignContent: "center",
        gap: 4,
        mb: 10,
        position: "relative",
      }}
    >
      <Box
        component={"img"}
        src={bgSrc}
        sx={{
          position: "absolute",
          zIndex: -1,
          top: "100px",
          left: "100px",
          width: "64px",
          aspectRatio: "1 / 1",
          transform: "translate(-50%,-50%) scale(10) ",
          overflow: "visible",
          opacity: "50%",
          filter: "blur(32px)",
        }}
      />
      <Paper
        elevation={12}
        sx={{
          width: 200,
          minWidth: 200,
          height: 200,
          minHeight: 200,
          mx: { xs: "auto", md: "0" },
          overflow: "hidden",
          borderRadius: 2,
          position: "relative",
        }}
      >
        <Box
          component={"img"}
          className=" object-cover  w-full h-full"
          src={mainSrc}
          loading="lazy"
        />
      </Paper>
      <Box>
        <Box sx={{ width: "fit-content", mx: { xs: "auto", md: "0" } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              my: 0.5,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              bgcolor: "primary.main",
              width: "100%",
              height: "2px",
              borderRadius: 0,
            }}
          ></Box>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            textTransform: "capitalize",
            letterSpacing: "2px",
            my: "20px",
          }}
        >
          {subtitle1}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ letterSpacing: "2px", my: "20px" }}
        >
          {subtitle2}
        </Typography>
        <Typography variant="subtitle2" sx={{ letterSpacing: "2px" }}>
          {subtitle3}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageAndTitle;
