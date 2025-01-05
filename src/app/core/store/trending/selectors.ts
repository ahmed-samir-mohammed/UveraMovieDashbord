import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrendState } from '../../models/trend.interface';

const getTrendState = createFeatureSelector<TrendState>('trend');

const getTrend = (state: TrendState) => state.movies;
const getLoading = (state: TrendState) => state.loading;
const getError = (state: TrendState) => state.error;

export const selectTrend = createSelector(getTrendState, getTrend);
export const selectLoading = createSelector(getTrendState, getLoading);
export const selectError = createSelector(getTrendState, getError);
