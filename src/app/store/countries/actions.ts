import { createAction, props } from '@ngrx/store';
import { Countries } from '../../core/interface/countries.interface';

export const loadCountries = createAction('[Countries] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Countries] Load Countries Success',
  props<{ countries: Countries[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries] Load Countries Failure',
  props<{ error: string }>()
);
