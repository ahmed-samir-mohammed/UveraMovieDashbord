import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './state';

const getMoviesState = createFeatureSelector<MoviesState>('movies');

const getMovies = (state: MoviesState) => state.movies;
const getLoading = (state: MoviesState) => state.loading;
const getError = (state: MoviesState) => state.error;

export const selectMovies = createSelector(getMoviesState, getMovies);
export const selectLoading = createSelector(getMoviesState, getLoading);
export const selectError = createSelector(getMoviesState, getError);
