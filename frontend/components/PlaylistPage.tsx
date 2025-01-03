"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthContext";
import LoadingBar from "./utils/LoadingBar";
import { Album, Playlist, Track } from "@/types/spotify";
import ListOfSongsForPlaylists from "./utils/ListOfSongsForPlaylists";
import ImageAndTitle from "./utils/ImageAndTitle";

const getMinutes = (timeMs: number) => {
  const min = Math.floor(timeMs / 60000);
  const sec = Math.floor((timeMs % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")} `;
};

const getTotalMinutes = (list: Track[]) => {
  return getMinutes(list.reduce((acc, val) => acc + val.duration_ms, 0));
};

const PlaylistPage = ({ playlistId }: { playlistId: string }) => {
  const { accessToken, fetchData } = useAuth();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!accessToken) return;
      try {
        const playlistData = await fetchData(
          `/playlists/${playlistId}`,
          accessToken
        );
        setPlaylist(playlistData);
        console.log(playlistData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [accessToken]);

  return (
    <>
      {playlist ? (
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
            bgSrc={playlist.images[playlist.images.length - 1].url}
            mainSrc={playlist.images[0].url}
            title={playlist.name}
            subtitle1={
              <>
                {`${playlist.tracks.total} Tracks - ${getTotalMinutes(
                  playlist.tracks.items.map(({ track }) => track)
                )}`}
                <span className=" lowercase">min</span>
              </>
            }
            subtitle2={
              <>{`${playlist.followers.total.toLocaleString()} Followers`}</>
            }
            subtitle3={<>{`By: ${playlist.owner.display_name}`}</>}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: "1px", my: "40px" }}
          >
            Tracks
          </Typography>
          <ListOfSongsForPlaylists items={playlist.tracks.items} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 30 }}>
          <LoadingBar />
        </Box>
      )}
    </>
  );
};

export default PlaylistPage;
