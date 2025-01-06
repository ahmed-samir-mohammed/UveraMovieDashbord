import { CountriesEffects } from './countries/effects';
import { CountriesReducer } from './countries/reducer';
import { GenresEffects } from './genres/effects';
import { GenresReducer } from './genres/reducer';
import { TrendEffects } from './trending/effects';
import { TrendReducer } from './trending/reducer';

const Reducers = {
  trend: TrendReducer,
  genres: GenresReducer,
  countries: CountriesReducer,
};
const Effects = [TrendEffects, GenresEffects, CountriesEffects];
export const Store = { Reducers, Effects };
