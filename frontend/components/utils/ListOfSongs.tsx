import { Track } from "@/types/spotify";
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
import React from "react";

const getMinutes = (timeMs: number) => {
  const min = Math.floor(timeMs / 60000);
  const sec = Math.floor((timeMs % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")} `;
};

const ListOfSongs = ({ songs }: { songs: Track[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20px" }} align="center">
              #
            </TableCell>
            <TableCell align="left">Title</TableCell>
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
                <TableCell align="left">
                  <Link
                    underline="hover"
                    color="inherit"
                    href={`/tracks/${row.id}`}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography letterSpacing={1}> {row.name}</Typography>
                  </Link>
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
              <TableCell>No songs were found.</TableCell>
              <TableCell>{""}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOfSongs;
