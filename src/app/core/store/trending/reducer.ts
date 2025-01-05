import { createReducer, on } from '@ngrx/store';
import * as MovieActions from './actions';
import { initialState } from './state';

export const TrendReducer = createReducer(
  initialState,
  on(MovieActions.startLoading, (state) => ({
    ...state,
    loading: true,
  })),
  on(MovieActions.stopLoading, (state) => ({
    ...state,
    loading: false,
  })),
  on(MovieActions.loadTrendingMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MovieActions.loadTrendingMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    movies,
  })),
  on(MovieActions.loadTrendingMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
