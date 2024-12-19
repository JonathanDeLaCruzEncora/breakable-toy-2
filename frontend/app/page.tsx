"use client";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import TopArtists from "@/components/TopArtists/TopArtists";
import VarietyCard from "@/components/VarietyCard";
import { ThemeProvider } from "@emotion/react";

export default function Home() {
  return (
    <div className="">
      <TopArtists />
      <SearchResults />
    </div>
  );
}
