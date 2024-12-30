import { Artist } from "@/types/spotify";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const ArtistCardForTrackPage = React.memo(
  ({ artist, link }: { artist: Artist; link: string }) => (
    <Card variant="outlined">
      <Link href={link}>
        <CardActionArea
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            p: 2,
          }}
        >
          <CardMedia
            component={"img"}
            sx={{ width: 80, height: 80, borderRadius: 1 }}
            src={artist.images[artist.images.length - 1]?.url || ""}
            loading="lazy"
          />
          <Box sx={{ pl: 2 }}>
            <Typography variant="h6" letterSpacing={1}>
              {artist.name}
            </Typography>
            <Typography variant="subtitle2" color="grey.500">
              {`${artist.followers.total.toLocaleString()} followers`}
            </Typography>
            <Typography variant="subtitle2" color="grey.500">
              {artist.genres.join(", ")}
            </Typography>
          </Box>
        </CardActionArea>
      </Link>
    </Card>
  )
);

export default ArtistCardForTrackPage;
