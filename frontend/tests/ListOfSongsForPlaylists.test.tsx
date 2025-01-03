import { render, screen } from "@testing-library/react";
import ListOfSongsForPlaylists from "@/components/utils/ListOfSongsForPlaylists";
import { PlaylistTrack } from "@/types/spotify";

// Full mock data including all properties (disc_number, popularity, etc.)
const mockItems: PlaylistTrack[] = [
  {
    added_at: "2023-02-01T10:00:00Z",
    is_local: true,
    added_by: {
      external_urls: { spotify: "https://spotify.com/user2" },
      followers: { href: null, total: 150 },
      href: "https://spotify.com/user2",
      id: "user2",
      type: "user",
      uri: "spotify:user:user2",
      display_name: "User 2",
    },
    track: {
      id: "2",
      explicit: true,
      external_ids: {},
      available_markets: [],

      name: "Song 2",
      duration_ms: 180000,
      disc_number: 1, // added disc_number
      popularity: 70, // added popularity
      album: {
        id: "album2",
        name: "Album 2",
        images: [
          { url: "https://example.com/image2.jpg", height: 300, width: 300 },
        ],
        external_urls: { spotify: "https://spotify.com/album2" },
        href: "https://spotify.com/album2",
        release_date: "2023-02-01",
        release_date_precision: "day",
        type: "album",
        uri: "spotify:album:album2",
        album_type: "album",
        total_tracks: 10,
        available_markets: ["US"],
        artists: [
          {
            id: "artist3",
            name: "Artist 3",
            href: "https://spotify.com/artist3",
            external_urls: { spotify: "https://spotify.com/artist3" },
            type: "artist",
            uri: "spotify:artist:artist3",
          },
        ],
      },
      artists: [
        {
          id: "artist3",
          name: "Artist 3",
          href: "https://spotify.com/artist3",
          external_urls: { spotify: "https://spotify.com/artist3" },
          type: "artist",
          uri: "spotify:artist:artist3",
        },
      ],
      external_urls: { spotify: "https://spotify.com/track2" },
      href: "https://spotify.com/track2",
      is_local: false,
      is_playable: true,
      preview_url: "https://preview.url/track2",
      track_number: 2,
      type: "track",
      uri: "spotify:track:track2",
    },
  },
];

describe("ListOfSongsForPlaylists", () => {
  it("renders the list of songs", () => {
    render(<ListOfSongsForPlaylists items={mockItems} />);

    // Check if song titles are displayed
    expect(screen.getByText("Song 2")).toBeInTheDocument();

    // Check if album names are displayed
    expect(screen.getByText("Album 2")).toBeInTheDocument();

    // Check if artist names are displayed
    expect(screen.getByText("Artist 3")).toBeInTheDocument();

    // Check if the added date is formatted
    expect(screen.getByText("Feb 01, 2023")).toBeInTheDocument();

    // Check if the duration is displayed correctly
    expect(screen.getByText("3:00")).toBeInTheDocument();
  });

  it("renders 'No songs were found' when no items are passed", () => {
    render(<ListOfSongsForPlaylists items={[]} />);

    // Check if the 'No songs were found' text is displayed
    expect(screen.getByText("No songs were found.")).toBeInTheDocument();
  });

  it("renders images for each song", () => {
    render(<ListOfSongsForPlaylists items={mockItems} />);

    // Check if images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", "https://example.com/image2.jpg");
  });
});
