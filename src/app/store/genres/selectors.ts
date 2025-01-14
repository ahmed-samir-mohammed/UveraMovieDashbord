import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenreState } from '../../core/interface/genres.interface';

export const getGenresState = createFeatureSelector<GenreState>('genres');
const getGenres = (state: GenreState) => state.genres;
const getLoading = (state: GenreState) => state.loading;
const getError = (state: GenreState) => state.error;

export const selectGenresMap = createSelector(getGenresState, getGenres);
export const selectGenresLoading = createSelector(getGenresState, getLoading);
export const selectGenresError = createSelector(getGenresState, getError);
