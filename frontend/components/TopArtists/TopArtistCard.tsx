import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { Artist } from "@/types/spotify";

interface ComponentProps {
  key: number;
  artist: Artist;
}

const TopArtistCard: React.FC<ComponentProps> = ({ artist }) => {
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
      <Link href={{ pathname: `/artists/${artist.id}` }}>
        <CardActionArea
          sx={{
            display: "flex",
            justifyContent: "start",
            overflow: "hidden",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              minWidth: 150,
              maxWidth: 150,
              width: 150,
              aspectRatio: "1 / 1",
              overflow: "hidden",
            }}
          >
            <img
              className=" object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              src={artist.images[0].url}
            />
          </Box>
          {/* <CardMedia
          component="img"
          sx={{ width: 151, aspectRatio: "1 / 1" }}
          image="https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
        /> 
        textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
        */}
          <CardContent sx={{ overflow: "hidden" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                letterSpacing: "1px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {artist.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#d0d0d0", mt: 0.5 }}>
              {artist?.genres.slice(0, 3).join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default TopArtistCard;
