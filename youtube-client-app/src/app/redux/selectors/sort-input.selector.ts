import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectSortInputFeature =
  createFeatureSelector<AppStore>('sortInput');

export const selectSortInput = createSelector(
  selectSortInputFeature,
  (state: AppStore) => state.sortInput,
);
