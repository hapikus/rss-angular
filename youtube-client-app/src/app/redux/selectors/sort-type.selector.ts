import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectSortTypeFeature = createFeatureSelector<AppStore>('sortType');

export const selectSortType = createSelector(
  selectSortTypeFeature,
  (state: AppStore) => state.sortType,
);
