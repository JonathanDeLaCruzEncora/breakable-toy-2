"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { deepPurple, lime, purple } from "@mui/material/colors";
import SearchBar from "@/components/SearchBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple["A400"],
    },
    secondary: {
      main: lime["A200"],
    },
  },
  typography: {
    fontFamily: [
      "Geist",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-full overflow-x-hidden`}
      >
        <ThemeProvider theme={theme}>
          <SearchBar searchQuery="" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
