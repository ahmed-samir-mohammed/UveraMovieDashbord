import { GenresEffects } from "./genres/effects";
import { GenresReducer } from "./genres/reducer";
import { TrendEffects } from "./trending/effects";
import { TrendReducer } from "./trending/reducer";

export const Reducers = { trend: TrendReducer, genres: GenresReducer };
export const Effects = [TrendEffects, GenresEffects];
