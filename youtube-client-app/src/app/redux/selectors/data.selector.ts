import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectDataFeature = createFeatureSelector<AppStore>('data');

export const selectData = createSelector(
  selectDataFeature,
  (state: AppStore) => state.data,
);

export const selectDataById = createSelector(
  selectDataFeature,
  (state: AppStore) => state.data,
);
