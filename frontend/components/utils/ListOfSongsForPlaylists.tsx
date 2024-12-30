import React from "react";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PlaylistTrack, Track, TrackDetails } from "@/types/spotify";

const getMinutes = (timeMs: number) => {
  const min = Math.floor(timeMs / 60000);
  const sec = Math.floor((timeMs % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")} `;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const ListOfSongsForPlaylists = ({ items }: ComponentProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20px" }} align="center">
              #
            </TableCell>
            <TableCell sx={{ width: "120px" }} align="center"></TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Album</TableCell>
            <TableCell align="left">Added</TableCell>
            <TableCell align="center">Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length ? (
            items.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{ width: "20px" }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {i + 1}
                </TableCell>
                <TableCell sx={{ width: "120px" }} align="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      borderRadius: 1,
                      mx: "auto",
                    }}
                  >
                    <Box
                      component={"img"}
                      className=" object-cover  w-full h-full"
                      src={
                        row.track.album.images[
                          row.track.album.images.length - 1
                        ].url
                      }
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Link
                    color="inherit"
                    underline="hover"
                    href={`/tracks/${row.track.id}`}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography variant="subtitle2">
                      {" "}
                      {row.track.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "grey.600", fontSize: 12 }}
                  >
                    {" "}
                    {row.track.artists.map(({ name, id }, i) => (
                      <span key={i}>
                        <Link
                          href={`/artists/${id}`}
                          underline="hover"
                          color="grey.600"
                        >
                          {name}
                        </Link>
                        {i === row.track.artists.length - 1 ? <></> : <>, </>}
                      </span>
                    ))}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Link
                    color="inherit"
                    underline="hover"
                    sx={{ cursor: "pointer" }}
                    href={`/albums/${row.track.album.id}`}
                  >
                    {row.track.album.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{formatDate(row.added_at)}</TableCell>
                <TableCell align="center">
                  {row.track.duration_ms
                    ? getMinutes(row.track.duration_ms)
                    : "0"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell></TableCell>
              <TableCell>{""}</TableCell>
              <TableCell>No songs were found.</TableCell>
              <TableCell></TableCell>
              <TableCell>{""}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ListOfSongsForPlaylists;

interface ComponentProps {
  items: PlaylistTrack[];
}
