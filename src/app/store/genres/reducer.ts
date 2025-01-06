import { createReducer, on } from '@ngrx/store';
import * as GenresActions from './actions';
import { initialGenresState } from './state';

export const GenresReducer = createReducer(
  initialGenresState,
  on(GenresActions.loadGenres, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(GenresActions.loadGenresSuccess, (state, { genres }) => ({
    ...state,
    loading: false,
    genres,
  })),
  on(GenresActions.loadGenresFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
