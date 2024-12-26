import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Track } from "@/types/spotify";

function createData(
  name: string,
  timesPlayed: number,
  songLength: string,
  image: string
) {
  return { name, timesPlayed, songLength, image };
}

const getMinutes = (timeMs: number) => {
  const min = Math.floor(timeMs / 60000);
  const sec = Math.floor((timeMs % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")} `;
};

const TopSongsTable = ({ songs }: { songs: Track[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20px" }} align="center">
              #
            </TableCell>
            <TableCell sx={{ width: "120px" }} align="center"></TableCell>
            <TableCell align="left">Song</TableCell>
            <TableCell align="center">Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.length > 0 ? (
            songs.map((row, i) => (
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
                      borderRadius: 2,
                      mx: "auto",
                    }}
                  >
                    <img
                      className=" object-cover  w-full h-full"
                      src={row.album.images[0].url}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Typography letterSpacing={1}> {row.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  {row.duration_ms ? getMinutes(row.duration_ms) : "0"}
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
              <TableCell>{""}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopSongsTable;
