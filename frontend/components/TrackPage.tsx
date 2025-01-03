"use client";
import {
  Album,
  AlbumDetails,
  Artist,
  Track,
  TrackDetails,
} from "@/types/spotify";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthContext";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import VarietyCard from "./utils/VarietyCard";
import LoadingBar from "./utils/LoadingBar";
import ArtistCardForTrackPage from "./ArtistCardForTrackPage";
import ImageAndTitle from "./utils/ImageAndTitle";

const TrackPage = ({ trackId }: { trackId: string }) => {
  const getMinutes = (timeMs: number) => {
    const min = Math.floor(timeMs / 60000);
    const sec = Math.floor((timeMs % 60000) / 1000);
    return `${min}:${sec.toString().padStart(2, "0")} `;
  };

  const { accessToken, fetchData } = useAuth();
  const [track, setTrack] = useState<TrackDetails | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [MoreFromArtist, setMoreFromArtist] = useState<Album[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!accessToken) return;

      try {
        if (!track) {
          const trackData = await fetchData(`/tracks/${trackId}`, accessToken);
          setTrack(trackData);
          console.log(trackData);
        }

        if (track?.artists) {
          const Ids = track.artists.map(({ id }) => id).join(",");

          const artistData = await fetchData(
            `/artists/multiple/${encodeURIComponent(Ids)}`,
            accessToken
          );
          setArtists(artistData.artists || []);

          const moreData = await fetchData(
            `/artists/${track.artists[0].id}/albums`,
            accessToken
          );
          setMoreFromArtist(moreData.items || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [accessToken, track]);

  return (
    <>
      {track ? (
        <Box
          sx={{
            maxWidth: { xs: "full", sm: "848px", md: "1264px" },
            mt: "50px",
            mb: "100px",
            mx: "auto",
            px: "20px",
            width: "full",
            py: 4,
          }}
        >
          <ImageAndTitle
            bgSrc={track.album.images[track.album.images.length - 1].url}
            mainSrc={track.album.images[1].url}
            title={track.name}
            subtitle1={
              <>
                {`${track.album.release_date.split("-")[0]} - `}
                <Link
                  href={`/albums/${track.album.id}`}
                  underline="hover"
                  color="inherit"
                  sx={{ cursor: "pointer" }}
                >{`
              From: ${track.album.name}`}</Link>
              </>
            }
            subtitle2={
              <>{track ? `${getMinutes(track.duration_ms)} min` : ""}</>
            }
            subtitle3={
              <>
                {artists.length ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "left" },
                        alignItems: "center",

                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={
                          artists[0]?.images[artists[0].images.length - 1]?.url
                        }
                      />
                      <Link
                        href={`/artists/${artists[0].id}`}
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography variant="subtitle2">
                          {" "}
                          {artists[0].name}
                        </Typography>
                      </Link>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </>
            }
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px", my: "40px" }}
          >
            Featuring
          </Typography>

          {artists.length ? (
            <>
              <Stack gap={4}>
                {artists.map((artist, i) => (
                  <ArtistCardForTrackPage
                    artist={artist}
                    key={i}
                    link={`/artists/${artist.id}`}
                  />
                ))}
              </Stack>
            </>
          ) : (
            <></>
          )}
          {MoreFromArtist.length && artists.length ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  mt: "50px",
                  mb: "40px",
                }}
              >
                More from {artists[0].name}
              </Typography>
              <Stack
                direction={"row"}
                rowGap={1}
                columnGap={1}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {MoreFromArtist.slice(0, 8).map((album, i) => (
                  <VarietyCard
                    key={i}
                    imgSrc={album.images[album.images.length - 1].url}
                    mainText={album.name}
                    secondText={`${album.total_tracks} track(s)`}
                    thirdText={`${album.release_date.split("-")[0]}`}
                    link={`/albums/${album.id}`}
                  />
                ))}
              </Stack>
            </>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 30 }}>
          <LoadingBar />
        </Box>
      )}
    </>
  );
};

export default TrackPage;
