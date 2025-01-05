import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrendResponse } from '../../models/trend.interface';

const getTrendState = createFeatureSelector<TrendResponse>('trend');
const getTrend = (state: TrendResponse) => state.results;
const getPage = (state: TrendResponse) => state.page;
const getTotalPages = (state: TrendResponse) => state.total_pages;
const getLoading = (state: TrendResponse) => state.loading;
const getError = (state: TrendResponse) => state.error;

export const selectTrend = createSelector(getTrendState, getTrend);
export const selectPage = createSelector(getTrendState, getPage);
export const selectTotalPages = createSelector(getTrendState, getTotalPages);
export const selectLoading = createSelector(getTrendState, getLoading);
export const selectError = createSelector(getTrendState, getError);
