import { TrendResponse } from '../../core/models/trend.interface';

export const initialState: TrendResponse = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: null,
};