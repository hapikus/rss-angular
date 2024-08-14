import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../state.model';

export const selectFavoriteFeature = createFeatureSelector<AppStore>('favorites');

export const selectFavorites = createSelector(
  selectFavoriteFeature,
  (state: AppStore) => state.favorites,
);

export const selectIsFavorite = (videoId: string) =>
  createSelector(
    selectFavoriteFeature,
    (state: AppStore) => (!!state.favorites.filter((item) => item.id === videoId).length),
  );

export const selectFavoriteCount = createSelector(
  selectFavorites,
  (favorites) => favorites.length,
);
