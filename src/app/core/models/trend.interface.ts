export interface MovieResponse {
  page: number;
  results: Movie[];
}

export interface Movie {
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export interface TrendState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}
