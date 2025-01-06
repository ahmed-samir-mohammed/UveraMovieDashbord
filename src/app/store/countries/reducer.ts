import { createReducer, on } from '@ngrx/store';
import * as CountriesActions from './actions';
import { initialCountriesState } from './state';

export const CountriesReducer = createReducer(
  initialCountriesState,
  on(CountriesActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountriesActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    loading: false,
    countries,
  })),
  on(CountriesActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
