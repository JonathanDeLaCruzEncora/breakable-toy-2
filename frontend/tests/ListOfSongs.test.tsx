import { render, screen } from "@testing-library/react";
import ListOfSongs from "@/components/utils/ListOfSongs";
import { Track } from "@/types/spotify";

// Mock data for songs with all required properties based on Track interface
const mockSongs: Track[] = [
  {
    id: "1",
    name: "Song 1",
    duration_ms: 180000, // 3 minutes
    album: {
      id: "album1",
      album_type: "album",
      total_tracks: 10,
      available_markets: ["US"],
      external_urls: { spotify: "https://spotify.com/album1" },
      href: "https://spotify.com/album1",
      images: [
        { url: "https://placekitten.com/200/200", height: 200, width: 200 },
      ],
      name: "Album 1",
      release_date: "2023-01-01",
      release_date_precision: "day",
      type: "album",
      uri: "spotify:album:album1",
      artists: [
        {
          id: "artist1",
          name: "Artist 1",
          href: "https://spotify.com/artist1",
          external_urls: { spotify: "https://spotify.com/artist1" },
          type: "artist",
          uri: "spotify:artist:artist1",
        },
      ],
    },
    artists: [
      {
        id: "artist1",
        name: "Artist 1",
        href: "https://spotify.com/artist1",
        external_urls: { spotify: "https://spotify.com/artist1" },
        type: "artist",
        uri: "spotify:artist:artist1",
      },
    ],
    available_markets: ["US"],
    disc_number: 1,
    explicit: false,
    external_ids: { isrc: "1234567890" },
    external_urls: { spotify: "https://spotify.com/track1" },
    href: "https://spotify.com/track1",
    is_local: false,
    is_playable: true,
    popularity: 80,
    preview_url: "https://spotify.com/track1-preview",
    track_number: 1,
    type: "track",
    uri: "spotify:track:track1",
  },
  {
    id: "2",
    name: "Song 2",
    duration_ms: 240000, // 4 minutes
    album: {
      id: "album2",
      album_type: "album",
      total_tracks: 12,
      available_markets: ["US"],
      external_urls: { spotify: "https://spotify.com/album2" },
      href: "https://spotify.com/album2",
      images: [
        { url: "https://placekitten.com/200/200", height: 200, width: 200 },
      ],
      name: "Album 2",
      release_date: "2023-02-01",
      release_date_precision: "day",
      type: "album",
      uri: "spotify:album:album2",
      artists: [
        {
          id: "artist2",
          name: "Artist 2",
          href: "https://spotify.com/artist2",
          external_urls: { spotify: "https://spotify.com/artist2" },
          type: "artist",
          uri: "spotify:artist:artist2",
        },
      ],
    },
    artists: [
      {
        id: "artist2",
        name: "Artist 2",
        href: "https://spotify.com/artist2",
        external_urls: { spotify: "https://spotify.com/artist2" },
        type: "artist",
        uri: "spotify:artist:artist2",
      },
    ],
    available_markets: ["US"],
    disc_number: 1,
    explicit: false,
    external_ids: { isrc: "0987654321" },
    external_urls: { spotify: "https://spotify.com/track2" },
    href: "https://spotify.com/track2",
    is_local: false,
    is_playable: true,
    popularity: 75,
    preview_url: "https://spotify.com/track2-preview",
    track_number: 2,
    type: "track",
    uri: "spotify:track:track2",
  },
];

describe("ListOfSongs", () => {
  it("renders the list of songs", () => {
    render(<ListOfSongs songs={mockSongs} />);

    // Check if song titles are displayed
    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();

    // Check if durations are correctly formatted
    expect(screen.getByText("3:00")).toBeInTheDocument();
    expect(screen.getByText("4:00")).toBeInTheDocument();

    // Check if song links are correct
    expect(screen.getByRole("link", { name: "Song 1" })).toHaveAttribute(
      "href",
      "/tracks/1"
    );
    expect(screen.getByRole("link", { name: "Song 2" })).toHaveAttribute(
      "href",
      "/tracks/2"
    );
  });

  it("renders 'No songs were found' when no songs are passed", () => {
    render(<ListOfSongs songs={[]} />);

    // Check if the 'No songs were found' message is displayed
    expect(screen.getByText("No songs were found.")).toBeInTheDocument();
  });

  it("renders the table with correct number of rows", () => {
    render(<ListOfSongs songs={mockSongs} />);

    // Check if there are 2 table rows for the 2 songs
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockSongs.length + 1); // +1 for the header row
  });

  it("correctly formats the duration of a song", () => {
    render(<ListOfSongs songs={mockSongs} />);

    // Check if the duration is formatted correctly
    expect(screen.getByText("3:00")).toBeInTheDocument();
    expect(screen.getByText("4:00")).toBeInTheDocument();
  });
});
