export interface GenresResponse {
  genres: Genres[];
}

export interface Genres {
  id: number;
  name: string;
}

export interface GenreState {
  genres: Genres[];
  loading: boolean;
  error: string | null;
}
