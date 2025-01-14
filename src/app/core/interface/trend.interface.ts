export interface TrendResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: string | null;
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
