import { CountriesEffects } from './countries/effects';
import { CountriesReducer } from './countries/reducer';
import { GenresEffects } from './genres/effects';
import { GenresReducer } from './genres/reducer';
import { TrendEffects } from './trending/effects';
import { TrendReducer } from './trending/reducer';

/**
 * An object containing the reducers for the application's state management.
 *
 * @property {Function} trend - The reducer function for handling trending data.
 * @property {Function} genres - The reducer function for handling genres data.
 * @property {Function} countries - The reducer function for handling countries data.
 */

const Reducers = {
  trend: TrendReducer,
  genres: GenresReducer,
  countries: CountriesReducer,
};
const Effects = [TrendEffects, GenresEffects, CountriesEffects];
export const Store = { Reducers, Effects };
