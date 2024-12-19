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
} from "@mui/material";

function createData(
  name: string,
  timesPlayed: number,
  songLength: string,
  image: string
) {
  return { name, timesPlayed, songLength, image };
}

const rows = [
  createData(
    "Frozen yoghurt",
    159,
    "3:38",
    "https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
  ),
  createData(
    "Ice cream sandwich",
    237,
    "3:38",
    "https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
  ),
  createData(
    "Eclair",
    262,
    "4:53",
    "https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
  ),
  createData(
    "Cupcake",
    305,
    "2:23",
    "https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
  ),
  createData(
    "Gingerbread",
    356,
    "1:20",
    "https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
  ),
];

const TopSongsTable = () => {
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
            <TableCell align="center">Times Played</TableCell>
            <TableCell align="center">Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
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
                {i + 100}
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
                    src="https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
                  />
                </Box>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center">{row.timesPlayed}</TableCell>
              <TableCell align="center">{row.songLength}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopSongsTable;
