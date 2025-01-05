import { createAction, props } from '@ngrx/store';
import { Genres } from '../../models/genres.interface';

export const loadGenres = createAction('[Genres] Load Genres');

export const loadGenresSuccess = createAction(
  '[Genres] Load Genres Success',
  props<{ genres: Genres[] }>()
);

export const loadGenresFailure = createAction(
  '[Genres] Load Genres Failure',
  props<{ error: string }>()
);
