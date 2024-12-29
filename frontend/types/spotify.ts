interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

interface ExternalUrls {
  spotify: string;
}

interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

interface Restrictions {
  reason: string;
}

interface ArtistBase {
  id: string;
  name: string;
  href: string;
  external_urls: ExternalUrls;
  type: string;
  uri: string;
}

export interface Artist extends ArtistBase {
  followers: Followers;
  genres: string[];
  images: Image[];
  popularity: number;
}

export interface AlbumBase {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: ArtistBase[];
}

export interface Album extends AlbumBase {
  is_playable?: boolean;
}

export interface AlbumDetails extends AlbumBase {
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  tracks: PaginatedItems<Track>;
}

export interface Track {
  album: AlbumBase;
  artists: ArtistBase[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  restrictions?: Restrictions;
}

export interface TrackDetails extends Track {
  linked_from?: Record<string, never>;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  public: boolean | null;
  snapshot_id: string;
  tracks: PaginatedItems<PlaylistTrack>;
  type: string;
  uri: string;
}

export interface PlaylistTrack {
  added_at: string;
  added_by: PlaylistOwner;
  is_local: boolean;
  track: Track;
}

interface PlaylistOwner {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

interface Followers {
  href: string | null;
  total: number;
}

interface PaginatedItems<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

export interface Copyright {
  text: string;
  type: string;
}

interface SearchItem<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

export type TracksSearch = SearchItem<Track>;
export type ArtistsSearch = SearchItem<Artist>;
export type AlbumsSearch = SearchItem<Album>;
export type PlaylistsSearch = SearchItem<Playlist>;
