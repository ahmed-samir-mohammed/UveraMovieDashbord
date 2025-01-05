import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/trend.interface';

export const loadTrendingMovies = createAction('[Movies] Load Trending Movies');
export const loadTrendingMoviesSuccess = createAction(
  '[Movies] Load Trending Movies Success',
  props<{ movies: Movie[] }>()
);
export const loadTrendingMoviesFailure = createAction(
  '[Movies] Load Trending Movies Failure',
  props<{ error: string }>()
);
export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction('[UI] Stop Loading');
