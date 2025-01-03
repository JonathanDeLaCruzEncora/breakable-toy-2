import { render, screen } from "@testing-library/react";
import ListOfSongsWithImages from "@/components/utils/ListOfSongsWithImages";
import { Track } from "@/types/spotify"; // Make sure this path is correct

const mockSongs: Track[] = [
  {
    id: "1",
    name: "Song 1",
    duration_ms: 200000,
    popularity: 2,
    album: {
      album_type: "album",
      total_tracks: 10,
      available_markets: ["US", "CA"],
      external_urls: { spotify: "https://spotify.com/album1" },
      href: "https://api.spotify.com/v1/albums/album1",
      id: "album1",
      images: [
        { url: "https://example.com/image.jpg", height: 300, width: 300 },
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
          href: "https://api.spotify.com/v1/artists/artist1",
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
        href: "https://api.spotify.com/v1/artists/artist1",
        external_urls: { spotify: "https://spotify.com/artist1" },
        type: "artist",
        uri: "spotify:artist:artist1",
      },
    ],
    available_markets: ["US", "CA"],
    disc_number: 1,
    explicit: false,
    external_ids: { isrc: "US1234567890" },
    external_urls: { spotify: "https://spotify.com/track1" },
    href: "https://api.spotify.com/v1/tracks/1",
    is_local: false,
    is_playable: true,
    preview_url: "https://preview.url/song1.mp3",
    track_number: 1,
    type: "track",
    uri: "spotify:track:1",
  },
  {
    id: "2",
    name: "Song 2",
    popularity: 4,
    duration_ms: 180000,
    album: {
      album_type: "album",
      total_tracks: 12,
      available_markets: ["US", "CA"],
      external_urls: { spotify: "https://spotify.com/album2" },
      href: "https://api.spotify.com/v1/albums/album2",
      id: "album2",
      images: [
        { url: "https://example.com/image2.jpg", height: 300, width: 300 },
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
          href: "https://api.spotify.com/v1/artists/artist2",
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
        href: "https://api.spotify.com/v1/artists/artist2",
        external_urls: { spotify: "https://spotify.com/artist2" },
        type: "artist",
        uri: "spotify:artist:artist2",
      },
    ],
    available_markets: ["US", "CA"],
    disc_number: 1,
    explicit: true,
    external_ids: { isrc: "US0987654321" },
    external_urls: { spotify: "https://spotify.com/track2" },
    href: "https://api.spotify.com/v1/tracks/2",
    is_local: false,
    is_playable: true,
    preview_url: "https://preview.url/song2.mp3",
    track_number: 2,
    type: "track",
    uri: "spotify:track:2",
  },
];

it("should render the list of songs with images", () => {
  render(<ListOfSongsWithImages songs={mockSongs} />);

  // Check if the table rows are rendered correctly
  expect(screen.getByText("Song 1")).toBeInTheDocument();
  expect(screen.getByText("Song 2")).toBeInTheDocument();

  // Check if the images are rendered correctly
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(2); // There should be 2 images

  // Check if the song durations are correctly formatted
  expect(screen.getByText("3:20")).toBeInTheDocument(); // 200000ms -> 3:20
  expect(screen.getByText("3:00")).toBeInTheDocument(); // 180000ms -> 3:00
});

it("should display a message when no songs are found", () => {
  render(<ListOfSongsWithImages songs={[]} />);

  // Check if the "No songs were found" message is rendered
  expect(screen.getByText("No songs were found.")).toBeInTheDocument();
});

it("should render the correct table headers", () => {
  render(<ListOfSongsWithImages songs={mockSongs} />);

  expect(screen.getByText("#")).toBeInTheDocument();
  expect(screen.getByText("Title")).toBeInTheDocument();
  expect(screen.getByText("Length")).toBeInTheDocument();
});
