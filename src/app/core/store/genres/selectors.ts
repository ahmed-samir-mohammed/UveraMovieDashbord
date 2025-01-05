import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenreState } from '../../models/genres.interface';

export const selectGenresState = createFeatureSelector<GenreState>('genres');

export const selectGenresMap = createSelector(
  selectGenresState,
  (state) => state.genres
);

export const selectGenresLoading = createSelector(
  selectGenresState,
  (state) => state.loading
);

export const selectGenresError = createSelector(
  selectGenresState,
  (state) => state.error
);
