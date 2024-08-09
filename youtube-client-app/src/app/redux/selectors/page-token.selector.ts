import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore, PageTokenKey } from '../state.model';

export const selectPageTokenFeature =
  createFeatureSelector<AppStore>('pageToken');

export const selectPageTokens = createSelector(
  selectPageTokenFeature,
  (state: AppStore) => state.pageTokens,
);

export const selectPageTokenByType = (pageTokenKey: PageTokenKey) =>
  createSelector(
    selectPageTokenFeature,
    (state: AppStore) => state.pageTokens[pageTokenKey],
  );
