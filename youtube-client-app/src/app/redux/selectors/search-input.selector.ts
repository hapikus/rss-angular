import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectSearchInputFeature =
  createFeatureSelector<AppStore>('searchInput');

export const selectSearchInput = createSelector(
  selectSearchInputFeature,
  (state: AppStore) => state.searchInput,
);
