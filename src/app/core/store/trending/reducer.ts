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
  on(MovieActions.loadTrendingMovies, (state, { page }) => ({
    ...state,
    loading: true,
    error: null,
    page,
  })),
  on(
    MovieActions.loadTrendingMoviesSuccess,
    (state, { results, total_pages }) => ({
      ...state,
      loading: false,
      results,
      total_pages,
    })
  ),
  on(MovieActions.loadTrendingMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

console.log(
  TrendReducer(initialState, MovieActions.loadTrendingMoviesSuccess)
);
