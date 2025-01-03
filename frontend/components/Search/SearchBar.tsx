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
import { useAuth } from "../Auth/AuthContext";
import { useRouter } from "next/navigation";
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

const SearchBar = () => {
  const { accessToken, setSearchResults, fetchData } = useAuth();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (query.trim() !== "") {
      const fetchDetails = async () => {
        if (!accessToken) return;
        try {
          const searchResults = await fetchData(
            `/search?query=${encodeURIComponent(query)}`,
            accessToken
          );
          setSearchResults(searchResults);
          if (window.location.pathname !== "/") router.push("/");
        } catch (error) {
          console.error(error);
        }
      };
      fetchDetails();
    }
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
        onKeyDown={handleKeyDown}
        fullWidth
      />
      <Box
        role="button"
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
