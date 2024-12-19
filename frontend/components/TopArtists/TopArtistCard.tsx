import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

interface ComponentProps {
  name: string;
  genres: string;
}

const TopArtistCard = ({ name, genres }: ComponentProps) => {
  return (
    <Card
      className="group"
      variant="outlined"
      sx={{
        width: "400px",
        height: "150px",
        transition: "all",
        transitionDuration: "200ms",
        ":hover": { borderColor: "primary.main" },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "start",
          overflow: "hidden",
          alignItems: "start",
        }}
      >
        <Box sx={{ width: 150, aspectRatio: "1 / 1", overflow: "hidden" }}>
          <img
            className=" object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            src="https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
          />
        </Box>
        {/* <CardMedia
          component="img"
          sx={{ width: 151, aspectRatio: "1 / 1" }}
          image="https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
        /> */}
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", letterSpacing: "1px" }}
          >
            {name}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#d0d0d0", mt: 0.5 }}>
            {genres}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TopArtistCard;
