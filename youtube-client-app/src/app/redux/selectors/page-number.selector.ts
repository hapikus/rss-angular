import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectPageNumberFeature =
  createFeatureSelector<AppStore>('pageNumber');

export const selectPageNumber = createSelector(
  selectPageNumberFeature,
  (state: AppStore) => state.pageNumber,
);
