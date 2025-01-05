import { GenresEffects } from "./genres/effects";
import { GenresReducer } from "./genres/reducer";
import { TrendEffects } from "./trending/effects";
import { TrendReducer } from "./trending/reducer";

const Reducers = { trend: TrendReducer, genres: GenresReducer };
const Effects = [TrendEffects, GenresEffects];
export const Store = { Reducers, Effects };
