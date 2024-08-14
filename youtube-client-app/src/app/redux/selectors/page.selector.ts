import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectPageFeature = createFeatureSelector<AppStore>('page');

export const selectPage = createSelector(
  selectPageFeature,
  (state: AppStore) => state.page,
);
