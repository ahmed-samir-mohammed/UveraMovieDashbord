import { Movie } from '../models/trend.interface';

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};
