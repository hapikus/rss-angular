import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectSortDirectionFeature = createFeatureSelector<AppStore>('sortDirection');

export const selectSortDirection = createSelector(
  selectSortDirectionFeature,
  (state: AppStore) => state.sortDirection,
);
