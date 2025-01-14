import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountriesState } from '../../core/interface/countries.interface';

export const getCountriesState =
  createFeatureSelector<CountriesState>('countries');
const getCountries = (state: CountriesState) => state.countries;
const getLoading = (state: CountriesState) => state.loading;
const getError = (state: CountriesState) => state.error;

export const selectCountriesMap = createSelector(
  getCountriesState,
  getCountries
);
export const selectCountriesLoading = createSelector(
  getCountriesState,
  getLoading
);
export const selectCountriesError = createSelector(getCountriesState, getError);
