"use client";

import {
  alpha,
  Box,
  OutlinedInputProps,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { purple, red } from "@mui/material/colors";
interface SearchBarProps {
  //onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchTextField = styled((props: TextFieldProps) => (
  <TextField
    slotProps={{
      input: {
        disableUnderline: true,
      } as Partial<OutlinedInputProps>,
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 8,
    alignContent: "center",
    border: "1px solid",
    backgroundColor: "#F3F6F9",
    borderColor: "#E0E3E7",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
    "& .MuiFilledInput-input": {
      paddingTop: "8px",
      paddingLeft: "40px",
      paddingRight: "40px",
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));

const SearchBar = ({ searchQuery }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchQuery);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    //onSearch(value); // Send the updated value to the parent component
  };

  return (
    <Box
      sx={{
        my: 6,
        gap: 2,
        mx: "auto",
        justifyContent: "center",
        width: "100%",
        maxWidth: "600px",
        px: "20px",
        position: "relative",
      }}
    >
      <SearchIcon
        sx={{
          position: "absolute",
          left: "28px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "2",
          width: "100%",
          maxWidth: "28px",
          height: "calc(100% - 16px)",
          aspectRatio: "1/1",
        }}
      />
      <SearchTextField
        id="search-input"
        variant="filled"
        value={query}
        onChange={handleInputChange}
        fullWidth
      />
      <Box
        sx={{
          position: "absolute",
          right: "28px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "2",
          padding: "0",
          margin: "0",
          color: "gray",
          width: "100%",
          maxWidth: "28px",
          height: "calc(100% - 16px)",
          aspectRatio: "1/1",
          ":hover": { cursor: "pointer", color: "white" },
        }}
        onClick={() => {
          setQuery("");
        }}
      >
        <HighlightOffIcon
          sx={{ width: "100%", height: "100%", aspectRatio: "1/1" }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
